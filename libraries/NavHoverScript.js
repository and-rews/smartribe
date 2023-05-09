$(document).ready(function (e) {

    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    //if ($('.navbar-header>a>img').length > 1) {
    //    $('#dnn_dnnLOGO_hypLogo').remove();
    //}
    //if exists open active dropdown
    var activeMenuItem;

    if (document.querySelector('#main-nav .dropdown-menu li.active')) {
        activeMenuItem = document.querySelector('li.active').parentNode.parentNode;
        activeMenuItem.className += ' open';
        document.getElementById('TopContent').style.marginTop = '45px';
    }

    //get all menuitems w. dropdown, and add hover events
    var dropdowns = document.querySelectorAll('#main-nav>ul>li.dropdown');
    Array.prototype.forEach.call(dropdowns, function (ele) {
        if (ele != activeMenuItem) {
            ele.addEventListener('mouseover', function (e) {
                this.className += ' open';
                if (activeMenuItem) {
                    activeMenuItem.className = activeMenuItem.className.replace(" open", '');
                }
            });

            ele.addEventListener('mouseout', function (e) {
                this.className = this.className.replace(" open", '');
                if (activeMenuItem) {
                    activeMenuItem.className += ' open';
                }
            });
        }
    });
    // get dropdown links and add event on focus (for keyboard users)
    var dropdownLinks = document.querySelectorAll('#main-nav>ul>li.dropdown>a');
    Array.prototype.forEach.call(dropdownLinks, function (ele) {
        ele.addEventListener('focus', function (e) {
            Array.prototype.forEach.call(dropdownLinks, function (ele) {
                ele.parentNode.className = ele.parentNode.className.replace(" open", '');
            });
            this.parentNode.className += ' open';
        });
    });

    // MEGA MENU mobile behavior -- #mobile-menu > div > ul > li.dropdown.open > ul > li.dropdown.active > a
    var mobileMegaMenuDropdowns = document.querySelectorAll('#mobile-menu>div>ul>li.dropdown>ul>li.dropdown>a');
    Array.prototype.forEach.call(mobileMegaMenuDropdowns, function (ele) {
        ele.addEventListener('click', handleDropdownClick);
    });
    // MEGA MENU ----------------------

    // change behavior for mobile nav
    var mobileDropdowns = document.querySelectorAll('#mobile-menu>div>ul>li.dropdown>a');
    var mobileFooterDropdowns = document.querySelectorAll('#mobile-footer-menu>ul>li.dropdown>a');
    Array.prototype.forEach.call(mobileDropdowns, function (ele) {
        ele.addEventListener('click', handleDropdownClick);
    });
    Array.prototype.forEach.call(mobileFooterDropdowns, function (ele) {
        ele.addEventListener('click', handleDropdownClick);
    });

    var menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {menuIcon.addEventListener('click', handleExpandMobileMenu);}


    $(".search").keypress(function (e) {
        if (e.keyCode == 13 || e.which == 13) {
            $(this).siblings('.search-btn').click();
            e.preventDefault();
        }
    });

    $(".search-btn").click(function (e) {
        e.preventDefault();
        var notPlaceholder = ($(this).siblings(".search").data('placeholder') == null || $(this).siblings(".search").val() != $(this).siblings("#search").data('placeholder').placeholder);
        if ($(this).siblings(".search").val() != "" && notPlaceholder) {
            location.href = "/search.aspx?q=" + $(this).siblings(".search").val();
        } else {
            alert("Please enter at least one search term.");
        }
    });

    if (document.querySelector('.toggle-btns')) {
        var toggle1 = document.querySelector('.toggle-btns .toggle1');
        var toggle2 = document.querySelector('.toggle-btns .toggle2');
        toggle2.addEventListener('click', function (e) {
            e.preventDefault();
            toggle1.className = toggle1.className.replace(" btn-default", '');
            toggle1.className += ' purple-border';
            toggle2.className += ' btn-default';
            toggle2.className = toggle2.className.replace(" purple-border", '');
            $('#toggle1-content').hide();
            $('#toggle2-content').show();
        });
        toggle1.addEventListener('click', function (e) {
            e.preventDefault();
            toggle1.className += ' btn-default';
            toggle1.className = toggle1.className.replace(" purple-border", '');
            toggle2.className = toggle2.className.replace(" btn-default", '');
            toggle2.className += ' purple-border';
            $('#toggle1-content').show();
            $('#toggle2-content').hide();
        });
    }

    
    if (document.getElementsByClassName("mySlides").length) {
        showSlides(slideIndex);
    }
    
    if ($('.countup').length >= 0) {
        $('.countup').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            },
            {
                duration: 8000,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(numberWithCommas(this.countNum));
                    //alert('finished');
                }
            });
        });
    }

    $(".prev, .next, .dot").keydown(function (e) {
        switch (e.which) {
            case 37: // left
                plusSlides(-1)
                break;

            case 39: // right
                plusSlides(1)
                break;

            case 13:
                $(event.target).click();
                break;

            default: return; // exit this handler for other keys
        }
    });
    
});

function handleExpandMobileMenu (e) {
    e.preventDefault();
    var menu = document.getElementById('mobile-menu');
    if (menu.classList) {
        menu.classList.toggle('hidden');
    } else {
        var classes = menu.className.split(" ");
        var i = classes.indexOf("hidden");

        if (i > 0) {
            classes.splice(i, 1);
        } else {
            classes.push('hidden');
            menu.className = classes.join(" ");
        }
    }
    
}

var slideIndex = 1;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (dots.length) {
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        dots[slideIndex - 1].className += " active";
    }
    
    slides[slideIndex - 1].style.display = "block";
    
}

function handleDropdownClick(e) {
    console.log("clicked!");
    e.preventDefault();
    this.removeEventListener("click", handleDropdownClick);
    //this.removeEventListener("touchstart", handleDropdownClick);
    this.parentNode.className += 'open';
    this.scrollIntoView();
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}