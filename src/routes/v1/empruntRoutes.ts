import express from 'express';
import * as empruntController from '../../controllers/empruntController';
import { validateRequest } from '../../middlewares/validateRequest';
import { createEmpruntSchema, updateEmpruntSchema } from '../../validations/empruntValidation';
import { protect, authorize } from '../../middlewares/auth';

const router = express.Router();

/**
 * Routes pour les emprunts
 * Base path: /api/v1/emprunts
 */

// Route pour récupérer tous les emprunts (GET /api/v1/emprunts)
// Accès: Privé (bibliothecaire, admin)
router.route('/')
  .get(
    protect,
    authorize('bibliothecaire', 'admin'),
    empruntController.getAllEmprunts
  )
  // Route pour créer un nouvel emprunt (POST /api/v1/emprunts)
  // Accès: Privé (bibliothecaire, admin)
  .post(
    protect,
    authorize('bibliothecaire', 'admin'),
    validateRequest(createEmpruntSchema),
    empruntController.createEmprunt
  );

// Route pour récupérer un emprunt par son ID (GET /api/v1/emprunts/:id)
// Accès: Privé (bibliothecaire, admin)
router.route('/:id')
  .get(
    protect,
    authorize('bibliothecaire', 'admin'),
    empruntController.getEmpruntById
  )
  // Route pour mettre à jour un emprunt (PUT /api/v1/emprunts/:id)
  // Accès: Privé (bibliothecaire, admin)
  .put(
    protect,
    authorize('bibliothecaire', 'admin'),
    validateRequest(updateEmpruntSchema),
    empruntController.updateEmprunt
  )
  // Route pour supprimer un emprunt (DELETE /api/v1/emprunts/:id)
  // Accès: Privé (admin uniquement)
  .delete(
    protect,
    authorize('admin'),
    empruntController.deleteEmprunt
  );

export default router;

