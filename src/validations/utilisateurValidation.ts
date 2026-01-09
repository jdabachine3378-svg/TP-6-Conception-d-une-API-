import Joi from 'joi';

/**
 * Schéma de validation pour la création d'un utilisateur
 * Valide les données avant la création d'un nouvel utilisateur
 */
export const createUtilisateurSchema = Joi.object({
  nomUtilisateur: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Le nom d\'utilisateur doit être une chaîne de caractères',
      'string.empty': 'Le nom d\'utilisateur ne peut pas être vide',
      'string.min': 'Le nom d\'utilisateur doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom d\'utilisateur ne peut pas dépasser {#limit} caractères',
      'any.required': 'Le nom d\'utilisateur est requis'
    }),
  email: Joi.string()
    .trim()
    .min(5)
    .max(255)
    .email()
    .required()
    .messages({
      'string.base': 'L\'email doit être une chaîne de caractères',
      'string.empty': 'L\'email ne peut pas être vide',
      'string.email': 'L\'email doit être une adresse email valide',
      'string.min': 'L\'email doit contenir au moins {#limit} caractères',
      'string.max': 'L\'email ne peut pas dépasser {#limit} caractères',
      'any.required': 'L\'email est requis'
    }),
  motDePasse: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      'string.base': 'Le mot de passe doit être une chaîne de caractères',
      'string.empty': 'Le mot de passe ne peut pas être vide',
      'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères',
      'string.max': 'Le mot de passe ne peut pas dépasser {#limit} caractères',
      'any.required': 'Le mot de passe est requis'
    }),
  isAdmin: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isAdmin doit être un booléen'
    }),
  dateInscription: Joi.date()
    .optional()
    .messages({
      'date.base': 'La date d\'inscription doit être une date valide'
    })
});

/**
 * Schéma de validation pour la mise à jour d'un utilisateur
 * Tous les champs sont optionnels pour permettre des mises à jour partielles
 */
export const updateUtilisateurSchema = createUtilisateurSchema.fork(
  ['nomUtilisateur', 'email', 'motDePasse', 'isAdmin', 'dateInscription'],
  (schema) => schema.optional()
);

