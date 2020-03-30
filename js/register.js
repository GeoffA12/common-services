let inputValidation = input => {
    let inputId = input.id;
    let inputVal = input.value;
    let inputValLen = inputVal.length;
    input.style.borderColor = 'rgb(196, 194, 190)';
    if (inputValLen == 0) {
        return false;
    }
    switch (inputId) {
        case 'email':
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!(regex.test(inputVal))) {
                return false;
            }
            break;

        case 'password':
            var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            /*
                The string must be eight characters or longer
                The string must contain at least 1 lowercase alphabetical character
                The string must contain at least 1 uppercase alphabetical character
                The string must contain at least 1 numeric character
                The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
            */
            if (!(passwordRegex.test(inputVal))) {
                return false;
            }
            break;
    }
    return true;
}

$(document).ready(
    $('input').blur(function (e) {
        let myInput = this
        const isInvald = inputValidation(myInput);
        if (!isInvald) {
            myInput.style.borderColor = 'red';
        }
    })
)

$('#registerForm').submit(async function (e) {
    e.preventDefault();

    var urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
    var url = `https://${urlPrefix}.team22.softwareengineeringii.com/registerHandler`;
    // console.log(url)

    var register = { 'cloud': urlPrefix }
    form = document.getElementById(this.id);
    // console.log(form);
    inputs = form.querySelectorAll('input');
    // console.log(inputs);

    let noneAreEmpty = [];
    let emptyFieldIds = [];
    inputs.forEach((input, i) => {
        let isValid = inputValidation(input);
        console.log(isValid);
        if (!isValid) {
            // console.log('got here');
            input.style.borderColor = 'red';
            noneAreEmpty.push(isValid);
            emptyFieldIds.push(input.id)
        } else {
            register[`${input.id}`] = input.value;
        }
    })
    // console.log(emptyFieldIds)
    // console.log(noneAreEmpty);
    if (noneAreEmpty.includes(false)) {
        return false;
    }
    // console.log(register);
    
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(register)
    }).then(res => {
        if (res.status == 200) {
            localStorage.setItem('username', register['email'])
            url = `https://${urlPrefix}.team22.softwareengineeringii.com/${urlPrefix}-front-end/dashboard/dashboard.html`;
            window.location.assign(url);
        } else {
            alert('something went wrong');
        }
    }).catch(err => {
        console.log('Error: ', err);
    });
})