/*Start Basic*/
document.body.addEventListener('click', () => document.getElementsByClassName('shown').length ? document.querySelector('.shown').classList.remove('shown') : null);
let showers = document.querySelectorAll('.reply-form, .reply-toggle, .nav-toggle-button, .offcanvas-toggler, .offcanvas-holder, .expo-toggler, .expo-wrapper, .selector, .select-dropdown');
[...showers].forEach(e => e.addEventListener('click', o => o.stopPropagation()));
const getChildren = (n, skip) => {
    let r = [];
    for (; n; n = n.nextSibling) {
        n.nodeType == 1 && n != skip ? r.push(n) : null;
    }
    return r;
};
const getSiblings = n => getChildren(n.parentNode.firstChild, n);
/*End Basic*/

/*Start Accordion*/
[...document.querySelectorAll('.accord-item')].forEach(e => e.addEventListener('click', () => {
    e.classList.toggle('active');
    e.classList.contains('single') ? [...getSiblings(e)].forEach(g => g.classList.remove('active')) : null;
}));
[...document.querySelectorAll('.accord-content')].forEach(e => e.addEventListener('click', z => z.stopPropagation()));
;
/*End Accordion*/

/*Start Expo*/
let exposer = document.querySelectorAll('.expo-toggler');
[...exposer].forEach(u => u.addEventListener('click', () => document.getElementById(u.getAttribute('data-expo')).classList.toggle('shown')));
/*End Expo*/

/*Start Navigation*/
// let
// navToggleButton = document.getElementsByClassName('nav-toggle-button'),
// sidenavtoggler = document.getElementsByClassName('sidenav-toggler');
[...document.getElementsByClassName('nav-toggle-button')].forEach(e => e.addEventListener('click', () => document.querySelector(e.getAttribute('data-nav')).classList.toggle('shown')));
[...document.getElementsByClassName('sidenav-toggler')].forEach(m => m.addEventListener('click', () => document.querySelector('.sidenav-holder').classList.toggle('show')));
/*End Navigation*/

/*Start Notifications*/
const showNotification = (id, timeout) => {
    let noti = document.getElementById(id);
    noti.classList.add('show');
    timeout ? setTimeout(() => noti.classList.remove('show'), timeout) : null;
}, notiCloser = document.getElementsByClassName('notification-closer');
[...notiCloser].forEach(e => e.addEventListener('click', () => document.getElementById(e.getAttribute('data-notification')).classList.remove('show')));
/*End Notifications*/

/*Start Offcanvas*/
// let offcanvastoggler: Node | NodeList = document.querySelectorAll('.offcanvas-toggler');
[...document.querySelectorAll('.offcanvas-toggler')].forEach(u => u.addEventListener('click', () => document.getElementById(u.getAttribute('data-offcanvas')).classList.toggle('shown')));
/*End Offcanvas*/

/*Start Skid*/
// {
//   autoplay,
//   duration,
//   transition,
//   pauseOnHover
// }
// Upgrade
// 1. transition effects
//
// Fixes
// 1. skid slide fadeout effect: next element falling below before fading out
class Skid {
    constructor({ skid = 'skid-wrap', autoplay = true, transition = 'fade', duration = 5e3, pauseOnHover = true }) {
        this.skid = skid;
        this.autoplay = autoplay;
        this.transition = transition;
        this.duration = duration;
        this.pauseOnHover = pauseOnHover;
    }
    init() {
        let skidSlide = document.querySelectorAll(`.${this.skid} .skid-slide`), slideindex = 0;
        skidSlide[slideindex].classList.add('active');
        const skidgo = o => {
            [...[...getSiblings(o)].filter(z => z.classList.contains('skid-slide') == true)].forEach(x => x.classList.remove('active'));
            o.classList.add('active');
        }, nxSlide = () => skidgo(skidSlide[slideindex = slideindex == skidSlide.length - 1 ? 0 : slideindex + 1]), prvSlide = () => skidgo(skidSlide[slideindex = slideindex == 0 ? skidSlide.length - 1 : slideindex - 1]);
        [...document.getElementsByClassName('skid-skip-right')].forEach(r => r.addEventListener('click', nxSlide));
        [...document.getElementsByClassName('skid-skip-left')].forEach(r => r.addEventListener('click', prvSlide));
        if (this.autoplay) {
            let zs = setInterval(nxSlide, this.duration);
            this.pauseOnHover ? [...document.getElementsByClassName('u-skid')].forEach(u => u.addEventListener('mouseover', () => {
                if (zs) {
                    clearInterval(zs);
                    zs = null;
                }
                u.addEventListener('mouseout', () => zs == null ? zs = setInterval(nxSlide, this.duration) : null);
            })) : null;
        }
    }
}
// Initiation
// let theNewSkidOnTheBlock = new Skid({
//   skid: 'skid-wrap',
//   autoplay: true,
//   duration: 3000
// });
// theNewSkidOnTheBlock.init();
/*End Skid*/ 

