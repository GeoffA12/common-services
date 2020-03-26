let sendRegistrationForm = () => {
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let phoneNumber = document.getElementById('phonenumber').value; 
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    var urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";

    const registration = {
        "firstname": firstName,
        "lastname": lastName,
        "phoneNumber": phoneNumber,
        "email": email,
        "password": password,
        "cloud": urlPrefix
    }
    sessionStorage.setItem('username', email);

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(registration)
    }
    // console.log(payload);

    var url = `https://${urlPrefix}.team22.softwareengineeringii.com/registerHandler`;
    // console.log(url)

    fetch(url, payload).then(function (response) {
        // console.log(response.status);
        if (response.status == 200) {
            url = `https://${urlPrefix}.team22.softwareengineeringii.com/${urlPrefix}-front-end/dashboard/dashboard.html`
            window.location.assign(url);
        } else {
            alert("Email is already in use");
        }
    }).catch(function (error) {
        console.error(error)
    });
}