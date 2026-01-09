# TP-6-Conception-d-une-API-RESTfu

# TP-6-Conception-d-une-API-

# API RESTful pour la Gestion d'une Bibliothèque

API RESTful développée avec Node.js, Express, TypeScript et MongoDB pour la gestion d'une bibliothèque.

## 📋 Fonctionnalités

- **Gestion des auteurs** : CRUD complet pour les auteurs
- **Gestion des livres** : CRUD complet pour les livres avec référence aux auteurs
- **Gestion des utilisateurs** : CRUD complet avec authentification JWT
- **Gestion des emprunts** : CRUD complet pour les emprunts de livres
- **Authentification et autorisation** : Système de sécurité avec JWT
- **Validation des données** : Validation avec Joi
- **Pagination** : Support de la pagination pour toutes les listes
- **Filtres et tri** : Recherche et tri sur les ressources

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### Étapes d'installation

1. **Cloner ou télécharger le projet**

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/bibliotheque
   NODE_ENV=development
   JWT_SECRET=votre_secret_jwt_tres_securise
   ```

4. **Compiler le projet TypeScript**
   ```bash
   npm run build
   ```

5. **Démarrer le serveur**
   
   En mode développement (avec rechargement automatique) :
   ```bash
   npm run dev
   ```
   
   En mode production :
   ```bash
   npm start
   ```

## 📚 Structure du Projet

```
bibliotheque-api/
├── src/
│   ├── config/          # Configuration (base de données)
│   ├── controllers/      # Contrôleurs (logique de traitement des requêtes)
│   ├── middlewares/      # Middlewares (authentification, validation)
│   ├── models/           # Modèles de données Mongoose
│   ├── routes/           # Définition des routes API
│   │   └── v1/           # Routes de l'API v1
│   ├── services/         # Services (logique métier)
│   ├── validations/      # Schémas de validation Joi
│   ├── app.ts            # Configuration de l'application Express
│   └── server.ts         # Point d'entrée de l'application
├── dist/                 # Fichiers compilés JavaScript
├── .env                  # Variables d'environnement (non versionné)
├── .gitignore
├── jest.config.js        # Configuration Jest pour les tests
├── package.json
├── tsconfig.json         # Configuration TypeScript
└── README.md
```

## 🔌 Endpoints de l'API

### Base URL
```
http://localhost:3000/api/v1
```

### Auteurs

- `GET /auteurs` - Récupérer tous les auteurs (pagination, filtres)
- `GET /auteurs/:id` - Récupérer un auteur par ID
- `POST /auteurs` - Créer un auteur (authentification requise)
- `PUT /auteurs/:id` - Mettre à jour un auteur (authentification requise)
- `DELETE /auteurs/:id` - Supprimer un auteur (admin uniquement)

### Livres

- `GET /livres` - Récupérer tous les livres (pagination, filtres)
- `GET /livres/:id` - Récupérer un livre par ID
- `POST /livres` - Créer un livre (authentification requise)
- `PUT /livres/:id` - Mettre à jour un livre (authentification requise)
- `DELETE /livres/:id` - Supprimer un livre (admin uniquement)

### Utilisateurs

- `POST /utilisateurs` - Créer un utilisateur (inscription)
- `POST /utilisateurs/login` - Authentification (login)
- `GET /utilisateurs` - Récupérer tous les utilisateurs (admin uniquement)
- `GET /utilisateurs/:id` - Récupérer un utilisateur par ID (authentification requise)
- `PUT /utilisateurs/:id` - Mettre à jour un utilisateur (authentification requise)
- `DELETE /utilisateurs/:id` - Supprimer un utilisateur (admin uniquement)

### Emprunts

- `GET /emprunts` - Récupérer tous les emprunts (authentification requise)
- `GET /emprunts/:id` - Récupérer un emprunt par ID (authentification requise)
- `POST /emprunts` - Créer un emprunt (authentification requise)
- `PUT /emprunts/:id` - Mettre à jour un emprunt (authentification requise)
- `DELETE /emprunts/:id` - Supprimer un emprunt (admin uniquement)

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification.

### Obtenir un token

```bash
POST /api/v1/utilisateurs/login
Content-Type: application/json

{
  "email": "user@example.com",
  "motDePasse": "password123"
}
```

### Utiliser le token

Ajoutez le token dans l'en-tête `Authorization` :

```
Authorization: Bearer <votre_token_jwt>
```

## 📝 Exemples d'utilisation

### Créer un auteur

```bash
POST /api/v1/auteurs
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "Victor Hugo"
}
```

### Récupérer tous les livres avec pagination

```bash
GET /api/v1/livres?page=1&limit=10&sort=-datePublication
```

### Créer un livre

```bash
POST /api/v1/livres
Authorization: Bearer <token>
Content-Type: application/json

{
  "titre": "Les Misérables",
  "auteur": "<id_auteur>",
  "genre": "Fiction",
  "nombrePages": 1500
}
```

## 🛠️ Scripts disponibles

- `npm start` - Démarre l'application en mode production
- `npm run dev` - Démarre l'application en mode développement (avec nodemon)
- `npm run build` - Compile le code TypeScript en JavaScript
- `npm test` - Lance les tests
- `npm run test:watch` - Lance les tests en mode watch

## 🔒 Sécurité

- **Helmet** : Ajoute des en-têtes HTTP de sécurité
- **CORS** : Gère les requêtes Cross-Origin
- **Rate Limiting** : Limite le nombre de requêtes par IP
- **JWT** : Authentification sécurisée
- **Validation** : Validation des données avec Joi

## 📦 Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Langage de programmation typé
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Joi** - Validation de schémas
- **JWT** - Authentification
- **Helmet** - Sécurité HTTP
- **CORS** - Gestion CORS
- **Express Rate Limit** - Limitation de débit

## 📄 Licence

ISC

## 👤 Auteur

Développé dans le cadre d'un TP sur la conception d'une API RESTful.

