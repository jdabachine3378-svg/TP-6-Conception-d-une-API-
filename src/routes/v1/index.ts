import express from 'express';
import auteurRoutes from './auteurRoutes';
import livreRoutes from './livreRoutes';
import empruntRoutes from './empruntRoutes';
import utilisateurRoutes from './utilisateurRoutes';

const router = express.Router();

/**
 * Index des routes API v1
 * Ce fichier centralise toutes les routes de l'API version 1
 * Chaque ressource a son propre fichier de routes pour une meilleure organisation
 */

// Montage des différentes routes sur leurs préfixes respectifs
// Toutes les routes sont préfixées par /api/v1 (défini dans app.ts)
router.use('/auteurs', auteurRoutes); // Routes pour les auteurs: /api/v1/auteurs
router.use('/livres', livreRoutes); // Routes pour les livres: /api/v1/livres
router.use('/emprunts', empruntRoutes); // Routes pour les emprunts: /api/v1/emprunts
router.use('/utilisateurs', utilisateurRoutes); // Routes pour les utilisateurs: /api/v1/utilisateurs

export default router;

