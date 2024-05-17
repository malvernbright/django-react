from django.db import models
from django.contrib.auth.models import User
import uuid

class Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Note"
        verbose_name_plural = "Notes"
        
    def __str__(self) -> str:
        return self.title