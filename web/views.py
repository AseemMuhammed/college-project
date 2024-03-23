from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout


def index(request):
    return render(request, "index.html")


def working(request):
    return render(request, "working.html")


def loginn(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("web:index")  # Redirect to the home page
        else:
            # Return an error message if login fails
            return render(
                request,
                "login.html",
                {"error_message": "Invalid username or password."},
            )

    return render(request, "login.html")


# views.py

from django.contrib.auth.models import User
from django.shortcuts import render, redirect


def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        # if User.objects.filter(username=username).exists():
        #     return render(request, "signup.html", {"error_message": "Username already exists."})
        # if User.objects.filter(email=email).exists():
        #     return render(request, "signup.html", {"error_message": "Email already exists."})

        user = User.objects.create_user(username, email, password)
        user.save()
        return redirect("/login/")  # Redirect to login page after successful signup

    return render(request, "signup.html")


def logout_view(request):
    logout(request)
    # Redirect to a specific page after logging out
    return redirect("/login/")