let selector = document.getElementsByClassName('selector');
[...selector].forEach(x => x.addEventListener('click', () => {
    let selectMenu = document.getElementById(x.getAttribute('data-select')), selectItem = document.getElementsByClassName('select-item');
    selectMenu.classList.toggle('shown');
    [].forEach.call(selectItem, r => r.addEventListener('click', () => {
        r.classList.add('selected');
        [...getSiblings(r)].forEach(g => g.classList.remove('selected'));
        let selectinput = document.getElementById(selectMenu.getAttribute('data-select-input'));
        selectinput.value = r.getAttribute('data-value');
        x.innerHTML = r.innerHTML;
        selectMenu.classList.remove('shown');
    }));
}));

// Start tabs
let preactive = document.querySelectorAll('.tab-label.active'), tabheads = document.getElementsByClassName('tab-label');
[...preactive].forEach(n => document.getElementById(n.getAttribute('data-tab')).classList.add('active'));
[...tabheads].forEach(m => m.addEventListener('click', () => {
    m.classList.add('active');
    document.getElementById(m.getAttribute('data-tab')).classList.add('active');
    [...getSiblings(document.getElementById(m.getAttribute('data-tab')))].forEach(a => a.classList.remove('active'));
    [...getSiblings(m)].forEach(a => a.classList.remove('active'));
}));
// End tabs

// Start comments
const replies = document.getElementsByClassName('reply-toggle');
[...replies].forEach(a => a.addEventListener('click', () => document.getElementById(a.getAttribute('data-reply')).classList.toggle('shown')));
// End comments

