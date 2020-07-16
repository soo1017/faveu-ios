/* ***************************** */
/* ***** General Functions ***** */
// To change a string into its title case
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/* ----- Function: Error Handling ----- */
function errorHandling(err, current, next) {
    if (err) {
        if (err === 'OK') {
            var nextPage = "#id-page-" + next;
            page.changePage(nextPage);
            page.currentPage = "#id-page-" + current; 
        } else {
            $("#id-pageerror-error-message").text(err)
            page.changePage("#id-page-error");
            page.currentPage = "#id-page-" + current;
        }
    }
}

/* ----- Function: Collect push Notification Data for Result----- */
function assignPushData4SuccessAndFailAndCom(data, mode) {
    var temp = {
        token: data.notification.payload.additionalData.token,
        faveun: data.notification.payload.additionalData.faveun,
        usern: data.notification.payload.additionalData.usern
    }
    var comchat = {
        token: data.notification.payload.additionalData.token,
        user: data.notification.payload.additionalData.user,
        room: data.notification.payload.additionalData.room,
    }
    if (mode === 'comchat') {
        window.localStorage.setItem("faveu_response", JSON.stringify(comchat));
    } else {
        if (mode === 'commsg') {
            temp.lovemessage = data.notification.payload.additionalData.lovemessage
        } else {
            temp.usera = data.notification.payload.additionalData.usera
        }
        window.localStorage.setItem("faveu_response", JSON.stringify(temp));
    }
}

/* ****************************************************** */
/* ***** Competitors - Its Properties and Functions ***** */
var competitor = {
    competitors: [],
    avatar_ready: 0,
    addCompetitor: function(name) {
        var newCompetitor = {
            name: name,
            avatar: 'avatar0'
        }
        this.competitors.push(newCompetitor);
        this.displayCompetitors();
        this.determine2ButtonSize();
    },
    addAvatar4Competitor: function(self, num) {
        var selector = '.cls-page5-best'+num+'-img img'
        $(selector).attr('alt', $(self).attr('alt'));                   // change alt's value
        $(selector).attr('src', faveu_avatar[$(self).attr('alt')]);     // KEY
        this.competitors[num].avatar = $(self).attr('alt');
    },
    removeCompetitor: function(num) {
        this.competitors.splice(num, 1);
        this.displayCompetitors();
        this.determine2ButtonSize();
    },
    determine2ButtonSize: function() {
        if (this.competitors.length <2) {
            setTimeout(function() {
                $('.cls-page5-form-divS1').css('width', '98%');
                $('.cls-page5-form-divS1').css('transition', 'width 0.5s');
                $('.cls-page5-form-divS2').css('width', '2%');
                $('.cls-page5-form-divS2').css('transition', 'width 0.5s');
            }, 600);
            $('.cls-page5-form-divS2').hide(600);
        } else {
            setTimeout(function() {
                $('.cls-page5-form-divS2').show(600);
            }, 600);
            $('.cls-page5-form-divS1').css('width', '85%');
            $('.cls-page5-form-divS1').css('transition', 'width 0.5s');
            $('.cls-page5-form-divS2').css('width', '15%');
            $('.cls-page5-form-divS2').css('transition', 'width 0.5s');
        }
    },
    displayCompetitors: function() {
        this.clearOffCompetitorsSection();
        var selector_bestman_divId = '';
        var selector_bestman_blkBId = '';
        var selector_bestman_DeleteBtn = '' 
        for (var i=0; i<4; i++) {
            selector_bestman_divId = 'id-page5-best' + i + '-div';
            selector_bestman_blkBId = 'id-page5-best' + i + '-block-b';
            selector_bestman_DeleteBtn = 'cls-page5-best' + i + '-delete';
            if (this.competitors[i]) {
                $('#' + selector_bestman_divId + ' .ui-block-best').show();
                var selector_avaimg = '.cls-page5-best' + i + '-img img';
                var link_avaimg = './img/avatar/' + this.competitors[i].avatar + '.png';
                $(selector_avaimg).attr('src', link_avaimg);
                $(selector_avaimg).attr('alt', this.competitors[i].avatar);

                $('#' + selector_bestman_divId + ' .ui-block-b').attr('id', selector_bestman_blkBId);  // "id" attribute inserted (occupied)
                $('#' + selector_bestman_divId + ' .ui-block-b p').text(this.competitors[i].name);  // Insert bestman name in Blk B
                $('#' + selector_bestman_divId + ' .' + selector_bestman_DeleteBtn).removeAttr("style");  // Display button
            } else {
                $('#' + selector_bestman_divId + ' .ui-block-b').removeAttr('id');
                $('#' + selector_bestman_divId + ' .ui-block-b p').text('');
                $('#' + selector_bestman_divId + ' .' + selector_bestman_DeleteBtn).attr("style", "display:none;");
                $('#' + selector_bestman_divId + ' .ui-block-best').hide(400);
            }
        }
    },
    clearOffCompetitorsSection: function() {
        for (var n=0; n<4; n++) {
            if ($('div.cls-page5-best' + n + '-div .ui-block-b p').text() == '') {
                $('div#id-page5-best' + n + '-div .ui-block-b').removeAttr('id');
                $('div#id-page5-best' + n + '-div .ui-block-best').hide();
            }
        }
    },
    checkFullnessOfCompetitors: function() {
        return this.competitors.length === 4 ? true : false;
    },
    storeAndDisplayCompetitor4ConfirmPage: function() {
        window.localStorage.setItem("faveu_competitors", JSON.stringify(this.competitors));
        window.localStorage.setItem("faveu_numofcompetitors", this.competitors.length.toString());

        // Assign compertitors into confirm page DOM ahead
        $('#id-page61-divS3 .ui-block-b #id-name').text(window.localStorage.getItem("faveuname"));
        $('#id-page61-divS3 .ui-block-b #id-phone').text(window.localStorage.getItem("faveuphone"));
        $('#id-page61-divS3 .ui-block-b #id-email').text(window.localStorage.getItem("faveuemail"));
        
        for (var j=0; j<4; j++) {
            if (this.competitors[j]) {
                $('div.cls-page61-best' + j + '-div .ui-block-b p').text(this.competitors[j].name);
                $('div.cls-page61-best' + j + '-img img').attr('alt', this.competitors[j].avatar);
                $('div.cls-page61-best' + j + '-img img').attr('src', faveu_avatar[this.competitors[j].avatar]);
            } else {
                $('div.cls-page61-best' + j + '-div .ui-block-best').hide();
            }
        }
    }
}
/* *************************************************** */
/* ***** Envelope - Its Properties and Functions ***** */
var envelope = {
    kind: "",
    centerValue: [],

    positioningEnevelopesAtCenter: function() {
        $('.cls-page6-envelopecardS').css({
            position: "absolute",
            top:  0 + "px",
            left: a + "px"
        });
    }
}

