let urlPrefix = (window.location.href.includes("demand")) ? "demand" : "supply";
console.log(urlPrefix);
let goToLogin = () => {
    // console.log('login pressed')
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/common-services/login/login.html`);
}
let goToRegister = () => {
    window.location.assign(`https://${urlPrefix}.team22.softwareengineeringii.com/common-services/register/register.html`);
}