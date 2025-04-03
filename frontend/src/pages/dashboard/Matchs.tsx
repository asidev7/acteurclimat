import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/DashboardLayout';
import CouponService, { DailyCoupon } from '../../services/coupons';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

const DailyCouponPage = () => {
  const [coupons, setCoupons] = useState<DailyCoupon[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<DailyCoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const todayCoupons = await CouponService.getTodayCoupons();
        setCoupons(todayCoupons);
        setFilteredCoupons(todayCoupons);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des coupons:', err);
        setError('Impossible de charger les coupons. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    // Appliquer les filtres quand riskFilter ou searchTerm changent
    applyFilters();
  }, [riskFilter, searchTerm, coupons]);

  const applyFilters = () => {
    let result = [...coupons];

    // Filtrage par niveau de risque
    if (riskFilter !== 'all') {
      result = result.filter(coupon => coupon.risk_level === riskFilter);
    }

    // Filtrage par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(coupon => 
        coupon.title.toLowerCase().includes(term) || 
        (coupon.description && coupon.description.toLowerCase().includes(term)) ||
        coupon.selections.some(s => s.match.toLowerCase().includes(term) || s.pick.toLowerCase().includes(term))
      );
    }

    setFilteredCoupons(result);
  };

  const handleFollow = async (couponId: number) => {
    try {
      await CouponService.followCoupon(couponId);
      // Mettre à jour l'interface utilisateur ou afficher un message de succès
      alert('Coupon suivi avec succès!');
    } catch (err) {
      console.error('Erreur lors du suivi du coupon:', err);
      alert('Impossible de suivre ce coupon. Veuillez réessayer.');
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch(level) {
      case 'low': return { color: 'success', label: 'Faible' };
      case 'medium': return { color: 'warning', label: 'Moyen' };
      case 'high': return { color: 'error', label: 'Élevé' };
      default: return { color: 'default', label: level };
    }
  };

  const getResultColor = (result: string | undefined | null) => {
    switch(result) {
      case 'win': return { color: 'success', label: 'Gagné' };
      case 'loss': return { color: 'error', label: 'Perdu' };
      case 'pending': return { color: 'warning', label: 'En attente' };
      default: return { color: 'default', label: 'N/A' };
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Coupons du Jour
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Niveau de risque</InputLabel>
                <Select
                  value={riskFilter}
                  label="Niveau de risque"
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <MenuItem value="all">Tous les niveaux</MenuItem>
                  <MenuItem value="low">Risque faible</MenuItem>
                  <MenuItem value="medium">Risque moyen</MenuItem>
                  <MenuItem value="high">Risque élevé</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Recherche"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
              />
            </Grid>
          </Grid>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
        ) : filteredCoupons.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography color="text.secondary">
              Aucun coupon disponible pour les critères sélectionnés.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredCoupons.map((coupon) => {
              const riskLevel = getRiskLevelColor(coupon.risk_level);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={coupon.id}>
                  <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardHeader
                      title={coupon.title}
                      subheader={new Date(coupon.created_at).toLocaleDateString()}
                      action={
                        <Chip 
                          label={riskLevel.label} 
                          color={riskLevel.color as any} 
                          size="small" 
                        />
                      }
                    />
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      {coupon.description && (
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {coupon.description}
                        </Typography>
                      )}
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" fontWeight="medium">
                          Cote totale: <Box component="span" color="primary.main">{coupon.odds_value.toFixed(2)}</Box>
                        </Typography>
                        
                        {coupon.bookmaker && (
                          <Typography variant="body2" color="text.secondary">
                            Bookmaker recommandé: {coupon.bookmaker.name}
                          </Typography>
                        )}
                      </Box>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Sélections:
                      </Typography>
                      
                      <Box sx={{ '& > :not(:last-child)': { mb: 1 } }}>
                        {coupon.selections.map((selection) => {
                          const resultStatus = getResultColor(selection.result);
                          
                          return (
                            <Paper key={selection.id} variant="outlined" sx={{ p: 1.5 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">{selection.match}</Typography>
                                <Typography variant="body2" fontWeight="medium">{selection.odds.toFixed(2)}</Typography>
                              </Box>
                              <Typography variant="body2" color="primary.main" fontWeight="medium">
                                {selection.pick}
                              </Typography>
                              {selection.result && (
                                <Chip 
                                  label={resultStatus.label} 
                                  color={resultStatus.color as any}
                                  size="small"
                                  sx={{ mt: 1 }}
                                />
                              )}
                            </Paper>
                          );
                        })}
                      </Box>
                    </CardContent>
                    
                    <Divider />
                    
                    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Par {coupon.created_by.first_name || coupon.created_by.email}
                      </Typography>
                      <Button 
                        variant="contained" 
                        onClick={() => handleFollow(coupon.id)}
                        size="small"
                      >
                        Suivre
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </MainLayout>
  );
};

export default DailyCouponPage;