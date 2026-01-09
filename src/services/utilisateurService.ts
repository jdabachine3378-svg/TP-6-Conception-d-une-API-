import Utilisateur, { IUtilisateur } from '../models/Utilisateur';
import mongoose from 'mongoose';

// Interface pour les options de requête (pagination, tri, filtres)
interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  nomUtilisateur?: string;
  email?: string;
}

/**
 * Crée un nouvel utilisateur dans la base de données
 * @param utilisateurData - Les données de l'utilisateur à créer
 * @returns Promise<IUtilisateur> - L'utilisateur créé
 */
export const createUtilisateur = async (utilisateurData: Partial<IUtilisateur>): Promise<IUtilisateur> => {
  return await Utilisateur.create(utilisateurData);
};

/**
 * Récupère tous les utilisateurs avec pagination et filtres
 * @param options - Options de pagination, tri et filtres
 * @returns Promise avec les utilisateurs et les informations de pagination
 */
export const getAllUtilisateurs = async (options: QueryOptions = {}): Promise<{ utilisateurs: IUtilisateur[], pagination: any }> => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Construction du filtre de recherche
  const filter: any = {};
  if (options.nomUtilisateur) {
    filter.nomUtilisateur = { $regex: options.nomUtilisateur, $options: 'i' };
  }
  if (options.email) {
    filter.email = { $regex: options.email, $options: 'i' };
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

  // Exécution de la requête sans le mot de passe
  const utilisateurs = await Utilisateur.find(filter)
    .select('-motDePasse') // Exclut le mot de passe des résultats
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Utilisateur.countDocuments(filter);

  return {
    utilisateurs,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    }
  };
};

/**
 * Récupère un utilisateur par son ID
 * @param id - L'ID de l'utilisateur à récupérer
 * @returns Promise<IUtilisateur | null> - L'utilisateur trouvé ou null
 */
export const getUtilisateurById = async (id: string): Promise<IUtilisateur | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Utilisateur.findById(id).select('-motDePasse');
};

/**
 * Récupère un utilisateur par son email (pour l'authentification)
 * @param email - L'email de l'utilisateur
 * @returns Promise<IUtilisateur | null> - L'utilisateur trouvé ou null
 */
export const getUtilisateurByEmail = async (email: string): Promise<IUtilisateur | null> => {
  return await Utilisateur.findOne({ email }).select('+motDePasse'); // Inclut le mot de passe pour la vérification
};

/**
 * Met à jour un utilisateur existant
 * @param id - L'ID de l'utilisateur à mettre à jour
 * @param utilisateurData - Les nouvelles données de l'utilisateur
 * @returns Promise<IUtilisateur | null> - L'utilisateur mis à jour ou null
 */
export const updateUtilisateur = async (id: string, utilisateurData: Partial<IUtilisateur>): Promise<IUtilisateur | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Utilisateur.findByIdAndUpdate(id, utilisateurData, { 
    new: true,
    runValidators: true
  }).select('-motDePasse');
};

/**
 * Supprime un utilisateur de la base de données
 * @param id - L'ID de l'utilisateur à supprimer
 * @returns Promise<boolean> - true si l'utilisateur a été supprimé, false sinon
 */
export const deleteUtilisateur = async (id: string): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  const result = await Utilisateur.findByIdAndDelete(id);
  return result !== null;
};

