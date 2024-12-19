let userData = JSON.parse(localStorage.getItem('userData')) || [];

// Login Function
function login(event) {
    event.preventDefault();

    let email = document.getElementById("email");  
    let pass = document.getElementById("password");  

    if (!email.value || !pass.value) {  
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Please fill in all fields!",
        });
        return;
    }

    let user = userData.find(function(user){
        return user.email === email.value && user.password === pass.value;
    }); 

    if(user){
        Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome back, " + user.name,
            confirmButtonText: "Go to Dashboard"
        }).then(() => {
            window.location = "../tododashboard/index.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "Invalid email or password. Please try again."
        });
    }
}

// Signup Function
function signup(event) {
    event.preventDefault();

    let email = document.getElementById("emailfield");  
    let pass = document.getElementById("passfield");  
    let name = document.getElementById("name");

    if (!email.value || !pass.value || !name.value) {  
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Please fill in all fields!",
        });
        return;
    }

    let existingUser = userData.find(function(user){
        return user.email === email.value;
    });

    if(existingUser){
        Swal.fire({
            icon: "error",
            title: "Email Already Exists!",
            text: "Please use a different email address."
        });
        return;
    }

    let userId = userData.length > 0 ? userData[userData.length - 1].userId + 1 : 1000;

    let newUser = {
        name: name.value,
        email: email.value,
        password: pass.value,
        userId: userId
    };

    userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(userData));

    Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now log in with your credentials.",
        confirmButtonText: "Go to Login"
    }).then(() => {
        window.location = "./login.html";
    });
}
