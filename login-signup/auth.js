



let userData = JSON.parse(localStorage.getItem('userData')) || [];

function login(event) {
    event.preventDefault();

    let email = document.getElementById("email");  
    let pass = document.getElementById("password");  

    if (!email.value || !pass.value) {  
        alert("Please fill in all fields");
        return;
    }
    localStorage.setItem("currentlogin", JSON.stringify(userData))

    let user = userData.find(function(user){
     return user.email === email.value && user.password === pass.value;
        
    }) 

    if(user){
        alert("Login successful!");
        window.location = "../tododashboard/index.html"

    } 
    
    else {
        alert("Invalid email or password");
    }


    
}     


function signup(event) {
    event.preventDefault();

    let email = document.getElementById("emailfield");  
    let pass = document.getElementById("passfield");  
    let name = document.getElementById("name");

    if (!email.value || !pass.value ||!name.value) {  
        alert("Please fill in all fields");
        return;
    }

    let existingUser = userData.find(function(user){
        return user.email === email.value;

    })

    let userId =  userData.length > 0 ? userData[userData.length - 1].userId +1 : 1000
    if(existingUser){
        alert("Email already exists. Please use a different one");
        return;
    }

    let newUser = {
        name: name.value,
        email: email.value,
        password: pass.value,
        userId: userId
    };

    userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(userData));
    email.value = "";

    alert("Registration successful!");
    window.location = "./login.html";
    

}


