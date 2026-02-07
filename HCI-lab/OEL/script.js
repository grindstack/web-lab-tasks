function checkRollNumber() {
    let roll = document.getElementById("rollInput").value;

    if (roll === "" || isNaN(roll) || roll.length > 5) {
        alert("Roll Number must contain only numbers and must be less then 5 digits!");
    } else {
        alert("Valid Roll Number!");
    }
}

function toggleMode() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
}
