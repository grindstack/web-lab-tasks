document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const resultCard = document.getElementById("resultCard");
  const closeBtn = document.getElementById("closeCard");

  const resName = document.getElementById("resName");
  const resAge = document.getElementById("resAge");
  const resMarks = document.getElementById("resMarks");
  const resGrade = document.getElementById("resGrade");

  closeBtn.addEventListener("click", () => {
    hideResultCard();
  });

  function showResultCard() {
    resultCard.style.display = "block";
    resultCard.setAttribute("aria-hidden", "false");
  }
  function hideResultCard() {
    resultCard.style.display = "none";
    resultCard.setAttribute("aria-hidden", "true");
  }

  function calculateGrade(marks) {
    if (marks >= 90 && marks <= 100) return "A";
    if (marks >= 80 && marks < 90) return "B";
    if (marks >= 70 && marks < 80) return "C";
    if (marks >= 60 && marks < 70) return "D";
    if (marks >= 40 && marks < 60) return "E";
    return "F";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (document.getElementById("name").value || "").trim();
    const ageVal = document.getElementById("age").value;
    const marksVal = document.getElementById("marks").value;

    const age = ageVal === "" ? NaN : parseInt(ageVal, 10);
    const marks = marksVal === "" ? NaN : parseInt(marksVal, 10);

    if (!name) {
      alert("Please enter the student's name.");
      return;
    }

    if (Number.isNaN(age)) {
      alert("Please enter a valid age.");
      return;
    }

    if (age < 0) {
      alert("Age cannot be negative.");
      return;
    }
    if (Number.isNaN(marks) || marks < 0 || marks > 100) {
      alert("Please enter valid marks between 0 and 100.");
      return;
    }

    const grade = calculateGrade(marks);

    resName.textContent = name;
    resAge.textContent = age;
    resMarks.textContent = marks;
    resGrade.textContent = grade;

    showResultCard();
  });
});
