import Auteur, { IAuteur } from '../models/Auteur';
import mongoose from 'mongoose';

// Interface pour les options de requête (pagination, tri, filtres)
interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  nom?: string;
}

/**
 * Crée un nouvel auteur dans la base de données
 * @param auteurData - Les données de l'auteur à créer
 * @returns Promise<IAuteur> - L'auteur créé
 */
export const createAuteur = async (auteurData: Partial<IAuteur>): Promise<IAuteur> => {
  return await Auteur.create(auteurData);
};

/**
 * Récupère tous les auteurs avec pagination et filtres
 * @param options - Options de pagination, tri et filtres
 * @returns Promise avec les auteurs et les informations de pagination
 */
export const getAllAuteurs = async (options: QueryOptions = {}): Promise<{ auteurs: IAuteur[], pagination: any }> => {
  // Paramètres de pagination avec valeurs par défaut
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Construction du filtre de recherche
  const filter: any = {};
  if (options.nom) {
    // Recherche insensible à la casse sur le nom
    filter.nom = { $regex: options.nom, $options: 'i' };
  }

  // Construction du tri
  let sort: any = {};
  if (options.sort) {
    // Si le tri commence par '-', c'est un tri décroissant
    const sortField = options.sort.startsWith('-') ? options.sort.substring(1) : options.sort;
    const sortOrder = options.sort.startsWith('-') ? -1 : 1;
    sort = { [sortField]: sortOrder };
  } else {
    // Tri par défaut : date de création décroissante
    sort = { createdAt: -1 };
  }

  // Exécution de la requête avec pagination, tri et filtres
  const auteurs = await Auteur.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  // Calcul du nombre total d'auteurs correspondant aux filtres
  const total = await Auteur.countDocuments(filter);

  // Retour des résultats avec les informations de pagination
  return {
    auteurs,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    }
  };
};

/**
 * Récupère un auteur par son ID
 * @param id - L'ID de l'auteur à récupérer
 * @returns Promise<IAuteur | null> - L'auteur trouvé ou null
 */
export const getAuteurById = async (id: string): Promise<IAuteur | null> => {
  // Vérification que l'ID est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Auteur.findById(id);
};

/**
 * Met à jour un auteur existant
 * @param id - L'ID de l'auteur à mettre à jour
 * @param auteurData - Les nouvelles données de l'auteur
 * @returns Promise<IAuteur | null> - L'auteur mis à jour ou null
 */
export const updateAuteur = async (id: string, auteurData: Partial<IAuteur>): Promise<IAuteur | null> => {
  // Vérification que l'ID est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  // Mise à jour avec retour du document mis à jour et validation
  return await Auteur.findByIdAndUpdate(id, auteurData, { 
    new: true, // Retourne le document mis à jour
    runValidators: true // Exécute les validateurs du schéma
  });
};

/**
 * Supprime un auteur de la base de données
 * @param id - L'ID de l'auteur à supprimer
 * @returns Promise<boolean> - true si l'auteur a été supprimé, false sinon
 */
export const deleteAuteur = async (id: string): Promise<boolean> => {
  // Vérification que l'ID est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  // Suppression de l'auteur
  const result = await Auteur.findByIdAndDelete(id);
  return result !== null;
};

