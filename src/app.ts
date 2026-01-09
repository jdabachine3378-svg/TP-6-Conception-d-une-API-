import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import v1Routes from './routes/v1';

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les corps de requête JSON
// Permet de traiter les données JSON envoyées dans le corps des requêtes
app.use(express.json());

// Middleware pour parser les corps de requête URL-encoded
// Permet de traiter les données envoyées via des formulaires HTML
app.use(express.urlencoded({ extended: true }));

// Middleware de sécurité: ajoute des en-têtes HTTP de sécurité
// Protège l'application contre diverses vulnérabilités web courantes
app.use(helmet());

// Middleware CORS: gère les requêtes Cross-Origin
// Permet à l'API d'être accessible depuis différents domaines
app.use(cors());

// Rate Limiting pour prévenir les attaques par force brute
// Limite le nombre de requêtes qu'une IP peut faire dans une fenêtre de temps
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  standardHeaders: true, // Renvoie les en-têtes standard de rate limit
  legacyHeaders: false, // Désactive les en-têtes obsolètes
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});

// Application du rate limiter à toutes les routes
app.use(limiter);

// Routes de l'API
// Toutes les routes v1 sont préfixées par /api/v1
app.use('/api/v1', v1Routes);

// Route racine: point d'entrée de l'API
// Fournit des informations sur l'API
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Bienvenue sur l'API de la bibliothèque",
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Middleware pour les routes non trouvées (404)
// S'exécute si aucune route ne correspond à la requête
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

// Middleware de gestion des erreurs globales
// Capture toutes les erreurs non gérées dans l'application
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log de l'erreur pour le débogage
  console.error(err.stack);
  
  // Retour d'une réponse d'erreur
  // En production, on ne montre pas le message d'erreur détaillé pour des raisons de sécurité
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Erreur serveur' : err.message
  });
});

export default app;

