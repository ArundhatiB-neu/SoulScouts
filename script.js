var nameRegex = /^[a-zA-Z ]+$/;
var emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern.edu$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


var isSignupNameValid = false;
var isSignupEmailValid = false;
var isSignupDobValid = false;
var isSignupPasswordValid = false;
var isSignupConfirmPasswordValid = false;

var emailValue;
var signupButton;

// tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// spinner
window.addEventListener('load', function() {
    const spinner = document.getElementById('spinner');
    const content = document.getElementById('content');
    setTimeout(() => {
        spinner.style.display = 'none';
        content.style.display = 'block';
    }, 1500); // 1.5 seconds
});

// live alert
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Great to see your Interest, Please Signup to Begin the Journey ! ', 'success')
  })
}

function validateFormControls(event){
    var value = event.target.value;
    var targetId = event.target.id;
    var errorFieldId = `error-${targetId}`;
    var errorField = document.getElementById(errorFieldId);

    if (targetId=="signupName"){
        errorField.style.display = value.trim().match(nameRegex)? "none":"block";
        isSignupNameValid = value.trim().match(nameRegex)? true:false;
    }
    else if (targetId=="signupEmail"){
        errorField.style.display = value.trim().match(emailRegex)? "none":"block";
        isSignupEmailValid = value.trim().match(emailRegex)? true:false;
    }
    else if (targetId=="signupDob"){
        var dob = new Date(value);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - dob.getFullYear();
        var monthDiff = currentDate.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
            age--;
        }

        isSignupDobValid = age >= 11;
        errorField.style.display = isSignupDobValid ? "none" : "block";
    }
    else if (targetId=="signupPassword"){
        errorField.style.display = value.trim().match(passwordRegex)? "none":"block";
        isSignupPasswordValid = value.trim().match(passwordRegex)? true:false;
        emailValue = value;
    }
    else if (targetId=="signupPassword"){
        errorField.style.display = value.trim().match(passwordRegex)? "none":"block";
        isSignupPasswordValid = value.trim().match(passwordRegex)? true:false;
        emailValue = value;
    }
    else if (targetId=="signupConfirmPassword"){
        errorField.style.display = (value === emailValue)? "none":"block";
        isSignupConfirmPasswordValid = (value === emailValue)? true:false;
    }
    signupButton.disabled = (isSignupNameValid&&isSignupEmailValid&&isSignupDobValid&&isSignupPasswordValid&&isSignupConfirmPasswordValid)? false:true;
}


function onLogin(){
    var email = document.getElementById("loginEmail").value;
    var phrase = "Logged in as "+email+".";

    var modalElement = document.getElementById('exampleModal');
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide(); 

    alert(phrase);

}

function onSignup(){
    var email = document.getElementById("signupEmail").value;
    var phrase = "Logged in as "+email+".";

    var modalElement = document.getElementById('exampleModal');
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    alert(phrase);
}

 // Toast JS
function googleSignUp(){
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}
   

