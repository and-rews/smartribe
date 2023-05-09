$(document).ready(function (e) {
    let elements = document.querySelectorAll('[data-portal]');
    if (elements && mainPortal && memberPortal) {
        elements.forEach(function (ele) {
            let portal = ele.getAttribute("data-portal");
            let path = ele.href.split(".org")[1];
            if (portal == 1) ele.href = memberPortal + path;
            if (portal == 0) ele.href = mainPortal + path;
        });
    }
});