/* *************************************************** */
/* ***** Functions of Envelope and Card - Page 6 ***** */
// Envelope Positioning
function positionEnvelope(a) {
    $('.cls-page6-envelopecardS').css({
        position: "absolute",
        top:  0 + "px",
        left: a + "px"
    });
}
// Envelope Close CallBack
function Enevelope_close_callback(a) {
    $('.cls-inner' + a + a).css('display', 'none');
    $('.cls-outer' + a + a).css('display', 'block');
}
// Envelope Close Main
function Enevelope_close(envelopeNum, iPhone, cb) {
    var enevelope_selector = '.cls-invite' + envelopeNum + envelopeNum;
    if (iPhone === 'iPh5') {
        $(enevelope_selector).css('top', low_px.iPh5_low_px);
    } else if (iPhone === 'iPh67') {
        $(enevelope_selector).css('top', low_px.iPh67_low_px);
    } else if (iPhone === 'iPh67s') {
        $(enevelope_selector).css('top', low_px.iPh67s_low_px);
    } else if (iPhone === 'iPhX') {
        $(enevelope_selector).css('top', low_px.iPhX_low_px);
    } else if (iPhone === 'iPad') {
        $(enevelope_selector).css('top', low_px.iPad_low_px);
    } else {}
    $(enevelope_selector).css('transition', 'top 1s');
    setTimeout(function() {
        cb(envelopeNum);
    }, 1000);
}
// Open Envelope and Button Text Change
function openEnevelopeandButtonChange(callback) {
    setTimeout(function() {
        callback();
    }, 500);
}
// Button Change with Open
function changeButton() {
    var $tempbutton = $('.cls-page6-btn');
    $tempbutton.css('background-color', 'rgb(0, 84, 149)');
    $tempbutton.css('color', 'white');
    $tempbutton.css('border', '0');
    $tempbutton.text('SEND');
    $tempbutton.prop('disabled', false);
}
// Close Envelope and Button Text Change
function closeEnevelopeandButtonChange(callback) {
    setTimeout(function() {
        callback();
    }, 500);
}
// Button Change with Close
function changeDisabledButton() {
    var $tempbutton = $('.cls-page6-btn');
    $tempbutton.css('background-color', 'transparent');
    $tempbutton.css('color', 'rgb(0, 84, 149)');
    $tempbutton.css('border', '3px solid rgb(0, 84, 149)');
    $tempbutton.text('TAP TO SELECT');
    $tempbutton.prop('disabled', true);
}
// Select Right Enevelope to Open - SubFunction
function subSelectRightEnvelopeToOpen(a, b, c, d, iPhone) {
    if ( $('.cls-invite' + a + a).css('top') != low_px.iPh5_low_px) {
        Enevelope_close(a, iPhone, Enevelope_close_callback);
    }
    if ( $('.cls-invite' + b + b).css('top') != low_px.iPh67_low_px) {
        Enevelope_close(b, iPhone, Enevelope_close_callback);
    }
    if ( $('.cls-invite' + c + c).css('top') != low_px.iPh67s_low_px ) {
        Enevelope_close(c, iPhone, Enevelope_close_callback);
    }
    if ( $('.cls-invite' + c + c).css('top') != low_px.iPhX_low_px ) {
        Enevelope_close(c, iPhone, Enevelope_close_callback);
    }
    if ( $('.cls-invite' + d + d).css('top') != low_px.iPad_low_px ) {
        Enevelope_close(d, iPhone, Enevelope_close_callback);
    }
}
// Select Right Enevelope to Open - SubFunction2
function subSelectorTogetherHandling(a, iPhone) {
    if (iPhone === 'iPh5') {
        $('.cls-invite' + a + a).css('top', high_px.iPh5_high_px);
    } else if (iPhone === 'iPh67') {
        $('.cls-invite' + a + a).css('top', high_px.iPh67_high_px);
    } else if (iPhone === 'iPh67s') {
        $('.cls-invite' + a + a).css('top', high_px.iPh67s_high_px);
    } else if (iPhone === 'iPhX') {
        $('.cls-invite' + a + a).css('top', high_px.iPhX_high_px);
    } else if (iPhone === 'iPad') {
        $('.cls-invite' + a + a).css('top', high_px.iPad_high_px);
    } else {}
    $('.cls-outer' + a + a).css('display', 'none');
    $('.cls-inner' + a + a).css('display', 'block');
    $('.cls-invite' + a + a).css('transition', 'top 1.5s');
}
// Select Right Enevelope to Open - Main Function
function selectRightEnvelopeToOpen(dom_elmt, iPhone) {
    if ($(dom_elmt).attr('class') == 'cls-outer11') {
        subSelectorTogetherHandling(1, iPhone);
        subSelectRightEnvelopeToOpen(2, 3, 4, 5, iPhone);
    } else if ($(dom_elmt).attr('class') == 'cls-outer22') {
        subSelectorTogetherHandling(2, iPhone);
        subSelectRightEnvelopeToOpen(1, 3, 4, 5, iPhone);
    } else if ($(dom_elmt).attr('class') == 'cls-outer33') {
        subSelectorTogetherHandling(3, iPhone);
        subSelectRightEnvelopeToOpen(1, 2, 4, 5, iPhone);
    } else if ($(dom_elmt).attr('class') == 'cls-outer44') {
        subSelectorTogetherHandling(4, iPhone);
        subSelectRightEnvelopeToOpen(1, 2, 3, 5, iPhone);
    } else if ($(dom_elmt).attr('class') == 'cls-outer55') {
        subSelectorTogetherHandling(5, iPhone);
        subSelectRightEnvelopeToOpen(1, 2, 3, 4, iPhone);
    } else {}
}
// Close Enevelope
function selectEnvelopeToClose(dom_elmt, iPhone) {
    // var temp_string_dom = $(dom_elmt).attr('class');
    var temp_num_dom = parseInt($(dom_elmt).attr('class').slice(19, 20));
    Enevelope_close(temp_num_dom, iPhone, Enevelope_close_callback);
    closeEnevelopeandButtonChange(changeDisabledButton);
}
// Swift Envelope to left
function swiftleft(a, b, c, d, envelope_elmt) {
    if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard1") {
        $('#id-page6-envelopecard').animate({scrollLeft: a}, 300);
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard2") {
        $('#id-page6-envelopecard').animate({scrollLeft: b}, 300);
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard3") {
        $('#id-page6-envelopecard').animate({scrollLeft: c}, 300);
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard4") {
        $('#id-page6-envelopecard').animate({scrollLeft: d}, 300);
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard5") {
    } else {}
}
// Swift Envelope to right
function swiftright(a, b, c, d, envelope_elmt) {
    if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard1") {
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard2") {
        $('#id-page6-envelopecard').animate({scrollLeft: a}, 300);
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard3") {
        $('#id-page6-envelopecard').animate({scrollLeft: b}, 300);
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard4") {
        $('#id-page6-envelopecard').animate({scrollLeft: c}, 300);
    } else if ($(envelope_elmt).attr('class') == "cls-page6-envelopecard5") {
        $('#id-page6-envelopecard').animate({scrollLeft: d}, 300);
    } else {}
}

