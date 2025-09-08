
$(document).ready(function(){
    headerScrollEvent();
    signControl();
    calculator();
    addInfomation();
    onlyNumber();
    historyBack();
    detailSlider();
    indexSlider();
    detailEvent();
    footerEvent();
    nonAction();
    listimgHover();
    popupEvent("input[value='remove']");
    popupEvent("input[value='close']");

    mypageEvent('.userInfo button');
    mypageEvent(".addList > input");
    mypageEvent(".addList form input[type='reset']");

    openPanel("header div div input[type='button']");
    openPanel('.wishlistContainer ul li input:last-of-type');
    openPanel('.detailContainer #have');

    eventToggle('.mui');
    eventToggle("header > div input[value='mobBtn']");
    eventToggle('header nav ul li span');
    eventToggle('.txtSwitch');
    eventToggle('footer > div:not(:nth-of-type(1),:nth-of-type(5)) span');
    eventToggle('.accComponent h3');
    eventToggle("#details span");

    listopenFilter("[class^='list'] > div > button");
    listopenFilter("#applyPanel button");
    listopenFilter('#applyPanel input[type=button]');
    listopenFilter('#applyPanel input[type=reset]');

    mobileListNav();

});



function headerScrollEvent(){

    $(window).scroll(function(){
        var wheel = $(window).scrollTop();
        if(wheel > 0){
            $('.fixHead').addClass('scroll');
            $('input[value=search]').click(function(){
            $('.searchPanel').addClass('scrollsearchmove');
        });
        }else if(wheel == 0){
            $('.fixHead').removeClass('scroll');
            $('input[value="search"]').click(function(){
                $('.searchPanel').addClass('searchmove');
                $('.searchPanel').removeClass('scrollsearchmove');
            });
        };
    });
}

function eventToggle(target){
    $(target).click(function(){
        switch(target){
        case ".mui":
            $(this).toggleClass("rotate");
            if(window.matchMedia('(max-width: 767px').matches){
                $("header > div input[value='mobBtn']").removeClass('on');
            }
            break;
        
        case "header > div input[value='mobBtn']":
            if(window.matchMedia('(max-width: 767px)').matches){
                $(this).toggleClass('on');
                $('.mui').removeClass('rotate');
            }
            break;

        case "header nav ul li span":
            if(window.matchMedia('(max-width: 1279px)').matches){
                $(this).parent().toggleClass("rotate");
                $(this).next().slideToggle();
            }
            break;
        case  ".txtSwitch":
            $(this).toggleClass('active');
            $(this).next().toggleClass('active');
            if($(this).hasClass('active') == true){
                $(this).next().removeProp('disabled');
            }else{
                $(this).next().prop('disabled',true);
            }
            break;
        
        case "footer > div:not(:nth-of-type(1),:nth-of-type(5)) span":
            $(this).next().slideToggle();
            $(this).parent().toggleClass('rotate');
            break;
        
        case ".accComponent h3":
            $(this).parent().toggleClass('accParent');
            $(this).parent().toggleClass('active');
            break;

        case "#details span":
            if(window.matchMedia('(min-width: 768px)').matches){
                $(this).next().slideToggle();
            }
            break;

        }
    });

}

function openPanel(target){
    $(target).on("click",function(){
        var open = '';
        switch(target){
            case "header div div input[type='button']" :
                open = "." + $(this).val() + "Panel";
                
                if(open == '.accountPanel'){
                    $(open).toggleClass('clickmove');
                }else if(open == '.cartPanel'){
                    $(open).addClass('clickmove');
                }else{
                    $(open).addClass('searchmove');
                }
                break;

            case ".wishlistContainer ul li input:last-of-type":
                var addSplit = $(this).val().split(' ');
                open = '.have' + addSplit[2] + 'Panel';
                if(window.matchMedia('(max-width: 767px)').matches){
                    var mobSwith = $('input[value="mobBtn"]');
                    mobSwith.addClass('on');
                    
                    $(open).addClass('clickmove');
                }else{
                    $(open).addClass('clickmove');
                }
                break;

            case ".detailContainer #have":
                open = '.' + $(this).attr('id') + "cartPanel";
                if(window.matchMedia("(max-width: 767px)").matches){
                    var mobSwith = $('input[value="mobBtn"]');
                    mobSwith.addClass('on');

                    $(open).addClass('clickmove');
                }else{
                    $(open).addClass('clickmove');
                }
                break;
        };

    });
}

