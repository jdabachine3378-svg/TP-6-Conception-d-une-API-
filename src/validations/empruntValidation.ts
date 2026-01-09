import Joi from 'joi';
import joiObjectId from 'joi-objectid';

// Extension de Joi pour valider les ObjectId MongoDB
Joi.objectId = joiObjectId(Joi);

// Liste des statuts valides
const statuts = ['Emprunté', 'Retourné', 'En retard'];

/**
 * Schéma de validation pour la création d'un emprunt
 * Valide les données avant la création d'un nouvel emprunt
 */
export const createEmpruntSchema = Joi.object({
  livre: Joi.objectId()
    .required()
    .messages({
      'string.base': 'Le livre doit être un ID valide',
      'any.required': 'Le livre est requis'
    }),
  utilisateur: Joi.objectId()
    .required()
    .messages({
      'string.base': 'L\'utilisateur doit être un ID valide',
      'any.required': 'L\'utilisateur est requis'
    }),
  dateEmprunt: Joi.date()
    .optional()
    .messages({
      'date.base': 'La date d\'emprunt doit être une date valide'
    }),
  dateRetourPrevue: Joi.date()
    .required()
    .min(Joi.ref('dateEmprunt'))
    .messages({
      'date.base': 'La date de retour prévue doit être une date valide',
      'date.min': 'La date de retour prévue doit être après la date d\'emprunt',
      'any.required': 'La date de retour prévue est requise'
    }),
  dateRetourEffective: Joi.date()
    .optional()
    .min(Joi.ref('dateEmprunt'))
    .messages({
      'date.base': 'La date de retour effective doit être une date valide',
      'date.min': 'La date de retour effective doit être après la date d\'emprunt'
    }),
  statut: Joi.string()
    .valid(...statuts)
    .optional()
    .messages({
      'any.only': 'Le statut doit être l\'un des suivants: {#valids}'
    })
});

/**
 * Schéma de validation pour la mise à jour d'un emprunt
 * Tous les champs sont optionnels pour permettre des mises à jour partielles
 */
export const updateEmpruntSchema = createEmpruntSchema.fork(
  ['livre', 'utilisateur', 'dateEmprunt', 'dateRetourPrevue', 'dateRetourEffective', 'statut'],
  (schema) => schema.optional()
);

