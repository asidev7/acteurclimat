import OpenAI from "openai";
import FootballAPI from "./api";

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: 'sk-1b764a6b5d004bcab6bf60492f7cfe94', // Remplacez par votre clé API
  dangerouslyAllowBrowser: true,
});

// Interface pour les prédictions
interface MatchPrediction {
  prediction: string;
  confidence: number;
  recommended_bet?: string;
  score_prediction?: string;
  reasoning: string;
}

// Fonction de prédiction améliorée
export const predictMatch = async (
  matchId: string,
  detailedAnalysis: boolean = false
): Promise<MatchPrediction | null> => {
  try {
    // Récupérer les données du match
    const fixtures = await FootballAPI.getFixtures({ matchId });
    
    // Vérifier si le match existe
    if (!fixtures || fixtures.length === 0) {
      throw new Error("Match non trouvé");
    }
    
    const fixture = fixtures[0];
    
    // Récupérer les statistiques H2H
    const h2h = await FootballAPI.getH2H(
      fixture.home_team_key,
      fixture.away_team_key
    );

    // Récupérer les statistiques supplémentaires
    const [standings, homeForm, awayForm] = await Promise.all([
      FootballAPI.getStandings(fixture.league_key),
      FootballAPI.getFixtures({
        teamId: fixture.home_team_key,
        from: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]
      }),
      FootballAPI.getFixtures({
        teamId: fixture.away_team_key,
        from: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]
      })
    ]);

    // Construction du prompt
    const prompt = `En tant qu'expert en football avec accès à:
1. Dernières rencontres directes: ${h2h?.H2H?.length || 0} matches
2. Classement actuel: ${standings?.total?.[0]?.league_name || 'N/A'}
3. Forme des équipes (5 derniers matches):
   - Domicile (${fixture.event_home_team}): ${homeForm.slice(0, 5).map(m => m.event_final_result).join(', ')}
   - Extérieur (${fixture.event_away_team}): ${awayForm.slice(0, 5).map(m => m.event_final_result).join(', ')}
4. Match à analyser: ${fixture.event_home_team} vs ${fixture.event_away_team}, ${fixture.league_name}

Analyse détaillée demandée: ${detailedAnalysis ? 'Oui' : 'Non'}

Fournis une prédiction au format JSON avec:
- prediction (résultat probable: "Victoire domicile", "Match nul" ou "Victoire extérieur")
- confidence (0-100)
- score_prediction plausible
- recommended_bet (1X2/GG/Over 2.5/etc)
- reasoning (en français)`;

    // Appel à l'API DeepSeek
    const completion = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "Tu es un analyste footballistique expert avec 20 ans d'expérience. Tes prédictions sont utilisées par des bookmakers professionnels."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    // Correction: vérifier si content existe avant de le parser
    if (completion.choices[0].message.content) {
      return JSON.parse(completion.choices[0].message.content);
    } else {
      console.error("No content returned from API");
      return null;
    }
  } catch (error) {
    console.error("Erreur de prédiction:", error);
    return null;
  }
};

// Exporter les fonctions
const EnhancedFootballAPI = {
  ...FootballAPI,
  predictMatch
};

export default EnhancedFootballAPI;