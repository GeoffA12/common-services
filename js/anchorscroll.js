$(function () {
    var currentHash = "#top"
    document.addEventListener('scroll', function (event) {
        $('.hash').each(function () {
            var top = window.pageYOffset;
            var distance = top - $(this).offset().top;
            var hash = $(this).attr('href');

            if (distance < 75 && distance > -65 && currentHash != hash) {
                if (history.pushState) {
                    history.pushState(null, null, hash);
                } else {
                    window.location.hash = hash;
                }
                currentHash = hash;
                // console.log(hash)
            }
        });
    }, true);
});