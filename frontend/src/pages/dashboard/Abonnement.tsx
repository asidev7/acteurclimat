import React, { useState, useEffect } from 'react';
import {
  getUserSubscriptions,
  getSubscriptionPlans,
  createSubscription,
  cancelSubscription,
  changeSubscriptionPlan,
  renewSubscription
} from '../../services/manageSubscribe';

// Define interfaces based on the existing service
interface Subscription {
  id: number;
  user: number;
  plan: number;
  status: string;
  start_date: string;
  end_date: string;
}

interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  duration_in_days: number;
  features: Record<string, any>;
}

const SubscriptionPage: React.FC = () => {
  // State management
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  // Fetch subscription data on component mount
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        // Fetch subscription plans
        const plans = await getSubscriptionPlans();
        setSubscriptionPlans(plans);

        // Fetch user's current subscriptions
        const subscriptions = await getUserSubscriptions();
        setUserSubscriptions(subscriptions);

        setLoading(false);
      } catch (err) {
        setError('Impossible de charger les données d\'abonnement');
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  // Handler for creating a new subscription
  const handleCreateSubscription = async (planId: number) => {
    try {
      setLoading(true);
      const newSubscription = await createSubscription(planId);
      setUserSubscriptions([...userSubscriptions, newSubscription]);
      setLoading(false);
    } catch (err) {
      setError('Échec de la création de l\'abonnement');
      setLoading(false);
    }
  };

  // Handler for canceling a subscription
  const handleCancelSubscription = async (subscriptionId: number) => {
    try {
      setLoading(true);
      await cancelSubscription(subscriptionId);
      setUserSubscriptions(
        userSubscriptions.filter(sub => sub.id !== subscriptionId)
      );
      setLoading(false);
    } catch (err) {
      setError('Impossible d\'annuler l\'abonnement');
      setLoading(false);
    }
  };

  // Handler for changing subscription plan
  const handleChangePlan = async (subscriptionId: number, newPlanId: number) => {
    try {
      setLoading(true);
      const updatedSubscription = await changeSubscriptionPlan(subscriptionId, newPlanId);
      setUserSubscriptions(
        userSubscriptions.map(sub => 
          sub.id === subscriptionId ? updatedSubscription : sub
        )
      );
      setLoading(false);
    } catch (err) {
      setError('Impossible de changer de plan');
      setLoading(false);
    }
  };

  // Handler for renewing a subscription
  const handleRenewSubscription = async (subscriptionId: number) => {
    try {
      setLoading(true);
      const renewedSubscription = await renewSubscription(subscriptionId);
      setUserSubscriptions(
        userSubscriptions.map(sub => 
          sub.id === subscriptionId ? renewedSubscription : sub
        )
      );
      setLoading(false);
    } catch (err) {
      setError('Impossible de renouveler l\'abonnement');
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return <div>Chargement des abonnements...</div>;
  }

  // Render error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="subscription-page">
      <h1>Mes Abonnements</h1>

      {/* Subscription Plans Section */}
      <section className="subscription-plans">
        <h2>Plans Disponibles</h2>
        <div className="plans-container">
          {subscriptionPlans.map(plan => (
            <div key={plan.id} className="plan-card">
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <p>Prix: {plan.price} XOF</p>
              <p>Durée: {plan.duration_in_days} jours</p>
              <ul>
                {Object.entries(plan.features).map(([feature, value]) => (
                  <li key={feature}>
                    {feature}: {value}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleCreateSubscription(plan.id)}
                disabled={loading}
              >
                Souscrire
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Current Subscriptions Section */}
      <section className="current-subscriptions">
        <h2>Mes Abonnements Actuels</h2>
        {userSubscriptions.length === 0 ? (
          <p>Vous n'avez pas d'abonnements actifs.</p>
        ) : (
          <div className="subscriptions-container">
            {userSubscriptions.map(subscription => (
              <div key={subscription.id} className="subscription-card">
                <h3>Plan #{subscription.plan}</h3>
                <p>Statut: {subscription.status}</p>
                <p>Date de début: {new Date(subscription.start_date).toLocaleDateString()}</p>
                <p>Date de fin: {new Date(subscription.end_date).toLocaleDateString()}</p>
                <div className="subscription-actions">
                  <button 
                    onClick={() => handleRenewSubscription(subscription.id)}
                    disabled={loading}
                  >
                    Renouveler
                  </button>
                  <button 
                    onClick={() => handleCancelSubscription(subscription.id)}
                    disabled={loading}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SubscriptionPage;