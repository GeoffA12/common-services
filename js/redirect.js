let urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
let goToLogin = () => {
    if (localStorage.getItem('username') != null) {
        window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/${urlPrefix}-front-end/dashboard/dashboard.html`);
    } else {
        window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/common-services/login/login.html`);
    }
}
let goToRegister = () => {
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/common-services/register/register.html`);
}
let goToLanding = () => {
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com`);
}

let signOut = () => {
    localStorage.removeItem('username');
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/confirmsignout.html`);
}
