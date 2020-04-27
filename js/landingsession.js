let landingSession = () => {
    let account = localStorage.getItem('username');
    let accountHeader = document.getElementById('account');
    let advanceButton = document.getElementById('advance');
    accountHeader.textContent = '';  

    if (account != null) {
        accountHeader.classList.add('btn-group')
        let dropdownButton = document.createElement('BUTTON');
        
        dropdownButton.setAttribute('class', 'btn op dropdown-toggle');
        dropdownButton.setAttribute('data-toggle', 'dropdown');
        dropdownButton.setAttribute('data-display', 'static');
        dropdownButton.setAttribute('aria-haspopup', 'true');
        dropdownButton.setAttribute('aria-expanded', 'false');
        
        let accountAnchor = document.createElement('A');
        accountAnchor.setAttribute('href', '#');
        accountAnchor.setAttribute('id', 'accountName');
        
        dropdownButton.appendChild(accountAnchor);

        let dropdownMenu = document.createElement('DIV');
        dropdownMenu.setAttribute('class', 'dropdown-menu dropdown-menu-right dropdown-menu-lg-left');
        let profile = document.createElement('A');
        profile.setAttribute('class', 'dropdown-item');
        profile.setAttribute('href', '#');
        profile.innerHTML = 'Profile';
        
        let settings = document.createElement('A');
        settings.setAttribute('class', 'dropdown-item');
        settings.setAttribute('href', '#');
        settings.innerHTML = 'Settings';

        let signOut = document.createElement('A');
        signOut.setAttribute('class', 'dropdown-item');
        signOut.setAttribute('href', '#');
        signOut.setAttribute('onclick', 'signOut()')
        signOut.innerHTML = 'Logout';

        dropdownMenu.appendChild(profile);
        dropdownMenu.appendChild(settings);
        dropdownMenu.appendChild(signOut);

        accountHeader.appendChild(dropdownButton);
        accountHeader.appendChild(dropdownMenu);

        advanceButton.innerHTML = 'Go To Dashboard';
        advanceButton.setAttribute('onclick', 'goToLogin()');

    } else {
        let loginButton = document.createElement('BUTTON');
        loginButton.setAttribute('id', 'loginButton');
        loginButton.setAttribute('onclick', 'goToLogin()');
        loginButton.innerHTML = 'Log in';
        
        let signupButton = document.createElement('BUTTON');
        signupButton.setAttribute('id', 'signupButton');
        signupButton.setAttribute('class', 'op');
        signupButton.setAttribute('onclick', 'goToRegister()');
        signupButton.innerHTML = 'Sign Up';

        accountHeader.appendChild(loginButton);
        accountHeader.appendChild(signupButton);

        advanceButton.innerHTML = 'Get Started';
        advanceButton.setAttribute('onclick', 'goToRegister()');
    }
}