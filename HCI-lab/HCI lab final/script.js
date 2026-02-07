// Course data
var courses = [
    { id: 1, code: 'CS101', name: 'Introduction to Programming', credits: 3, instructor: 'Dr. Fatima Noor' },
    { id: 2, code: 'CS201', name: 'Data Structures', credits: 4, instructor: 'Prof. Ahmad Raza' },
    { id: 3, code: 'CS301', name: 'Database Systems', credits: 3, instructor: 'Dr. Ayesha Malik' },
    { id: 4, code: 'CS302', name: 'Web Development', credits: 3, instructor: 'Prof. Hassan Ali' },
    { id: 5, code: 'CS401', name: 'Artificial Intelligence', credits: 4, instructor: 'Dr. Zainab Sheikh' },
    { id: 6, code: 'CS402', name: 'Mobile Development', credits: 3, instructor: 'Prof. Imran Khan' }
];

var selectedCourses = [];

function showCourses() {
    var grid = document.getElementById('coursesGrid');
    grid.innerHTML = '';
    
    for (var i = 0; i < courses.length; i++) {
        var course = courses[i];
        var isSelected = selectedCourses.indexOf(course.id) > -1;
        
        var card = document.createElement('div');
        card.className = 'course-card' + (isSelected ? ' selected' : '');
        card.onclick = function(id) { return function() { toggleCourse(id); }; }(course.id);
        
        card.innerHTML = 
            '<div class="course-code">' + course.code + '</div>' +
            '<div class="course-name">' + course.name + '</div>' +
            '<div class="course-info">' + course.instructor + '</div>' +
            '<div class="course-credits">' + course.credits + ' Credits</div>';
        
        grid.appendChild(card);
    }
    updateSummary();
}

function toggleCourse(id) {
    var index = selectedCourses.indexOf(id);
    if (index > -1) {
        selectedCourses.splice(index, 1);
    } else {
        if (selectedCourses.length < 6) {
            selectedCourses.push(id);
        }
    }
    showCourses();
}

// Update summary
function updateSummary() {
    var totalCredits = 0;
    for (var i = 0; i < selectedCourses.length; i++) {
        for (var j = 0; j < courses.length; j++) {
            if (courses[j].id === selectedCourses[i]) {
                totalCredits += courses[j].credits;
            }
        }
    }
    document.getElementById('selectedCount').textContent = selectedCourses.length;
    document.getElementById('totalCredits').textContent = totalCredits;
}

// Show error
function showError(id, message) {
    var elem = document.getElementById(id);
    elem.textContent = message;
    elem.style.display = 'block';
}

// Hide error
function hideError(id) {
    document.getElementById(id).style.display = 'none';
}

// Validate form
function validateForm() {
    var isValid = true;
    
    // Student ID - Format: Fa-23-bscs-265
    var studentId = document.getElementById('studentId').value.trim();
    var idPattern = /^[A-Za-z]{2}-\d{2}-[A-Za-z]{4,}-\d{1,3}$/;
    
    if (!studentId) {
        showError('studentIdError', 'Student ID is required');
        isValid = false;
    } else if (!idPattern.test(studentId)) {
        showError('studentIdError', 'Format must be: Fa-23-bscs-265 (Session-Year-Program-Number)');
        isValid = false;
    } else {
        hideError('studentIdError');
    }
    
    // Name
    var name = document.getElementById('fullName').value.trim();
    if (!name || name.length < 3) {
        showError('fullNameError', 'Name required (min 3 characters)');
        isValid = false;
    } else {
        hideError('fullNameError');
    }
    
    // Email - Must be @lgu.edu.pk
    var email = document.getElementById('email').value.trim();
    var emailPattern = /^[a-zA-Z0-9._-]+@lgu\.edu\.pk$/;
    
    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError('emailError', 'Email must be @lgu.edu.pk (e.g., ahmed@lgu.edu.pk)');
        isValid = false;
    } else {
        hideError('emailError');
    }
    
    // Phone
    var phone = document.getElementById('phone').value.trim();
    var phoneDigits = phone.replace(/\D/g, '');
    if (!phone || phoneDigits.length < 10) {
        showError('phoneError', 'Valid phone required');
        isValid = false;
    } else {
        hideError('phoneError');
    }
    
    // Courses
    if (selectedCourses.length < 3 || selectedCourses.length > 6) {
        showError('courseError', 'Please select 3-6 courses');
        isValid = false;
    } else {
        hideError('courseError');
    }
    
    return isValid;
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    showCourses();
    
    // Form submit
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Hide form, show success
            document.getElementById('registrationForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        }
    });
});
