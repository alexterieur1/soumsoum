const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: 'sandbox', // Utilisez "live" pour un environnement de production
    client_id: 'Ae7Ncikmzv1zaXolykUCsDMSSnu5J5CavM9djOBzqYy23lM_GVgd5W-4Mq3g8K5_VW1dJ7NgZrvrps7k',
    client_secret: 'ENou9pw-Rij3YT1pwOduiWPlN6_PNh2P_INS5Aia8qChJBzntsja6nkh7zQhvGYQwTjOSZR2ASZqlQLy',
  });
  exports.createPayment = (req, res) => {
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000/erreur404',
      },
      transactions: [
        {
          amount: {
            total: '100.00',
            currency: 'EUR',
          },
          description: 'paiement du site',
        },
      ],
    };
  
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        console.error(error);
        // Gérer les erreurs
        return res.sendStatus(500);
      } else {
        // Récupérer l'URL de redirection vers PayPal
        const redirectUrl = payment.links.find(link => link.rel === 'approval_url').href;
        // Rediriger l'utilisateur vers l'URL de redirection
        res.redirect(redirectUrl);
      }
    });
  };