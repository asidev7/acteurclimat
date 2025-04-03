
// fichier: src/services/api.ts
import axios from 'axios';

const API_KEY = '769bfc83d93022ffa336ed60deb1604f2c51cfb4fef799fef5a56cbba9c89b39'; 
const BASE_URL = 'https://apiv3.apifootball.com/';

// Type definitions
type ApiParams = Record<string, string>;

// Generic API call function
const apiCall = async (action: string, params: ApiParams) => {
  try {
    const queryParams = new URLSearchParams({
      action,
      APIkey: API_KEY,
      ...params
    });
    
    const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
    
    if (response.data && response.data.error) {
      console.error('API Error:', response.data.message);
      return { error: true, message: response.data.message };
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error in ${action} call:`, error);
    return { error: true, message: 'Failed to fetch data. Please try again.' };
  }
};

// Get list of countries
export const getCountries = async () => {
  return apiCall('get_countries', {});
};

// Get leagues by country ID
export const getLeaguesByCountry = async (countryId: string) => {
  return apiCall('get_leagues', { country_id: countryId });
};

// Get matches by league ID and date range
export const getMatches = async (leagueId: string, fromDate: string, toDate: string) => {
  return apiCall('get_events', {
    league_id: leagueId,
    from: fromDate,
    to: toDate
  });
};

// Get team information by team ID
export const getTeamInfo = async (teamId: string) => {
  return apiCall('get_teams', { team_id: teamId });
};

// Get standings by league ID
export const getStandings = async (leagueId: string) => {
  return apiCall('get_standings', { league_id: leagueId });
};

// Get head to head matches between two teams
export const getH2H = async (firstTeam: string, secondTeam: string) => {
  return apiCall('get_H2H', {
    firstTeam,
    secondTeam
  });
};

// Get match statistics
export const getMatchStatistics = async (matchId: string) => {
  return apiCall('get_statistics', { match_id: matchId });
};

// Get match lineups
export const getMatchLineups = async (matchId: string) => {
  return apiCall('get_lineups', { match_id: matchId });
};

// Get match events (goals, cards, etc.)
export const getMatchEvents = async (matchId: string) => {
  return apiCall('get_events', { match_id: matchId });
};

// Get players by team ID
export const getPlayers = async (teamId: string) => {
  return apiCall('get_players', { team_id: teamId });
};

export default {
  getCountries,
  getLeaguesByCountry,
  getMatches,
  getTeamInfo,
  getStandings,
  getH2H,
  getMatchStatistics,
  getMatchLineups,
  getMatchEvents,
  getPlayers
};