from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.contrib import messages
from django.contrib.auth.models import User
from .models import *
from Scrapy import settings
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy


# Create your views here.
def home(request):
    return render(request, 'index.html', {})


def our_story(request):
    return render(request, 'our-story.html')


def company(request):
    return render(request, 'company-values.html')


def team(request):
    return render(request, 'team.html')


def career(request):
    if request.method == 'POST':
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        department = request.POST.get('department')
        resume = request.POST.get('resume')
        message = request.POST.get('message')
        ApplyNow.objects.create(fname=fname,lname=lname,email=email,phone=phone,department=department,link=resume,message=message)
        return redirect('career')
    return render(request, 'career.html')


def pricing(request):
    return render(request, 'pricing.html')


def orderPlaced(request):
    return render(request, "orderplaced.html", {})

def order(request, id):
    if not request.user.is_authenticated:
        return redirect('home')
    # try:
    if request.method == "POST":
        address = request.POST.get("address")
        p_address = request.POST.get("pickup_address")
        d_address = request.POST.get("drop_address")
        p_date = request.POST.get("p_date")
        mile = int(request.POST.get("package"))
        c_type = request.POST.get("collection_type")

        if id == 1:
            mile_total_price = 199
        elif id == 2:
            mile_total_price = 213
        elif id == 3:
            mile_total_price = 813
        elif id == 4:
            mile_total_price = 613

        # order instance
        order = Order.objects.create(
            user=request.user,
            collection_type=c_type,
            address=address,
            price=mile_total_price,
            pickup_address=p_address,
            drop_address=d_address,
            pickup_at=p_date,
        )


        context = {"oid": order.oid, "key": settings.STRIPE_PUBLISHABLE_KEY}
        return render(request, "payment.html", context)
    # except Exception as e:
    #     print("Something wrong")
    return render(request, "order.html", {"id": id})

def viewOrders(request):
    if not request.user.is_authenticated:
            return redirect('login')

    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, "orders.html", {"orders": orders})


def services(request):
    return render(request, 'services.html')


def waste_removal(request):
    return render(request, 'ser-d-waste.html')


def rent_dumpster(request):
    return render(request, 'ser-d-dumpster.html')


def on_demand(request):
    return render(request, 'ser-d-ondemand.html')


def zero_waste(request):
    return render(request, 'ser-d-zero.html')


def technology(request):
    return render(request, 'ser-d-tech.html')


def industries_grocery(request):
    return render(request, 'ind-d-grocery.html')


def industries(request):
    return render(request, 'industries.html')


def industries_medical(request):
    return render(request, 'ind-d-medical.html')


def industries_hotel(request):
    return render(request, 'ind-d-hotel.html')


def industries_munci(request):
    return render(request, 'ind-d-munci.html')


def industries_mall(request):
    return render(request, 'ind-d-mall.html')


def industries_stadium(request):
    return render(request, 'ind-d-stadium.html')

def queries(request):
    return render(request, 'faqs.html')


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        Contact.objects.create(name=name, email=email, phone=phone, subject=subject, message=message)
        return redirect("contact")
    return render(request, 'contact.html')


def register(request):
    if request.method == "POST":
        name = request.POST["name"]
        email = request.POST["email"]
        psw = request.POST["password"]
        collector = request.POST.get("collector", False)
        user = User.objects.create_user(username=name, email=email, password=psw)
        user.first_name = name
        user.save()
        if collector:
            return redirect('profile')
        return redirect("login")
    return render(request, "register.html", {})


def login(request):
    if request.method == "POST":
        name = request.POST["name"]
        psw = request.POST["password"]

        user = authenticate(username=name, password=psw)
        if user.is_authenticated:
            auth_login(request, user)
            return redirect("home")
        else:
            messages.error(request, "Invalid credentials! Please try again")
            return redirect("login")
    return render(request, "login.html", {})


def logout(request):
    auth_logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("login")


def collectors(request):
    collectors = Collectors.objects.all()
    return render(request, 'collectors.html', {'r_object':collectors})

class CreateCollectors(CreateView):
    model = Collectors
    template_name = 'collectors_form.html'
    fields = '__all__'
    success_url = reverse_lazy('login')

    def get_initial(self):
        return {'user': self.request.user}