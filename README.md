# Portfolio - Tristan Valcke

## Structure du projet

```
├── index.html                    # Page d'accueil
├── assets/                       # Ressources du site
│   ├── css/                      # Fichiers CSS modulaires
│   │   ├── main.css             # Fichier CSS principal (importe tous les autres)
│   │   ├── variables.css        # Variables CSS globales
│   │   ├── base.css             # Styles de base et conteneurs
│   │   ├── header.css           # Styles du header et navigation
│   │   ├── buttons.css          # Styles des boutons
│   │   ├── hero.css             # Styles de la section hero
│   │   ├── cards.css            # Styles des cartes de projets
│   │   ├── components.css       # Composants (timeline, listes, formulaires)
│   │   ├── footer.css           # Styles du footer
│   │   ├── animations.css       # Animations et transitions
│   │   ├── responsive.css       # Styles responsive
│   │   ├── heures.css           # Styles spécifiques à la page heures
│   │   └── preuves.css          # Styles pour les pages de preuves
│   ├── js/
│   │   └── main.js              # JavaScript principal
│   └── images/                  # Images du site
│       └── heures/              # Images des activités heures
└── pages/                       # Pages organisées par catégorie
    ├── about/                   # Pages relatives au profil
    │   └── cv.html              # Page CV
    ├── projects/                # Pages des projets
    │   ├── projet-1.html        # Page projet 1
    │   ├── projet-2.html        # Page projet 2
    │   └── projet-3.html        # Page projet 3
    └── heures/                  # Pages des heures externes
        ├── heures.html          # Page principale des heures
        └── preuves/             # Pages de preuves détaillées
            ├── preuve-template.html              # Template réutilisable
            ├── preuve-proximus-basecamp.html     # Preuve Proximus
            └── preuve-hackathon-ephec-2024.html  # Preuve Hackathon
```

## Avantages de cette structure

### **Organisation claire**
- Séparation logique des fichiers par type et fonction
- Structure scalable pour l'ajout de nouvelles fonctionnalités

### **CSS modulaire**
- Chaque fichier CSS a une responsabilité spécifique
- Facilite la maintenance et les modifications
- Évite les conflits entre les styles

### **Maintenance simplifiée**
- Modifications localisées dans des fichiers spécifiques
- Code plus lisible et organisé
- Réutilisabilité des composants

### **Performance**
- Possibilité d'optimiser le chargement CSS selon les besoins
- Structure prête pour l'optimisation en production

## Utilisation

### Pour ajouter une nouvelle page :
1. Créer le fichier HTML dans le dossier approprié (`pages/about/`, `pages/projects/`, `pages/heures/`)
2. Importer les CSS avec le bon chemin relatif
3. Ajouter les styles spécifiques si nécessaire

### Pour ajouter une nouvelle preuve :
1. Copier le template `pages/heures/preuves/preuve-template.html`
2. Remplacer tous les placeholders `[NOM]` par les vraies informations
3. Ajouter les images dans `assets/images/heures/[dossier]/`
4. Mettre à jour le lien dans `pages/heures/heures.html`

### Pour modifier les styles :
- **Variables** → `assets/css/variables.css`
- **Styles généraux** → `assets/css/base.css`
- **Header/Navigation** → `assets/css/header.css`
- **Boutons** → `assets/css/buttons.css`
- **Cartes de projets** → `assets/css/cards.css`
- **Page spécifique** → créer un nouveau fichier CSS

### Pour ajouter des images :
- Placer les images dans `assets/images/`
- Référencer avec le chemin relatif approprié

## Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modulaires avec variables CSS
- **JavaScript** - Interactions et animations
- **Design responsive** - Compatible mobile/ordi 

--> README écrit par chatGPT ;)
