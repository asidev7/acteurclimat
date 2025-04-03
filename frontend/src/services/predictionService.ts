// fichier: src/services/predictionService.ts
import axios from 'axios';
import api from './api';

// Configuration de DeepSeek API
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/completions';
const DEEPSEEK_API_KEY = 'sk-277a49b6c64d4407b5c5b786694e7556'; // Remplacez par votre clé API

// Types
interface TeamData {
  team_name: string;
  team_id: string;
  recent_form: any[];
  standings: any;
  top_scorers: any[];
}

interface MatchPrediction {
  match_id: string;
  home_team: string;
  away_team: string;
  predicted_winner: string | null;
  win_probabilities: {
    home: number;
    draw: number;
    away: number;
  };
  predicted_score: {
    home: number;
    away: number;
  };
  confidence_level: number; // 0-100%
  key_factors: string[];
  detailed_analysis: string;
}

// Service de prédiction
export class PredictionService {
  
  // Collecter toutes les données pertinentes pour l'analyse
  private async collectMatchData(matchId: string): Promise<any> {
    try {
      // Obtenir les informations du match
      const matchDetails = await api.getMatchEvents(matchId);
      if (!matchDetails || matchDetails.error) {
        throw new Error('Impossible de récupérer les détails du match');
      }
      
      const match = Array.isArray(matchDetails) ? matchDetails[0] : matchDetails;
      
      // Extraire les IDs d'équipe
      const homeTeamId = match.match_hometeam_id;
      const awayTeamId = match.match_awayteam_id;
      
      // Récupérer les statistiques des équipes
      const homeTeamInfo = await this.getTeamAnalysis(homeTeamId);
      const awayTeamInfo = await this.getTeamAnalysis(awayTeamId);
      
      // Récupérer l'historique des confrontations directes
      const h2h = await api.getH2H(match.match_hometeam_name, match.match_awayteam_name);
      
      // Récupérer les statistiques de la ligue
      const leagueStats = await api.getStandings(match.league_id);
      
      return {
        match,
        homeTeam: homeTeamInfo,
        awayTeam: awayTeamInfo,
        h2h,
        leagueStats
      };
    } catch (error) {
      console.error('Erreur lors de la collecte des données du match:', error);
      throw error;
    }
  }
  
  // Analyser une équipe spécifique
  private async getTeamAnalysis(teamId: string): Promise<TeamData> {
    try {
      // Récupérer les informations de l'équipe
      const teamInfo = await api.getTeamInfo(teamId);
      if (!teamInfo || teamInfo.error) {
        throw new Error(`Impossible de récupérer les informations de l'équipe ${teamId}`);
      }
      
      const team = Array.isArray(teamInfo) ? teamInfo[0] : teamInfo;
      
      // Récupérer les 5 derniers matchs de l'équipe
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      
      const fromDate = threeMonthsAgo.toISOString().split('T')[0];
      const toDate = today.toISOString().split('T')[0];
      
      // On utilise un endpoint générique pour obtenir les matchs récents
      const recentMatches = await api.getMatches('', fromDate, toDate);
      
      // Filtrer pour ne garder que les matchs de cette équipe
      const teamMatches = Array.isArray(recentMatches) 
        ? recentMatches.filter(m => 
            m.match_hometeam_id === teamId || m.match_awayteam_id === teamId)
        : [];
      
      // Récupérer les joueurs de l'équipe
      const players = await api.getPlayers(teamId);
      
      return {
        team_name: team.team_name,
        team_id: teamId,
        recent_form: teamMatches.slice(0, 5), // 5 derniers matchs
        standings: null, // Sera rempli plus tard avec les données de classement
        top_scorers: Array.isArray(players) 
          ? players.sort((a, b) => (b.player_goals || 0) - (a.player_goals || 0)).slice(0, 3)
          : []
      };
    } catch (error) {
      console.error(`Erreur lors de l'analyse de l'équipe ${teamId}:`, error);
      throw error;
    }
  }
  
