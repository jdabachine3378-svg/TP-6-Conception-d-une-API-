# Instructions de Configuration

## Étape 1 : Créer le fichier .env

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bibliotheque
NODE_ENV=development
JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi_en_production
```

**Important** : Remplacez `votre_secret_jwt_tres_securise_changez_moi_en_production` par une clé secrète forte et unique.

## Étape 2 : Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

## Étape 3 : Démarrer MongoDB

Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine.

- **Windows** : Démarrez le service MongoDB
- **Linux/Mac** : Exécutez `mongod` dans un terminal

Ou utilisez MongoDB Atlas (cloud) et mettez à jour `MONGODB_URI` dans le fichier `.env`.

## Étape 4 : Compiler le projet

```bash
npm run build
```

## Étape 5 : Lancer l'application

### Mode développement (avec rechargement automatique)
```bash
npm run dev
```

### Mode production
```bash
npm start
```

L'API sera accessible sur `http://localhost:3000`

## Étape 6 : Tester l'API

### Test de la route racine
```bash
curl http://localhost:3000/
```

### Créer un utilisateur
```bash
curl -X POST http://localhost:3000/api/v1/utilisateurs \
  -H "Content-Type: application/json" \
  -d '{
    "nomUtilisateur": "testuser",
    "email": "test@example.com",
    "motDePasse": "password123"
  }'
```

### Se connecter (obtenir un token)
```bash
curl -X POST http://localhost:3000/api/v1/utilisateurs/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "motDePasse": "password123"
  }'
```

### Créer un auteur (avec authentification)
```bash
curl -X POST http://localhost:3000/api/v1/auteurs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <votre_token>" \
  -d '{
    "nom": "Victor Hugo"
  }'
```

## Notes

- Le fichier `.env` ne doit **jamais** être commité dans Git (il est déjà dans `.gitignore`)
- En production, utilisez une clé JWT_SECRET forte et unique
- Assurez-vous que MongoDB est accessible avant de lancer l'application

