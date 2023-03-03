$(document).ready(function () {
    i18next.use(i18nextXHRBackend).init({
        lng: 'vi',
        debug: true,
        backend: {
            loadPath: 'locales/{{ lng }}.json'
        }
    }, function (err, t) {
        // init set content
        updateContent();
    });

    function updateContent() {
        document.querySelector('a[data-i18n="signin"]').innerHTML = i18next.t('signin');
        document.querySelector('a[data-i18n="signup"]').innerHTML = i18next.t('signup');
        document.querySelector('h1[data-i18n="section-h1-1"]').innerHTML = i18next.t('section-h1-1');
    }

    document.getElementById('en').addEventListener('click', function () {
        var image = document.getElementById("imgen");
        var imageDropdown = document.getElementById("imgdropdown");
        imageDropdown.src = image.src;
        i18next.changeLanguage('en', function (err, t) {
            updateContent();
        });
    });

    document.getElementById('vi').addEventListener('click', function () {
        var image = document.getElementById("imgvi");
        var imageDropdown = document.getElementById("imgdropdown");
        imageDropdown.src = image.src;
        i18next.changeLanguage('vi', function (err, t) {
            updateContent();
        });
    });

    $(".dropdown").hover(function () {
        $(this).find(".dropdown-menu").stop(true, true).delay(100).fadeIn(200);
    }, function () {
        $(this).find(".dropdown-menu").stop(true, true).delay(100).fadeOut(200);
    });
});