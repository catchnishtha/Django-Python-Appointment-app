from django.shortcuts import render
from webappl.models import Appoint
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response

def index(request):
    return render(request, 'webappl/home.html')
 
def searchResultsView(request):
    if request.method == 'POST':
        search_term=request.POST['searchTerm']
    else:
        search_term=''
    if search_term:
        appointments=Appoint.objects.filter(description_app__icontains = search_term).order_by('date_app')
    else:
        appointments=Appoint.objects.filter(description_app__icontains = "").order_by('date_app')
    return render_to_response('webappl/searchresults.html', {'appointments':appointments})

def appoint(request):
    if request.method == 'POST':
        date = request.POST.get('datetime_app', '')
        desc = request.POST.get('descNew', '')
        appoint_obj = Appoint(date_app=date, description_app=desc)
        appoint_obj.save()
        return HttpResponseRedirect('/')
    else :
        return HttpResponseRedirect('/')
