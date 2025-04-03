import React, { useState, useEffect } from 'react';
import { Match } from '../services/api';
import { getMatches } from '../services/api';

interface MatchesComponentProps {
  leagueId?: string;
  teamId?: string;
  date?: {
    from: string;
    to: string;
  };
}

const MatchesComponent: React.FC<MatchesComponentProps> = ({ leagueId, teamId, date }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const options: any = {};
        
        if (leagueId) options.league_id = leagueId;
        if (teamId) options.team_id = teamId;
        if (date) {
          options.from = date.from;
          options.to = date.to;
        }
        
        const response = await getMatches(options);
        
        // Vérifier que la réponse est un tableau
        if (Array.isArray(response)) {
          setMatches(response);
        } else if (response && typeof response === 'object') {
          // Si la réponse est un objet mais pas un tableau, elle peut contenir des données dans une propriété spécifique
          // Par exemple, il est possible que la réponse soit { data: [...matchesArray] }
          if (Array.isArray(response.data)) {
            setMatches(response.data);
          } else {
            // Si aucun tableau n'est trouvé, convertir l'objet en tableau si possible
            const matchesArray = Object.values(response).filter(item => item !== null && typeof item === 'object');
            if (matchesArray.length > 0) {
              setMatches(matchesArray as Match[]);
            } else {
              console.error("Format de réponse inattendu:", response);
              setMatches([]);
            }
          }
        } else {
          console.error("Format de réponse inattendu:", response);
          setMatches([]);
        }
        
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des matchs");
        console.error(err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [leagueId, teamId, date]);

  const handleAnalyzeClick = (matchId: string) => {
    setSelectedMatch(matchId === selectedMatch ? null : matchId);
    // Ici vous pourriez aussi rediriger vers une page d'analyse ou ouvrir un modal
  };

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) return <div className="text-center py-8">Chargement des matchs...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!matches || matches.length === 0) return <div className="text-center py-8">Aucun match trouvé</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Liste des Matchs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div 
            key={match.match_id}

            className={`border rounded-lg shadow-md overflow-hidden ${
              selectedMatch === match.match_id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{formatMatchDate(match.match_date)}</span>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${
                  match.match_status === 'Finished' ? 'bg-green-100 text-green-800' : 
                  match.match_status === 'Not Started' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {match.match_status}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  {match.team_home_badge && (
                    <img 
                      src={match.team_home_badge} 
                      alt={match.match_hometeam_name} 
                      className="w-8 h-8 mr-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-team.png'; 
                      }}
                    />
                  )}
                  <span className="font-medium">{match.match_hometeam_name}</span>
                </div>
                
                <div className="font-bold text-lg">
                  {match.match_hometeam_score} - {match.match_awayteam_score}
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium">{match.match_awayteam_name}</span>
                  {match.team_away_badge && (
                    <img 
                      src={match.team_away_badge} 
                      alt={match.match_awayteam_name} 
                      className="w-8 h-8 ml-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-team.png'; 
                      }}
                    />
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <div>{match.league_name}</div>
                <div>{match.country_name}</div>
              </div>
              
              <button
                onClick={() => handleAnalyzeClick(match.match_id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
              >
                {selectedMatch === match.match_id ? "Masquer l'analyse" : "Analyser le match"}
              </button>
              
              {selectedMatch === match.match_id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Analyse du match</h3>
                  <p className="text-sm text-gray-600">
                    Cette section contiendra les statistiques détaillées et l'analyse du match. 
                    Vous pouvez naviguer vers la page d'analyse complète ou afficher un résumé ici.
                  </p>
                  <button className="mt-2 text-blue-600 hover:underline text-sm">
                    Voir l'analyse complète
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesComponent;