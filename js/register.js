let inputValidation = input => {
    let inputId = input.id;
    let inputVal = input.value;
    let inputValLen = inputVal.length;
    input.style.borderColor = 'rgb(196, 194, 190)';
    if (inputValLen == 0) {
        input.style.borderColor = 'red';
        return false;
    }
    switch (inputId) {
        case 'email':
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!(regex.test(inputVal))) {
                input.style.borderColor = 'red';
                return false;
            }
            break;

        case 'password':
            var passwordRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if (!(passwordRegex.test(inputVal))) {
                input.style.borderColor = 'red';
                return false;
            }
            break;
    }
}

$(document).ready(
    $('input').blur(function (e) {
        let myInput = this
        inputValidation(myInput);
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
        // console.log(e);
        if (!inputValidation(input)) {
            noneAreEmpty.push(inputValidation(input));
            emptyFieldIds.push(input.id)
        } else {
            register[`${input.id}`] = input.value;
        }
    })
    // console.log(register);
    // console.log(emptyFieldIds)
    // console.log(noneAreEmpty);

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