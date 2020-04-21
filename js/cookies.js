var header = {
    "alg": "HS256",
    "typ": "JWT"
};

let base64url = (source) => {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}

var secret = 'NiQc45rSCNGuXxZ91dBdId2GFclHAA00Tgjg1ABwjQIaxinNxZYqPb3mOH48fqI';

let makeCookie = (username, password, expiration, domain) => {
    alert('making a cookie');
    var data = {
        'username': username,
        'password': password
    };
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);

    var signature = encodedHeader + "." + encodedData;
    signature = CryptoJS.HmacSHA256(signature, secret);
    signature = base64url(signature);

    totallySecretToken = encodedHeader + '.' + encodedData + '.' + signature;
    alert(totallySecretToken);
    alert(expiration)
    cookie = `token=${totallySecretToken}; path=/ ; Domain=${domain}; expires=${expiration};`
    document.cookie = cookie;
    alert(document.cookie);
}

let getCookie = name => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

Date.prototype.addMinutes = function (minute) {
    this.setTime(this.getTime() + (minute * 60 * 1000));
    return this;
}

Date.prototype.addHours = function (hour) {
    this.setTime(this.getTime() + (hour * 60 * 60 * 1000));
    return this;
}

Date.prototype.addDays = function (day) {
    this.setTime(this.getTime() + (day * 24 * 60 * 60 * 1000));
    return this;
}

Date.prototype.addWeeks = function (week) {
    this.setTime(this.getTime() + (week * 7 * 24 * 60 * 60 * 1000));
    return this;
}

Date.prototype.addMonths = function (month) {
    this.setTime(this.getTime() + (month * 30 * 24 * 60 * 60 * 1000));
    return this;
}

Date.prototype.addYears = function (month) {
    this.setTime(this.getTime() + (month * 365 * 24 * 60 * 60 * 1000));
    return this;
}
