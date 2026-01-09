import Livre, { ILivre } from '../models/Livre';
import mongoose from 'mongoose';

// Interface pour les options de requête (pagination, tri, filtres)
interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  titre?: string;
  genre?: string;
  auteur?: string;
}

/**
 * Crée un nouveau livre dans la base de données
 * @param livreData - Les données du livre à créer
 * @returns Promise<ILivre> - Le livre créé
 */
export const createLivre = async (livreData: Partial<ILivre>): Promise<ILivre> => {
  return await Livre.create(livreData);
};

/**
 * Récupère tous les livres avec pagination et filtres
 * @param options - Options de pagination, tri et filtres
 * @returns Promise avec les livres et les informations de pagination
 */
export const getAllLivres = async (options: QueryOptions = {}): Promise<{ livres: ILivre[], pagination: any }> => {
  // Paramètres de pagination avec valeurs par défaut
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Construction du filtre de recherche
  const filter: any = {};
  if (options.titre) {
    filter.titre = { $regex: options.titre, $options: 'i' };
  }
  if (options.genre) {
    filter.genre = options.genre;
  }
  if (options.auteur) {
    // Vérification que l'ID de l'auteur est valide
    if (mongoose.Types.ObjectId.isValid(options.auteur)) {
      filter.auteur = options.auteur;
    }
  }

  // Construction du tri
  let sort: any = {};
  if (options.sort) {
    const sortField = options.sort.startsWith('-') ? options.sort.substring(1) : options.sort;
    const sortOrder = options.sort.startsWith('-') ? -1 : 1;
    sort = { [sortField]: sortOrder };
  } else {
    sort = { createdAt: -1 };
  }

  // Exécution de la requête avec population de l'auteur
  const livres = await Livre.find(filter)
    .populate('auteur', 'nom') // Remplit le champ auteur avec les données de l'auteur
    .sort(sort)
    .skip(skip)
    .limit(limit);

  // Calcul du nombre total de livres correspondant aux filtres
  const total = await Livre.countDocuments(filter);

  return {
    livres,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    }
  };
};

/**
 * Récupère un livre par son ID
 * @param id - L'ID du livre à récupérer
 * @returns Promise<ILivre | null> - Le livre trouvé ou null
 */
export const getLivreById = async (id: string): Promise<ILivre | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Livre.findById(id).populate('auteur', 'nom');
};

/**
 * Met à jour un livre existant
 * @param id - L'ID du livre à mettre à jour
 * @param livreData - Les nouvelles données du livre
 * @returns Promise<ILivre | null> - Le livre mis à jour ou null
 */
export const updateLivre = async (id: string, livreData: Partial<ILivre>): Promise<ILivre | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Livre.findByIdAndUpdate(id, livreData, { 
    new: true,
    runValidators: true
  }).populate('auteur', 'nom');
};

/**
 * Supprime un livre de la base de données
 * @param id - L'ID du livre à supprimer
 * @returns Promise<boolean> - true si le livre a été supprimé, false sinon
 */
export const deleteLivre = async (id: string): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  const result = await Livre.findByIdAndDelete(id);
  return result !== null;
};

