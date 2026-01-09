import Emprunt, { IEmprunt } from '../models/Emprunt';
import mongoose from 'mongoose';

// Interface pour les options de requête (pagination, tri, filtres)
interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  livre?: string;
  utilisateur?: string;
  statut?: string;
}

/**
 * Crée un nouvel emprunt dans la base de données
 * @param empruntData - Les données de l'emprunt à créer
 * @returns Promise<IEmprunt> - L'emprunt créé
 */
export const createEmprunt = async (empruntData: Partial<IEmprunt>): Promise<IEmprunt> => {
  return await Emprunt.create(empruntData);
};

/**
 * Récupère tous les emprunts avec pagination et filtres
 * @param options - Options de pagination, tri et filtres
 * @returns Promise avec les emprunts et les informations de pagination
 */
export const getAllEmprunts = async (options: QueryOptions = {}): Promise<{ emprunts: IEmprunt[], pagination: any }> => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Construction du filtre de recherche
  const filter: any = {};
  if (options.livre) {
    if (mongoose.Types.ObjectId.isValid(options.livre)) {
      filter.livre = options.livre;
    }
  }
  if (options.utilisateur) {
    if (mongoose.Types.ObjectId.isValid(options.utilisateur)) {
      filter.utilisateur = options.utilisateur;
    }
  }
  if (options.statut) {
    filter.statut = options.statut;
  }

  // Construction du tri
  let sort: any = {};
  if (options.sort) {
    const sortField = options.sort.startsWith('-') ? options.sort.substring(1) : options.sort;
    const sortOrder = options.sort.startsWith('-') ? -1 : 1;
    sort = { [sortField]: sortOrder };
  } else {
    sort = { dateEmprunt: -1 }; // Tri par défaut : date d'emprunt décroissante
  }

  // Exécution de la requête avec population des relations
  const emprunts = await Emprunt.find(filter)
    .populate('livre', 'titre genre') // Remplit le champ livre
    .populate('utilisateur', 'nomUtilisateur email') // Remplit le champ utilisateur
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Emprunt.countDocuments(filter);

  return {
    emprunts,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    }
  };
};

/**
 * Récupère un emprunt par son ID
 * @param id - L'ID de l'emprunt à récupérer
 * @returns Promise<IEmprunt | null> - L'emprunt trouvé ou null
 */
export const getEmpruntById = async (id: string): Promise<IEmprunt | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Emprunt.findById(id)
    .populate('livre', 'titre genre auteur')
    .populate('utilisateur', 'nomUtilisateur email');
};

/**
 * Met à jour un emprunt existant
 * @param id - L'ID de l'emprunt à mettre à jour
 * @param empruntData - Les nouvelles données de l'emprunt
 * @returns Promise<IEmprunt | null> - L'emprunt mis à jour ou null
 */
export const updateEmprunt = async (id: string, empruntData: Partial<IEmprunt>): Promise<IEmprunt | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Emprunt.findByIdAndUpdate(id, empruntData, { 
    new: true,
    runValidators: true
  })
    .populate('livre', 'titre genre')
    .populate('utilisateur', 'nomUtilisateur email');
};

/**
 * Supprime un emprunt de la base de données
 * @param id - L'ID de l'emprunt à supprimer
 * @returns Promise<boolean> - true si l'emprunt a été supprimé, false sinon
 */
export const deleteEmprunt = async (id: string): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  const result = await Emprunt.findByIdAndDelete(id);
  return result !== null;
};

