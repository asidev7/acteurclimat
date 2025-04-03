# Exemples d'intégration PayDunya pour le Bénin

Ce document fournit des exemples détaillés d'intégration des services de paiement PayDunya pour le Bénin.

## Flux de paiement

1. Création d'une facture pour obtenir un token
2. Utilisation de ce token pour initier le paiement via le moyen choisi (MTN ou Moov)

## 1. Créer une facture (étape commune)

```python
import requests

url = "http://localhost:8000/v1/invoice/create"
data = {
    "total_amount": 5000,
    "description": "Achat en ligne",
    "store_name": "Ma Boutique",
    "callback_url": "https://mon-site.com/webhook"  # Pour les notifications IPN
}

response = requests.post(url, json=data)
print(response.json())

# Exemple de réponse:
# {
#    "response_code": "00",
#    "response_text": "https://app.paydunya.com/checkout/invoice/ERtyuILouhhRHICF0HboN",
#    "description": "Checkout Invoice Created",
#    "token": "ERtyuILouhhRHICF0HboN"
# }

token = response.json()["token"]
```

## 2. Paiement via MTN Bénin

```python
url = "http://localhost:8000/v1/payment/benin/mtn"
data = {
    "mtn_benin_customer_fullname": "John Doe",
    "mtn_benin_email": "john@example.com",
    "mtn_benin_phone_number": "66414231",
    "mtn_benin_wallet_provider": "MTNBENIN",  # Valeur par défaut, peut être omis
    "payment_token": token
}

response = requests.post(url, json=data)
print(response.json())

# Exemple de réponse réussie:
# {
#   "success": true,
#   "message": "Votre paiement est en cours de traitement. Merci de valider le paiement après reception de sms pour le compléter",
#   "fees": 100,
#   "currency": "XOF"
# }
```

## 3. Paiement via Moov Bénin

```python
url = "http://localhost:8000/v1/payment/benin/moov"
data = {
    "moov_benin_customer_fullname": "Marie Dupont",
    "moov_benin_email": "marie@example.com",
    "moov_benin_phone_number": "0140253725",
    "payment_token": token
}

response = requests.post(url, json=data)
print(response.json())

# Exemple de réponse réussie:
# {
#   "success": true,
#   "message": "Success message",
#   "fees": 100,
#   "currency": "XOF"
# }
```

## 4. Gestion des réponses

### Réponse réussie (pour les deux méthodes)

- `success`: true
- `message`: Message de confirmation
- `fees`: Frais (si c'est le payeur qui les supporte)
- `currency`: Devise des frais

### Réponse en cas d'échec

```json
{
  "success": false,
  "message": "Message d'erreur spécifique",
  "errors": {
    "message": "Description de l'erreur",
    "description": "Explication détaillée"
  }
}
```

## 5. Implémentation côté client

Pour MTN Bénin, une fois la demande soumise:
1. Le client reçoit un SMS de demande de confirmation
2. Le client doit confirmer le paiement sur son téléphone
3. Une fois confirmé, votre application est notifiée via le webhook (IPN)

Pour Moov Bénin, le processus est similaire, avec quelques spécificités:
1. Le client reçoit un SMS pour autoriser le paiement
2. Le client doit entrer son code PIN pour confirmer
3. Une notification est envoyée à votre application via le webhook

## 6. Vérification du statut d'un paiement

Si vous avez besoin de vérifier le statut d'un paiement manuellement (en plus des notifications webhook), vous pouvez implémenter un endpoint supplémentaire dans votre application pour interroger l'API PayDunya avec le token de la transaction.