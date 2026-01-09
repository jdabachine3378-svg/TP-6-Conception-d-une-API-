import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur';

// Extension de l'interface Request d'Express pour inclure l'utilisateur authentifié
declare global {
  namespace Express {
    interface Request {
      utilisateur?: any; // Propriété pour stocker l'utilisateur authentifié
    }
  }
}

/**
 * Middleware qui vérifie si l'utilisateur est authentifié
 * Ce middleware extrait le token JWT de l'en-tête Authorization,
 * le vérifie et attache l'utilisateur à la requête.
 * 
 * @param req - Objet Request d'Express
 * @param res - Objet Response d'Express
 * @param next - Fonction pour passer au middleware suivant
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Vérifie si l'en-tête Authorization existe et commence par "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Format: "Bearer <token>"
    // Extrait le token (partie après "Bearer ")
    token = req.headers.authorization.split(' ')[1];
  }

  // Si aucun token n'est fourni
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Non autorisé à accéder à cette ressource'
    });
  }

  try {
    // Vérifier le token avec la clé secrète JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    
    // Récupérer l'utilisateur depuis la base de données (sans le mot de passe)
    // et l'ajouter à la requête pour utilisation dans les contrôleurs
    req.utilisateur = await Utilisateur.findById(decoded.id).select('-motDePasse');
    
    // Si l'utilisateur n'existe pas
    if (!req.utilisateur) {
      return res.status(401).json({
        success: false,
        error: 'Non autorisé à accéder à cette ressource'
      });
    }

    // Passer au middleware suivant
    next();
  } catch (error) {
    // En cas d'erreur (token invalide, expiré, etc.)
    return res.status(401).json({
      success: false,
      error: 'Non autorisé à accéder à cette ressource'
    });
  }
};

/**
 * Middleware qui vérifie si l'utilisateur a les rôles requis
 * Ce middleware doit être utilisé après le middleware `protect`.
 * Il vérifie si l'utilisateur authentifié a l'un des rôles autorisés.
 * 
 * @param roles - Les rôles autorisés (bibliothecaire, admin, etc.)
 * @returns Middleware Express qui vérifie les permissions
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Vérifier si l'utilisateur existe dans la requête
    // (doit avoir été ajouté par le middleware protect)
    if (!req.utilisateur) {
      return res.status(401).json({
        success: false,
        error: 'Non autorisé à accéder à cette ressource'
      });
    }

    // Vérifier si l'utilisateur a l'un des rôles requis
    // Note: Ici on utilise isAdmin comme indicateur de rôle admin
    // Les admins ont accès à toutes les routes
    const userRole = req.utilisateur.isAdmin ? 'admin' : 'utilisateur';
    
    // Si l'utilisateur est admin, il a accès à tout
    if (userRole === 'admin') {
      return next();
    }
    
    // Vérifier si l'utilisateur a l'un des rôles requis
    if (!roles.includes(userRole) && !roles.includes('bibliothecaire')) {
      return res.status(403).json({
        success: false,
        error: `Le rôle ${userRole} n'est pas autorisé à accéder à cette ressource`
      });
    }

    // Si l'utilisateur a le rôle requis, passer au middleware suivant
    next();
  };
};

