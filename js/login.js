$('#loginForm').submit(async function (e) {
    e.preventDefault();

    var urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
    var url = `https://${urlPrefix}.team22.softwareengineeringii.com/loginHandler`;
    // console.log(url);

    var login = {'cloud': urlPrefix}
    form = document.getElementById(this.id);
    // console.log(form);
    inputs = form.querySelectorAll('input');
    // console.log(inputs);
    
    inputs.forEach((input, i) => {
        // console.log(input);
        login[`${input.id}`] = input.value;
    })
    // console.log(login)

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
            url = `https://${urlPrefix}.team22.softwareengineeringii.com/${urlPrefix}-front-end/dashboard/dashboard.html`;
            window.location.assign(url);
        } else {
            document.getElementById('error').innerHTML = 'Invalid login or password';
        }
    }).catch(err => {
        console.log('Error: ', err);
    });
})