function footerEvent(){

    $('.gender input').focus(function(){
        var genderName = '#' + $(this).parent().attr('class') + 'Area';
        $(genderName).slideDown();
        $(document).on('click',function(e){
            if(!$(e.target).closest(genderName).length < 1 || !$(e.target).closest('.gender').length < 1){
                $('.gender input').focus();                
            }else{
                $(genderName).slideUp();
                $('.gender input').blur();
            }
        });
    });
    
    $('.footer1faqContainer ul:first-of-type li button').click(function(){
        var faqsName = '#' + $(this).text() + 'Content';

        if(window.matchMedia('(max-width: 767px)').matches){
            $('.footer1faqContainer ul:first-of-type li button.active').addClass('absolute');
            setTimeout(()=>{
                $('.footer1faqContainer ul:first-of-type li button.absolute').removeClass('active absolute');
                $('.footer1faqContainer ul:first-of-type li button:not(.absolute)').prop('disabled',true);
                $(this).addClass('active absolute');
                setTimeout(()=>{
                    $('.footer1faqContainer ul:first-of-type li button').prop('disabled',false);
                    $('.footer1faqContainer ul:first-of-type li button').removeClass('absolute');
                },900)
            },800)
        }else{
            $('.footer1faqContainer ul:first-of-type li button').removeClass('active');
            $(this).addClass('active');
        }

        $('[id$=Content]').removeClass('active');
        $(faqsName).addClass('active');
    });

}

function listopenFilter(target){
    if($('.pager ol li').length == 1){
        $('.pager > a').click(function(e){
            e.preventDefault();
        });
    } 

    $(target).click(function(){
        switch(target){
            case "[class^='list'] > div > button":
                $('#applyPanel').toggleClass('active');
                $(this).closest('div').toggleClass('change');
                break;

            case "#applyPanel input[type=reset]":
                $(this).parent().find('mark').removeClass('active');
                break;

            case "#applyPanel button":
                $(this).next().slideToggle();
                $(this).toggleClass('change');
                break;

            case "#applyPanel input[type=button]":
                var value = $(this).val();
                $(this).closest('ol').prev().find('mark').addClass('active').text(value);
                $(this).closest('ol').slideUp();
                $(this).closest('ol').prev().removeClass('change');
                break;
            
        }
    });

}

function mobileListNav(){
    $("[class^='list'] > ol li a.active").on('click',function(e){
        if(window.matchMedia('(max-width: 767px)').matches){
            e.preventDefault();
            $(this).closest('li').toggleClass('rotate');
            $(this).closest('li').siblings('li').toggleClass('open');
        }
    });

    $("[class^='list'] > div > button,.signControl label[for='saveId']").each(function(){
        var text = $(this).text();

        if(window.matchMedia('(max-width: 767px)').matches && text.includes('filters')){
            $(this).text('filters');
        }else if(window.matchMedia('(max-width: 767px)').matches && text.includes('Save login')){
            $(this).text('Save login');
        }
    });
}

