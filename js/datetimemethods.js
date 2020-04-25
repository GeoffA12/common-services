Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}
Date.prototype.addDays = function (d) {
    this.setTime(this.getTime() + (d * 24 * 60 * 60 * 1000));
    return this;
}  
Date.prototype.addMonths = function (m) {
    this.setTime(this.getTime() + (m * 30 * 24 * 60 * 60 * 1000));
    return this;
}  
