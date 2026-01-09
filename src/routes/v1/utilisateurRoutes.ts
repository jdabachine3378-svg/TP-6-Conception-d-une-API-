import express from 'express';
import * as utilisateurController from '../../controllers/utilisateurController';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUtilisateurSchema, updateUtilisateurSchema } from '../../validations/utilisateurValidation';
import { protect, authorize } from '../../middlewares/auth';

const router = express.Router();

/**
 * Routes pour les utilisateurs
 * Base path: /api/v1/utilisateurs
 */

// Route pour l'authentification (POST /api/v1/utilisateurs/login)
// Accès: Public
router.post('/login', utilisateurController.login);

// Route pour créer un nouvel utilisateur (POST /api/v1/utilisateurs)
// Accès: Public (pour l'inscription)
router.route('/')
  .post(validateRequest(createUtilisateurSchema), utilisateurController.createUtilisateur)
  // Route pour récupérer tous les utilisateurs (GET /api/v1/utilisateurs)
  // Accès: Privé (admin uniquement)
  .get(
    protect,
    authorize('admin'),
    utilisateurController.getAllUtilisateurs
  );

// Route pour récupérer un utilisateur par son ID (GET /api/v1/utilisateurs/:id)
// Accès: Privé (utilisateur lui-même ou admin)
router.route('/:id')
  .get(
    protect,
    utilisateurController.getUtilisateurById
  )
  // Route pour mettre à jour un utilisateur (PUT /api/v1/utilisateurs/:id)
  // Accès: Privé (utilisateur lui-même ou admin)
  .put(
    protect,
    validateRequest(updateUtilisateurSchema),
    utilisateurController.updateUtilisateur
  )
  // Route pour supprimer un utilisateur (DELETE /api/v1/utilisateurs/:id)
  // Accès: Privé (admin uniquement)
  .delete(
    protect,
    authorize('admin'),
    utilisateurController.deleteUtilisateur
  );

export default router;