/* ****************************************** */
/* ***** Functions of Confirm - Page 61 ***** */
function confirmCompetitorWork() {
    if (parseInt(window.localStorage.getItem("faveu_numofcompetitors")) === 3) {
        $('.cls-page61-best2-div .ui-block-best').show();
        $('.cls-page61-best3-div .ui-block-best').show();
    } else if (parseInt(window.localStorage.getItem("faveu_numofcompetitors")) === 4) {
        $('.cls-page61-best3-div .ui-block-best').show();
    } else {}
}

/* **************************************************************** */
/* ***** Functions of Confirm - In case of success submission ***** */
// Transfer Local Storage data into object variable
function transferDataLocalStorage4Submit() {
    var temp_faveu_data = {};
    temp_faveu_data.useremail = window.localStorage.getItem("faveu_useremail");
    temp_faveu_data.username = window.localStorage.getItem("faveu_username");
    temp_faveu_data.differentusername = window.localStorage.getItem("faveu_differentusername");
    temp_faveu_data.useravatar= window.localStorage.getItem("faveu_useravatar");
    temp_faveu_data.userdeviceId= window.localStorage.getItem("faveu_userdeviceId");

    temp_faveu_data.faveuname= window.localStorage.getItem("faveuname");
    temp_faveu_data.faveuphone= window.localStorage.getItem("faveuphone");
    temp_faveu_data.faveuemail= window.localStorage.getItem("faveuemail");

    temp_faveu_data.competitors= JSON.parse(window.localStorage.getItem("faveu_competitors"));  // Array
    temp_faveu_data.numofcompetitors= parseInt(window.localStorage.getItem("faveu_numofcompetitors"));

    temp_faveu_data.invitecard= window.localStorage.getItem("faveu_invitecard");
    temp_faveu_data.os = 'ios';

    return temp_faveu_data;
}

function deleteSomeDataLocalStorage() {
    window.localStorage.setItem("faveu_competitors", "");           // Array
    window.localStorage.setItem("faveu_numofcompetitors", "");
    window.localStorage.setItem("faveu_invitecard", "");
}

function assignSelectedInviteCard() {
    $('.cls-invite7 img').attr('src', smallinvitecard_link[window.localStorage.getItem("faveu_invitecard")]);
}

/* ******************************************************************* */
/* ***** Functions of Success and Faveu - Page Success and Faveu ***** */
function animation_f() {
    var nextImage_f = "./img/success_animation/fireworks_" + animation_index + ".png";
    $('#id-pagecom-animation img').attr('src', nextImage_f);
    if (animation_index == 194) {
        animation_index = 0;
    } else {
        animation_index++;
    }
}
function animation() {
    var nextImage = "./img/success_animation/fireworks_" + animation_index + ".png";
    $('#id-pagesuc-animation img').attr('src', nextImage);
    if (animation_index === 194) {
        animation_index = 0;
    } else {
        animation_index++;
    }
}

