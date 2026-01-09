import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charge les variables d'environnement du fichier .env
dotenv.config();

/**
 * Établit la connexion à la base de données MongoDB
 * Cette fonction gère la connexion à MongoDB en utilisant l'URI spécifiée
 * dans les variables d'environnement. En cas d'erreur, l'application est
 * terminée car une API sans base de données serait inutile.
 */
const connectDB = async (): Promise<void> => {
  try {
    // Connexion à MongoDB avec l'URI spécifiée dans les variables d'environnement
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    
    // Affiche un message de succès avec le nom de l'hôte
    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error: any) {
    // En cas d'erreur, affiche le message et quitte l'application
    console.error(`Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1); // Code de sortie 1 indique une erreur
  }
};

export default connectDB;

