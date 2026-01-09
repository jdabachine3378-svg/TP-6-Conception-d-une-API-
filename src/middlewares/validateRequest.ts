import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Middleware qui valide le corps de la requête selon un schéma Joi
 * Ce middleware intercepte les requêtes avant qu'elles n'atteignent les contrôleurs,
 * garantissant ainsi que seules les données valides sont traitées.
 * 
 * @param schema - Le schéma Joi à utiliser pour la validation
 * @returns Middleware Express qui valide les données de la requête
 */
export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Valide le corps de la requête avec le schéma fourni
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Inclure toutes les erreurs (ne pas s'arrêter à la première)
      stripUnknown: true // Supprimer les propriétés inconnues du corps de la requête
    });

    // Si des erreurs sont détectées
    if (error) {
      // Concatène tous les messages d'erreur en une seule chaîne
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      
      // Renvoie une réponse d'erreur 400 (Bad Request) avec les messages d'erreur
      return res.status(400).json({
        success: false,
        error: errorMessage
      });
    }

    // Si la validation réussit, passe au middleware suivant
    next();
  };
};

