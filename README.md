# 🌍 ActeurClimat

**ActeurClimat** est une plateforme dédiée à la **soumission de projets climatiques** et à la **collecte de fonds** pour soutenir des initiatives en faveur de l'environnement et du développement durable. Elle permet aux porteurs de projets de présenter leurs idées et aux donateurs de contribuer à un avenir plus vert.

> Repo GitHub : [https://github.com/asidev7/acteurclimat](https://github.com/asidev7/acteurclimat)

## 🎯 Objectifs

- Faciliter la soumission de projets liés au climat
- Mettre en relation porteurs de projets et bailleurs de fonds
- Promouvoir les initiatives écologiques locales et internationales
- Assurer une gestion transparente des dons et des projets financés

## ⚙️ Fonctionnalités principales

- ✍️ Soumission de projets avec formulaire détaillé
- 💳 Collecte de dons sécurisée
- 📁 Espace admin pour validation et gestion des projets
- 👥 Tableau de bord pour porteurs et contributeurs
- 📢 Système de notification et de suivi des projets

## 🛠️ Stack technique

- **Backend** : Django / Django REST Framework
- **Frontend** : HTML, CSS, JS (ou framework de ton choix)
- **Base de données** : PostgreSQL / SQLite
- **Paiement** : Intégration possible avec Stripe / PayPal
- **Hébergement** : Heroku / Render / Railway / autre

## 🚀 Installation locale

### Prérequis

- Python 3.8+
- Git
- pip / pipenv / poetry

### Étapes

```bash
# Cloner le projet
git clone https://github.com/asidev7/acteurclimat.git
cd acteurclimat

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Installer les dépendances
pip install -r requirements.txt

# Appliquer les migrations
python manage.py migrate

# Lancer le serveur
python manage.py runserver
```

## 📦 Structure du projet

```
acteurclimat/
│
├── manage.py
├── requirements.txt
├── README.md
├── apps/                # Applications Django (soumission, dons, comptes...)
├── templates/           # Templates HTML
├── static/              # Fichiers CSS/JS
└── ...
```

## 🧪 Tests

```bash
python manage.py test
```

## 🤝 Contribution

Les contributions sont les bienvenues !  
Pour contribuer :

1. Fork ce repo
2. Crée ta branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit (`git commit -am 'Ajout d’une fonctionnalité'`)
4. Push (`git push origin feature/ma-fonctionnalite`)
5. Ouvre une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Consulte le fichier [LICENSE](LICENSE) pour plus d'informations.

## 🙌 Remerciements

Merci à toutes les personnes qui participent à ce projet pour un monde plus respectueux du climat 🌱

---

**Agis maintenant pour la planète, deviens un acteur du climat.**
```
