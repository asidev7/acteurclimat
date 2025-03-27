// services/GetSubscription.ts
export async function getSubscriptionPlans() {
  try {
    const response = await fetch('http://127.0.0.1:8000/subscription-plans/');
    if (!response.ok) {
      throw new Error('Failed to fetch subscription plans');
    }
    const plans = await response.json();

    return plans.map((plan: any) => ({
      name: plan.name,
      price: plan.price,
      features: plan.features,
      description: plan.description,
      buttonColor: mapButtonColor(plan.name),
      popular: plan.name.includes("Standard")
    }));
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    return [];
  }
}

// Mapper les couleurs des boutons
function mapButtonColor(planName: string) {
  switch (planName) {
    case "Plan Basique":
      return "bg-blue-600 hover:bg-blue-700";
    case "Plan Standard":
      return "bg-indigo-600 hover:bg-indigo-700";
    case "Plan VIP":
      return "bg-purple-600 hover:bg-purple-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
}
