import Joi from 'joi';
import joiObjectId from 'joi-objectid';

// Extension de Joi pour valider les ObjectId MongoDB
Joi.objectId = joiObjectId(Joi);

// Liste des genres valides
const genres = ['Fiction', 'Science-fiction', 'Fantasy', 'Thriller', 'Romance', 
                'Biographie', 'Histoire', 'Poésie', 'Jeunesse', 'Autre'];

/**
 * Schéma de validation pour la création d'un livre
 * Valide les données avant la création d'un nouveau livre
 */
export const createLivreSchema = Joi.object({
  titre: Joi.string()
    .trim()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.base': 'Le titre doit être une chaîne de caractères',
      'string.empty': 'Le titre ne peut pas être vide',
      'string.min': 'Le titre doit contenir au moins {#limit} caractères',
      'string.max': 'Le titre ne peut pas dépasser {#limit} caractères',
      'any.required': 'Le titre est requis'
    }),
  auteur: Joi.objectId()
    .required()
    .messages({
      'string.base': 'L\'auteur doit être un ID valide',
      'any.required': 'L\'auteur est requis'
    }),
  genre: Joi.string()
    .valid(...genres)
    .required()
    .messages({
      'any.only': 'Le genre doit être l\'un des suivants: {#valids}',
      'any.required': 'Le genre est requis'
    }),
  datePublication: Joi.date()
    .optional()
    .messages({
      'date.base': 'La date de publication doit être une date valide'
    }),
  nombrePages: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Le nombre de pages doit être un nombre',
      'number.min': 'Le nombre de pages doit être au moins {#limit}',
      'any.required': 'Le nombre de pages est requis'
    })
});

/**
 * Schéma de validation pour la mise à jour d'un livre
 * Tous les champs sont optionnels pour permettre des mises à jour partielles
 */
export const updateLivreSchema = createLivreSchema.fork(
  ['titre', 'auteur', 'genre', 'datePublication', 'nombrePages'],
  (schema) => schema.optional()
);

