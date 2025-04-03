// fichier: src/pages/dashboard/MatchesPage.tsx
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/DashboardLayout';
import { getCountries, getLeaguesByCountry, getMatches } from '../../services/api';
import predictionService from '../../services/predictionService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

interface Match {
  match_id: string;
  league_id: string;
  league_name: string;
  league_logo: string;
  country_logo: string;
  match_date: string;
  match_time: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_awayteam_name: string;
  match_awayteam_score: string;
  team_home_badge: string;
  team_away_badge: string;
  match_status: string;
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
  confidence_level: number;
  key_factors: string[];
  detailed_analysis: string;
}

const TeamLogo: React.FC<{
  src: string | undefined;
  alt: string;
  margin: 'left' | 'right';
}> = ({ src, alt, margin }) => {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{ 
        width: 48, 
        height: 48, 
        [margin === 'right' ? 'marginRight' : 'marginLeft']: 2,
        bgcolor: 'white',
        padding: '4px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }
      }}
      variant="rounded"
      imgProps={{
        style: { 
          objectFit: 'contain',
          maxWidth: '100%',
          maxHeight: '100%'
        },
        loading: 'lazy',
        onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = '/placeholder-team.png';
        }
      }}
    />
  );
};

const MatchesPage: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('6');
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  });
  const [toDate, setToDate] = useState<string>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [matchesLoading, setMatchesLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [analyzingMatchId, setAnalyzingMatchId] = useState<string>('');
  const [selectedPrediction, setSelectedPrediction] = useState<MatchPrediction | null>(null);
  const [predictionLoading, setPredictionLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        if (data) setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        setErrorMsg("Impossible de charger la liste des pays.");
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      try {
        const data = await getLeaguesByCountry(selectedCountry);
        if (data) {
          const leaguesArray = Array.isArray(data) ? data : [];
          setLeagues(leaguesArray);
          if (leaguesArray.length > 0) {
            setSelectedLeague(leaguesArray[0].league_id);
          }
        }
      } catch (error) {
        setErrorMsg("Impossible de charger les ligues pour ce pays.");
        setLeagues([]);
      }
      setLoading(false);
    };
    if (selectedCountry) fetchLeagues();
  }, [selectedCountry]);

  const fetchMatchesData = async () => {
    if (!selectedLeague || !fromDate || !toDate) return;
    
    setMatchesLoading(true);
    setErrorMsg('');
    
    try {
      const data = await getMatches(selectedLeague, fromDate, toDate);
      
      if (data && Array.isArray(data)) {
        const processedMatches = data.map(match => ({
          ...match,
          team_home_badge: match.team_home_badge || `/team-logos/${match.match_hometeam_id || 'default'}.png`,
          team_away_badge: match.team_away_badge || `/team-logos/${match.match_awayteam_id || 'default'}.png`,
        }));
        setMatches(processedMatches);
      } else {
        setMatches([]);
      }
    } catch (error) {
      setErrorMsg('Échec de la récupération des matches.');
      setMatches([]);
    }
    
    setMatchesLoading(false);
  };

  const handleAnalyzeMatch = async (matchId: string) => {
    setAnalyzingMatchId(matchId);
    setPredictionLoading(true);
    
    try {
      const prediction = await predictionService.predictMatch(matchId);
      setSelectedPrediction(prediction);
      setSuccessAlert(true);
    } catch (error) {
      setErrorMsg('Échec de l\'analyse prédictive');
    } finally {
      setPredictionLoading(false);
      setAnalyzingMatchId('');
    }
  };

  const PredictionModal = () => (
    <Dialog 
      open={!!selectedPrediction} 
      onClose={() => setSelectedPrediction(null)}
      maxWidth="md"
      fullWidth
    >
      {selectedPrediction && (
        <>
          <DialogTitle sx={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" gap={2} justifyContent="center">
              <SportsSoccerIcon fontSize="large" color="primary" />
              <Typography variant="h5">Prédiction du match</Typography>
            </Stack>
          </DialogTitle>
          
          <DialogContent>
            {predictionLoading ? (
              <LinearProgress sx={{ my: 3 }} />
            ) : (
              <>
                <Stack direction="row" justifyContent="space-between" alignItems="center" my={3}>
                  <TeamLogo 
                    src={matches.find(m => m.match_id === selectedPrediction.match_id)?.team_home_badge}
                    alt={selectedPrediction.home_team}
                    margin="right"
                  />
                  
                  <Typography variant="h4" sx={{ mx: 2 }}>
                    {selectedPrediction.predicted_score.home} - {selectedPrediction.predicted_score.away}
                  </Typography>
                  
                  <TeamLogo 
                    src={matches.find(m => m.match_id === selectedPrediction.match_id)?.team_away_badge}
                    alt={selectedPrediction.away_team}
                    margin="left"
                  />
                </Stack>

                <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
                  <Stack direction="row" justifyContent="space-around" textAlign="center">
                    <div>
                      <Typography variant="body2" color="textSecondary">Victoire Domicile</Typography>
                      <Typography variant="h4" color="primary">
                        {Math.round(selectedPrediction.win_probabilities.home)}%
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="textSecondary">Match Nul</Typography>
                      <Typography variant="h4" color="textSecondary">
                        {Math.round(selectedPrediction.win_probabilities.draw)}%
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color="textSecondary">Victoire Extérieur</Typography>
                      <Typography variant="h4" color="secondary">
                        {Math.round(selectedPrediction.win_probabilities.away)}%
                      </Typography>
                    </div>
                  </Stack>
                </Card>

                <Typography variant="h6" gutterBottom>
                  <ChecklistRtlIcon color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Facteurs déterminants
                </Typography>
                
                <Stack spacing={1} mb={3}>
                  {selectedPrediction.key_factors.map((factor, index) => (
                    <Stack key={index} direction="row" alignItems="center" gap={1}>
                      <EqualizerIcon fontSize="small" color="action" />
                      <Typography variant="body1">{factor}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Typography variant="h6" gutterBottom>
                  <AnalyticsIcon color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Analyse approfondie
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedPrediction.detailed_analysis}
                </Typography>
              </>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  );

  const formatDisplayDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="p-6">
        <Typography variant="h4" className="mb-6">Matches & Résultats</Typography>
        
        <Card sx={{ mb: 4, bgcolor: '#f9fafb' }}>
          <CardContent>
            <Typography variant="h6" className="mb-4">Filtres</Typography>
            <Box className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <FormControl fullWidth>
                <InputLabel>Pays</InputLabel>
                <Select
                  value={selectedCountry}
                  label="Pays"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.country_id} value={country.country_id}>
                      {country.country_logo && (
                        <Avatar 
                          src={country.country_logo} 
                          alt={country.country_name}
                          sx={{ width: 24, height: 24, marginRight: 1 }}
                        />
                      )}
                      {country.country_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Ligue</InputLabel>
                <Select
                  value={selectedLeague}
                  label="Ligue"
                  disabled={loading || leagues.length === 0}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                >
                  {leagues.map((league) => (
                    <MenuItem key={league.league_id} value={league.league_id}>
                      {league.league_logo && (
                        <Avatar 
                          src={league.league_logo} 
                          alt={league.league_name}
                          sx={{ width: 24, height: 24, marginRight: 1 }}
                        />
                      )}
                      {league.league_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                label="Date de début"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              
              <TextField
                label="Date de fin"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              
              <Button 
                variant="contained" 
                color="primary" 
                onClick={fetchMatchesData}
                disabled={!selectedLeague}
                fullWidth
                sx={{ height: '56px' }}
              >
                Appliquer les filtres
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6">Résultats des matches</Typography>
          {matches.length > 0 && (
            <Typography variant="body2" className="text-gray-500">
              {matches.length} matches • {formatDisplayDate(fromDate)} au {formatDisplayDate(toDate)}
            </Typography>
          )}
        </Box>
        
        {matchesLoading ? (
          <Box className="flex justify-center my-8">
            <CircularProgress />
          </Box>
        ) : errorMsg ? (
          <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>
        ) : matches.length === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>Aucun match trouvé avec ces filtres</Alert>
        ) : (
          <div>
            {Array.from(new Set(matches.map(match => match.match_date))).map(date => (
              <div key={date} className="mb-6">
                <Box className="flex items-center mb-2" sx={{ borderLeft: '4px solid #1976d2', paddingLeft: 2 }}>
                  <Typography variant="subtitle1" className="font-semibold">
                    {formatDisplayDate(date)}
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {matches.filter(match => match.match_date === date).map((match) => (
                    <Grid item xs={12} sm={6} key={match.match_id}>
                      <Card elevation={1} sx={{ transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 3 } }}>
                        <CardContent>
                          <Box className="flex items-center justify-between mb-2">
                            <Box className="flex items-center">
                              {match.country_logo && (
                                <Avatar src={match.country_logo} alt="Pays" sx={{ width: 20, height: 20, mr: 1 }} />
                              )}
                              <Typography variant="caption" className="text-gray-500">
                                {match.league_name} • {match.match_time}
                              </Typography>
                            </Box>
                            <Chip
                              label={match.match_status === 'Finished' ? 'Terminé' : 'À venir'}
                              size="small"
                              color={match.match_status === 'Finished' ? 'success' : 'primary'}
                            />
                          </Box>
                          
                          <Box className="flex items-center justify-between mt-4">
                            <Box className="flex items-center w-2/5">
                              <TeamLogo src={match.team_home_badge} alt={match.match_hometeam_name} margin="right" />
                              <Typography variant="body1" className="font-medium truncate">
                                {match.match_hometeam_name}
                              </Typography>
                            </Box>
                            
                            <Box className="flex items-center justify-center w-1/5" sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                              <Typography variant="h5" className="font-bold">
                                {match.match_hometeam_score} - {match.match_awayteam_score}
                              </Typography>
                            </Box>
                            
                            <Box className="flex items-center justify-end w-2/5">
                              <Typography variant="body1" className="font-medium truncate">
                                {match.match_awayteam_name}
                              </Typography>
                              <TeamLogo src={match.team_away_badge} alt={match.match_awayteam_name} margin="left" />
                            </Box>
                          </Box>
                          
                          <Box className="flex justify-end mt-3">
                            <Button 
                              size="small" 
                              variant="outlined" 
                              color="primary"
                              onClick={() => handleAnalyzeMatch(match.match_id)}
                              disabled={analyzingMatchId === match.match_id}
                              startIcon={analyzingMatchId === match.match_id ? <CircularProgress size={16} /> : <AnalyticsIcon />}
                              sx={{ borderRadius: '20px' }}
                            >
                              {analyzingMatchId === match.match_id ? 'Analyse...' : 'Analyser'}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </div>
        )}

        <PredictionModal />
        
        <Snackbar
          open={successAlert}
          autoHideDuration={4000}
          onClose={() => setSuccessAlert(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Analyse prédictive générée avec succès!
          </Alert>
        </Snackbar>
      </div>
    </MainLayout>
  );
};

export default MatchesPage;