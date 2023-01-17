from django.urls import path
from finance_backend.views import getRoutes

urlpatterns = [
    path('', getRoutes, name="routes"),
    

]
