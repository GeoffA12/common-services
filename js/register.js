$('#registerForm').submit(async e => {
    e.preventDefault();

    var urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
    var url = `https://${urlPrefix}.team22.softwareengineeringii.com/registerHandler`;
    // console.log(url)

    var register = {'cloud': urlPrefix}
    form = document.getElementById('registerForm');
    // console.log(form);
    inputs = form.querySelectorAll('input');
    // console.log(inputs);

    inputs.forEach((e, i) => {
        // console.log(e);
        register[`${e.id}`] = e.value;
    })
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
            // document.getElementById('error').innerHTML = 'Invalid login or password'
        }
    }).catch(err => {
        console.log('Error: ', err);
    });
})