from django.urls import path
from . import views
from .views import HomeView, ArticleDetailView, AddPostView, UpdatePostView, DeletePostView
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.conf import settings


@csrf_exempt 
def contact_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')
        
        
            send_mail(
                subject,
                f"Message from {name} ({email}):\n\n{message}",
                settings.EMAIL_HOST_USER,  
                ['robertcocosila0@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({"status": "success", "message": "Message envoye"})
        
        except Exception as e:
          
            print(f"Email Sending Failed: {e}")
          
            return JsonResponse({"status": "error", "message": "erreur."}, status=500)
    
    return JsonResponse({"status": "error", "message": "erreur"}, status=405)


urlpatterns = [
    path('', HomeView.as_view(), name="home"),
    path('article/<int:pk>', ArticleDetailView.as_view(), name='article-detail'),
    path('add_post/', AddPostView.as_view(), name='add_post'),
    path('article/edit/<int:pk>', UpdatePostView.as_view(), name='update_post'),
    path('article/<int:pk>/remove', DeletePostView.as_view(), name='delete_post'),  
    path('api/contact/', contact_api, name='contact_api'),
]

