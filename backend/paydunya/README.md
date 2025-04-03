# PayDunya API Wrapper

API wrapper FastAPI pour faciliter l'intégration des services de paiement PayDunya dans tous les pays supportés.

## Fonctionnalités

- Création de factures (invoices)
- Support pour tous les moyens de paiement PayDunya:
  - **Sénégal**: Orange Money, Free Money, Expresso, Wave, Wizall
  - **Côte d'Ivoire**: Orange Money, MTN Money, Moov, Wave
  - **Burkina Faso**: Orange Money, Moov
  - **Bénin**: Moov, MTN Money
  - **Togo**: T-Money, Moov
  - **Mali**: Orange Money, Moov
  - **International**: Carte Bancaire, PayDunya Wallet
- Architecture modulaire et extensible
- API RESTful avec validation des données via Pydantic
- Documentation interactive avec Swagger UI

## Structure du projet

```
paydunya-api-collect/
├── app/
│   ├── api/
│   │   └── v1/              # Endpoints API (routes)
│   │       ├── senegal.py   # Routes pour le Sénégal
│   │       ├── cote_divoire.py
│   │       ├── ...
│   ├── config/              # Configuration de l'application
│   ├── core/                # Composants principaux
│   │   └── api_client.py    # Client API PayDunya
│   ├── models/              # Modèles de données (Pydantic)
│   │   ├── base.py          # Modèles de base
│   │   ├── senegal.py       # Modèles pour le Sénégal
│   │   ├── ...
│   ├── services/            # Services métier
│   │   ├── invoice_service.py
│   │   └── payment_service.py
│   └── utils/               # Utilitaires
├── main.py                  # Point d'entrée de l'application
├── requirements.txt         # Dépendances
└── .env.example             # Exemple de configuration
```

## Installation

1. Cloner le dépôt:
```bash
git clone https://github.com/votre-utilisateur/paydunya-api-collect.git
cd paydunya-api-collect
```

2. Créer un environnement virtuel:
```bash
python -m venv venv
venv\Scripts\activate  # Sur Windows: venv\Scripts\activate
```

3. Installer les dépendances:
```bash
pip install -r requirements.txt
```

4. Configurer les variables d'environnement:
```bash
cp .env.example .env
# Modifier le fichier .env avec vos clés PayDunya
```

## Utilisation

1. Démarrer le serveur:
```bash
uvicorn main:app --reload
```

2. Accéder à la documentation interactive:
```
http://localhost:8000/docs
```

3. Liste des moyens de paiement disponibles:
```
http://localhost:8000/v1/payment-methods
```

## Exemples d'utilisation

### Créer une facture

```python
import requests

url = "http://localhost:8000/v1/invoice/create"
data = {
    "total_amount": 5000,
    "description": "Chaussure VANS dernier modèle",
    "store_name": "Magasin le Choco",
    "items": {
        "item_0": {
            "name": "Chaussures Croco",
            "quantity": 3,
            "unit_price": "10000",
            "total_price": "30000",
            "description": "Chaussures faites en peau de crocrodile"
        }
    }
}

response = requests.post(url, json=data)
print(response.json())
```

### Paiement via Orange Money Sénégal (QR Code)

```python
import requests
.
url = "http://localhost:8000/v1/payment/senegal/orange-money"
data = {
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "phone_number": "778676477",
    "invoice_token": "GS46gkCAnRv3WfRwFdJU",
    "api_type": "QRCODE"
}

response = requests.post(url, json=data)
print(response.json())
```

### Paiement via MTN Côte d'Ivoire

```python
import requests

url = "http://localhost:8000/v1/payment/cote-divoire/mtn"
data = {
    "mtn_ci_customer_fullname": "John Doe",
    "mtn_ci_email": "john@example.com",
    "mtn_ci_phone_number": "664142312",
    "payment_token": "OnW1IkMIQDTiJnQ9S3Ix"
}

response = requests.post(url, json=data)
print(response.json())
```

### Extension

Pour ajouter un nouveau moyen de paiement:

1. Ajouter un nouveau modèle dans le dossier `app/models/`
2. Créer une nouvelle route dans le dossier `app/api/v1/`
3. Mettre à jour la liste des moyens de paiement dans `app/api/v1/info.py`

## Contribuer

1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter vos changements (`git commit -am 'Ajouter une nouvelle fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## License

MIT