/*
1. required = boolean
2. minCount = number
3. maxCount = number
4. type = number, email, phone, internationalphone
5. format = capital, uppercase, lowercase... - discarded
6. unique = ['uniq1', 'uniq2']
7. censor = ['!', '@']
8. allow = [], replaced with subsume
9. match = /reg/
10. customValidation - user defined custom validation, must return a boolean
*/
// regexes tested
/*
let correctemail = ['mkyong@yahoo.com', 'mkyong-100@yahoo.com', 'mkyong.100@yahoo.com', 'mkyong111@mkyong.com', 'mkyong-100@mkyong.net', 'mkyong.100@mkyong.com.au', 'mkyong@1.com', 'mkyong@gmail.com.com', 'mkyong+100@gmail.com', 'mkyong-100@yahoo-test.com'];

let incorrectemail = ['mkyong', 'mkyong@.com.my', 'mkyong123@gmail.a', 'mkyong123@.com', 'mkyong123@.com.com', '.mkyong@mkyong.com', 'mkyong()*@gmail.com', 'mkyong@%*.com', 'mkyong..2002@gmail.com', 'mkyong.@gmail.com', 'mkyong@mkyong@gmail.com', 'mkyong@gmail.com.1a'];

let correctinternationalPhone = ['+1555555555', '+4974339296', '+591 74339296', '+1 (555) 555 5554', '+1 555 555 5554', '+(591) 7433433', '+(591) (4) 6434850', '0591 74339296', '0001 5555555555', '(0001) 5555555', '59145678464'];

[].forEach.call(correctemail, e => {
    document.getElementById("demo").innerHTML += '<br>' + e.match(regexes.email);
});
*/
// update
/*
1. convert to class function
2. allow form identifier to not be limited to IDs
3. add language specifics in regulations to enhance allow, censor....
4. remove helper variable $field_errorMessage
*/
const validate = s => {
    let errors, errorFields = [], key = 0;
    const regexes = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        internationalPhone: /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/
    }, strContains = (o, a) => {
        let qzy = 0;
        for (let d in a) {
            o.includes(a[d]) == true ? qzy++ : null;
        }
        if (qzy > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    for (let f in s) {
        errors = errors != undefined ? errors : [{}];
        s[f].errorField ? errorFields = errorFields ? [...errorFields, s[f].errorField] : null
            : errorFields = [...errorFields, ''];
        s[f].key = key;
        key++;
        if (s[f].regulations) {
            // validating regulations
            let field_errorMessage = { msg: '' };
            [...s[f].regulations].forEach(i => {
                let fdn = document.querySelectorAll("#" + s.form.id + " [name='" + s[f].fieldname + "']");
                // 1. required
                i.required
                    ? [...fdn].forEach(x => !x.value
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 2. minCount
                i.minCount
                    ? [...fdn].forEach(x => x.value && x.value.length < i.minCount
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 3. maxCount
                i.maxCount
                    ? [...fdn].forEach(x => x.value && x.value.length > i.maxCount
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 4.1. type - number
                i.type == 'number'
                    ? [...fdn].forEach(x => x.value && isNaN(x.value)
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 4.2. type - email
                i.type == 'email'
                    ? [...fdn].forEach(x => x.value && !x.value.match(regexes.email)
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 4.3. type - phone
                i.type == 'phone'
                    ? [...fdn].forEach(x => x.value && !x.value.match(regexes.phone)
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 4.4. type - internationalPhone
                i.type == 'internationalPhone'
                    ? [...fdn].forEach(x => x.value && !x.value.match(regexes.internationalPhone)
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 5. censor
                i.censor
                    ? [...fdn].forEach(x => x.value && strContains(x.value, i.censor)
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 6. allow
                i.subsume
                    ? [...fdn].forEach(x => x.value && !strContains(x.value, i.subsume)
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 7. unique
                i.unique
                    ? [...fdn].forEach(x => x.value && i.unique.findIndex(q => q == x.value) != -1
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 8. match
                i.match
                    ? [...fdn].forEach(x => x.value && !x.value.match(i.match)
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
                // 9. customValidation
                i.customValidation
                    ? [...fdn].forEach(x => !i.customValidation()
                        ? errors[key - 1] = field_errorMessage = { msg: field_errorMessage.msg + i.errorMessage }
                        : errors[key - 1] = field_errorMessage) : null;
            });
        } //
    }
    //check if errors array is not empty, otherwise submit form if autoSubmit==true
    const emptyErrors = ee => {
        if (!ee) {
            return true;
        }
        for (let ob in ee) {
            // if(Object.keys(ee[ob]).length !== 0){
            if (ee[ob].msg) {
                return false;
            }
        }
        return true;
    };
    if (!emptyErrors(errors)) { // validation failed
        //send each error to their respective user-defined html tags
        for (let e in errors) {
            // document.querySelector(errorFields[e]).innerHTML = errors[e].msg;
            // Object.keys(errors[e]).length !== 0 ?
            errorFields[e] ? document.querySelector(errorFields[e]).innerHTML = errors[e].msg : null;
        }
        // custom validation failure handler
        s.form.failure ? s.form.failure() : null;
        // prevent submission
        // return false;
    }
    else { // validation success
        for (let v in errorFields) {
            errorFields[v] ? document.querySelector(errorFields[v]).innerHTML = '' : null;
        }
        // autoSubmit handler
        s.form.autoSubmit ? document.forms[s.form.id].submit() : null;
        // success handler
        s.form.success ? s.form.success() : null;
    }
    return true; // do not specify any form submission handlers and validate(x) will return true/false
};
// sample initiation
// object validation rules
// const schema = {
//   form: {
//     id: 'form',
//     autoSubmit: false, //if false, validate(x) returns true
//     success: () => {}, // event handler for form validation success -> make sure to set autosubmit to false
//     failure: () => {}, // event handler for form validation error -> calls whenever validation fails
//   },
//   firstname: {
//     fieldname: 'first',
//     regulations: [
//       {required: true, errorMessage: 'Error message for empty required firstname field'},
//     ],
//     errorField: '.firsterror'
//   },
//   lastname: {
//     fieldname: 'last',
//     regulations: [
//       {required: true, errorMessage: 'Error message for empty required lastname field'},
//     ],
//     errorField: '.lasterror'
//   },
//   email: {
//     fieldname: 'email',
//     regulations: [
//       {required: true, errorMessage: 'Error message for empty required email field<br>'},
//       {type: 'email', errorMessage: 'Error message for invalid email address'}
//     ],
//     errorField: '.emailerror'
//   },
//   localPhone: {
//     fieldname: 'localphone',
//     regulations: [
//       {minCount: '10', errorMessage: 'Error message for localphone mincount<br>'},
//       {type: 'phone', errorMessage: 'Error message for invalid phone number'}
//     ],
//     errorField: '.localphoneerror'
//   },
//   internationalPhone: {
//     fieldname: 'internationalphone',
//     regulations: [
//       {type: 'internationalPhone', errorMessage: 'Error message for invalid internationalPhone'}
//     ],
//     errorField: '.internationalphoneerror'
//   },
//   age: {
//     fieldname: 'age',
//     regulations: [
//       {type: 'number', errorMessage: 'Error message for age not a number'}
//     ],
//     errorField: '.ageerror'
//   },
//   username: {
//     fieldname: 'username',
//     regulations: [
//       {subsume: ['con', 'huff', 'lol'], errorMessage: 'Error message for subsumed characters absent in username'},
//       {match: /^[a-zA-Z]*$/, errorMessage:'Error message for does not match regex'}, // this regex only matches [a-z] and [A-Z]
//       {customValidation: () => { return true }, errorMessage: 'Error message for custom validation'},
//       {unique: ['jeff', 'henry', 'ato'], errorMessage: 'Error message for unique characters in username'}
//     ],
//     errorField: '.usernameerror'
//   }
// }
// document.forms['form'].addEventListener('submit', g => { g.preventDefault(); validate(schema) });

/*Start Tooltips*/
const allToolTips = document.querySelectorAll('.u-tooltip'), showToolTip = zx => {
    /*creation*/
    let title = zx.title, tooltipWrap = document.createElement("div");
    zx.title = '';
    zx.setAttribute('tooltip', title);
    tooltipWrap.className = 'tooltip-wrap';
    tooltipWrap.appendChild(document.createTextNode(title));
    /*appending to DOM*/
    let fsx = document.body.firstChild;
    fsx.parentNode.insertBefore(tooltipWrap, fsx);
    /*position calculation*/
    let linkProps = zx.getBoundingClientRect(), tooltipProps = tooltipWrap.getBoundingClientRect(), topPos = linkProps.top - (tooltipProps.height + 5), bottomPos = linkProps.top + linkProps.height + 5, rightPos = (linkProps.left + linkProps.width) + 5, leftPos = linkProps.left - (tooltipProps.width + 5);
    /*conditional positioning based on className*/
    if (zx.classList.contains('tooltip-top') == true) {
        tooltipWrap.setAttribute('style', `opacity: 1; top: ${topPos}px; left: ${linkProps.left}px;`);
        tooltipWrap.classList.add('tooltip-top');
    }
    else if (zx.classList.contains('tooltip-bottom') == true) {
        tooltipWrap.setAttribute('style', `opacity: 1; top: ${bottomPos}px; left: ${linkProps.left}px;`);
        tooltipWrap.classList.add('tooltip-bottom');
    }
    else if (zx.classList.contains('tooltip-left') == true) {
        tooltipWrap.setAttribute('style', `opacity: 1; top: ${linkProps.top}px; left: ${leftPos}px;`);
        tooltipWrap.classList.add('tooltip-left');
    }
    else if (zx.classList.contains('tooltip-right') == true) {
        tooltipWrap.setAttribute('style', `opacity: 1; top: ${linkProps.top}px; left: ${rightPos}px;`);
        tooltipWrap.classList.add('tooltip-right');
    }
    else {
        tooltipWrap.setAttribute('style', `opacity: 1; top: ${topPos}px; left: ${linkProps.left}px;`);
        tooltipWrap.classList.add('tooltip-top');
    }
}, hideToolTip = zx => {
    let title = zx.getAttribute("tooltip");
    zx.title = title;
    zx.removeAttribute("tooltip");
    document.querySelector(".tooltip-wrap").remove();
};
allToolTips.length ? [...allToolTips].forEach(att => {
    att.addEventListener('mouseover', () => showToolTip(att));
    att.addEventListener('mouseout', () => hideToolTip(att));
}) : null;
/*End Tooltips*/


// start scrollspy
class scrollSpy {
    constructor({ activeClass }) {
        this.activeClass = activeClass;
    }
    init() {
        window.addEventListener('scroll', () => [...document.querySelectorAll('.u-scrollspy')].forEach(sp => {
            let spRect = sp.getBoundingClientRect(), wTop = window.pageYOffset;
            wTop > (wTop + spRect.top) - (document.documentElement.clientHeight * 0.5) && wTop < (wTop + spRect.bottom) - (document.documentElement.clientHeight * 0.5)
                ? document.querySelectorAll(`.${sp.getAttribute('data-scrollspy')}`).forEach(spcur => spcur.classList.add(this.activeClass))
                : document.querySelectorAll(`.${sp.getAttribute('data-scrollspy')}`).forEach(spcur => spcur.classList.remove(this.activeClass));
        }));
    }
}
// initiation
// let x = new scrollSpy({
//   activeClass: 'spy'
// });
// x.init();
// end scrollspy

/*Start Accordion*/
class Typer {
    constructor({ typeField, typeNotes, repeat, timeToRepeat = 5000 }) {
        this.typeField = typeField;
        this.typeNotes = typeNotes;
        this.repeat = repeat;
        this.timeToRepeat = timeToRepeat;
    }
    init() {
        let x = 0;
        const startTyping = () => {
            this.typeField.innerHTML = '';
            let tnarray = this.typeNotes[x].split(''), z = 0;
            x++;
            let 
            // tnInterval = setInterval((typeField=this.typeField, typeNotes=this.typeNotes, repeat=this.repeat) => {
            tnInterval = setInterval(() => {
                this.typeField.innerHTML = this.typeField.innerHTML + tnarray[z];
                z++;
                if (z == tnarray.length) {
                    clearInterval(tnInterval);
                    if (x == this.typeNotes.length) {
                        x = 0;
                        if (this.repeat)
                            setTimeout(startTyping, this.timeToRepeat);
                        else
                            return false;
                    }
                    else
                        setTimeout(startTyping, this.timeToRepeat);
                }
            }, 100);
        };
        startTyping();
    }
}
// sample init
// let someType = new Typer({
//   typeField: document.querySelector('#typefield'),
//   typeNotes: ['Some awesome sample text', 'Some other text'],
//   repeat: true,
//   timeToRepeat: 5000
// });
// someType.init();
/*End Accordion*/ 

