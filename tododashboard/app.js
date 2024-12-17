var userTaskData = [];

function add() {
    const inputBox = document.getElementById("input-box");
    const ul = document.getElementById("ul");

    if (inputBox.value.trim() !== "") {
        var userObj = {
            item: inputBox.value.trim(),
        };
        userTaskData.push(userObj);
        saveData();
        showData();
        inputBox.value = "";
    }
}

function deleteTask(index) {
    userTaskData.splice(index, 1); // Remove item from array
    saveData();
    showData();
}

function saveData() {
    localStorage.setItem("usertask", JSON.stringify(userTaskData));
}

function showData() {
    const ul = document.getElementById("ul");
    ul.innerHTML = "";

    userTaskData = JSON.parse(localStorage.getItem("usertask")) || [];
    userTaskData.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${task.item}</span>
            <i class='fas fa-trash delete-icon' onclick='deleteTask(${index})'></i>`;
        ul.appendChild(li);
    });
}

function handleEnter(event) {
    if (event.key === "Enter") {
        add();
    }
}

function logout() {
    localStorage.removeItem("currentlogin");
    window.location = "../login-signup/login.html";
}

window.onload = showData; // Load tasks on page refresh