function detailEvent(){
    $('input[value=bookmark]').click(function(){
        var wishTarget = $('header > div a[href="acnt_wishlist.html"]');
        $(this).toggleClass('active');
        if(window.matchMedia('(max-width: 767px)').matches){
            $("input[value='mobBtn']").addClass('on')
            $("input[value='mobBtn']").next().slideDown();
            wishTarget.toggleClass('wishcaption');
        }else{
            $('header > div a[href="acnt_wishlist.html"]').toggleClass('wishcaption');
        }
    });

    $('.selectComponent').click(function(){
        $(this).toggleClass('rotate');
    });
    var count = $('.detailContainer aside > div:not(#details) *');
    if(count.length < 3){
        count.css(
            'width','50%'
        );
    };

    $('.mobTab').click(function(){
        var $wrap = $(this).closest('.tabButton');
        var $current = $wrap.find('input#active');
        var $content = $wrap.find('input');
        var index = $content.index($current);

        $(this).toggleClass('rotate');
        $current.removeAttr('id');

        var nextIndex = (index + 1) % $content.length;
        var activeIndex = $content.eq(nextIndex).attr('id','active');
        var data = '#' +  activeIndex.attr('data-tab');
        
        $('.tabPage').removeClass('active');
        $(data).addClass('active');


    });

    $('.tabButton input').click(function(){
        var inputName = "#" + $(this).attr('data-tab');

        $('.tabButton input').removeAttr('id');
        $(this).attr('id','active');
        $('.tabPage').removeClass('active');
        $(inputName).addClass('active');
    });
    
    $('.tabButton input:first-child').attr('id','active');
}

function signControl(){
    $(".signControl > div:first-of-type input[type='button'],.inSet form fieldset > input[type='button']").click(function(){
        var on = '.' + $(this).attr('data-tab');
        $(".signControl > div:first-of-type input[type='button'],.inSet form fieldset > input[type='button']").removeClass('activated');
        
        $(".signControl > div:not(:first-of-type)").removeClass('active');
        on == ".upSet" ? $(".upSet").addClass('active') : $(".inSet").addClass('active');
        
        if(on == ".upSet"){
            $('.signContainer > img').attr('src','images/sign_page/Sign_up_ban.png');
            $(".signControl > div:first-of-type input[value='Sign up']").addClass('activated');
            if(window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches){
                $('.signControl').addClass('reverse');
            }
        }else{
            $(this).addClass('activated');
            $('.signContainer > img').attr('src','images/sign_page/Sign_in_ban.png');
            if(window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches){
                $('.signControl').removeClass('reverse');
            }
        }
        
    });

    var checkStaus = false;
    $('.chkVisib').click(function(){
        checkStaus = !checkStaus;
        var toggleVisiblity = $(this);
        var toggleInput = $(this).siblings('input');
        if(checkStaus == true){
            toggleVisiblity.attr('class','onVisib');
            toggleInput.attr('type','text');
        }else{
            toggleVisiblity.attr('class','chkVisib');
            toggleInput.attr('type','password');
        }

    });
    
    $('#reset').click(function(){
        var popupName = '.' + $(this).attr('id') + 'Popup';
        $(popupName).addClass('active');
    });


    var passWord = $('#usePs');
    var confiPassword = $('#usrcPs');

    passWord.on('change keyup',function(){
        var pattern = passWord.val();
        confiPassword.attr('pattern',pattern);

        if(passWord.val() == confiPassword.val()){
            confiPassword.removeProp('required');
        }

    });

}

function nonAction(){
    
    $(document).on('submit','.nonAction',function(e){
        e.preventDefault();

        if($(this).closest('section').attr('class') == 'aC1addrBkContainer' && $(this).parent().attr('class') == 'editCon active'){
            var save = "." + $(this).find('input[type=submit]').val() + "Popup";
            $(save).addClass('active');
            $('.editCon').removeClass('active');
            $(this).parent().prevAll().removeClass('remove');
            $(this).parent().prev().removeClass('remove');
        }else if($(this).closest('section').attr('class') == 'aC1addrBkContainer' || $(this).closest('section').attr('class') == 'aC1paymentContainer'){
            $(this).parent().removeClass('active');
            $(this).parent().prev().removeClass('remove');
        }else if($(this).closest('div').hasClass('resetPopup') == true){
            $('.resetPopup').removeClass('active');
            $('.sucPopup').addClass('active');
        }else if($(this).closest('section').hasClass('aC2buyContainer') == true){
            $('.ordSucPopup').addClass('active');
        }else{
            $(this).find('.saveComplete').addClass('active');
        }
        
    });
}

