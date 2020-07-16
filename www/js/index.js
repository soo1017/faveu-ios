/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//  io();
 
/////////// General Actions & Functions ///////////
///////////////////////////////////////////////////
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log('navigation: ', navigator.notification);
    },
    receivedEvent: function(id) {
    }
};

/* ----- Function: notificationOpenedCallback ----- */
// function notificationOpenedCallback() {
function notificationOpenedCallback(jsonData) {

    if (jsonData.notification.payload.additionalData.result === 'link') {
        var $mobileLinkNum_Logo = $('div.cls-pagelink-p1 p');
        window.localStorage.setItem("faveu_mode", "link");
        mobileLink.transferPushData2MobileLinkArray(jsonData);
        $mobileLinkNum_Logo.text(mobileLink.getNumOfMobileLink());
        mobileLink.displayNumOfMobileLink();
        page.changePage("#id-page-link");
    } else if (jsonData.notification.payload.additionalData.result === 'success') {
        window.localStorage.setItem("faveu_mode", "success");
        assignPushData4SuccessAndFailAndCom(jsonData, 'success');
        page.changePage("#id-page-success");
    } else if (jsonData.notification.payload.additionalData.result === 'reject') {
        // alert("reject");
        window.localStorage.setItem("faveu_mode", "fail");
        assignPushData4SuccessAndFailAndCom(jsonData, 'fail');
        page.changePage("#id-page-fail");
    } else if (jsonData.notification.payload.additionalData.result === 'fail') {
        // alert("fail");
        window.localStorage.setItem("faveu_mode", "fail");
        assignPushData4SuccessAndFailAndCom(jsonData, 'fail');
        page.changePage("#id-page-fail");
    } else if (jsonData.notification.payload.additionalData.result === 'commsg') {
        // alert("faveu");
        window.localStorage.setItem("faveu_mode", "commsg");
        assignPushData4SuccessAndFailAndCom(jsonData, 'commsg');
        page.changePage("#id-page-com");
    } else if (jsonData.notification.payload.additionalData.result === 'comchat') {
        // alert("faveu");
        window.localStorage.setItem("faveu_mode", "comchat");
        assignPushData4SuccessAndFailAndCom(jsonData, 'comchat');
        page.changePage("#id-page-successchat");
    } else {
        window.localStorage.setItem("faveu_mode", null);
    }
};

/* ----- Check Radio ----- */
$(document).on('ready', function(){
    $("input[type='radio']").ionCheckRadio();
});

/* ----- Filter menu by tracking one character at a time at the beginning ----- */
(function() {
    // Overrides the default autocomplete filter function to search only from the beginning of the string
    $.ui.autocomplete.filter = function (array, term) {
        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function (value) {
            return matcher.test(value.label || value.value || value);
        });
    };
})();

/////////// Page Register - Actions ///////////
///////////////////////////////////////////////
/* ----- Tooltip Button ----- */
$("#id-pageregister-info").tooltip({
    classes: {
        "ui-tooltip": "ui-corner-all"
    },
    tooltipClass: "cls-info-tooltip",
    position: {
        my: "left top-45",
        at: "right top",
        collision: "flipfit flip"
    }
});

$(document).on('pagecreate', '#id-page-register', function(e){
    e.preventDefault();
    $("#id-pageregister-warning-div").css("display", "none")
});

/* ----- Register Button ----- */
$('#id-pageregister-btn').on('click', function(e) {
    e.preventDefault();
    var username = document.getElementById('id-pageregister-username').value.toTitleCase();

    if (testEmail.test(document.getElementById('id-pageregister-useremail').value) && username) {
        window.localStorage.setItem("faveu_useremail", document.getElementById('id-pageregister-useremail').value);
        window.localStorage.setItem("faveu_username", username);

        var userdata = {};
        userdata.email = window.localStorage.getItem('faveu_useremail');
        userdata.name = username;

        Http.setRoute('user')
        Http.setType('post')
        Http.setDataType('json')
        Http.setData(userdata)
        var functionReg200 = function(doc, text) {
            console.log("Successfully user registered!")
        }
        var functionReg400500 = function(errmsg) {
            errorHandling(errmsg, 'register', 'register') 
        }
        var functionReg404 = function(errmsg) {
            errorHandling(errmsg, 'register', 'register')
        }
        Http.aJaxing('register', '1', functionReg200, functionReg400500, functionReg404, functionReg400500);
        $('.cls-pageregister-form-div input').focus();
    } else {
        $("#id-pageregister-warning-div").css("display", "block")
        if (!username) {
            $('#id-pageregister-warning-div p').text('No Your Name')
        } else if (!document.getElementById('id-pageregister-useremail').value) {
            $('#id-pageregister-warning-div p').text('No Your Email')
        } else {
            if (!testEmail.test(document.getElementById('id-pageregister-useremail').value)) {
                $('#id-pageregister-warning-div p').text('Wrong Email Format')
            }
        }
        document.getElementById("id-pageregister-useremail").value = '';
        document.getElementById("id-pageregister-username").value = '';
    }
    
});

$(".cls-pageregister-form-div input").focus(function() {
    $("#id-pageregister-warning-div").css("display", "none").fadeOut(500);
});


/////////// Page 1 - Actions and Functions///////////
/////////////////////////////////////////////////////
/* ----- Page 1: Before Start Action -----*/
$(document).on('pageshow', '#id-page-1', function(e){
    e.preventDefault();
    if(window.localStorage.getItem("faveu_useremail")) {
        $('#id-page1-useremail').val(window.localStorage.getItem("faveu_useremail"));
    }
});
/* ----- Page 1: Submit Button ----- */
$('#id-page1-btn').on('click', function(e) {
    e.preventDefault();
    var useremail = document.getElementById('id-page1-useremail').value;

    if (testEmail.test(useremail)) {
        window.localStorage.setItem("faveu_useremail", useremail);
        function changepage11() {
            page.changePage("#id-page-2");
        }
        setTimeout(changepage11, 200);
    } else {
        document.getElementById("id-page1-useremail").value = '';
        $('#id-page1-useremail').css('color', 'rgb(250, 144, 0)');
        function loginError(){
            document.getElementById("id-page1-useremail").value = '';
            $('#id-page1-useremail').css('color', 'rgb(0, 84, 149)');
        };
        setTimeout(loginError, 1500);
    }
    page.currentPage = "#id-page-1";
});
/* ----- Page 1: Button of Disclaimer Actions ----- */
$('#id-page1-disclaimer').on('click', function(e) {
    e.preventDefault();
    page.currentPage = "#id-page-1";
    page.changePage("#id-page-disclaimer");
});


