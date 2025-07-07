function toggleForm(event) {
    event.preventDefault();

    var loginContainer = document.getElementById('login-container');
    var signupContainer = document.getElementById('signup-container');

    loginContainer.style.display = loginContainer.style.display === 'none' ? 'block' : 'none';
    signupContainer.style.display = signupContainer.style.display === 'none' ? 'block' : 'none';
}
// .
// .
// .
// .
// .
// .
// .

function usernameValidate(username) {
    return new Promise((resolve, reject) => {
        // const usernameRegex = /^(?! )[a-zA-Z][a-zA-Z0-9._ ]{3,18}[a-zA-Z0-9](?<! )$/;
        const usernameRegex = /^(?=.{5,20}$)(?!.*[_.]{2})[a-zA-Z][a-zA-Z0-9._]+(?<![_.])$/;
        // let testing =  ?  : ;

        let input = document.getElementById('error-message');

        if (usernameRegex.test(username)) {
            resolve("Valid username")
            input.style.display = 'block';
            input.innerHTML = "Valid username";
        }
        else {
            // input.style.display = 'none';
            reject("Invalid username")
            input.innerHTML = "Invalid username";
        }

    })
}

function emailValidate(email) {
    return new Promise((resolve, reject) => {
        // const emailRegex = /^(?!.*@(tempmail|mailinator|10minutemail|guerrillamail|yopmail|dispostable|trashmail)\.).*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailRegex.test(email) ? resolve("Valid email") : reject("Invalid email");
    })
}

function passwordValidate(password) {
    return new Promise((resolve, reject) => {
        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        passwordRegex.test(password) ? resolve("Valid Password") : reject("Invalid Password");
    })
}



function fieldValidation(regex, fieldValue, errorElementID, successMsg, errorMsg) {

    return new Promise((resolve) => {

        let messageID = document.getElementById(errorElementID);
        // console.log(messageID);

        if (regex.test(fieldValue.value)) {
            messageID.style.display = 'inline';
            fieldValue.classList.remove('invalid')
            messageID.innerHTML = "";
            resolve(successMsg)
        }
        else {
            // input.style.display = 'none';
            messageID.innerHTML = errorMsg;
            fieldValue.classList.add('invalid')
            reject(errorMsg)
        }
    })

}


function confirmPassword(password, confirm_pass, errorElementID) {
    return new Promise((resolve, reject) => {

        let messageID = document.getElementById(errorElementID);


        if (password.value === confirm_pass.value) {

            messageID.style.display = 'inline';
            confirm_pass.classList.remove('invalid')
            messageID.innerHTML = "";
            resolve("Password match");
        }
        else {

            messageID.innerHTML = 'Password mismatch';
            confirm_pass.classList.add('invalid')
            reject("Password mismatch");
            // input.style.display = 'none';
        }
    })
}


document.getElementById('signup-container').addEventListener('input', async (e) => {
    e.preventDefault();

    let username = document.getElementById('username');
    let signup_email = document.getElementById('signup-email');
    let signup_password = document.getElementById('signup-password');
    let confirm_password = document.getElementById('confirm-password');

    let regexPattern = {

        usernameRegex: /^(?=.{5,20}$)(?!.*[_.]{2})[a-zA-Z][a-zA-Z0-9._]+(?<![_.])$/,
        emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?!@#$%^&*()<>/.,])[A-Za-z\d?!@#$%^&*()<>/.,]{12,}$/

    }


    try {
        // regex, fieldValue, errorElementID, successMsg, errorMsg
        await fieldValidation(regexPattern.usernameRegex, username, 'username-error', 'Valid username', 'Invalid username');

        await fieldValidation(regexPattern.emailRegex, signup_email, 'email-error', 'Valid username', 'Invalid email');

        await fieldValidation(regexPattern.passwordRegex, signup_password, 'password-error', 'Valid Password', 'Invalid Password');
        await confirmPassword(signup_password, confirm_password, 'confirmPassword-error');



        // console.log(await usernameValidate(username));
        // console.log(await emailValidate(signup_email));
        // console.log(await passwordValidate(signup_password));

        // console.log(message);

    } catch (error) {
        // console.log(error);

        // alert(error)

        // document.getElementById('message').innerHTML = error;
    }
})



// Your toggleForm function and other code here

// Import Firebase SDKs
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCWx1dQpAMoY_-4PSNviTLosxYHFLkrWAM",
//     authDomain: "login-signup-from.firebaseapp.com",
//     projectId: "login-signup-from",
//     storageBucket: "login-signup-from.firebasestorage.app",
//     messagingSenderId: "537374765864",
//     appId: "1:537374765864:web:971e62829e49d3d93fd61d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();


// // signup

// let submitButton = document.getElementById('submit-sign-up');

// submitButton.addEventListener('click', (event) => {

//     event.preventDefault()

//     let username = document.getElementById('username').value;
//     let email = document.getElementById('signup-email').value;
//     let password = document.getElementById('signup-password').value;

//     createUserWithEmailAndPassword(auth, email, password, username)
//         .then((userCredential) => {
//             // Signed up
//             const user = userCredential.user;
//             alert("Account created");

//             // ...
//         })
//         .catch((error) => alert(error.message));
// })



// // Login firebase

// let submitLoginButton = document.getElementById('submit-login');

// submitLoginButton.addEventListener('click', (event) => {

//     event.preventDefault()

//     let username = document.getElementById('username').value;
//     let email = document.getElementById('login-email').value;
//     let password = document.getElementById('login-password').value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed up
//             const user = userCredential.user;
//             alert("Account created");

//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//             alert(errorMessage);
//         });
// })