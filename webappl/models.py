from django.db import models

class Appoint(models.Model):
    date_app=models.DateTimeField()
    description_app = models.TextField()

    def __str__(self):
        return self.description_app

