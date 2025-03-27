import React, { useEffect, useState } from "react";
import { getLeagues, getFixtures } from "../../services/api";
import { predictMatch } from "../../services/predictor";
import { FaRobot, FaSpinner, FaTimes, FaChartLine } from "react-icons/fa";

// Interface pour les résultats de prédiction
interface MatchPrediction {
  prediction: string;
  confidence: number;
  recommended_bet?: string;
  score_prediction?: string;
  both_teams_to_score?: boolean;
  reasoning: string;
}

const MatchList: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leaguesLoading, setLeaguesLoading] = useState(false);

  // État du modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState<MatchPrediction | null>(null);
  const [currentMatch, setCurrentMatch] = useState<any | null>(null);
  const [detailedAnalysis, setDetailedAnalysis] = useState(false);

  // Dates par défaut
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekFormatted = nextWeek.toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    from: today,
    to: nextWeekFormatted,
    countryId: "",
    leagueId: "",
    teamId: "",
  });

  // Chargement des pays et ligues
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { getCountries } = await import("../../services/api");
        const countriesData = await getCountries();
        setCountries(countriesData);

        setLeaguesLoading(true);
        const allLeagues = await getLeagues();
        setLeagues(allLeagues);
      } catch (error) {
        console.error("Erreur de chargement initial:", error);
      } finally {
        setLeaguesLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Mise à jour des ligues lorsque le pays change
  useEffect(() => {
    const updateLeagues = async () => {
      try {
        setLeaguesLoading(true);
        const leaguesData = await getLeagues();
        
        const filteredLeagues = filters.countryId 
          ? leaguesData.filter(league => league.country_id === filters.countryId)
          : leaguesData;
        
        setLeagues(filteredLeagues);
      } catch (error) {
        console.error("Erreur de chargement des ligues:", error);
      } finally {
        setLeaguesLoading(false);
      }
    };
    
    if (filters.countryId || filters.countryId === "") {
      updateLeagues();
    }
  }, [filters.countryId]);

  // Récupération des matchs
  const fetchMatches = async () => {
    setLoading(true);
    try {
      const fixturesData = await getFixtures({
        from: filters.from,
        to: filters.to,
        countryId: filters.countryId || undefined,
        leagueId: filters.leagueId || undefined,
        teamId: filters.teamId || undefined,
      });
      setMatches(fixturesData);
    } catch (error) {
      console.error("Erreur de récupération des matchs:", error);
      alert("Erreur lors du chargement des matchs");
    } finally {
      setLoading(false);
    }
  };

  // Gestion des filtres
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "countryId" && { leagueId: "" }),
    }));
  };

  // Analyse globale
  const analyzeAllMatches = async () => {
    if (matches.length === 0) return;
    setAnalyzing("all");

    try {
      const firstMatch = matches[0];
      const result = await predictMatch(firstMatch.event_key, detailedAnalysis);

      if (result) {
        setCurrentPrediction(result);
        setCurrentMatch(firstMatch);
        setIsModalOpen(true);
      } else {
        alert("Erreur lors de l'analyse globale");
      }
    } catch (error) {
      console.error("Erreur d'analyse globale:", error);
      alert("Erreur lors de l'analyse");
    } finally {
      setAnalyzing(null);
    }
  };

  // Analyse individuelle
  const analyzeSingleMatch = async (matchId: string) => {
    setAnalyzing(matchId);

    try {
      const matchToAnalyze = matches.find((match) => match.event_key === matchId);
      if (!matchToAnalyze) {
        throw new Error("Match non trouvé");
      }

      const result = await predictMatch(matchId, detailedAnalysis);

      if (result) {
        setCurrentPrediction(result);
        setCurrentMatch(matchToAnalyze);
        setIsModalOpen(true);
      } else {
        alert(`Erreur lors de l'analyse du match ${matchId}`);
      }
    } catch (error) {
      console.error("Erreur d'analyse:", error);
      alert("Erreur lors de l'analyse du match");
    } finally {
      setAnalyzing(null);
    }
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPrediction(null);
    setCurrentMatch(null);
  };

  // Couleur en fonction de la confiance
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return "text-green-600";
    if (confidence >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-[#2f6eea] mb-6">Analyse de Matchs</h1>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Pays</label>
            <select
              name="countryId"
              value={filters.countryId}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les pays</option>
              {countries.map((country) => (
                <option key={country.country_id} value={country.country_id}>
                  {country.country_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Ligue {leaguesLoading && <FaSpinner className="animate-spin inline ml-2" />}
            </label>
            <select
              name="leagueId"
              value={filters.leagueId}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={leaguesLoading}
            >
              <option value="">Toutes les ligues</option>
              {leagues.map((league) => (
                <option key={league.league_key} value={league.league_key}>
                  {league.league_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Du</label>
            <input
              type="date"
              name="from"
              value={filters.from}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Au</label>
            <input
              type="date"
              name="to"
              value={filters.to}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          <button
            onClick={fetchMatches}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
          >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {loading ? "Chargement..." : "Afficher les matchs"}
          </button>

          <button
            onClick={analyzeAllMatches}
            disabled={!!analyzing || matches.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
          >
            {analyzing === "all" ? <FaSpinner className="animate-spin mr-2" /> : <FaRobot className="mr-2" />}
            Analyser tous les matchs
          </button>

          <div className="flex items-center ml-2">
            <input
              type="checkbox"
              id="detailedAnalysis"
              checked={detailedAnalysis}
              onChange={() => setDetailedAnalysis(!detailedAnalysis)}
              className="mr-2"
            />
            <label htmlFor="detailedAnalysis" className="text-sm">Analyse détaillée</label>
          </div>
        </div>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="text-center p-8">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-2" />
          <p className="text-gray-600">Recherche de matchs en cours...</p>
        </div>
      )}

      {/* Liste des matchs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div key={match.event_key} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {match.league_logo && (
                  <img src={match.league_logo} alt="logo ligue" className="w-6 h-6" />
                )}
                <span className="text-sm font-semibold">{match.league_name}</span>
              </div>
              <div className="flex items-center space-x-1">
                {match.country_logo && (
                  <img src={match.country_logo} alt="drapeau pays" className="w-5 h-5" />
                )}
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{match.country_name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                  {match.home_team_logo ? (
                    <img src={match.home_team_logo} alt="logo domicile" className="w-8 h-8" />
                  ) : (
                    <span className="text-xs">{match.event_home_team.substring(0, 2)}</span>
                  )}
                </div>
                <span className="font-medium">{match.event_home_team}</span>
              </div>

              <div className="text-center">
                <div className="text-xs text-gray-500">{match.event_time}</div>
                <div className="font-bold text-lg">VS</div>
                <div className="text-xs text-gray-500">{match.event_date}</div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-medium">{match.event_away_team}</span>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                  {match.away_team_logo ? (
                    <img src={match.away_team_logo} alt="logo extérieur" className="w-8 h-8" />
                  ) : (
                    <span className="text-xs">{match.event_away_team.substring(0, 2)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => analyzeSingleMatch(match.event_key)}
                  disabled={!!analyzing}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  {analyzing === match.event_key ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    <FaChartLine className="mr-2" />
                  )}
                  Analyser
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de prédiction */}
      {isModalOpen && currentPrediction && currentMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-600">Analyse de Match</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="mb-6">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold mb-1">
                    {currentMatch.event_home_team} vs {currentMatch.event_away_team}
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentMatch.league_name} • {currentMatch.event_date} • {currentMatch.event_time}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Prédiction</div>
                    <div className="text-xl font-bold">{currentPrediction.prediction}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Confiance</div>
                    <div className={`text-xl font-bold ${getConfidenceColor(currentPrediction.confidence)}`}>
                      {currentPrediction.confidence}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {currentPrediction.score_prediction && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Score prédit</div>
                      <div className="text-xl font-bold">{currentPrediction.score_prediction}</div>
                    </div>
                  )}

                  {currentPrediction.both_teams_to_score !== undefined && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Les deux équipes marquent</div>
                      <div className="text-xl font-bold">
                        {currentPrediction.both_teams_to_score ? "Oui" : "Non"}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-2">
                  <div className="text-lg font-semibold mb-2">Raisonnement</div>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                    {currentPrediction.reasoning.split("\n").map((paragraph, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-4" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message quand aucun match */}
      {!loading && matches.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          Aucun match trouvé avec ces critères
        </div>
      )}
    </div>
  );
};

export default MatchList;