import express from 'express';
import * as livreController from '../../controllers/livreController';
import { validateRequest } from '../../middlewares/validateRequest';
import { createLivreSchema, updateLivreSchema } from '../../validations/livreValidation';
import { protect, authorize } from '../../middlewares/auth';

const router = express.Router();

/**
 * Routes pour les livres
 * Base path: /api/v1/livres
 */

// Route pour récupérer tous les livres (GET /api/v1/livres)
// Accès: Public
router.route('/')
  .get(livreController.getAllLivres)
  // Route pour créer un nouveau livre (POST /api/v1/livres)
  // Accès: Privé (bibliothecaire, admin)
  .post(
    protect,
    authorize('bibliothecaire', 'admin'),
    validateRequest(createLivreSchema),
    livreController.createLivre
  );

// Route pour récupérer un livre par son ID (GET /api/v1/livres/:id)
// Accès: Public
router.route('/:id')
  .get(livreController.getLivreById)
  // Route pour mettre à jour un livre (PUT /api/v1/livres/:id)
  // Accès: Privé (bibliothecaire, admin)
  .put(
    protect,
    authorize('bibliothecaire', 'admin'),
    validateRequest(updateLivreSchema),
    livreController.updateLivre
  )
  // Route pour supprimer un livre (DELETE /api/v1/livres/:id)
  // Accès: Privé (admin uniquement)
  .delete(
    protect,
    authorize('admin'),
    livreController.deleteLivre
  );

export default router;