// Function to toggle between login and sign up forms
function toggleForm(e) {
    e.preventDefault();

    const isSignUp = document.getElementById("toggleLink").textContent === "Sign Up!";
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const formContent = document.getElementById("formContent");
    const toggleText = document.getElementById("toggleText");

    if (isSignUp) {
        // Switch to Sign Up form
        modalTitle.innerText = "Join Us!";
        modalSubtitle.innerText = "Create an account to get started!";
        formContent.innerHTML = `
            <div class="mb-3">
              <label for="signupName" class="form-label">Full Name</label>
              <input type="text" class="form-control form-control-lg bg-light fs-6" id="signupName" placeholder="Enter your name...">
              <p class="error" id="error-signupName">Please enter valid name.</p>
            </div>
            
            <div class="mb-3">
              <label for="signupEmail" class="form-label">Email Address</label>
              <input type="text" class="form-control form-control-lg bg-light fs-6" id="signupEmail" placeholder="Enter your email address...">
              <p class="error" id="error-signupEmail">Please enter valid email.</p>
            </div>
            

            <div class="mb-3">
                <label for="dob" class="form-label me-4">Date of Birth</label>
                <input type="date" name="dob" class="form-control form-control-lg bg-light fs-6" id="signupDob" placeholder="Enter date of birth">
                <p class="error" id="error-signupDob">You must be at least 11 years old to sign up.</p>
            </div>
            

            <div class="mb-3">
                <label for="signupPassword" class="form-label">Create Password</label>
              <input type="password" class="form-control form-control-lg bg-light fs-6" id="signupPassword" placeholder="Enter a password...">
              <p class="error" id="error-signupPassword">Your password must be at least 8 characters and contain at least one of the following: lowercase character, uppercase character, number, special character.</p>
            </div>
            

            <div class="mb-3">
              <label for="signupConfirmPassword" class="form-label">Confirm Password</label>
              <input type="password" class="form-control form-control-lg bg-light fs-6" id="signupConfirmPassword" placeholder="Confirm password...">
              <p class="error" id="error-signupConfirmPassword">Password fields don't match.</p>
            </div>
            

            <div class="mt-3 mb-3">
                <button class="btn btn-lg btn-primary w-100 fs-6" id="signupButton" onclick="onSignup()">
                    Sign Up
                </button>
            </div>
            <div class="mb-3">
                <button class="btn btn-lg btn-light w-100 fs-6" id="googleButton" onclick="googleSignUp()">
                    <img src="assets/google.png" style="width: 20px" class="me-2" />
                    <small>Sign Up with Google</small>
                </button>
            </div>
        `;
        toggleText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Login!</a>`;
        formContent.append(toggleText);

        var signupName = document.getElementById("signupName");
        var signupEmail = document.getElementById("signupEmail");
        var signupDob = document.getElementById("signupDob");
        var signupPassword = document.getElementById("signupPassword");
        var signupConfirmPassword = document.getElementById("signupConfirmPassword");
        signupButton = document.getElementById("signupButton");

        signupName.addEventListener("input", validateFormControls);
        signupEmail.addEventListener("input", validateFormControls);
        signupDob.addEventListener("input",validateFormControls);
        signupPassword.addEventListener("input",validateFormControls);
        signupConfirmPassword.addEventListener("input",validateFormControls);

        signupButton.disabled = true;




    } else {
        // Switch to Login form
        modalTitle.innerText = "Hello Again!";
        modalSubtitle.innerText = "We are so happy to have you back!";
        formContent.innerHTML = `
            <div class="mb-3">
              <label for="loginEmail" class="form-label">Email Address</label>
              <input type="text" id="loginEmail" class="form-control form-control-lg bg-light fs-6" placeholder="Enter your email address...">
            </div>
            <div class="mb-1">
              <label for="loginPassword" class="form-label">Password</label> 
              <input type="password" id="loginPassword" class="form-control form-control-lg bg-light fs-6" placeholder="Enter your password...">
            </div>
            <div class="mb-5 d-flex justify-content-between">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="formCheckbox">
                <label for="formCheckbox" class="form-check-label text-secondary"><small>Remember Me</small></label>
              </div>
              <div class="forgot">
                <small><a href="#">Forgot Password?</a></small>
              </div>
            </div>
            <div class="mb-3">
                <button class="btn btn-lg btn-primary w-100 fs-6" id="loginButton" onclick="onLogin()">
                    Login
                </button>
            </div>
            <div class="mb-3">
                <button class="btn btn-lg btn-light w-100 fs-6" id="googleButton" onclick="googleSignUp()">
                    <img src="assets/google.png" style="width: 20px" class="me-2" />
                    <small>Sign in with Google</small>
                </button>
            </div>
        `;
        toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign Up!</a>`;
        formContent.append(toggleText);
    }

    // Reassign the event listener after changing the content
    document.getElementById("toggleLink").addEventListener("click", toggleForm);
}

// Initial event listener
document.getElementById("toggleLink").addEventListener("click", toggleForm);
