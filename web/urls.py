from django.urls import path
from . import views

app_name = "web"

urlpatterns = [
    path('index/', views.index, name='index'),
    path('working/', views.working, name='working'),
    path('', views.signup, name='signup'),
    path('login/', views.loginn, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
