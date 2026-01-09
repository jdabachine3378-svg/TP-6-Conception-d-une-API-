import Joi from 'joi';
import joiObjectId from 'joi-objectid';

// Extension de Joi pour valider les ObjectId MongoDB
Joi.objectId = joiObjectId(Joi);

/**
 * Schéma de validation pour la création d'un auteur
 * Valide les données avant la création d'un nouvel auteur
 */
export const createAuteurSchema = Joi.object({
  nom: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères',
      'string.empty': 'Le nom ne peut pas être vide',
      'string.min': 'Le nom doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom ne peut pas dépasser {#limit} caractères',
      'any.required': 'Le nom est requis'
    }),
  dateCreation: Joi.date()
    .optional()
    .messages({
      'date.base': 'La date de création doit être une date valide'
    })
});

/**
 * Schéma de validation pour la mise à jour d'un auteur
 * Tous les champs sont optionnels pour permettre des mises à jour partielles
 */
export const updateAuteurSchema = createAuteurSchema.fork(
  ['nom', 'dateCreation'],
  (schema) => schema.optional()
);