/* *************************************************************** */
/* ***** MobileLink Selection - Its Properties and Functions ***** */
var mobileLink = {
    mobileLinkArray: [],
    selectedMobileLink: 0,
    parseLocalStorageData2Array: function() {
        this.mobileLinkArray = [];
        this.mobileLinkArray = JSON.parse(window.localStorage.getItem('faveu_mobileLink'))
    },
    saveBackArray2LocalStorage: function() {
        window.localStorage.setItem('faveu_mobileLink', JSON.stringify(this.mobileLinkArray))
    },
    transferPushData2MobileLinkArray: function(jsonData) {
        var obj_faveuLink = {
            token: jsonData.notification.payload.additionalData.token,
            numofcompetitors: jsonData.notification.payload.additionalData.numofcompetitors,
            invitecard: jsonData.notification.payload.additionalData.invitecard,
            faveun: data.notification.payload.additionalData.faveun,
            competitors: data.notification.payload.additionalData.competitors,
            competitorsavatar: data.notification.payload.additionalData.competitorsavatar
        };
        this.addMobileLink(obj_faveuLink)
    },
    getNumOfMobileLink: function() {
        this.parseLocalStorageData2Array();
        if (this.mobileLinkArray !== null && this.mobileLinkArray !== undefined) return this.mobileLinkArray.length
    },
    displayNumOfMobileLink: function() {
        this.parseLocalStorageData2Array();
        var $mobileLinkNumDisplay = $('.cls-pagelink-p2')
        $('div.cls-pagelink-p1 p').text(this.getNumOfMobileLink())
        this.getNumOfMobileLink() === 1 ? $mobileLinkNumDisplay.text("1 FRIEND SENDS") : $mobileLinkNumDisplay.text(this.getNumOfMobileLink() + " FRIENDS SEND");
    },
    addMobileLink: function(a) {
        this.parseLocalStorageData2Array();
        this.mobileLinkArray.push(a)
        window.localStorage.setItem('faveu_mobileLink', JSON.stringify(this.mobileLinkArray))
    },
    removeOneMobileLink: function(selectedLinkNum) {
        this.mobileLinkArray.splice(selectedLinkNum, 1); 
    },
    displayPreviewAllMobileLink: function() {
        // this.parseLocalStorageData2Array();

        for (var n=0; n<4; n++) {
            if (n < this.getNumOfMobileLink()) {
                $('.cls-pagelinkpv-divS' + n).attr("style", "display: block");
                $('.cls-pagelinkpv-divS' + n + ' img').attr('src', smallinvitecard_blank[this.mobileLinkArray[n].invitecard]);
                if (this.mobileLinkArray[n].invitecard === "card4" || this.mobileLinkArray[n].invitecard === "card5") {
                    $('.cls-pagelinkpv-divS' + n + ' p').css('color', 'rgb(255, 255, 255)');
                }
                for (var m=0; m<5; m++) {
                    if (m < this.mobileLinkArray[n].competitors.length) {
                        $('.cls-pagelinkpv-divS' + n + ' .cls-preview' + n + '-name' + m).attr("style", "display: block");
                        $('.cls-pagelinkpv-divS' + n + ' .cls-preview' + n + '-name' + m).text(this.mobileLinkArray[n].competitors[m])
                    } else {
                        $('.cls-pagelinkpv-divS' + n + ' .cls-preview' + n + '-name' + m).attr("style", "display: none");
                    }
                }
            } else {
                $('.cls-pagelinkpv-divS' + n).attr("style", "display: none");
            }
        }
    },
    projectSelectedMobileLink2Show: function(selectedLinkNum) {
        // this.parseLocalStorageData2Array();
        var faveun_1 = ("Hi ").concat(this.mobileLinkArray[selectedLinkNum].faveun);
        // var faveun_2 = ("Thanks! ").concat(this.mobileLinkArray[selectedLinkNum].faveun);

        for (var i=0; i<5; i++) {
            if (i < this.mobileLinkArray[selectedLinkNum].competitors.length) {
                $("#id-radio" + i).css('display', 'block');
                $('.cls-pagelink1-divS .cls-radio' + i + ' .icr-text p').text(this.mobileLinkArray[selectedLinkNum].competitors[i]);
                $('.cls-pagelink1-divS .radio-img' + i + ' img').attr('src', faveu_avatar[this.mobileLinkArray[selectedLinkNum].competitorsavatar[i]]);
            } else {
                $("#id-radio" + i).css('display', 'none');
            }   
        }
            
        $('#id-pagelink1-text1 #id-pagelink1-p1').text(faveun_1);
        // $('#id-pagelink2-text1 h2').text(faveun_2);
    },
    displaySelectedMobileLink: function(selectedLinkNum) {
        var temp_cardnum = this.mobileLinkArray[selectedLinkNum].invitecard.replace('card', '');

        var card_path = './img/smallinvitecard_linkbg' + this.mobileLinkArray[selectedLinkNum].competitors.length + '/invite_card' + temp_cardnum + '.png';
        var cardline_path = './img/smallinvitecard_line/invite_line' + temp_cardnum + '.png';
        $('#id-pagelink1-bg').attr('src', card_path);
        $('#id-pagelink1-img1 img').attr('src', cardline_path);
        (temp_cardnum == 4 || temp_cardnum == 5) ? 
                    $('.cls-pagelink1-text1, .cls-pagelink1-text2, .cls-pagelink1-divS .icr-label .icr-text').css('color', 'white') 
                    : $('.cls-pagelink1-text1, .cls-pagelink1-text2, .cls-pagelink1-divS .icr-label .icr-text').css('color', 'rgb(0, 84, 149)');
        $('.cls-pagelink1-form-div').css('color', 'rgb(0, 84, 149)')


        if (this.mobileLinkArray[selectedLinkNum].competitors.length === 3) {
            this.setFaveuSelectionBackgroundImg('500px', '570px', '610px', '660px');
        } else if (this.mobileLinkArray[selectedLinkNum].competitors.length === 4) {
            this.setFaveuSelectionBackgroundImg('560px', '635px', '680px', '740px');
        } else if (this.mobileLinkArray[selectedLinkNum].competitors.length === 5) {
            this.setFaveuSelectionBackgroundImg('620px', '705px', '755px', '820px');
        } else {}
    },
    setFaveuSelectionBackgroundImg: function(a, b, c, d) {
        if ($('.cls-pagelink1-text1').css('padding-top') == "11%") {
            $('.cls-pagelink1-bg').css('height', a);
        } else if ($('.cls-pagelink1-text1').css('padding-top') == "10%") {
            $('.cls-pagelink1-bg').css('height', b);
        } else if ($('.cls-pagelink1-text1').css('padding-top') == "9%") {
            $('.cls-pagelink1-bg').css('height', c);
        } else if ($('.cls-pagelink1-text1').css('padding-top') == "8%") {
            $('.cls-pagelink1-bg').css('height', d);
        } else {}
    },
    callbackAfterSubmit: function(selectedLinkNum) {
        this.removeOneMobileLink(selectedLinkNum)
        this.mobileLinkArray.length === 0 ? window.localStorage.setItem("faveu_mode", null) : window.localStorage.setItem("faveu_mode", 'link');
        this.saveBackArray2LocalStorage();

        $('#id-pagelink1-btn').text('SUBMIT');
        $('#id-pagelink1-divS label').removeClass("checked");

        this.placeLinkPreview2OriginalState();
    },
    placeLinkPreview2OriginalState: function() {
        for (var n=0; n<4; n++) {
            $('#id-pagelinkpv-divS' + n + ' img').css("transform", "scale(1.0)");
            $('#id-pagelinkpv-divS' + n).css('filter', 'blur(0px)');
            $('#id-pagelinkpv-divS' + n + ' .cls-preview4-name4').attr("style", "display: none");
            $('#id-pagelinkpv-divS' + n + ' .cls-preview4-name5').attr("style", "display: none");
            $('#id-pagelinkpv-divS' + n + ' p').css('color', 'rgb(160, 160, 160)');
            if (n !== 0) $('#id-pagelinkpv-divS' + n).attr("style", "display: none");
        }
    }
}

