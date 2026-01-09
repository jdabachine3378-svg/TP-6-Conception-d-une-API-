import mongoose, { Document, Schema } from 'mongoose';

// Interface TypeScript pour le modèle Utilisateur
export interface IUtilisateur extends Document {
  nomUtilisateur: string;
  email: string;
  motDePasse: string;
  isAdmin: boolean;
  dateInscription: Date;
}

// Définition du schéma Mongoose pour l'utilisateur
const UtilisateurSchema: Schema = new Schema({
  nomUtilisateur: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    unique: true, // Le nom d'utilisateur doit être unique
    minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
    maxlength: [50, 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true, // L'email doit être unique
    minlength: [5, 'L\'email doit contenir au moins 5 caractères'],
    maxlength: [255, 'L\'email ne peut pas dépasser 255 caractères'],
    trim: true,
    lowercase: true // Convertit en minuscules
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [5, 'Le mot de passe doit contenir au moins 5 caractères'],
    maxlength: [1024, 'Le mot de passe ne peut pas dépasser 1024 caractères'],
    select: false // Ne pas retourner le mot de passe par défaut dans les requêtes
  },
  isAdmin: {
    type: Boolean,
    default: false // Par défaut, l'utilisateur n'est pas administrateur
  },
  dateInscription: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Export du modèle Mongoose
const Utilisateur = mongoose.model<IUtilisateur>('Utilisateur', UtilisateurSchema);
export default Utilisateur;

