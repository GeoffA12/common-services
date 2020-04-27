var urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
var goToLogin = () => {
    if (localStorage.getItem('username') != null) {
        window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/${urlPrefix}-front-end/dashboard/dashboard.html`);
    } else {
        window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/common-services/login/login.html`);
    }
}
var goToRegister = () => {
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/common-services/register/register.html`);
}
var goToLanding = () => {
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com`);
}

var signOut = () => {
    localStorage.removeItem('username');
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/common-services/confirmsignout.html`);
}
