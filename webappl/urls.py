from django.conf.urls import url, include
from . import views
from .views import searchResultsView

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^appoint$', views.appoint, name='appoint'),
    url(r'^search/$', views.searchResultsView, name='searchResultsView'),
]
