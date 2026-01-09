import mongoose, { Document, Schema } from 'mongoose';

// Interface TypeScript pour le modèle Emprunt
export interface IEmprunt extends Document {
  livre: mongoose.Types.ObjectId; // Référence au livre
  utilisateur: mongoose.Types.ObjectId; // Référence à l'utilisateur
  dateEmprunt: Date;
  dateRetourPrevue: Date;
  dateRetourEffective: Date | null;
  statut: string;
}

// Liste des statuts possibles pour un emprunt
const statuts = ['Emprunté', 'Retourné', 'En retard'];

// Définition du schéma Mongoose pour l'emprunt
const EmpruntSchema: Schema = new Schema({
  livre: {
    type: Schema.Types.ObjectId,
    ref: 'Livre', // Référence au modèle Livre
    required: [true, 'Le livre est requis']
  },
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: 'Utilisateur', // Référence au modèle Utilisateur
    required: [true, 'L\'utilisateur est requis']
  },
  dateEmprunt: {
    type: Date,
    default: Date.now // Date d'emprunt par défaut = maintenant
  },
  dateRetourPrevue: {
    type: Date,
    required: [true, 'La date de retour prévue est requise']
  },
  dateRetourEffective: {
    type: Date,
    default: null // Null tant que le livre n'est pas retourné
  },
  statut: {
    type: String,
    enum: statuts, // Le statut doit être dans la liste
    default: 'Emprunté' // Statut par défaut
  }
}, {
  timestamps: true
});

// Export du modèle Mongoose
const Emprunt = mongoose.model<IEmprunt>('Emprunt', EmpruntSchema);
export default Emprunt;