/////////// Page DISCLAIMER - Actions and Functions///////////
//////////////////////////////////////////////////////
$('#id-disclaim-btn').on('click', function(e) {
    e.preventDefault();
    page.changePage("#id-page-1");
    page.currentPage = "#id-page-disclaimer";
});


/////////// Page 2 - Actions and Functions///////////
/////////////////////////////////////////////////////
/* ----- Page 2: Before Start Action -----*/
$(document).on('pagecreate', '#id-page-2', function(e){
    e.preventDefault();

    if(window.localStorage.getItem("faveu_username")) {
        $('#id-page2-username').val(window.localStorage.getItem("faveu_username"));
    }
});
/* ----- Page 2: Clear off Input Disabled ----- */
$('#id-page2-username').on('click', function() {
    console.log("$(this): ", $(this));
    $(this).prop('disabled', false);
})
/* ----- Page 2: Click "add" button on image ----- */
$("#id-page2-useravatar-add").on('click', function(e) {
    competitor.avatar_ready = 7;                       // set "avatar_ready0" true
});
/* ----- Page 2: Save and Submit user real name ----- */
$('#id-page2-btn').on('click', function(e) {
    e.preventDefault();
    window.localStorage.setItem("faveu_useravatar", $('div.cls-page2-useravatar-img img').attr('alt'));
    if (document.getElementById('id-page2-username').value) {
        console.log("username: ", document.getElementById('id-page2-username').value)
        console.log("!testNotName.test(username): ", !testNotName.test(username))
        var username = document.getElementById('id-page2-username').value;
        if (!testNotName.test(username)) {
            if (username !== window.localStorage.getItem("faveu_username")) {
                window.localStorage.setItem("faveu_differentusername", "yes")
                window.localStorage.setItem("faveu_username", username.toTitleCase());
            } else {
                window.localStorage.setItem("faveu_differentusername", "no")
            }
            function changepage3() {
                page.changePage("#id-page-4");;
            }
            setTimeout(changepage3, 200);
        }
    } 
    page.currentPage = "#id-page-2";
});


/////////// Page 4 - Actions and Functions///////////
/////////////////////////////////////////////////////
$(document).on( "pagecreate", "#id-page-4", function(e) {
    e.preventDefault();
    window.localStorage.getItem("faveu_country") 
            ? $('.ui-selectmenu-text').text(window.localStorage.getItem("faveu_country")) 
            : $('.ui-selectmenu-text').text('US + 1')
})

$("#id-page4-info").tooltip({
    classes: {
        "ui-tooltip": "ui-corner-all"
    },
    tooltipClass: "cls-info-tooltip",
    position: {
        my: "left top-45",
        at: "right top",
        collision: "flipfit flip"
    }
});
/* ----- Page 4: Press your FAVEU submit button to deliver your FAVEU name and email ----- */
$('#id-page4-btn').on('click', function(e) {
    e.preventDefault();
    var faveu_name = document.getElementById('id-yourfaveu-name').value;
    var faveu_email = document.getElementById('id-yourfaveu-email').value;
    var faveu_phone = $('.ui-selectmenu-text').text().split(" ")[1] + document.getElementById('id-yourfaveu-phone').value;
    // window.localStorage.setItem("faveu_country", $('.ui-selectmenu-text').text())
    window.localStorage.setItem("faveu_phonecountry", $('.ui-selectmenu-text').text().split(" ")[0])

    if ((testPhone.test(faveu_phone) || testEmail.test(faveu_email)) && !testNotName.test(faveu_name)) {
        window.localStorage.setItem("faveuname", faveu_name.toTitleCase());
        (testPhone.test(faveu_phone) && faveu_phone) ? window.localStorage.setItem("faveuphone", faveu_phone) : window.localStorage.setItem("faveuphone", "");
        (testEmail.test(faveu_email) && faveu_email) ? window.localStorage.setItem("faveuemail", faveu_email) : window.localStorage.setItem("faveuemail", "");

        competitor.clearOffCompetitorsSection();

        $('.page5-name_fvu').text(window.localStorage.getItem("faveuname"));
        if (faveu_phone) {
            $('.page5-phone_fvu').text(window.localStorage.getItem("faveuphone"));
        } 
        if (faveu_email) {
            $('.page5-email_fvu').text(window.localStorage.getItem("faveuemail"));
        }
        
        function changepage5() {
            page.changePage("#id-page-5");;
        }
        setTimeout(changepage5, 200);
    } else {
        document.getElementById("id-yourfaveu-email").value = '';
        document.getElementById("id-yourfaveu-phone").value = '';
        $('#id-yourfaveu-email').css('color', 'rgb(250, 144, 0)');
        $('#id-yourfaveu-phone').css('color', 'rgb(250, 144, 0)');
        setTimeout(yourfaveu_emailError, 1500);
        function yourfaveu_emailError(){
            document.getElementById("id-yourfaveu-email").value = '';
            document.getElementById("id-yourfaveu-phone").value = '';
            $('#id-yourfaveu-email').css('color', 'rgb(0, 84, 149)');
            $('#id-yourfaveu-phone').css('color', 'rgb(0, 84, 149)');
        };
    }

    page.currentPage = "#id-page-4";
});