/* **************************************************** */
/* ***** Chat Room - Its Properties and Functions ***** */
var chatRoom = {
    // OneChatRoomContent: { roomId: '1212312', content: [{name: 'John', message: 'How are you doing?', createdAt: 'May/6, 12:56pm'}, ...]}
    // ChatRoom: [{room: 'Faveu0', user: [{_id: '12', name: 'Soo', id: '2131', avatar: 'avatar10'}, {_id: '12', name: 'Seung', id: '1234', avatar: 'avatarf'}], roomId: '1'}, ...]
    // CustomId: [ '2312312312', '3244534534, ...]
    OneChatRoomContent: {},
    ChatRoom: [],
    CustomId: [], 
    
    /* ****** General Function ****** */
    checkNumOfChatRoom: function() {
        if (this.ChatRoom) return this.ChatRoom.length;
        return 0
    },
    getUserCustomId: function(roomname) {
        // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
        var temp_index;
        if (this.ChatRoom) temp_index = this.ChatRoom.findIndex((elem) => elem.room === roomname)
        if (temp_index !== -1) return this.CustomId[temp_index]
    },
    getUserName: function(roomname) {
        // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
        var temp_index;
        var temp_customId;
        var temp_user;
        if (this.ChatRoom) temp_index = this.ChatRoom.findIndex((elem) => elem.room === roomname)
        if (this.CustomId) temp_customId = this.CustomId[temp_index]
        if (this.ChatRoom) temp_user = this.ChatRoom[temp_index].user.find((item) => item._id === temp_customId)
        return temp_user.name
    },
    addOneMessage2OneChatRoomContent: function(message) {
        // msg.username, msg.customId, msg.message
        this.OneChatRoomContent.content.push(message)
        // scroll to Bottom of chat screen
        var div = document.getElementById('id-pagesucchat1-msg1');
        div.scrollTop = div.scrollHeight;
    },
    transferLocalStorage2ChatRoom: function() {
        this.ChatRoom = (window.localStorage.getItem('chatRoom') === null || window.localStorage.getItem('chatRoom') === 'null') 
                        ? [] : JSON.parse(window.localStorage.getItem('chatRoom'));
        this.OneChatRoomContent = (window.localStorage.getItem('oneChatRoomContent') === null || window.localStorage.getItem('oneChatRoomContent') === 'null') 
                        ? {} : JSON.parse(window.localStorage.getItem('oneChatRoomContent'));
        this.CustomId = (window.localStorage.getItem('chat_userCustomId') === null || window.localStorage.getItem('chat_userCustomId') === 'null') 
                        ? [] : JSON.parse(window.localStorage.getItem('chat_userCustomId'));
    },
    transferLocalStorageFromChatRoom: function() {
        window.localStorage.setItem('chatRoom', JSON.stringify(this.ChatRoom))
        window.localStorage.setItem('oneChatRoomContent', JSON.stringify(this.OneChatRoomContent))
        window.localStorage.setItem('chat_userCustomId', JSON.stringify(this.CustomId))
    },
    transferLocalStorage2ChatRoomForOnlyContent: function() {
        this.OneChatRoomContent = (window.localStorage.getItem('oneChatRoomContent') === null || window.localStorage.getItem('oneChatRoomContent') === 'null') 
                        ? {} : JSON.parse(window.localStorage.getItem('oneChatRoomContent'));
    },
    searchChatRoomWithRoomname: function(roomname) {
        // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
        return (this.ChatRoom !== undefined && this.ChatRoom !== null) 
                        ? this.ChatRoom.find((elem) => elem.room === roomname) : null
    },
    searchChatRoomWithRoomnameAndUsername: function(roomname, username) {
        // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
        return (this.ChatRoom !== undefined && this.ChatRoom !== null) 
                        ? this.ChatRoom.find((elem) => (elem.room === roomname && (elem.user[0].name === username || elem.user[1].name === username))) : null
    },
    displayChatRoomName: function(roomname) {
        $('#id-pagesucchat1-text1 .ui-block-b h2').text(roomname)
    },
    displayAllChatRoomName: function() {
        this.transferLocalStorage2ChatRoom();
        var newElemHtml = '';
        if (this.ChatRoom) {
            for (var i=0; i<this.ChatRoom.length; i++) {
                newElemHtml += '<div><a><p>' + this.ChatRoom[i].room + '</p></a><img src="./img/symbol/remove.png" id="id-pagesucchat-delete" alt="trash"></div>';
            }
        }
        document.getElementById('id-pagesucchat-active-chatroom').innerHTML = newElemHtml
    },
    updateLocalStorageFromServer: function(chat, username) {
        var temp_onechatroomcontent = {roomId: chat._id, content: chat.content}
        window.localStorage.setItem('oneChatRoomContent', JSON.stringify(temp_onechatroomcontent))
        // When the chat room that you try to join does not exist in "ChatRoom" and "CustomId"
        if (!this.searchChatRoomWithRoomname(chat.room)) {
            var temp_onechatroom = {
                room: chat.room,
                user: chat.user,
                roomId: chat._id
            }
            var temp_chatRoom = (window.localStorage.getItem('chatRoom') === 'null' || window.localStorage.getItem('chatRoom') === null) 
                                ? [] : JSON.parse(window.localStorage.getItem('chatRoom'));
            var temp_chat_userCustomId = (window.localStorage.getItem('chat_userCustomId') === 'null' || window.localStorage.getItem('chat_userCustomId') === null) 
                                ? [] : JSON.parse(window.localStorage.getItem('chat_userCustomId'));
            if (temp_chat_userCustomId.length >= 3) {
                temp_chatRoom.shift()
                temp_chat_userCustomId.shift()
            } 
            temp_chatRoom.push(temp_onechatroom)
            var matched_user = chat.user.find((u) => u.name === username)
            temp_chat_userCustomId.push(matched_user._id)
            
            window.localStorage.setItem('chatRoom', JSON.stringify(temp_chatRoom))
            window.localStorage.setItem('chat_userCustomId', JSON.stringify(temp_chat_userCustomId))
        }
    },
    updateLocalStorageFromServerForOnlyContent: function(chat) {
        var temp_onechatroomcontent = {roomId: chat._id, content: chat.content}
        window.localStorage.setItem('oneChatRoomContent', JSON.stringify(temp_onechatroomcontent))
    },
    clearOffHTMLOfChatRoomContent: function() {
        var deletedHtml = document.getElementById('id-pagesucchat1-msg1')
        deletedHtml.innerHTML = ''
    },
    displayOneChatRoomContent: function(userCustomId) {
        // OneChatRoomContent: { roomId: '', content: [{customId: '', message: '', createdAt: 'May/6, 12:56pm'}, ...]}
        // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
        // CustomId: [ '2312312312', '3244534534, ...]
        var $msgSelector = document.getElementById('id-pagesucchat1-msg1');
        var index_CustomId = this.CustomId.findIndex((id) => id === userCustomId)
        if (this.OneChatRoomContent.content.length !== 0) {
            // console.log("hi-in")
            for (var i=0; i<this.OneChatRoomContent.content.length; i++) {
                if (this.OneChatRoomContent.content[i].customId === userCustomId) {
                    const html1 = '<div class="cls-chatmsg-self ui-grid-b" style="text-align:right;"><div class="ui-block-a"></div><div class="chatmsg-text ui-block-b"><div id="chat-text"><p>' + this.OneChatRoomContent.content[i].message + '</p></div><div><span style="font-size: 11px">' + this.OneChatRoomContent.content[i].createdAt + '</span></div></div></div>'
                    $msgSelector.insertAdjacentHTML('beforeend', html1)
                } else {
                    var other_avatar = '';
                    for (var j=0; j<2; j++) {
                        if (this.ChatRoom[index_CustomId].user[j]._id !== userCustomId) {
                            other_avatar = this.ChatRoom[index_CustomId].user[j].avatar
                        }
                    }
                    const html1 = '<div class="cls-chatmsg-others ui-grid-b" style="text-align:left;"><div class="chatmsg-img ui-block-a"><img src="./img/avatar/' + other_avatar + '"></div><div class="chatmsg-text ui-block-b"><div><p id="chat-text">' + this.OneChatRoomContent.content[i].message + '</p></div><div><span style="font-size: 11px">'+ this.OneChatRoomContent.content[i].createdAt + '</span></div></div></div>'
                    $msgSelector.insertAdjacentHTML('beforeend', html1)
                }
            }
        }
    },
    updateOneChatRoomOneByOne: function(message) {
        // Display
        var $msgSelector = document.getElementById('id-pagesucchat1-msg1');
        var matched_index = this.CustomId.findIndex((id) => id === message.customId)

        if (matched_index !== -1) {
            const html1 = '<div class="cls-chatmsg-self ui-grid-b" style="text-align:right;"><div class="ui-block-a"></div><div class="chatmsg-text ui-block-b"><div id="chat-text"><p>' + message.message + '</p></div><div><span style="font-size: 11px">' + message.createdAt + '</span></div></div></div>'
            $msgSelector.insertAdjacentHTML('beforeend', html1)
        } else {
            var other_avatar = '';
            for (var j=0; j<2; j++) {
                if (this.ChatRoom[matched_index].user[j]._id !== message.customId) {
                    other_avatar = this.ChatRoom[matched_index].user[j].avatar
                }
            }
            const html1 = '<div class="cls-chatmsg-others ui-grid-b" style="text-align:left;"><div class="chatmsg-img ui-block-a"><img src="' + faveu_avatar[other_avatar] + '"></div><div class="chatmsg-text ui-block-b"><div><p id="chat-text">' + message.message + '</p></div><div><span style="font-size: 11px">'+ message.createdAt + '</span></div></div></div>'
            $msgSelector.insertAdjacentHTML('beforeend', html1)
        }
        this.addOneMessage2OneChatRoomContent(message)
    },
    autoScroll: function(totalHeight, $msgSelector) {
            // Visible Height
        const visibleHeight = $msgSelector.offsetHeight
            // Container of messages Height
        const containerHeight = $msgSelector.scrollHeight
            // How far have I scrolled?
        const scrollOffset = $msgSelector.scrollTop + visibleHeight
        if (containerHeight - totalHeight <= scrollOffset) {
            $msgSelector.scrollTop = $msgSelector.scrollHeight
        }
    },


    /* ****** Specific Function ****** */
    createOneChatRoom: function(roomname, username, faveuname, useremail) {
        var userAvatar = JSON.parse(window.localStorage.getItem("faveu_response")).usera 
                    ? JSON.parse(window.localStorage.getItem("faveu_response")).usera : 'avatar27'
        var newchatroom = {
            room: roomname,
            creatoremail: useremail,
            user: [{name: username, avatar: userAvatar}, {name: faveuname, avatar: 'avatarf'}]
        }
        if (this.checkNumOfChatRoom() < 3) {
            Http.setRoute('chat/create')
            Http.setType('post')
            Http.setDataType('json')
            Http.setData(newchatroom)
            var self = this
            var functionReg200 = function(chat0, text) {
                self.updateLocalStorageFromServer(chat0, username)
                self.transferLocalStorage2ChatRoom()
                self.displayChatRoomName(chat0.room)
                socket.emit('join', {username: username, customId: self.getUserCustomId(chat0.room), roomname: chat0.room}, (error) => {
                    if (error) {
                        alert(error)
                        page.changePage("#id-page-successchat");
                        page.currentPage = "#id-page-successchat";
                    }
                })
                window.localStorage.setItem('faveu_mode', null)
            }
            var functionReg400404500 = function(errmsg) {
                errorHandling(errmsg, 'successchat', 'successchat')
                $('#id-pagesucchat-roomname').val('')
                $('#id-pagesucchat-username').val('')
                $('#id-pagesucchat-faveuname').val('')
            }
            Http.aJaxing('successchat', 'successchat1', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500);
        } else {
            errorHandling('Too Many Chat Room Already!', 'successchat', 'successchat')
        }
    },
    joinExistingChatRoom: function(roomname, username) {
        // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
        if (this.searchChatRoomWithRoomname(roomname).roomId === this.OneChatRoomContent.roomId) {          // when the existing room has its content in "OneChatRoomContent"
            this.displayOneChatRoomContent(this.getUserCustomId(roomname))
            this.displayChatRoomName(roomname)
            socket.emit('join', {username: username, customId: this.getUserCustomId(roomname), roomname: roomname}, (error) => {
                if (error) { alert(error)
                    page.changePage("#id-page-successchat");
                    page.currentPage = "#id-page-successchat";
                }
            })
            page.changePage("#id-page-successchat1");
            page.currentPage = "#id-page-successchat";
        } else {
            // console.log("there is no content in 'OneChatRoomContent'")
            this.bringOutOnlyContentFromDB(roomname, username)
            // this.openOneChatRoomByRoomnameAndUsernameThruDB(roomname, username)
        }
    },
    joinExistingChatRoomByRoomname: function(roomname) {
        this.joinExistingChatRoom(roomname, this.getUserName(roomname))
    },
    bringOutOnlyContentFromDB: function(roomname, username) {
        // Http.setRoute('chat/chatroom/?username=' + username + '&roomname=' + roomname)
        // Http.setType('get')
        // Http.setDataType('json')
        var joinchatroom = {
            username: username,
            roomname: roomname
        }
        Http.setRoute('chat/chatroom')
        Http.setType('post')
        Http.setDataType('json')
        Http.setData(joinchatroom)
        var self = this
        var functionReg200 = function(chat, text) {
            self.updateLocalStorageFromServerForOnlyContent(chat)
            self.transferLocalStorage2ChatRoomForOnlyContent()
            self.displayOneChatRoomContent(self.getUserCustomId(chat.room))
            self.displayChatRoomName(chat.room)
            if (window.localStorage.getItem('faveu_mode') === 'comchat') window.localStorage.setItem('faveu_mode', null)
            socket.emit('join', {username: username, customId: self.getUserCustomId(chat.room), roomname: chat.room}, (error) => {
                if (error) { alert(error)
                    page.changePage("#id-page-successchat");
                    page.currentPage = "#id-page-successchat";
                }
            })
        }
        var functionReg400404500 = function(errmsg) { 
            errorHandling(errmsg, 'successchat', 'successchat')
        }
        Http.aJaxing('successchat', 'successchat1', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500);
    },
    joinChatRoomFromDB: function(roomname, username) {
        // Http.setRoute('chat/chatroom/?username=' + username + '&roomname=' + roomname)
        // Http.setType('get')
        // Http.setDataType('json')
        joinchatroom = {
            username: username,
            roomname: roomname
        }
        Http.setRoute('chat/chatroom')
        Http.setType('post')
        Http.setDataType('json')
        Http.setData(joinchatroom)
        var self = this
        var functionReg200 = function(chat, text) {
            self.updateLocalStorageFromServer(chat, username)
            self.transferLocalStorage2ChatRoom()
            self.displayOneChatRoomContent(self.getUserCustomId(chat.room))
            self.displayChatRoomName(chat.room)
            if (window.localStorage.getItem('faveu_mode') === 'comchat') window.localStorage.setItem('faveu_mode', null)
            socket.emit('join', {username: username, customId: self.getUserCustomId(chat.room), roomname: chat.room}, (error) => {
                if (error) { alert(error)
                    page.changePage("#id-page-successchat");
                    page.currentPage = "#id-page-successchat";
                }
            })
        }
        var functionReg400404500 = function(errmsg) { 
            errorHandling(errmsg, 'successchat', 'successchat')
        }
        Http.aJaxing('successchat', 'successchat1', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500);
    },
    removeChatRoom: function(roomname) {
        // OneChatRoomContent: { roomId: '', content: [{customId: '', message: '', createdAt: 'May/6, 12:56pm'}, ...]}
        // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
        // CustomId: [ '2312312312', '3244534534, ...]
        var deleted_item = this.searchChatRoomWithRoomname(roomname)        
        var temp_index = this.ChatRoom.indexOf(deleted_item)
        var deletedroom = {
            id: deleted_item.roomId,
            room: deleted_item.room
        }
        Http.setRoute('chat/delete')
        Http.setType('post')
        Http.setDataType('json')
        Http.setData(deletedroom)
        var self = this;
        var functionReg200 = function(chat, text) {
            // console.log(chat)
            if (temp_index !== -1) {
                self.ChatRoom.splice(temp_index, 1)
                self.CustomId.splice(temp_index, 1)
            }
            if (deleted_item.roomId === self.OneChatRoomContent.roomId) {
                self.OneChatRoomContent={};
            }
            self.transferLocalStorageFromChatRoom()
            self.displayAllChatRoomName()
        }
        var functionReg400404500 = function(errmsg) {
            errorHandling(errmsg, 'successchat', 'successchat')
        }
        Http.aJaxing('successchat', 'successchat', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500);
    },
    updateOneContent2DB: function(roomname) {
        var updateContent = {
            id: this.OneChatRoomContent.roomId,
            room: roomname,
            content: this.OneChatRoomContent.content
        }
        // console.log("updateContent: ", updateContent)
        Http.setRoute('chat/leave')
        Http.setType('post')
        Http.setDataType('json')
        Http.setData(updateContent)
     
        var functionReg200 = function(chat, text) {
            // console.log("leave successfully")
        }
        var functionReg400404500 = function(errmsg) { 
            errorHandling(errmsg, 'successchat1', 'successchat1')
        }
        Http.aJaxing('successchat1', 'successchat', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500);
    },
};

