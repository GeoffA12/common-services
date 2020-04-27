let inputValidation = input => {
    const inputId = input.id;
    const inputVal = input.value;
    const inputValLen = inputVal.length;
    input.style.borderColor = 'rgb(196, 194, 190)';
    let isValid = true;
    if (inputValLen == 0) {
        isValid =  false;
    }
    if (isValid)
    switch (inputId) {
        case 'email':
            let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!(regex.test(inputVal))) {
                isValid = false;
            }
            break;

        case 'password':
            let isEightCharacter = /(?=.{8,})/;
            let containsLowercase = /(?=.*[a-z])/;
            let containsUppercase = /(?=.*[A-Z])/;
            let containsDigit = /(?=.*[0-9])/;
            let containsSpecial = /(?=.*[-+_!@#$%^&*.,?])/;
            /*
                The string must be eight characters or longer
                The string must contain at least 1 lowercase alphabetical character
                The string must contain at least 1 uppercase alphabetical character
                The string must contain at least 1 numeric character
                The string must contain at least one special character,
            */
            if (!isEightCharacter.test(inputVal)) {
                console.log('Not eight characters!');
                isValid = false
            }
            if (!containsLowercase.test(inputVal)) {
                console.log('Doesn\'t contain a lowercase!');
                isValid = false
            }
            if (!containsUppercase.test(inputVal)) {
                console.log('Doesn\'t contain an uppercase!');
                isValid = false
            }
            if (!containsDigit.test(inputVal)) {
                console.log('Doesn\'t contain a digit!');
                isValid = false
            }
            if (!containsSpecial.test(inputVal)) {
                console.log('Doesn\'t contain a special character');
                isValid = false
            }
            break;
    }
    return isValid;
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
    var url = `https://${urlPrefix}.team22.softwareengineeringii.com/cs/user/register`;

    var register = { 'cloud': urlPrefix }
    form = document.getElementById(this.id);
    inputs = form.querySelectorAll('input');

    let noneAreEmpty = [];
    let emptyFieldIds = [];
    inputs.forEach((input, i) => {
        let isValid = inputValidation(input);
        // console.log(isValid);
        if (!isValid) {
            input.style.borderColor = 'red';
            noneAreEmpty.push(isValid);
            emptyFieldIds.push(input.id)
        } else {
            register[`${input.id}`] = input.value;
        }
    })
    if (noneAreEmpty.includes(false)) {
        return false;
    }

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