/////////// Page 5 - Actions and Functions///////////
/////////////////////////////////////////////////////
/* ----- Page 5: Page 5 seeting - pagecreate happens before the page is uploaded with DOM (JS run) ----- */
$(document).on( "pagecreate", "#id-page-5", function(e) { // "pageshow" happens after DOM is uploaded
    competitor.clearOffCompetitorsSection();

    $('.cls-page5-form-divS2').hide();
    $('.cls-page5-form-divS1').css('width', '98%');
    $('.cls-page5-form-divS1 form').css('width', '98%');

    competitor.determine2ButtonSize();
});
/* ----- Page 5: Click "add" button on 1st image ----- */
$(".cls-page5-add").on('click', function(e) {
    var $temp_sel = $(this).attr("class");
    competitor.avatar_ready = parseInt($temp_sel
                                    .replace("cls-page5-add", "")
                                    .replace("ui-link", "")
                                    .trim().replace("best", ""))           
});

/* ----- Page 5: click to select auto-complete or inserted value to make image, content and button visible ----- */
$(document).on( "click", "#id-page5-btn1", function(e) {
    /// When arrow-up button is clicked, the name will be aded into its place
    e.preventDefault();
    if (competitor.checkFullnessOfCompetitors() === false) {
        var inputvalue = document.getElementById('id-page5-bestenemy-name').value.toTitleCase();
        if ((!testNotName.test(inputvalue)) && (inputvalue.length != 0)) {
            competitor.addCompetitor(inputvalue.trim())
            inputvalue = "";
            document.getElementById('id-page5-bestenemy-name').value = '';
        }
    }
});

/* ----- Page 5: competitor "delete" button is clicked ----- */
$(document).on( "click", ".cls-page5-delete", function(e) {
    e.preventDefault();
    var $temp_sel = $(this).attr('class');
    var num1 = parseInt($temp_sel.replace("cls-page5-delete", "")
                                .replace("ui-btn", "")
                                .replace("ui-icon-delete-custom1", "")
                                .replace("ui-btn-icon-left", "")
                                .replace("ui-corner-all", "")
                                .replace("ui-shadow", "")
                                .trim()
                                .replace("cls-page5-best", "")
                                .replace("-delete", ""))
    competitor.removeCompetitor(num1);
});

/* ----- Page 5: Press best enemy button (Submit)----- */
$('#id-page5-btn2').on('click', function(e) {
    e.preventDefault();
    competitor.storeAndDisplayCompetitor4ConfirmPage();

    page.changePage("#id-page-6");
    page.currentPage = "#id-page-5";
});

