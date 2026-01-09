import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Connexion à la base de données MongoDB
// Cette fonction établit la connexion et gère les erreurs
connectDB();

// Port d'écoute du serveur
// Utilise le port défini dans les variables d'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// Démarrage du serveur Express
const server = app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution en mode ${process.env.NODE_ENV} sur le port ${PORT}`);
});

// Gestion des erreurs non capturées (promesses rejetées non gérées)
// Permet de capturer les erreurs qui pourraient faire planter l'application
process.on('unhandledRejection', (err: Error) => {
  console.error(`Erreur non gérée: ${err.message}`);
  
  // Fermeture propre du serveur en cas d'erreur critique
  server.close(() => {
    process.exit(1); // Code de sortie 1 indique une erreur
  });
});

// Gestion de l'arrêt propre du serveur (SIGTERM)
// Permet de fermer proprement le serveur lors d'un arrêt
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Arrêt du serveur...');
  server.close(() => {
    console.log('Serveur fermé proprement');
  });
});

