import axios from "axios";

// Définition de l'URL de base et de la clé API
const BASE_URL = "https://apiv2.allsportsapi.com/football";
const API_KEY = "ae9e70e2497a1b07d2a8bf9da380625bbb863b266fcc5d8e9248c823614bd7f6";

// Interface pour le type de données retournées
interface Country {
  country_id: string;
  country_name: string;
  country_logo?: string;
}

// Fonction pour récupérer la liste des pays
export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/?met=Countries&APIkey=${API_KEY}`);
    return response.data.result || []; // Retourne la liste des pays ou un tableau vide
  } catch (error) {
    console.error("Erreur lors de la récupération des pays :", error);
    return [];
  }
};

// Interface pour les ligues
interface League {
  league_key: string;
  league_name: string;
  country_key: string;
  country_name: string;
  league_logo?: string;
  country_logo?: string;
}

// Fonction pour récupérer la liste des ligues
export const getLeagues = async (): Promise<League[]> => {
  try {
    const params = new URLSearchParams({
      met: "Leagues",
      APIkey: API_KEY
    });
    
    // Nous ne filtrons plus par pays - toujours retourner toutes les ligues
    const response = await axios.get(`${BASE_URL}/?${params.toString()}`);
    return response.data.result || []; // Retourne la liste des ligues ou un tableau vide
  } catch (error) {
    console.error("Erreur lors de la récupération des ligues :", error);
    return [];
  }
};

// Interface pour les matchs (fixtures)
interface Fixture {
  event_key: string;
  event_date: string;
  event_time: string;
  event_home_team: string;
  home_team_key: string;
  event_away_team: string;
  away_team_key: string;
  event_halftime_result: string;
  event_final_result: string;
  event_ft_result: string;
  event_penalty_result: string;
  event_status: string;
  country_name: string;
  league_name: string;
  league_key: string;
  league_round: string;
  league_season: string;
  event_live: string;
  event_stadium?: string;
  event_referee?: string;
  home_team_logo?: string;
  away_team_logo?: string;
  event_country_key: string;
  league_logo?: string;
  country_logo?: string;
  event_home_formation?: string;
  event_away_formation?: string;
}

// Options pour récupérer les matchs
interface FixturesOptions {
  from?: string;        // Format: YYYY-MM-DD
  to?: string;          // Format: YYYY-MM-DD
  timezone?: string;    // Format TZ: America/New_York
  countryId?: string;
  leagueId?: string;
  matchId?: string;
  teamId?: string;
  leagueGroup?: string;
  withPlayerStats?: boolean;
}

// Fonction pour récupérer les matchs (fixtures)
export const getFixtures = async (options: FixturesOptions = {}): Promise<Fixture[]> => {
  try {
    const params = new URLSearchParams({
      met: "Fixtures",
      APIkey: API_KEY
    });

    // Ajouter les options à l'URL s'ils sont définis
    if (options.from) params.append("from", options.from);
    if (options.to) params.append("to", options.to);
    if (options.timezone) params.append("timezone", options.timezone);
    if (options.countryId) params.append("countryId", options.countryId);
    if (options.leagueId) params.append("leagueId", options.leagueId);
    if (options.matchId) params.append("matchId", options.matchId);
    if (options.teamId) params.append("teamId", options.teamId);
    if (options.leagueGroup) params.append("leagueGroup", options.leagueGroup);
    if (options.withPlayerStats) params.append("withPlayerStats", "1");

    const response = await axios.get(`${BASE_URL}/?${params.toString()}`);
    return response.data.result || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des matchs :", error);
    return [];
  }
};

// Interface pour les données de Head to Head
interface H2HResult {
  H2H: Fixture[];
  firstTeamResults: Fixture[];
  secondTeamResults: Fixture[];
}

// Fonction pour récupérer les données de head-to-head
export const getH2H = async (
  firstTeamId: string,
  secondTeamId: string,
  timezone?: string
): Promise<H2HResult | null> => {
  try {
    const params = new URLSearchParams({
      met: "H2H",
      APIkey: API_KEY,
      firstTeamId,
      secondTeamId
    });

    if (timezone) params.append("timezone", timezone);

    const response = await axios.get(`${BASE_URL}/?${params.toString()}`);
    return response.data.result || null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données H2H :", error);
    return null;
  }
};

// Interface pour les classements
interface StandingTeam {
  standing_place: string;
  standing_place_type: string | null;
  standing_team: string;
  standing_P: string; // Matches played
  standing_W: string; // Wins
  standing_D: string; // Draws
  standing_L: string; // Losses
  standing_F: string; // Goals for
  standing_A: string; // Goals against
  standing_GD: string; // Goal difference
  standing_PTS: string; // Points
  team_key: string;
  league_key: string;
  league_season: string;
  league_round: string;
}

interface StandingsResult {
  total: StandingTeam[];
  home: StandingTeam[];
  away: StandingTeam[];
}

// Fonction pour récupérer les classements
export const getStandings = async (leagueId: string): Promise<StandingsResult | null> => {
  try {
    const params = new URLSearchParams({
      met: "Standings",
      APIkey: API_KEY,
      leagueId
    });

    const response = await axios.get(`${BASE_URL}/?${params.toString()}`);
    return response.data.result || null;
  } catch (error) {
    console.error("Erreur lors de la récupération des classements :", error);
    return null;
  }
};

// Fonction pour récupérer les matchs en direct - déclaration manquante précédemment
export const getLiveMatches = async () => {
  try {
    const params = new URLSearchParams({
      met: "Livescore",
      APIkey: API_KEY
    });
    
    const response = await axios.get(`${BASE_URL}/?${params.toString()}`);
    return response.data.result || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des matchs en direct :", error);
    return [];
  }
};




// Exporter toutes les fonctions utilitaires combinées
export const FootballAPI = {
  getCountries,
  getLeagues,
  getLiveMatches,
  getFixtures,
  getH2H,
  getStandings
};

export default FootballAPI;