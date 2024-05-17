from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='notes'),
    path('notes/<str:pk>/', views.NoteDetail.as_view(), name='note-detail'),
    path('notes/<str:pk>/delete/', views.NoteDelete.as_view(), name='note-delete'),
]
