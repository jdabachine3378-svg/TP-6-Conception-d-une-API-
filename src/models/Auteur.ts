import mongoose, { Document, Schema } from 'mongoose';

// Interface TypeScript pour le modèle Auteur
export interface IAuteur extends Document {
  nom: string;
  dateCreation: Date;
}

// Définition du schéma Mongoose pour l'auteur
const AuteurSchema: Schema = new Schema({
  nom: {
    type: String,
    required: [true, 'Le nom de l\'auteur est requis'],
    unique: true, // Le nom doit être unique
    minlength: [3, 'Le nom doit contenir au moins 3 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
    trim: true // Supprime les espaces en début et fin
  },
  dateCreation: {
    type: Date,
    default: Date.now // Date de création automatique
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Export du modèle Mongoose
const Auteur = mongoose.model<IAuteur>('Auteur', AuteurSchema);
export default Auteur;

