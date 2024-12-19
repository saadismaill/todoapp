var userTaskData = [];

function add() {
    const inputBox = document.getElementById("input-box");

    if (inputBox.value.trim() !== "") {
        var userObj = {
            item: inputBox.value.trim(),
        };
        userTaskData.push(userObj);
        saveData();
        showData();
        inputBox.value = "";

        Swal.fire({
            icon: "success",
            title: "Task Added!",
            text: "Your task has been added successfully.",
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Empty Input",
            text: "Please enter a task before adding.",
        });
    }
}

function deleteTask(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            userTaskData.splice(index, 1);
            saveData();
            showData();
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your task has been deleted.",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

function editTask(index) {
    const task = userTaskData[index].item;
    Swal.fire({
        title: "Edit Task",
        input: "text",
        inputValue: task,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
            if (!value.trim()) {
                return "Task cannot be empty!";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            userTaskData[index].item = result.value.trim();
            saveData();
            showData();
            Swal.fire({
                icon: "success",
                title: "Task Updated!",
                text: "Your task has been updated successfully.",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
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
            <i class='fas fa-pen edit-icon' style='margin-left: 10px;' onclick='editTask(${index})'></i>
            <i class='fas fa-trash delete-icon' style='margin-left: 10px;' onclick='deleteTask(${index})'></i>`;
        ul.appendChild(li);
    });
}

function handleEnter(event) {
    if (event.key === "Enter") {
        add();
    }
}

function logout() {
    Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("currentlogin");
            Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been logged out successfully.",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location = "../index.html";

            });
        }
    });
}

window.onload = showData; 