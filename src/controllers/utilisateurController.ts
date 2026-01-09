import { Request, Response } from 'express';
import * as utilisateurService from '../services/utilisateurService';
import jwt from 'jsonwebtoken';

/**
 * Contrôleur pour créer un nouvel utilisateur
 * Route: POST /api/v1/utilisateurs
 * Accès: Public (pour l'inscription)
 */
export const createUtilisateur = async (req: Request, res: Response) => {
  try {
    const utilisateur = await utilisateurService.createUtilisateur(req.body);
    res.status(201).json({
      success: true,
      data: utilisateur
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour récupérer tous les utilisateurs avec pagination et filtres
 * Route: GET /api/v1/utilisateurs
 * Accès: Privé (admin)
 */
export const getAllUtilisateurs = async (req: Request, res: Response) => {
  try {
    const options = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      nomUtilisateur: req.query.nomUtilisateur as string,
      email: req.query.email as string
    };

    const result = await utilisateurService.getAllUtilisateurs(options);
    res.status(200).json({
      success: true,
      data: result.utilisateurs,
      pagination: result.pagination
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour récupérer un utilisateur par son ID
 * Route: GET /api/v1/utilisateurs/:id
 * Accès: Privé (utilisateur lui-même ou admin)
 */
export const getUtilisateurById = async (req: Request, res: Response) => {
  try {
    const utilisateur = await utilisateurService.getUtilisateurById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: utilisateur
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour mettre à jour un utilisateur
 * Route: PUT /api/v1/utilisateurs/:id
 * Accès: Privé (utilisateur lui-même ou admin)
 */
export const updateUtilisateur = async (req: Request, res: Response) => {
  try {
    const utilisateur = await utilisateurService.updateUtilisateur(req.params.id, req.body);
    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: utilisateur
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour supprimer un utilisateur
 * Route: DELETE /api/v1/utilisateurs/:id
 * Accès: Privé (admin)
 */
export const deleteUtilisateur = async (req: Request, res: Response) => {
  try {
    const deleted = await utilisateurService.deleteUtilisateur(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }
    res.status(204).json({
      success: true,
      data: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour l'authentification (login)
 * Route: POST /api/v1/utilisateurs/login
 * Accès: Public
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérification que l'email et le mot de passe sont fournis
    if (!email || !motDePasse) {
      return res.status(400).json({
        success: false,
        error: 'Veuillez fournir un email et un mot de passe'
      });
    }

    // Récupération de l'utilisateur par email (avec le mot de passe)
    const utilisateur = await utilisateurService.getUtilisateurByEmail(email);

    // Vérification que l'utilisateur existe et que le mot de passe correspond
    // Note: Dans une vraie application, vous devriez hasher le mot de passe avec bcrypt
    if (!utilisateur || utilisateur.motDePasse !== motDePasse) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: utilisateur._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' } // Le token expire dans 7 jours
    );

    // Retour de la réponse avec le token
    res.status(200).json({
      success: true,
      data: {
        token,
        utilisateur: {
          id: utilisateur._id,
          nomUtilisateur: utilisateur.nomUtilisateur,
          email: utilisateur.email,
          isAdmin: utilisateur.isAdmin
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

