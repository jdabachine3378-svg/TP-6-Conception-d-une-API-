import express from 'express';
import * as auteurController from '../../controllers/auteurController';
import { validateRequest } from '../../middlewares/validateRequest';
import { createAuteurSchema, updateAuteurSchema } from '../../validations/auteurValidation';
import { protect, authorize } from '../../middlewares/auth';

const router = express.Router();

/**
 * Routes pour les auteurs
 * Base path: /api/v1/auteurs
 */

// Route pour récupérer tous les auteurs (GET /api/v1/auteurs)
// Accès: Public
router.route('/')
  .get(auteurController.getAllAuteurs)
  // Route pour créer un nouvel auteur (POST /api/v1/auteurs)
  // Accès: Privé (bibliothecaire, admin)
  // Middlewares: protect (authentification) -> authorize (autorisation) -> validateRequest (validation) -> createAuteur (contrôleur)
  .post(
    protect, // Vérifie que l'utilisateur est authentifié
    authorize('bibliothecaire', 'admin'), // Vérifie que l'utilisateur a le rôle requis
    validateRequest(createAuteurSchema), // Valide les données de la requête
    auteurController.createAuteur // Crée l'auteur
  );

// Route pour récupérer un auteur par son ID (GET /api/v1/auteurs/:id)
// Accès: Public
router.route('/:id')
  .get(auteurController.getAuteurById)
  // Route pour mettre à jour un auteur (PUT /api/v1/auteurs/:id)
  // Accès: Privé (bibliothecaire, admin)
  .put(
    protect,
    authorize('bibliothecaire', 'admin'),
    validateRequest(updateAuteurSchema),
    auteurController.updateAuteur
  )
  // Route pour supprimer un auteur (DELETE /api/v1/auteurs/:id)
  // Accès: Privé (admin uniquement)
  .delete(
    protect,
    authorize('admin'),
    auteurController.deleteAuteur
  );

export default router;