/* ***************************************************** */
/* ***** HTTP(Ajax) - its Properties and Functions ***** */
var Http = {
    url: '',
    type: '',
    dataType: 'json',
    data: {},
    setRoute: function(route) {
        this.url = ''
        this.url = baseUrl + route
    },
    setType: function(type) {
        this.type = type
    },
    setDataType: function(datatype) {
        this.dataType = datatype
    },
    setData: function(data) {
        this.data = data
    },
    aJaxing: function(prepage, afterpage, callback200, callback400, callback404, callback500) {
        $.ajax({
            url: this.url,
            type: this.type,
            dataType: this.dataType,
            data: this.data,
        }).then(function(data, textStatus, jqXHR) {
            // console.log("data: ", data)
            // console.log("jqXHR: ", jqXHR)
            if (jqXHR.status === 200) {
                if (prepage === 61 || prepage === '61') {
                    // self.specialActionForPage61();
                    // console.log("special1")
                    if ($('.cls-invite7 img')) {
                        $('.cls-invite7 img').remove();
                    }
                    var imgf = new Image();
                    var divf = document.getElementById('id-invite-flying7');
                    imgf.onload = function() { divf.appendChild(imgf);};
                    var invitecard_value = window.localStorage.getItem('faveu_invitecard');
                    var invitecard_value_num = invitecard_value.slice(4, 5);
                    imgf.src = './img/smallinvitecard/invite_card' + invitecard_value_num + '.svg';
                }
                callback200(data, jqXHR)
                page.changePage("#id-page-" + afterpage)
                page.currentPage = "#id-page-" + prepage
            } else if (jqXHR.status === 400) {
                callback400(jqXHR.responseJSON.error);
            } else if (jqXHR.status === 404) {
                callback404(jqXHR.responseJSON.error);
            } else if (jqXHR.status === 500) {
                callback500(jqXHR.responseJSON.error);
            } 
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // console.log("jqXHR-fail: ", jqXHR)
            // console.log("textStatus-fail: ", textStatus)
            // console.log("errorThrown-fail: ", errorThrown)
            if (jqXHR.status === 200) {
                if (prepage === 61 || prepage === '61') {
                    // self.specialActionForPage61();
                    if ($('.cls-invite7 img')) {
                        $('.cls-invite7 img').remove();
                    }
                    var imgf = new Image();
                    var divf = document.getElementById('id-invite-flying7');
                    imgf.onload = function() { divf.appendChild(imgf);};
                    var invitecard_value = window.localStorage.getItem('faveu_invitecard');
                    var invitecard_value_num = invitecard_value.slice(4, 5);
                    imgf.src = './img/smallinvitecard/invite_card' + invitecard_value_num + '.svg';
                }
                callback200(jqXHR);
                page.changePage("#id-page-" + afterpage)
                page.currentPage = "#id-page-" + prepage
            } else if (jqXHR.status === 400) {
                callback400(jqXHR.responseJSON.error);
            } else if (jqXHR.status === 404) {
                callback404(jqXHR.responseJSON.error);
            } else if (jqXHR.status === 500) {
                callback500(jqXHR.responseJSON.error);
            } 
        });
    }
}

