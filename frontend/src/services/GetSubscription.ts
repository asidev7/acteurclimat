export async function getSubscriptionPlans() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/subscription-plans/');
    if (!response.ok) {
      throw new Error('Failed to fetch subscription plans');
    }
    const plans = await response.json();
    
    return plans.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      plan_type: plan.plan_type,
      price: plan.price,
      duration_days: plan.duration_days,
      description: plan.description,
      features: plan.features,
      buttonColor: mapButtonColor(plan.plan_type),
      popular: plan.plan_type === "premium", // Marquer le plan "Premium" comme populaire
    }));
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    return [];
  }
}

// Mapper les couleurs des boutons basé sur les plan_types définis dans models.py
function mapButtonColor(planType: string) {
  switch (planType) {
    case "basic":
      return "bg-blue-600 hover:bg-blue-700";  // Plan Basic
    case "premium":
      return "bg-indigo-600 hover:bg-indigo-700";  // Plan Premium
    case "vip":
      return "bg-purple-600 hover:bg-purple-700";  // Plan VIP
    default:
      return "bg-gray-600 hover:bg-gray-700";  // Valeur par défaut
  }
}