let sendPostRequest = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    var urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
    const login = {
        "username": username,
        "password": password,
        "cloud": urlPrefix
    };
    sessionStorage.setItem('username', username);

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(login)
    }
    // console.log(payload);
    var url = `https://${urlPrefix}.team22.softwareengineeringii.com/loginHandler`;

    fetch(url, payload).then(function (response) {
        // console.log(response.status);
        if (response.status == 200) {
            url = `https://${urlPrefix}.team22.softwareengineeringii.com/${urlPrefix}-front-end/dashboard/dashboard.html`
            window.location.assign(url);
        } else {
            document.getElementById('loginError').innerHTML = 'Invalid login or password'
        }
    }).catch(function (error) {
        console.error(error)

    });
}