/////////// Page 6 - Actions and Functions///////////
/////////////////////////////////////////////////////
$(document).on('pagebeforeshow', '#id-page-6', function (e) {
    // iPhone 5
    if ($('.cls-page6-envelopecard').css('top') == top_px.iPh5_top) {
        positionEnvelope('-465');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67_top) {
        positionEnvelope('-553');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67s_top) {
        positionEnvelope('-593');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPhX_top) {
        positionEnvelope('-612');
        // positionEnvelope('-610');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPad_top) {
        positionEnvelope('-440');
    } else {}
});
/* ----- Page 6: select right envelope to open and its content for delivery ----- */
$(document).on('tap', '.cls-outer11, .cls-outer22, .cls-outer33, .cls-outer44, .cls-outer55',  function(e) {
    e.preventDefault();
    var dom_element = this;
    /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% iPhone 5, iPhone6/7, iPhone6/7s, iPad */
    if ($('.cls-page6-envelopecard').css('top') == top_px.iPh5_top) {
        selectRightEnvelopeToOpen(dom_element, 'iPh5');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67_top) {
        selectRightEnvelopeToOpen(dom_element, 'iPh67');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67s_top) {
        selectRightEnvelopeToOpen(dom_element, 'iPh67s');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPhX_top) {
        selectRightEnvelopeToOpen(dom_element, 'iPhX');
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPad_top) {
        selectRightEnvelopeToOpen(dom_element, 'iPad');
    } else {}
    openEnevelopeandButtonChange(changeButton);
});
/* ----- Page 6: select right envelope to close and its content for delivery ----- */
$(document).on('tap', '.cls-bot-left-right11, .cls-bot-left-right22, .cls-bot-left-right33, .cls-bot-left-right44, .cls-bot-left-right55',  function(e) {
    e.preventDefault();
    var dom_element = this;
    var invite_11 = '.cls-invite11';
    var invite_22 = '.cls-invite22';
    var invite_33 = '.cls-invite33';
    var invite_44 = '.cls-invite44';
    var invite_55 = '.cls-invite55';
    /* %%%%%%%%%%%%%%%%% iPhone 5, iPhone 6/7, iPhone 6/7s, iPad */
    if ($('.cls-page6-envelopecard').css('top') == top_px.iPh5_top) {
        if ( ($(invite_11).css('top') == high_px.iPh5_high_px) 
                || ($(invite_22).css('top') == high_px.iPh5_high_px) 
                || ($(invite_33).css('top') == high_px.iPh5_high_px) 
                || ($(invite_44).css('top') == high_px.iPh5_high_px) 
                || ($(invite_55).css('top') == high_px.iPh5_high_px) ){
            selectEnvelopeToClose(dom_element, 'iPh5');
        }
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67_top) {
        if ( ($(invite_11).css('top') == high_px.iPh67_high_px) 
                || ($(invite_22).css('top') == high_px.iPh67_high_px) 
                || ($(invite_33).css('top') == high_px.iPh67_high_px) 
                || ($(invite_44).css('top') == high_px.iPh67_high_px) 
                || ($(invite_55).css('top') == high_px.iPh67_high_px) ){
            selectEnvelopeToClose(dom_element, 'iPh67');
        }
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67s_top) {
        if ( ($(invite_11).css('top') == high_px.iPh67s_high_px) 
                || ($(invite_22).css('top') == high_px.iPh67s_high_px) 
                || ($(invite_33).css('top') == high_px.iPh67s_high_px) 
                || ($(invite_44).css('top') == high_px.iPh67s_high_px) 
                || ($(invite_55).css('top') == high_px.iPh67s_high_px) ){
            selectEnvelopeToClose(dom_element, 'iPh67s');
        }
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPhX_top) {
        if ( ($(invite_11).css('top') == high_px.iPhX_high_px) 
                || ($(invite_22).css('top') == high_px.iPhX_high_px) 
                || ($(invite_33).css('top') == high_px.iPhX_high_px) 
                || ($(invite_44).css('top') == high_px.iPhX_high_px) 
                || ($(invite_55).css('top') == high_px.iPhX_high_px) ){
            selectEnvelopeToClose(dom_element, 'iPhX');
        }
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPad_top) {
        if ( ($(invite_11).css('top') == high_px.iPad_high_px) 
                || ($(invite_22).css('top') == high_px.iPad_high_px) 
                || ($(invite_33).css('top') == high_px.iPad_high_px)
                || ($(invite_44).css('top') == high_px.iPad_high_px) 
                || ($(invite_55).css('top') == high_px.iPad_high_px) ){
            selectEnvelopeToClose(dom_element, 'iPad');
        }
    } else {}
});
/* ----- swipe right or left to select envelope ----- */
$(document).on("swipeleft", ".cls-page6-envelopecard1, .cls-page6-envelopecard2, .cls-page6-envelopecard3, .cls-page6-envelopecard4, .cls-page6-envelopecard5", function(e) {
    e.preventDefault();
    var envelope_element = this;
    $('.cls-page6-envelopecardS').css('left', '0px');
    /* %%%%%%%%%%%%%%%%% iPhone 5, iPhone 6/7, iPhone 6/7s, iPad */
    if ($('.cls-page6-envelopecard').css('top') == top_px.iPh5_top) {
        swiftleft(222, 462, 702, 921, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67_top) {
        swiftleft(264, 550, 836, 1119, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67s_top) {
        swiftleft(278, 588, 898, 1175, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPhX_top) {
        swiftleft(278, 588, 898, 1175, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPad_top) {
        swiftleft(121, 441, 761, 881, envelope_element);
    } else {}
});
/* ----- swipe right or left to select envelope ----- */
$(document).on("swiperight", ".cls-page6-envelopecard1, .cls-page6-envelopecard2, .cls-page6-envelopecard3, .cls-page6-envelopecard4, .cls-page6-envelopecard5", function(e) {
    e.preventDefault();
    var envelope_element = this;
    $('.cls-page6-envelopecardS').css('left', '0px');
    /* %%%%%%%%%%%%%%%%% iPhone 5, iPhone 6/7, iPhone 6/7s, iPad */
    if ($('.cls-page6-envelopecard').css('top') == top_px.iPh5_top) {
        swiftright(0, 222, 462, 702, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67_top) {
        swiftright(0, 264, 550, 836, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPh67s_top) {
        swiftright(0, 278, 588, 898, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPhX_top) {
        swiftright(0, 285, 625, 900, envelope_element);
    } else if ($('.cls-page6-envelopecard').css('top') == top_px.iPad_top) {
        swiftright(0, 121, 441, 761, envelope_element);
    } else {}
});
/* ----- Page 6: Press the submit button after envelope card is selected ----- */
$("#id-page6-btn").on("click", function(e) {
    e.preventDefault();
    var selected_card = '';
    if (document.getElementById('id-page6-btn').textContent == "SEND") {
        for (var i=1; i<=5; i++) {
            if ($('.cls-outer' + i + i).attr('style') == "display: none;") {
                selected_card = "card" + i;
                break;
            }
        }
        // console.log("selected_card: ", selected_card)
        window.localStorage.setItem('faveu_invitecard', selected_card);
        if ($('.cls-page61-cardimg img')) {
            $('.cls-page61-cardimg img').remove();
        }
        var img = new Image();
        var div = document.getElementById('id-page61-cardimg');
        img.onload = function() { div.appendChild(img);};

        img.src = './img/smallinvitecard/invite_' + selected_card + '.svg';
        img.alt = selected_card;
        
        page.changePage("#id-page-61");
        page.currentPage = "#id-page-6";
    }
});


/////////// Page 61 - Actions and Functions ///////////
///////////////////////////////////////////////////////
/* ----- Page 61: Card delivery & Transfer into Page 8 automatically ----- */
$(document).on('pageshow', '#id-page-61', function(e) {
    e.preventDefault();
    $('.cls-page61-divS4 .ui-block-a p').text('YOUR "COMPETITION"');
});
/* ----- Page 61: Press the confirm button after checking all selections ----- */
$("#id-page61-btn1, #id-page61-btn2, #id-page61-btn3").on("click", function(e) {
    e.preventDefault();
    if ($(this).attr("id") === "id-page61-btn1") {
        page.changePage("#id-page-1");
    } else if ($(this).attr("id") === "id-page61-btn2") {
        page.changePage("#id-page-4");
    } else if ($(this).attr("id") === "id-page61-btn3") {
        page.changePage("#id-page-5");
    }
    confirmCompetitorWork();
});
/* ----- Page 61: Press the confirm button after checking all selections ----- */
$(document).on("click", "#id-page61-btn4", function(e) {
    e.preventDefault();
    var faveu_data = transferDataLocalStorage4Submit();
    $(this).prop('disabled',true);

    Http.setRoute('faveu')
    Http.setType('post')
    Http.setDataType('json')
    Http.setData(faveu_data)
    var functionReg200 = function(doc, text) {
        // assignSelectedInviteCard()
        deleteSomeDataLocalStorage();
        console.log("Successfully Faveu submitted!")
    }
    var functionReg400500 = function(errmsg) {
        errorHandling(errmsg, '61', '61')
    }
    var functionReg404 = function(errmsg) {
        errorHandling(errmsg, '61', '61') 
    }
    Http.aJaxing('61', '7', functionReg200, functionReg400500, functionReg404, functionReg400500);
    $(this).prop('disabled', false);
});


/////////// Page 7 - Actions and Functions///////////
/////////////////////////////////////////////////////
/* ----- Page 7: Card delivery & Transfer into Page 8 automatically ----- */
$(document).on('pageshow', '#id-page-7', function(e) {
    e.preventDefault();

    var flyingcard_selector = '.cls-invite7';
    function Enevelopeclose_220px(callback) {
        setTimeout(function() {
            callback();
        }, 1000);
        $(flyingcard_selector).css('top', '220px');
        $(flyingcard_selector).css('transition', 'top 1s');
    }
    function Enevelopeclose_215px(callback) {
        setTimeout(function() {
            callback();
        }, 1000);
        $(flyingcard_selector).css('top', '215px');
        $(flyingcard_selector).css('transition', 'top 1s');
    }
    function Enevelopeclosecallback() {
        $('.cls-inner7').css('display', 'none');
        $('.cls-outer7').css('display', 'block');
    }
    function Enevelopeflyingupcallback() {
        $('.cls-page7-div').css('margin', '-160% 5% 170% 5%');
        $('.cls-page7-div').css('transition', 'margin 3s');
    }
    function sendEnvelopeAnimation() {
        setTimeout(function() {
            Enevelopeflyingupcallback();
            setTimeout(function() {
                page.changePage("#id-page-8");
            }, 3000);
        }, 1000);
    }

    var flying_selector = '.cls-flyingenvelopecard';
    sendEnvelopeAnimation();
    if ($(flying_selector).css('height') == '300px') {
        Enevelopeclose_220px(Enevelopeclosecallback);
    } else {
        Enevelopeclose_215px(Enevelopeclosecallback);
    }
    page.currentPage = "#id-page-7";
});


/////////// Page 8 - Actions and Functions///////////
/////////////////////////////////////////////////////

/////////// Page FAIL - Actions and Functions///////////
////////////////////////////////////////////////////////
/* ----- Page FAIL: Page FAIL setup ----- */
$(document).on('pageshow', '#id-page-fail', function(e) {
    e.preventDefault();
    var useravatar = JSON.parse(window.localStorage.getItem("faveu_response")).usera;
    $('#id-pagefail-text2 h3').text(JSON.parse(window.localStorage.getItem("faveu_response")).faveun);
    $('#id-pagefail-img3 img').attr('alt', useravatar);  // change alt's value
    $('#id-pagefail-img3 img').attr('src', faveu_avatar[useravatar]);  // KEY
});

/* ----- Page FAIL: Try Again, back to Page 1 or End Page ----- */
$(document).on('click', '#id-pagefail-btn, #id-pagefail-text3', function(e) {
    // find out how to close APP
    e.preventDefault();
    var fail_data = { token: JSON.parse(window.localStorage.getItem("faveu_response")).token};

    Http.setRoute('fail')
    Http.setType('post')
    Http.setDataType('json')
    Http.setData(fail_data)
    var functionReg200 = function() {
        window.localStorage.setItem("faveu_mode", null);
    }
    var functionReg400404500 = function(errmsg) {
        window.localStorage.setItem("faveu_mode", null);
        $(this).attr('id') === 'id-pagefail-btn' ? errorHandling(errmsg, 'fail', '1') : errorHandling(errmsg, 'fail', '8');
        
    }
    $(this).attr('id') === 'id-pagefail-btn' 
        ? Http.aJaxing('fail', '1', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500)
        : Http.aJaxing('fail', '8', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500)
});


/////////// Page SUCCESS - Actions and Functions///////////
///////////////////////////////////////////////////////////
/* ----- Page SUCCESS: Page SUCCESS setup ----- */
$(document).on('pageshow', '#id-page-success', function(e) {
    // $(document).on('pagebeforeshow', '#id-page-success', function(e) {
    e.preventDefault();
    var useravatar = JSON.parse(window.localStorage.getItem("faveu_response")).usera;
    $('#id-pagesuc-text2 h3').text(JSON.parse(window.localStorage.getItem("faveu_response")).faveun);
    $('#id-pagesuc-img3 img').attr('alt', useravatar);  // change alt's value
    $('#id-pagesuc-img3 img').attr('src', faveu_avatar[useravatar]);  // KEY
});
/* ----- Page SUCCESS: Page SUCCESS Video Play ----- */
$(document).on('pageinit', '#id-page-success', function(e) {
    animation();
    setInterval(animation, 30);
});

/* ----- Page SUCCESS: move to END page ----- */
$(document).on('click', '#id-pagesuc-btn', function(e) {
    e.preventDefault();
    page.changePage("#id-page-success1");
    page.currentPage = "#id-page-success";
});


/////////// Page SUCCESS1 - Actions and Functions///////////
////////////////////////////////////////////////////////////
$(document).on('pageshow', '#id-page-success1', function(e) {
    // $(document).on('pagebeforeshow', '#id-page-success1', function(e) {
    e.preventDefault();
    $('#id-pagesuc1-text2 h3').text(JSON.parse(window.localStorage.getItem("faveu_response")).faveun);
});

/* ----- Page SUCCESS1: Button related Actions ----- */
$(document).on('click', '#id-pagesuc1-btn1', function(e) {
    e.preventDefault();
    var successselfcontact_data = {
        token: JSON.parse(window.localStorage.getItem("faveu_response")).token
    };

    Http.setRoute('success/selfcontact');
    Http.setType('post')
    Http.setDataType('json')
    Http.setData(successselfcontact_data)
    var functionReg200 = function() {
        window.localStorage.setItem("faveu_mode", null);
    }
    var functionReg400404500 = function(errmsg) {
        window.localStorage.setItem("faveu_mode", null);
        errorHandling(errmsg, 'success1', '8')
    }
    Http.aJaxing('success1', '8', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500);
});

/* ----- Page SUCCESS1: Button related Actions ----- */
$(document).on('click', '#id-pagesuc1-btn2', function(e) {
   e.preventDefault();
   page.changePage("#id-page-success2");
   page.currentPage = "#id-page-success1";
});

/////////// Page SUCCESS2 - Actions and Functions///////////
////////////////////////////////////////////////////////////
$(document).on('pagecreate', '#id-page-success2', function(e) {
    e.preventDefault()

    if (window.localStorage.getItem('faveu_mode') !== 'success') {
        $('#id-text-link').attr('href', '')
    } else {
        $('#id-text-link').attr('href', '#id-page-successtext')
    }
})


/////////// Page SUCCESSCHAT - Actions and Functions////////
////////////////////////////////////////////////////////////
$(document).on('pagebeforeshow', '#id-page-successchat', function(e) {
    e.preventDefault();
    chatRoom.displayAllChatRoomName();
    if (window.localStorage.getItem('faveu_mode') === 'comchat') {
        $('#id-pagesucchat-username').text(window.localStorage.getItem('faveu_response').user)
        $('#id-pagesucchat-roomname').text(window.localStorage.getItem('faveu_response').room)
    }
});

$(document).on('click', '#id-pagesucchat1-switch-link', function(e) {
    e.preventDefault();
    if ($('#id-pagesucchat1-switch-link h4').text() === 'CREATE') {
        $('#id-pagesucchat1-switch-link h4').text('JOIN')
        $('#id-pagesucchat-btn').text('CREATE')
        $('#id-pagesucchat-form-subdiv3').addClass('cls-pagesucchat-form-subdiv3-block');
        setTimeout(function () {
            $('#id-pagesucchat-form-subdiv3').addClass('cls-pagesucchat-form-subdiv3-opacity');
            JSON.parse(window.localStorage.getItem("faveu_response")).usern ? $('#id-pagesucchat-username').val(JSON.parse(window.localStorage.getItem("faveu_response")).usern) : null
            JSON.parse(window.localStorage.getItem("faveu_response")).faveun ? $('#id-pagesucchat-faveuname').val(JSON.parse(window.localStorage.getItem("faveu_response")).faveun) : null
        }, 500);
    } else {
        console.log("Join")
        $('#id-pagesucchat1-switch-link h4').text('CREATE')
        $('#id-pagesucchat-btn').text('JOIN')
        $('#id-pagesucchat-form-subdiv3').removeClass('cls-pagesucchat-form-subdiv3-block');
        setTimeout(function () {
            $('#id-pagesucchat-form-subdiv3').removeClass('cls-pagesucchat-form-subdiv3-opacity');
        }, 500);
    }
});

$(document).on('click', '#id-pagesucchat-btn', function(e) {           // create/join a chatroom
    e.preventDefault();
    $(this).prop('disabled',true);
    var roomname = document.getElementById('id-pagesucchat-roomname').value.toUpperCase()
    var username = document.getElementById('id-pagesucchat-username').value.toTitleCase()
    if ($(this).text() === 'CREATE') {                                  // CREATE
        console.log("CREATE")
        var faveuname = document.getElementById('id-pagesucchat-faveuname').value.toTitleCase()
        var useremail = window.localStorage.getItem('faveu_useremail') ? window.localStorage.getItem('faveu_useremail') : ''
        chatRoom.createOneChatRoom(roomname, username, faveuname, useremail)
        $(this).prop('disabled', false);
    } else {                                                            // JOIN
        console.log("JOIN")
        chatRoom.transferLocalStorage2ChatRoom()
        if (chatRoom.searchChatRoomWithRoomnameAndUsername(roomname, username)) {                  // Existing ChatRoom
            chatRoom.joinExistingChatRoom(roomname, username)
        } else {                                          // Check DB
            chatRoom.joinChatRoomFromDB(roomname, username)
        }
        $(this).prop('disabled', false);
    }
});

$(document).on('click', '#id-pagesucchat-active-chatroom div a', function(e) {
    e.preventDefault();
    chatRoom.transferLocalStorage2ChatRoom()
    var roomname = this.firstElementChild.innerHTML;
    chatRoom.joinExistingChatRoomByRoomname(roomname)
});

$(document).on('click', '#id-pagesucchat-delete', function(e) {
    e.preventDefault();
    var chatroom_delete = this;
    var roomname = chatroom_delete.previousSibling.firstElementChild.innerHTML
    var r = confirm('Are you sure?')
    if (r === true) {
        console.log('sure')
        chatRoom.transferLocalStorage2ChatRoom()
        chatRoom.removeChatRoom(roomname)
    }
});

/////////// Page SUCCESSCHAT1 - Actions and Functions///////////
////////////////////////////////////////////////////////////
$(document).on('pageshow', '#id-page-successchat1', function(e) {
    e.preventDefault()
    var totalMessageHeight = 0;
    var $msgSelector = document.getElementById('id-pagesucchat1-msg1');
    // NodeList.prototype.forEach = Array.prototype.forEach
    var children = $msgSelector.children;

    for (var i = 0; i < children.length; i++) {
        var oneMessage = children[i];
        // Do stuff
        var newMessageStyles = getComputedStyle(oneMessage)
        var newMessageMargin = parseInt(newMessageStyles.marginBottom)
        // var newMessageMargin = parseInt(newMessageStyles.marginBottom + newMessageStyles.marginTop)
        var newMessageHeight = oneMessage.offsetHeight + newMessageMargin
        totalMessageHeight = totalMessageHeight + newMessageHeight
    }
    chatRoom.autoScroll(totalMessageHeight, $msgSelector)
});

/////////// Page successtext - Actions and Functions///////////
////////////////////////////////////////////////////////////////
$(document).on('click', '.cls-pagesuctext-img2 img', function(e) {
    page.changePage("#id-page-flower");
    page.currentPage = "#id-page-successtext";
});

$(document).on('pagebeforeshow', '#id-page-successtext', function(e) {
    e.preventDefault();
    var input_text_textarea = "\nHi, " 
                + JSON.parse(window.localStorage.getItem("faveu_response")).faveun 
                + ",\n\n" + JSON.parse(window.localStorage.getItem("faveu_response")).usern 
                + "\nis the one who sent FaveU. Now both of you know there is something between you guys. It's the time for next step\n\nYour friend, FaveU";
    $('#id-pagesuctext-inputtext-p #id-pagesuctext-inputtext-span1').text(JSON.parse(window.localStorage.getItem("faveu_response")).faveun);
    $('#id-pagesuctext-inputtext-p #id-pagesuctext-inputtext-span2').text(JSON.parse(window.localStorage.getItem("faveu_response")).usern);
    $('.cls-pagesuctext-textinput-form-div form #id-textinput').text(input_text_textarea);

});

/* ----- Page successtext: Edit Button related Actions ----- */
$(document).on('click', '#id-pagesuctext-btn1', function(e) {
    e.preventDefault();
    if (document.getElementById('id-pagesuctext-btn1').textContent == "EDIT") {
        document.getElementById('id-pagesuctext-btn1').innerHTML = "BACK";
        $('.cls-pagesuctext-textinput-form-div').attr("style", "display: block");
    } else if (document.getElementById('id-pagesuctext-btn1').textContent == "BACK") {
        document.getElementById('id-pagesuctext-btn1').innerHTML = "EDIT";
        $('.cls-pagesuctext-textinput-form-div').attr("style", "display: none");
    } else {}
});

/* ----- Page successtext: Submit Button related Actions ----- */
$(document).on('click', '#id-pagesuctext-btn2', function(e) {
    e.preventDefault();

    if ($('#id-pagesuctext-btn2').text() === 'CONFIRM') {
        var successmsg_data = {
            token: JSON.parse(window.localStorage.getItem("faveu_response")).token,
            lovemessage: $('textarea#id-textinput').val()
        };
        $(this).prop('disabled', true);

        Http.setRoute('success/message');
        Http.setType('post')
        Http.setDataType('json')
        Http.setData(successmsg_data)
        var functionReg200 = function() {
            window.localStorage.setItem("faveu_mode", null);
        }
        var functionReg400404500 = function(errmsg) {
            errorHandling(errmsg, 'successtext', 'successtext')
            $('#id-pagesuctext-btn2').text("LET'S DO THIS!");
        }
        Http.aJaxing('successtext', 'success3', functionReg200, functionReg400404500, functionReg400404500, functionReg400404500);
        $(this).prop('disabled', false);
    } else {
        $('#id-pagesuctext-btn2').text('CONFIRM')
    }
});

/////////// Page SUCCESS3 - Actions and Functions///////////
//////////////////////////////////////////////////////////////// will add chatting room with socket.io
$(document).on('pageshow', '#id-page-success3', function(e) {
    e.preventDefault();
    $('#id-pagesuctext-btn2').text("LET'S DO THIS!");
});

/* ----- Page SUCCESS3: Submit Button related Actions ----- */
$(document).on('click', '#id-pagesuc3-btn', function(e) {
    e.preventDefault();
    page.changePage("#id-page-8");
    page.currentPage = "#id-page-success3";
});


/////////// Page LINK - Actions and Functions///////////
////////////////////////////////////////////////////////
/* ----- Page LINK: Open Page ----- */
$(document).on('pageshow', '#id-page-link', function () {
    $('#id-pagelink-p1 p').text(mobileLink.getNumOfMobileLink().toString());
    mobileLink.displayNumOfMobileLink();
});

/* ----- Page LINK: Try to link to LINK 1 page ----- */
$(document).on('click', '#id-pagelink-btn1', function(e) {
    // find out how to close APP
    e.preventDefault();
    mobileLink.displayPreviewAllMobileLink();

    page.changePage("#id-page-linkpv");
    page.currentPage = "#id-page-link";
});

/* ----- Page LINK: LINK to 1st Page ----- */
$(document).on('click', '#id-pagelink-btn2', function(e) {
    e.preventDefault();
    page.changePage("#id-page-1");
    page.currentPage = "#id-page-link";
});


/////////// Page LINKPREVIEW - Actions and Functions///////////
///////////////////////////////////////////////////////////////
// $(document).on('ready', '#id-page-link', function () {
$(document).on('pagebeforeshow', '#id-page-linkpv', function () {
    //alert("link-Page-In");
    var small="scale(1.0)";
    $('#id-pagelinkpv-divS0 img').css("transform", small);
    $('#id-pagelinkpv-divS1 img').css("transform", small);
    $('#id-pagelinkpv-divS2 img').css("transform", small);
    $('#id-pagelinkpv-divS3 img').css("transform", small);
});

/* ----- Page LINKPREVIEW: LINK Click ----- */
$(document).on('click', '.cls-pagelinkpv-div-common img, .cls-pagelinkpv-div-common p', function(e) {
    e.preventDefault();
    mobileLink.selectedMobileLink = parseInt($(this.parentNode)
                                            .attr('class')
                                            .replace("cls-pagelinkpv-div-common", "")
                                            .trim()
                                            .replace("cls-pagelinkpv-divS", ""));
    $('#id-pagelinkpv-divS' + mobileLink.selectedMobileLink + ' img').css("transform", "scale(1.03)");
    mobileLink.projectSelectedMobileLink2Show(mobileLink.selectedMobileLink);
    // selected_FaveULink = link_card_number;
    if ($('#id-pagelinkpv-divS0').attr('style') == 'display: block;') {
        $('#id-pagelinkpv-divS0').css('filter', 'blur(1.5px)');
    }
    if ($('#id-pagelinkpv-divS1').attr('style') == 'display: block;') {
        $('#id-pagelinkpv-divS1').css('filter', 'blur(1.5px)');
    }
    if ($('#id-pagelinkpv-divS2').attr('style') == 'display: block;') {
        $('#id-pagelinkpv-divS2').css('filter', 'blur(1.5px)');
    }
    if ($('#id-pagelinkpv-divS3').attr('style') == 'display: block;') {
        $('#id-pagelinkpv-divS3').css('filter', 'blur(1.5px)');
    }
    setTimeout(function() {
        page.changePage("#id-page-link1")
        page.currentPage = "#id-page-linkpv";
    }, 1000);
});


/////////// Page LINK1 - Actions and Functions///////////
////////////////////////////////////////////////////////////
/* ----- Page LINK1: Open Page ----- */
$(document).on('pagebeforeshow', '#id-page-link1', function () {
    mobileLink.displaySelectedMobileLink(mobileLink.selectedMobileLink);
});

/* ----- Page LINK1: Submit Button ----- */
$(document).on('click', '#id-pagelink1-btn', function(e) {
    e.preventDefault();
    var mobilelinkselection_data = {
        token: mobileLink.mobileLinkArray[mobileLink.selectedMobileLink].token
    };

    if ($('#id-pagelink1-btn').text() === 'CONFIRM') {
        var selected_value1 = '';
        if (document.getElementById('ch0').checked) {
            selected_value1 = $('#id-radio0 p').text();
        } else if (document.getElementById('ch1').checked) {
            selected_value1 = $('#id-radio1 p').text();
        } else if (document.getElementById('ch2').checked) {
            selected_value1 = $('#id-radio2 p').text();
        } else if (document.getElementById('ch3').checked) {
            selected_value1 = $('#id-radio3 p').text();
        } else if (document.getElementById('ch4').checked) {
            selected_value1 = $('#id-radio4 p').text();
        } else if (document.getElementById('reject').checked) {
            selected_value1 = "reject";
        } else {}

        if ((selected_competitor === selected_value1) && selected_competitor !== undefined) {
            mobilelinkselection_data.selectedname = selected_value1;

            Http.setRoute('mobilelink/select');
            Http.setType('post')
            Http.setDataType('json')
            Http.setData(mobilelinkselection_data)
            var functionReg200 = function() {
                mobileLink.callbackAfterSubmit(mobileLink.selectedMobileLink);
                console.log("good")
            }
            var functionReg400 = function(errmsg) {
                $('#id-pagelink1-btn').text('SUBMIT');
                $('#id-pagelink1-divS label').removeClass("checked");
                errorHandling(errmsg, 'link1', 'link1')
            }
            var functionReg404 = function(errmsg) {
                // alert(errmsg);
                if (errmsg === 'Already selection made or expired') {
                    mobileLink.callbackAfterSubmit(mobileLink.selectedMobileLink);
                } else {
                    $('#id-pagelink1-btn').text('SUBMIT');
                    $('#id-pagelink1-divS label').removeClass("checked");
                    errorHandling(errmsg, 'link1', 'link1')
                }
            }
            var functionReg500 = function(errmsg) {
                $('#id-pagelink1-btn').text('SUBMIT');
                $('#id-pagelink1-divS label').removeClass("checked");
                errorHandling(errmsg, 'link1', 'link1')
            }
            Http.aJaxing('link1', 'link2', functionReg200, functionReg400, functionReg404, functionReg500);
            $(this).prop('disabled', false);

        }                   // Try again
        // console.log("not match")
        $('#id-pagelink1-btn').text('SUBMIT');
        selected_competitor = undefined;
    } else {
        $('#id-pagelink1-btn').text('CONFIRM');
        if (document.getElementById('ch0').checked) {
            selected_competitor = $('#id-radio0 p').text();
        } else if (document.getElementById('ch1').checked) {
            selected_competitor = $('#id-radio1 p').text();
        } else if (document.getElementById('ch2').checked) {
            selected_competitor = $('#id-radio2 p').text();
        } else if (document.getElementById('ch3').checked) {
            selected_competitor = $('#id-radio3 p').text();
        } else if (document.getElementById('ch4').checked) {
            selected_competitor = $('#id-radio4 p').text();
        } else if (document.getElementById('reject').checked) {
            selected_competitor = "reject";
        } else {}

        // console.log("selected_competitor after submit: ", selected_competitor)
    }
});


/////////// Page LINK THANK - Actions and Functions///////////
////////////////////////////////////////////////////////
/* ----- Page LINK THANK: Submit Button ----- */
$(document).on('click', '#id-pagelink2-btn', function(e) {
    e.preventDefault();
    page.changePage("#id-page-8");
    page.currentPage = "#id-page-link2";
});


/////////// Page AVATAR - Actions and Functions///////////
////////////////////////////////////////////////////////
/* ----- Page AVATAR: get previous page ID ----- */
$(document).on('pagebeforeshow', '#id-page-avatar', function(e, data) {
    page.currentPageId = data.prevPage.attr('id');
});
/* ----- Page AVATAR: select avatar by clicking or tapping ----- */
$(document).on('click tap', '.cls-avatar img', function(e) {
    e.preventDefault();
    var self = this;
    if (competitor.avatar_ready === 7) {       // place a selected avatar into an icon
        $('.cls-page2-useravatar-img img').attr('alt', $(self).attr('alt'));  // change alt's value
        $('.cls-page2-useravatar-img img').attr('src', faveu_avatar[$(self).attr('alt')]);  // KEY
    } else {
        competitor.addAvatar4Competitor(self, competitor.avatar_ready);
    }
    
    // move back to original page
    var temp_page_id_avatar = "#" + page.currentPageId;
    page.currentPageId = " ";
    page.changePage(temp_page_id_avatar);
    page.currentPage = "#id-page-avatar";
})

/////////// Page Communication - Actions and Functions///////////
////////////////////////////////////////////////////////////
animation_index = 0;
/* ----- Page Communication: Open Page ----- */
$(document).on('pagebeforeshow', '#id-page-com', function(e) {
    e.preventDefault();
    var input_text_temp = JSON.parse(window.localStorage.getItem("faveu_response")).lovemessage;
    $('.cls-pagecom-img1 img').attr('alt', "flower1");  // change alt's value
    $('.cls-pagecom-img1 img').attr('src', "./../img/flower/flower1.png");
    $('.cls-pagecom-inputtext h4').text(input_text_temp);
    animation_f();
    setInterval(animation_f, 30);
});

/* ----- Page Communication: Button related Actions ----- */
$('#id-pagecom-btn').on('click', function(e) {
   e.preventDefault();
   window.localStorage.setItem("faveu_mode", null);
   page.changePage("#id-page-8");
   page.currentPage = "#id-page-com";
});


/////////// Page ERROR - Actions and Functions///////////
////////////////////////////////////////////////////////
/* ----- Page ERROR: get previous page ID ----- */
$(document).on('pageshow', '#id-page-error', function(e, data) {
    page.currentPageId = data.prevPage.attr('id');
});

/* ----- Page ERROR: back to other page with selected avatar ----- */
$(document).on('click', '#id-pageerror-btn', function(e) {
    e.preventDefault();

    var temp_page_id_error = "#" + page.currentPageId;
    page.currentPageId = " ";
    page.changePage(temp_page_id_error);
    page.currentPage = "#id-page-error";
});

// // Chatroom Object and its Functions
// var chatRoom1 = new chatRoom;

// console.log("hi");
// console.log("chatroom: ", chatRoom)
// chatRoom.addChatRoom('faveu', 'john', 'jane');
// chatRoom.addChatRoom('jjambong', 'john', 'jane');
// chatRoom.displayAllChatRoom();