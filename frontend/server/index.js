require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { FedaPay, Transaction, Customer } = require('fedapay');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour gérer JSON et CORS
app.use(cors());
app.use(bodyParser.json());

// Configuration de FedaPay
FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);
FedaPay.setEnvironment(process.env.FEDAPAY_ENV || 'sandbox');

// Route pour initier un paiement
app.post('/pay', async (req, res) => {
    try {
        const { firstname, lastname, email, phone, amount } = req.body;

        if (!firstname || !lastname || !email || !phone || !amount) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }

        // Vérifier si le client existe déjà
        let customer;
        const customers = await Customer.all({ email });
        if (customers.length > 0) {
            customer = customers[0];
        } else {
            // Création du client
            customer = await Customer.create({
                firstname,
                lastname,
                email,
                phone_number: {
                    number: phone,
                    country: "BJ"
                }
            });
        }

        // Création de la transaction
        const transaction = await Transaction.create({
            description: 'Dépôt via MTN',
            amount: parseInt(amount, 10), // Convertir en nombre entier
            currency: { iso: 'XOF' },
            callback_url: 'https://example.com/callback',
            mode: 'mtn_open',
            customer: { id: customer.id }
        });

        // Génération du token et envoi de l'URL au frontend
        const token = await transaction.generateToken();
        res.json({ payment_url: token.url }); 

    } catch (error) {
        console.error("Erreur de paiement :", error);
        res.status(500).json({ error: error.message || "Échec de la transaction" });
    }
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