function calculator(){
    var nonSimbol = /[^0-9]/g;

    $('.aC2cartContainer > ul li > select').change(function(){
        var objPri = $(this).prev().text();
        var qtyText = $(this).val();
        
        $(this).next().text('$' + qtyText*objPri.replace(nonSimbol,''));

        var result = 0;
        $('.aC2cartContainer > ul li strong').each(function(){
            result += parseInt($(this).text().replace(nonSimbol,''));
        });
        $('.resultCon strong').text("$" + result);
    
    });

}

function popupEvent(target){
    var nonSimbol = /[^0-9]/g;
    var disCount = 0;
    
    $(target).click(function(){

        switch(target){
            case "input[value='remove']":
                var remove = "." + $(this).attr('class') + "Popup";
                var targetList = $(this).parent();

                $(remove).addClass('active');

                $('.removePopup input').on('click',function(){
                    var inputValue = $(this).val();
                    var targetArea = $('.removePopup').next().attr('class');
                    
                    if(inputValue == 'Yes' && targetArea == 'aC2cartContainer'){
                        targetList.remove();
                        $(remove).removeClass('active');

                        $('.aC2cartContainer > ul li strong').each(function(){
                            disCount = parseInt($(this).text().replace(nonSimbol,''));
                        });
                        $('.resultCon strong').text("$" + disCount);

                        var cartList = $('.aC2cartContainer > ul li:not(:first-child)').length;
                        if(cartList < 2){
                            $('.aC2cartContainer > ul li:not(:first-child)').find(".remove").remove();
                        }

                    }else if(inputValue == 'Yes' && targetArea == 'wishlistContainer'){
                        targetList.remove();
                        $(remove).removeClass('active');

                        var wishList = $('.wishlistContainer > ul li').length;
                        if(wishList < 1){
                            window.location.href = "wishlist_empty.html";
                        }
                    }else if(inputValue == 'No'){
                        $(remove).removeClass('active');
                    };
                });
                break;

            
            case "input[value='close']": 
                if($(this).parent().attr('class') == 'ordSucPopup active'){
                   $(this).on('click',function(){
                       window.location.href = "acnt_orderhistory.html"
                   });
                }else{
                    $(this).closest('div').removeClass('clickmove');
                    $(this).parent().removeClass('searchmove');
                    $(this).parent().removeClass('scrollsearchmove');
                    $(this).parent().removeClass('active');
                   }
                break;
        }
    });

}


function listimgHover(){
    $("[class^=list] > ul li,.detailContainer > div:last-of-type ul li").hover(function(){
        if(window.matchMedia('(min-width: 1280px)').matches){
            $(this).find('img').attr('src',$(this).find('img').attr('src').replace('.png','_hover.png'));
        }
    },function(){
        if(window.matchMedia('(min-width: 1280px)').matches){
            $(this).find('img').attr('src',$(this).find('img').attr('src').replace('_hover.png','.png'));
        }
    });
}


function mypageEvent(target){
    
    $(target).click(function(){
        switch(target){
            case ".userInfo button": 
                if(window.matchMedia('(max-width: 767px)').matches){
                    $(this).closest('li').toggleClass('rotate');
                    $(this).toggleClass('active');
                }else{
                    $(this).toggleClass('active');
                }
                $(this).next().slideToggle();
                break;

            case ".addList > input":
                $(this).addClass('remove');
                $(this).parent().addClass('active');
                $(this).next().addClass('active');
                window.scrollTo({
                    top: 300,
                    behavior: "smooth"
                });
                break;

            case ".addList form input[type='reset']":
                $(this).closest('aside').find('div').removeClass('active');
                $(this).closest('aside').children().removeClass('remove');
                break;
        }
    });

}

