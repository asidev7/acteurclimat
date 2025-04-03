from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import UserSubscription

class Command(BaseCommand):
    help = 'Check and expire old subscriptions'

    def handle(self, *args, **options):
        expired_subscriptions = UserSubscription.objects.filter(
            end_date__lte=timezone.now(),
            is_active=True
        )
        
        for subscription in expired_subscriptions:
            subscription.is_active = False
            subscription.save()
            self.stdout.write(f"Subscription expired for {subscription.user.username}")

        self.stdout.write("Subscription check completed")