/* ******************************************************* */
/* ***** Page Control - its Properties and Functions ***** */
var page = {
    currentPage: '',
    nextPage: '',
    currentPageId: '',
    changePage: function(a) {
        $.mobile.changePage(a);
    }
}

/* ****************** */
/* ***** Others ***** */
// (function() {
//     var ofs = 0;
//     window.setInterval(function(){
//       $('#id-pagesuc2-blink_bg img').css('background-color', 'rgba(247, 241, 123,'+Math.abs(Math.sin(ofs))+')');
//       ofs += 0.01;
//     }, 10);
// })();

// self: this,
    // specialActionForPage61: function() {
    //     if ($('.cls-invite7 img')) {
    //         $('.cls-invite7 img').remove();
    //     }
    //     var imgf = new Image();
    //     var divf = document.getElementById('id-invite-flying7');
    //     imgf.onload = function() { divf.appendChild(imgf);};
    //     var invitecard_value = window.localStorage.getItem('faveu_invitecard');
    //     var invitecard_value_num = invitecard_value.slice(4, 5);
    //     imgf.src = './img/smallinvitecard/invite_card' + invitecard_value_num + '.svg';
    // },
    // pagechangeafterajax: function (prepage, afterpage) {
    //     if (prepage === 61) {
    //         this.specialActionForPage61();
    //     }
    //     page.changePage("#id-page-" + afterpage);
    //     page.currentPage = "#id-page-" + prepage;          // closure
    // },
    // autoScroll: function(totalHeight, $msgSelector) {
    //     // Visible Height
    //     const visibleHeight = $msgSelector.offsetHeight
    //     // Container of messages Height
    //     const containerHeight = $msgSelector.scrollHeight
    //     // How far have I scrolled?
    //     const scrollOffset = $msgSelector.scrollTop + visibleHeight
    //     if (containerHeight - totalHeight <= scrollOffset) {
    //         $msgSelector.scrollTop = $msgSelector.scrollHeight
    //     }
    // },
