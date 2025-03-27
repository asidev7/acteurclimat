import requests
from django.core.management.base import BaseCommand
from api.models import Country, Livescore, Standing, Team, Player

class Command(BaseCommand):
    help = "Fetch data from AllSportsAPI and save to database"

    def handle(self, *args, **kwargs):
        API_KEY = "ae9e70e2497a1b07d2a8bf9da380625bbb863b266fcc5d8e9248c823614bd7f6"
        
        # Fetch Countries
        self.fetch_countries(API_KEY)
        
        # Fetch Livescores
        self.fetch_livescores(API_KEY)
        
        # Fetch Standings
        self.fetch_standings(API_KEY)
        
        # Fetch Teams and Players
        self.fetch_teams(API_KEY)

    def fetch_countries(self, api_key):
        url = f"https://apiv2.allsportsapi.com/football/?met=Countries&APIkey={api_key}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if data["success"] == 1:
                for country_data in data["result"]:
                    Country.objects.update_or_create(
                        country_key=country_data["country_key"],
                        defaults={
                            "country_name": country_data["country_name"],
                            "country_iso2": country_data["country_iso2"],
                            "country_logo": country_data["country_logo"],
                        }
                    )
                self.stdout.write(self.style.SUCCESS("Countries data loaded successfully!"))
            else:
                self.stdout.write(self.style.ERROR("No data returned from API for countries."))
        else:
            self.stdout.write(self.style.ERROR(f"Failed to connect to API for countries. Status code: {response.status_code}"))

    def fetch_livescores(self, api_key):
        url = f"https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey={api_key}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if data["success"] == 1:
                for livescore_data in data["result"]:
                    Livescore.objects.update_or_create(
                        event_key=livescore_data["event_key"],
                        defaults={
                            "event_date": livescore_data["event_date"],
                            "event_time": livescore_data["event_time"],
                            "event_home_team": livescore_data["event_home_team"],
                            "home_team_key": livescore_data["home_team_key"],
                            "event_away_team": livescore_data["event_away_team"],
                            "away_team_key": livescore_data["away_team_key"],
                            "event_halftime_result": livescore_data["event_halftime_result"],
                            "event_final_result": livescore_data["event_final_result"],
                            "event_status": livescore_data["event_status"],
                            "country_name": livescore_data["country_name"],
                            "league_name": livescore_data["league_name"],
                            "league_key": livescore_data["league_key"],
                            "league_round": livescore_data["league_round"],
                            "event_stadium": livescore_data.get("event_stadium"),
                            "event_referee": livescore_data.get("event_referee"),
                            "event_live": livescore_data["event_live"],
                        }
                    )
                self.stdout.write(self.style.SUCCESS("Livescores data loaded successfully!"))
            else:
                self.stdout.write(self.style.ERROR("No data returned from API for livescores."))
        else:
            self.stdout.write(self.style.ERROR(f"Failed to connect to API for livescores. Status code: {response.status_code}"))

    def fetch_standings(self, api_key):
        url = f"https://apiv2.allsportsapi.com/football/?met=Standings&APIkey={api_key}"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            
            if "success" in data and data["success"] == 1:
                standings_sections = ["total", "home", "away"]
                for section in standings_sections:
                    if section in data["result"]:
                        for standing_data in data["result"][section]:
                            Standing.objects.update_or_create(
                                team_key=standing_data["team_key"],
                                defaults={
                                    "standing_place": standing_data.get("standing_place"),
                                    "standing_place_type": standing_data.get("standing_place_type"),
                                    "standing_team": standing_data.get("standing_team"),
                                    "standing_P": standing_data.get("standing_P"),
                                    "standing_W": standing_data.get("standing_W"),
                                    "standing_D": standing_data.get("standing_D"),
                                    "standing_L": standing_data.get("standing_L"),
                                    "standing_F": standing_data.get("standing_F"),
                                    "standing_A": standing_data.get("standing_A"),
                                    "standing_GD": standing_data.get("standing_GD"),
                                    "standing_PTS": standing_data.get("standing_PTS"),
                                    "league_key": standing_data.get("league_key"),
                                    "league_season": standing_data.get("league_season"),
                                    "league_round": standing_data.get("league_round"),
                                    "standing_updated": standing_data.get("standing_updated"),
                                }
                            )
                self.stdout.write(self.style.SUCCESS("Standings data loaded successfully!"))
            else:
                self.stdout.write(self.style.ERROR("No valid data returned from API for standings."))
        else:
            self.stdout.write(self.style.ERROR(f"Failed to connect to API for standings. Status code: {response.status_code}"))
    
    def fetch_teams(self, api_key):
        url = f"https://apiv2.allsportsapi.com/football/?met=Teams&APIkey={api_key}"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            
            if "success" in data and data["success"] == 1:
                for team_data in data["result"]:
                    team, _ = Team.objects.update_or_create(
                        team_key=team_data.get("team_key"),
                        defaults={
                            "team_name": team_data.get("team_name"),
                            "team_logo": team_data.get("team_logo"),
                        }
                    )
                    
                    for player_data in team_data.get("players", []):
                        Player.objects.update_or_create(
                            player_key=player_data.get("player_key"),
                            defaults={
                                "team": team,
                                "player_name": player_data.get("player_name"),
                                "player_number": player_data.get("player_number"),
                                "player_country": player_data.get("player_country"),
                                "player_type": player_data.get("player_type"),
                                "player_age": player_data.get("player_age"),
                                "player_match_played": player_data.get("player_match_played"),
                                "player_goals": player_data.get("player_goals"),
                                "player_yellow_cards": player_data.get("player_yellow_cards"),
                                "player_red_cards": player_data.get("player_red_cards"),
                                "player_image": player_data.get("player_image"),
                            }
                        )
                self.stdout.write(self.style.SUCCESS("Teams and players data loaded successfully!"))
            else:
                self.stdout.write(self.style.ERROR("No valid data returned from API for teams."))
        else:
            self.stdout.write(self.style.ERROR(f"Failed to connect to API for teams. Status code: {response.status_code}"))