function addInfomation(){
    var addBtn = $('.addList form div input[type=submit]');
    var appendTarget = $('.infoList');
    
    var counter = 1;
    
    addBtn.on('click',function(){
        var addInfo = $('.infoList > li:first-of-type').clone();
        if(counter <= 2){
            var checkForm = $(this).closest('form')[0];
            if(!checkForm.checkValidity()){
                checkForm.reportValidity();
                return;
            }
            
            addInfo.find('mark.notowM12').text('case' + counter);
            addInfo.find('mark.notowM12').css('background-color','darkblue');
            addInfo.find('.del').prop('disabled',false);
            addInfo.addClass('case' + counter);
            addInfo.css('margin-top','30px');

            appendTarget.append(addInfo);
            counter++;
        }else{
            alert("It's the maximum");
        }

    });
    
    $(document).on("click",'.del',function(){
        var cut = "." + $(this).attr('class') + "Popup";
        
        var targetList = $(this).parent().parent();
        $(cut).addClass('active');
        
        $('.delPopup input').click(function(){
            var inputChoice = $(this).val();
            switch(inputChoice){
                case 'Yes' :
                $(this).parent().removeClass("active");
                targetList.remove();
                counter--;
                break;
                
                case 'No' : 
                $(this).parent().removeClass("active");
                break;
            }
        });
    });

    $(document).on('click','#edit',function(){
        $(this).parent().addClass('remove');
        $(this).parent().prevAll().addClass('remove');
        $(this).parent().next().addClass('active');
    });

    $("[class^='Bene']").click(function(){
        var levelClass = "#" + $(this).attr('class') + "Con";
        $(this).siblings().removeClass('active');
        $(this).toggleClass('active');

        $("[id^='Bene']").removeClass('active');
        $(levelClass).toggleClass('active');
    });
}

function onlyNumber(){
    var Number = /[^0-9]/g;

    $("input[data-only]").on("keyup",function(){
        var val = $(this).val().replace(Number,'');
        if(val.length > 3 && val.length < 7 && $(this).attr('type') == 'tel'){
            val = val.replace(/(\d{3})(\d+)/,'$1 $2');
        }else if(val.length > 7 && $(this).attr('type') == 'tel'){
            val = val.replace(/(\d{3})(\d{4})(\d+)/,"$1 $2 $3");
        }else if(val.length > 4 && val.length < 7 && $(this).attr('id') == 'usrBirth'){
            val = val.replace(/^(\d{4})(\d{0,2})$/,'$1/$2');
        }else if(val.length >= 7 && $(this).attr('id') == 'usrBirth'){
            val = val.replace(/^(\d{4})\/?(\d{2})(\d{0,2})$/,'$1/$2/$3');
        }
        $(this).val(val);
    });
}

function historyBack(){
    $('.backBtn').click(function(){
        history.back();
    });
}

function detailSlider(){
    $('.detailImgSlider').bxSlider({
        mode: 'horizontal',
        infiniteLoop: false,
        hideControlOnEnd: true,
        speed: 500,
        pager: true,
        pagerCustom: ".thumbPager",
        controls: true,
        touchEnabled: false
    });
    
    var thumbCount = $('.thumbPager').children('li').length;
    for(var i = 0; i < thumbCount; i++){
        var imgList = $('.thumbPager li').eq(i).find('img').attr('src');
        var imgalt = $('.thumbPager li').eq(i).find('img').attr('alt');

        $('.thumbPager').append("<li><a data-slide-index='" + i + "'><img src='" + imgList + "'" + "alt=" + imgalt + "></a></li>" )
    }
    $('.thumbPager li').siblings('li:not(:nth-child(n+5))').remove();
    $('.thumbPager li').siblings('li:first-child').find('a').addClass('active');
}

function indexSlider(){
    $('.autoSlider').bxSlider({
        mode: 'horizontal',
        infiniteLoop: true,
        pager: true,
        auto: true,
        speed: 2000,
        pause: 5000,
        controls: false,
    });

    if(window.matchMedia('(max-width: 767px)').matches){
        $('.indexContainer ul:not(.autoSlider)').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            arrows: false,
            centerPadding: '24%'
        });
    }

}











