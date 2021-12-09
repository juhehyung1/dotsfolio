// 'use strict';
const body = document.querySelector('body');
const header = document.querySelector('header');
const background = document.querySelector('.background_Section');
const workBtn = document.querySelector('.work_dots a');
console.log(header);


setInterval(function(){
	header.style.transition = 'opacity 1.4s';
	header.style.opacity=1;
	background.style.transition= 'opacity 2.5s';
	background.style.opacity=1;
    workBtn.style.transition = 'opacity 2.5s';
    workBtn.style.opacity = 1;

}, 5000);


var lastScrollTop = 0, delta = 15;

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop() /* 스크롤바 수직 위치를 가져옵니다, 괄호 안에 값(value)이 있을 경우 스크롤바의 수직 위치를 정합니다. */
    // Math.abs: 주어진 숫자의 절대값을 반환(return)합니다.
    // if (Math.abs(lastScrollTop - scrollTop) <= delta) // 스크롤 값을 받아서 ~
    //     return; // ~ 리턴

    if ((scrollTop > lastScrollTop) && (lastScrollTop > 0)) {
        /* 화면에 나오지 않을 때, top값은 요소가 보이지 않을 정도로 사용해야함 */
        $(".scroll_01").css("top", "-100px");
    } else {
        $(".scroll_01").css("top", "0px");
    }
    lastScrollTop = scrollTop;
});

$('.work_dots a').addClass('towhite');

$(window).on("scroll touchmove", function() {
    if ($(document).scrollTop() >= $("#main").position().top) {
            $('body').css('background', 'black');
            $('.slogan_Section .text h3').css('font-size','3em')
            $('header .ico a').css('color', 'rgba(255, 255, 255, 0.637)');
            $('header #gnb a').css('color', 'rgba(255, 255, 255, 0.61)');

    };
    if ($(document).scrollTop() > $("#slogan").position().top -500) {
        $('body').css('background', 'black');
            $('.slogan_Section .text h3').addClass('sizeUp');
            $('header .ico a').css('color', 'rgba(255, 255, 255, 0.637)');
            $('header #gnb a').css('color', 'rgba(255, 255, 255, 0.61)');
    };


    if ($(document).scrollTop() > $("#slogan").position().top -200) {
            $('.sl_p_one').addClass('animate_moveup');
    };
    if ($(document).scrollTop() > $("#slogan").position().top -100) {
            $('.sl_p_two').addClass('animate_moveup');
    };
    if ($(document).scrollTop() > $("#slogan").position().top ) {
            $('.sl_p_three').addClass('animate_moveup');
    };

    if ($(document).scrollTop() > $(".work_all").position().top - 800) {
        $('h1').addClass('animate_moveup');
    };
    if ($(document).scrollTop() > $(".work_all").position().top - 300) {
        $('.work_dots a').removeClass('toblack');
        $('.work_dots a').addClass('towhite');
        $('.work_dots a').addClass('towhite');
    };
    if ($(document).scrollTop() > $(".work_all").position().top -200) {
        $('.work_content').addClass('animate_inright');
    };

    if ($(document).scrollTop() > $(".profile_Section").position().top -900) {
        $('header .ico a').css('color', 'black');
        $('header #gnb a').css('color', ' rgba(0, 0, 0, 0.7)');
        // $('h2').addClass('animate_moveup');
    };
    
    if ($(document).scrollTop() > $(".profile_Section").position().top - 200) {
        $('body').css('background', 'white');
        $('header').css('color', ' rgba(0, 0, 0, 0.7)');
        $('.work_dots a').addClass('toblack');
    };
    if ($(document).scrollTop() > $(".profile_Section").position().top) {
        $('.profile_Section h2').addClass('animate_moveup');
        $('.profile_title').addClass('animate_moveup');
        $('.me').addClass('animate_fadein');
    };
    // if ($(document).scrollTop() > $(".profile_Section").position().top + 0) {
    //     $('.profile_title').addClass('animate_moveup');
    //     $('.me').addClass('animate_fadein');
    // };
    if ($(document).scrollTop() > $(".profile_Section").position().top +10) {
        $('.learn').addClass('animate_moveup');
    };
    if ($(document).scrollTop() > $(".profile_Section").position().top +60) {
        $('.positive').addClass('animate_moveup');
    };
    if ($(document).scrollTop() > $(".profile_Section").position().top +120) {
        $('.gradual').addClass('animate_moveup');
    };

    if ($(document).scrollTop() > $(".skill").position().top -700) {
        $('h2').addClass('animate_moveup');
    };
    if ($(document).scrollTop() > $(".skill").position().top -300) {
        $('.chart').addClass('animate_fadein');
    };
    // if ($(document).scrollTop() > $(".work_all").position().top - 700) {
  
    //     $('.up img').addClass('upani');
    //     $('.caremate img').addClass('caremateani');
    //     $('.doodle img').addClass('doodleani');
    //     $('.roudding img').addClass('rouddingani');
    // };
    if ($(document).scrollTop() > $(".contact").position().top - 200) {
        $('body').css('background', 'black');
        $('.work_dots a').removeClass('toblack');
        $('.work_dots a').addClass('towhite');
        console.log('contact');
    };
});



// $(function () {
//     var $slogan = $('.slogan_Section');

//     var $offset = 700;
//     var $sloganPageOST = $slogan.offset().top - $offset;

//     $(window).scroll(function () {
//         if ($(this).scrollTop() > $sloganPageOST) {
//             $slogan.find('.slogan_Section').addClass('animate_moveup');
//         }
       
//     });

// });
jQuery(document).ready(function ($) {

    $(".scroll").click(function (event) {

        event.preventDefault();

        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 500);

    });

});