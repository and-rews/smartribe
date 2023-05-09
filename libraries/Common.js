var moduleContent;
var runningPostback = false;

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

// Makes modals accessible
//$(".modal").on("shown", function () {
//    document.activeElement.blur();
//    $(this).find(".modal-body :input:visible").first().focus();
//});

//// Returns focus to link, special case for TA tables
//$('.modal').on('hidden.bs.modal', function (e) {
//    if ('.row_selected') {
//        $('.row_selected .control a').focus();
//        return true;
//    }
//    else {
//        $("[data-toggle~='modal']").focus();
//        console.log('no row_selected');
//        return false;
//    }
//});


// Extension to allow us to replace the tag
$.extend({
    replaceTag: function (currentElem, newTagObj, keepProps) {
        var $currentElem = $(currentElem);
        var i, $newTag = $(newTagObj).clone();
        if (keepProps) {//{{{
            newTag = $newTag[0];
            newTag.className = currentElem.className;
            $.extend(newTag.classList, currentElem.classList);
            $.extend(newTag.attributes, currentElem.attributes);
        }//}}}
        $currentElem.wrapAll($newTag);
        $currentElem.contents().unwrap();
        // return node; (Error spotted by Frank van Luijn)
        return this; // Suggested by ColeLawrence
    }
});

$.fn.extend({
    replaceTag: function (newTagObj, keepProps) {
        // "return" suggested by ColeLawrence
        return this.each(function () {
            jQuery.replaceTag(this, newTagObj, keepProps);
        });
    }
});

/* shows the freezer for PostBack events */
/* Put your code to run before UpdatePanel begins async postback here */
$(function () {
    function beforeAsyncPostBack(e) {
        if (moduleContent == null) {
            moduleContent = $(e._activeElement).closest('.DNNModuleContent');
        }

        $('#freezerIcon').detach().appendTo($(moduleContent));
        showFreezer();

    }

    // Put your code to run after UpdatePanel finishes async postback here
    function afterAsyncPostBack() {
        $('#freezerIcon').detach().insertAfter($('footer.site-footer'));
        hideFreezer();
        runningPostback = false;
    }

    function initializePostBack(sender, args) {
        if (runningPostback) {
            args.set_cancel(true);
        }
        runningPostback = true;
    }

    // Don't mess with any of the below code
    Sys.Application.add_init(appl_init);

    function appl_init() {
        var pgRegMgr = Sys.WebForms.PageRequestManager.getInstance();
        pgRegMgr.add_initializeRequest(initializePostBack);
        pgRegMgr.add_beginRequest(beforeAsyncPostBack);
        pgRegMgr.add_endRequest(afterAsyncPostBack);
    }
});
