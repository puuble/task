from django.urls import path
from finance_backend.views import getRoutes, getSymbols, createSymbol, updateSymbol, deleteSymbol, deleteAllSymbols, getPositions, createPosition, updatePosition, deletePosition, deleteAllPositions, createSocket

urlpatterns = [
    path('', getRoutes, name="routes"),
    path('create-socket', createSocket, name="create-socket"),


    path('symbols/', getSymbols, name="symbols"),
    path('create-symbol/', createSymbol, name="create-symbol"),
    path('update-symbol/', updateSymbol, name="update-symbol"),
    path('delete-symbol/<str:pk>/', deleteSymbol, name="delete-symbol"),
    path('delete-all-symbols/', deleteAllSymbols, name="delete-all-symbols"),

    path('positions/', getPositions, name="positions"),
    path('create-position/', createPosition, name="create-position"),
    path('update-position/', updatePosition, name="update-position"),
    path('delete-position/', deletePosition, name="delete-position"),
    path('delete-all-positions/', deleteAllPositions, name="delete-all-positions"),


]