  // Envoyer les données à DeepSeek pour analyse et prédiction
  private async getAIPrediction(matchData: any): Promise<MatchPrediction> {
    try {
      // Préparer les données pour l'IA
      const prompt = this.preparePromptForAI(matchData);
      
      // Appeler l'API DeepSeek
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: "deepseek-chat",
          prompt: prompt,
          max_tokens: 1000,
          temperature: 0.3
        },
        {
          headers: {
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Traiter la réponse de l'IA
      if (response.data && response.data.choices && response.data.choices[0].text) {
        return this.parseAIResponse(response.data.choices[0].text, matchData);
      } else {
        throw new Error('Format de réponse DeepSeek invalide');
      }
    } catch (error) {
      console.error('Erreur lors de la prédiction avec DeepSeek:', error);
      throw error;
    }
  }
  
  // Préparer le prompt pour l'IA
  private preparePromptForAI(matchData: any): string {
    const { match, homeTeam, awayTeam, h2h, leagueStats } = matchData;
    
    // Extraire les données pertinentes pour une analyse complète
    const homeTeamForm = homeTeam.recent_form.map(m => {
      const isHome = m.match_hometeam_id === homeTeam.team_id;
      const teamScore = isHome ? m.match_hometeam_score : m.match_awayteam_score;
      const opponentScore = isHome ? m.match_awayteam_score : m.match_hometeam_score;
      return `${isHome ? 'Domicile' : 'Extérieur'}: ${teamScore}-${opponentScore} vs ${isHome ? m.match_awayteam_name : m.match_hometeam_name}`;
    }).join('\n');
    
    const awayTeamForm = awayTeam.recent_form.map(m => {
      const isHome = m.match_hometeam_id === awayTeam.team_id;
      const teamScore = isHome ? m.match_hometeam_score : m.match_awayteam_score;
      const opponentScore = isHome ? m.match_awayteam_score : m.match_hometeam_score;
      return `${isHome ? 'Domicile' : 'Extérieur'}: ${teamScore}-${opponentScore} vs ${isHome ? m.match_awayteam_name : m.match_hometeam_name}`;
    }).join('\n');
    
    // Extraire les confrontations directes récentes
    const h2hMatches = Array.isArray(h2h) 
      ? h2h.map(m => `${m.match_hometeam_name} ${m.match_hometeam_score}-${m.match_awayteam_score} ${m.match_awayteam_name}`).join('\n')
      : 'Pas de confrontations directes récentes';
    
    // Construire le prompt
    return `
      Analyse le match suivant et fais une prédiction détaillée:
      
      Match: ${match.match_hometeam_name} vs ${match.match_awayteam_name}
      Date: ${match.match_date}
      Ligue: ${match.league_name}
      
      Équipe à domicile (${homeTeam.team_name}):
      - 5 derniers matchs:
      ${homeTeamForm}
      
      Équipe à l'extérieur (${awayTeam.team_name}):
      - 5 derniers matchs:
      ${awayTeamForm}
      
      Confrontations directes récentes:
      ${h2hMatches}
      
      Réponds au format JSON avec les champs suivants:
      {
        "predicted_winner": "nom_équipe ou null pour match nul",
        "win_probabilities": {
          "home": pourcentage (0-100),
          "draw": pourcentage (0-100),
          "away": pourcentage (0-100)
        },
        "predicted_score": {
          "home": nombre_buts,
          "away": nombre_buts
        },
        "confidence_level": pourcentage (0-100),
        "key_factors": ["facteur1", "facteur2", "facteur3"],
        "detailed_analysis": "analyse détaillée en 3-5 phrases"
      }
    `;
  }
  
  // Parser la réponse de l'IA en un objet structuré
  private parseAIResponse(aiResponse: string, matchData: any): MatchPrediction {
    try {
      // Extraire le JSON de la réponse
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Impossible d'extraire le JSON de la réponse DeepSeek");
      }
      
      const predictionData = JSON.parse(jsonMatch[0]);
      const { match } = matchData;
      
      // Créer l'objet de prédiction
      return {
        match_id: match.match_id,
        home_team: match.match_hometeam_name,
        away_team: match.match_awayteam_name,
        predicted_winner: predictionData.predicted_winner,
        win_probabilities: predictionData.win_probabilities,
        predicted_score: predictionData.predicted_score,
        confidence_level: predictionData.confidence_level,
        key_factors: predictionData.key_factors,
        detailed_analysis: predictionData.detailed_analysis
      };
    } catch (error) {
      console.error('Erreur lors du parsing de la réponse DeepSeek:', error);
      throw error;
    }
  }
  
  // Méthode publique pour obtenir une prédiction
  public async predictMatch(matchId: string): Promise<MatchPrediction> {
    try {
      // Collecter les données
      const matchData = await this.collectMatchData(matchId);
      
      // Obtenir la prédiction
      return await this.getAIPrediction(matchData);
    } catch (error) {
      console.error('Erreur lors de la prédiction du match:', error);
      throw error;
    }
  }
  
  // Méthode pour prédire plusieurs matchs d'une ligue sur une période donnée
  public async predictLeagueMatches(leagueId: string, fromDate: string, toDate: string): Promise<MatchPrediction[]> {
    try {
      // Récupérer tous les matchs de la ligue sur la période
      const matches = await api.getMatches(leagueId, fromDate, toDate);
      
      if (!matches || matches.error) {
        throw new Error(`Impossible de récupérer les matchs pour la ligue ${leagueId}`);
      }
      
      // Filtrer les matchs à venir (non joués)
      const upcomingMatches = Array.isArray(matches) 
        ? matches.filter(m => m.match_status === '' || m.match_status === 'NS')
        : [];
      
      // Prédire chaque match
      const predictions = [];
      for (const match of upcomingMatches) {
        try {
          const prediction = await this.predictMatch(match.match_id);
          predictions.push(prediction);
        } catch (error) {
          console.error(`Erreur lors de la prédiction du match ${match.match_id}:`, error);
          // Continuer avec le match suivant
        }
      }
      
      return predictions;
    } catch (error) {
      console.error('Erreur lors de la prédiction des matchs de la ligue:', error);
      throw error;
    }
  }
}

export default new PredictionService();