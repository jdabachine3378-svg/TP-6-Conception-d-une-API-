import { Request, Response } from 'express';
import * as auteurService from '../services/auteurService';

/**
 * Contrôleur pour créer un nouvel auteur
 * Route: POST /api/v1/auteurs
 * Accès: Privé (bibliothecaire, admin)
 */
export const createAuteur = async (req: Request, res: Response) => {
  try {
    // Création de l'auteur via le service
    const auteur = await auteurService.createAuteur(req.body);
    
    // Retour de la réponse avec le code 201 (Created)
    res.status(201).json({
      success: true,
      data: auteur
    });
  } catch (error: any) {
    // Gestion des erreurs
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour récupérer tous les auteurs avec pagination et filtres
 * Route: GET /api/v1/auteurs
 * Accès: Public
 */
export const getAllAuteurs = async (req: Request, res: Response) => {
  try {
    // Extraction des paramètres de requête pour la pagination et les filtres
    const options = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      nom: req.query.nom as string
    };

    // Récupération des auteurs via le service
    const result = await auteurService.getAllAuteurs(options);
    
    // Retour de la réponse avec les données et les informations de pagination
    res.status(200).json({
      success: true,
      data: result.auteurs,
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
 * Contrôleur pour récupérer un auteur par son ID
 * Route: GET /api/v1/auteurs/:id
 * Accès: Public
 */
export const getAuteurById = async (req: Request, res: Response) => {
  try {
    // Récupération de l'auteur par son ID via le service
    const auteur = await auteurService.getAuteurById(req.params.id);
    
    // Si l'auteur n'existe pas
    if (!auteur) {
      return res.status(404).json({
        success: false,
        error: 'Auteur non trouvé'
      });
    }

    // Retour de la réponse avec les données de l'auteur
    res.status(200).json({
      success: true,
      data: auteur
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour mettre à jour un auteur
 * Route: PUT /api/v1/auteurs/:id
 * Accès: Privé (bibliothecaire, admin)
 */
export const updateAuteur = async (req: Request, res: Response) => {
  try {
    // Mise à jour de l'auteur via le service
    const auteur = await auteurService.updateAuteur(req.params.id, req.body);
    
    // Si l'auteur n'existe pas
    if (!auteur) {
      return res.status(404).json({
        success: false,
        error: 'Auteur non trouvé'
      });
    }

    // Retour de la réponse avec les données mises à jour
    res.status(200).json({
      success: true,
      data: auteur
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Contrôleur pour supprimer un auteur
 * Route: DELETE /api/v1/auteurs/:id
 * Accès: Privé (admin)
 */
export const deleteAuteur = async (req: Request, res: Response) => {
  try {
    // Suppression de l'auteur via le service
    const deleted = await auteurService.deleteAuteur(req.params.id);
    
    // Si l'auteur n'existe pas
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Auteur non trouvé'
      });
    }

    // Retour de la réponse avec le code 204 (No Content)
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

