import mongoose, { Document, Schema } from 'mongoose';

// Interface TypeScript pour le modèle Livre
export interface ILivre extends Document {
  titre: string;
  auteur: mongoose.Types.ObjectId; // Référence à l'auteur
  genre: string;
  datePublication: Date;
  nombrePages: number;
}

// Liste des genres disponibles
const genres = ['Fiction', 'Science-fiction', 'Fantasy', 'Thriller', 'Romance', 
                'Biographie', 'Histoire', 'Poésie', 'Jeunesse', 'Autre'];

// Définition du schéma Mongoose pour le livre
const LivreSchema: Schema = new Schema({
  titre: {
    type: String,
    required: [true, 'Le titre du livre est requis'],
    minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
    maxlength: [255, 'Le titre ne peut pas dépasser 255 caractères'],
    trim: true
  },
  auteur: {
    type: Schema.Types.ObjectId,
    ref: 'Auteur', // Référence au modèle Auteur
    required: [true, 'L\'auteur est requis']
  },
  genre: {
    type: String,
    required: [true, 'Le genre est requis'],
    enum: genres, // Le genre doit être dans la liste
    trim: true
  },
  datePublication: {
    type: Date,
    default: Date.now
  },
  nombrePages: {
    type: Number,
    required: [true, 'Le nombre de pages est requis'],
    min: [1, 'Le nombre de pages doit être au moins 1']
  }
}, {
  timestamps: true
});

// Export du modèle Mongoose
const Livre = mongoose.model<ILivre>('Livre', LivreSchema);
export default Livre;

