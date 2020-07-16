// General Objects
const faveu_avatar = {
    avatar0: './img/avatar/avatar0.png',
    avatar00: './img/avatar/avatar00.png',
    avatar1: './img/avatar/avatar1.png',
    avatar2: './img/avatar/avatar2.png',
    avatar3: './img/avatar/avatar3.png',
    avatar4: './img/avatar/avatar4.png',
    avatar5: './img/avatar/avatar5.png',
    avatar6: './img/avatar/avatar6.png',
    avatar7: './img/avatar/avatar7.png',
    avatar8: './img/avatar/avatar8.png',
    avatar9: './img/avatar/avatar9.png',
    avatar10: './img/avatar/avatar10.png',
    avatar11: './img/avatar/avatar11.png',
    avatar12: './img/avatar/avatar12.png',
    avatar13: './img/avatar/avatar13.png',
    avatar14: './img/avatar/avatar14.png',
    avatar15: './img/avatar/avatar15.png',
    avatar16: './img/avatar/avatar16.png',
    avatar17: './img/avatar/avatar17.png',
    avatar18: './img/avatar/avatar18.png',
    avatar19: './img/avatar/avatar19.png',
    avatar20: './img/avatar/avatar20.png',
    avatar21: './img/avatar/avatar21.png',
    avatar22: './img/avatar/avatar22.png',
    avatar23: './img/avatar/avatar23.png',
    avatar24: './img/avatar/avatar24.png',
    avatar25: './img/avatar/avatar25.png',
    avatar26: './img/avatar/avatar26.png',
    avatar27: './img/avatar/avatar27.png',
    avatar28: './img/avatar/avatar28.png',
    avatarf: './img/avatar/avatarf.png',
    avatarl: './img/avatar/avatarlove.png',
};
const smallinvitecard = {
    card1: './img/smallinvitecard/invite_card1.svg',
    card2: './img/smallinvitecard/invite_card2.svg',
    card3: './img/smallinvitecard/invite_card3.svg',
    card4: './img/smallinvitecard/invite_card4.svg',
    card5: './img/smallinvitecard/invite_card5.svg'
}
const smallinvitecard_blank = {
    card1: './img/smallinvitecard_blank/invite_card1.svg',
    card2: './img/smallinvitecard_blank/invite_card2.svg',
    card3: './img/smallinvitecard_blank/invite_card3.svg',
    card4: './img/smallinvitecard_blank/invite_card4.svg',
    card5: './img/smallinvitecard_blank/invite_card5.svg'
}
const smallinvitecard_link = {
    card1: './img/smallinvitecard_link/invite_card1.svg',
    card2: './img/smallinvitecard_link/invite_card2.svg',
    card3: './img/smallinvitecard_link/invite_card3.svg',
    card4: './img/smallinvitecard_link/invite_card4.svg',
    card5: './img/smallinvitecard_link/invite_card5.svg'
}
const testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
const testNotName = /[\"\<\>\#\%\@\&\`\^\?\;\:\!\~\=\+\)\(\*\$\}\{\[\]]/i;
const testPhone = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/i;
const testPass = /^[\w+\s+0-9]{8,}$/i;
const test6Digit = /^\d{6}$/;
// const testmongoObjectID = /^[a-f\d]{24}$/i;

// Page 6 Envelope
const top_px = {iPh5_top: '-110px', iPh67_top: '-120px', iPh67s_top: '-130px', iPhX_top: '-111px', iPad_top: '-80px'};
// const top_px = {iPh5_top: '-110px', iPh67_top: '-120px', iPh67s_top: '-130px', iPad_top: '-80px'};
const low_px = {iPh5_low_px: '161px', iPh67_low_px: '180px', iPh67s_low_px: '195px', iPhX_low_px: '175px', iPad_low_px: '192px'};
// const low_px = {iPh5_low_px: '160px', iPh67_low_px: '180px', iPh67s_low_px: '195px', iPad_low_px: '190px'};
const high_px = {iPh5_high_px: '50px', iPh67_high_px: '30px', iPh67s_high_px: '30px', iPhX_high_px: '30px', iPad_high_px: '20px'};

// Success case and Faveu Page
var animation_index = 0;
var selected_competitor;
// var count_click_success = 0;

const baseUrl = 'http://localhost:3000/faveu/'
// const baseUrl = 'https://www.faveu.com/faveu/'

var socket = io.connect('http://localhost:3000');
// var socket = io.connect('https://www.faveu.com');