$('#loginForm').submit(async function (e) {
    e.preventDefault();

    var urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
    var url = `https://${urlPrefix}.team22.softwareengineeringii.com/cs/user/login`;
    // console.log(url);

    var login = {'cloud': urlPrefix}
    form = document.getElementById(this.id);
    // console.log(form);
    inputs = form.querySelectorAll('input');
    // console.log(inputs);
    
    inputs.forEach((input, ) => {
        // console.log(input);
        login[`${input.id}`] = input.id == 'rememberMe' ? input.checked : input.value;
    })
    console.log(login)

    var expiration = login['rememberMe'] ? new Date().addMonths(6) : new Date().addHours(2);
    console.log(expiration)
    login['expiration'] = expiration.toISOString();
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(login)
    }).then(res => {
        if (res.status == 200) {
            localStorage.setItem('username', login['username'])
            var domain = `https://${urlPrefix}.team22.softwareengineeringii.com`;
            makeCookie(login['username'], login['password'], expiration.toGMTString(), domain);
            url = `https://${urlPrefix}.team22.softwareengineeringii.com/${urlPrefix}-front-end/dashboard/dashboard.html`;
            window.location.assign(url);
        } else {
            document.getElementById('error').innerHTML = 'Invalid login or password';
        }
    }).catch(err => {
        console.log('Error: ', err);
    });
})