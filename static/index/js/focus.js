/**
 * Created by Administrator on 2018/3/9 0009.
 */
var focusApp={
    init: function () {
        this.focus();
        this.getCase();
    },
    /*轮播图*/
    focus: function () {
        var $ul = $('.banner .oUl');
        var $smallUl = $('.banner .smallUl');
        $ul.append($('.banner .oUl li').eq(0).clone(true));
        var $lis = $('.banner .oUl li');
        var $smallLi = $('.banner .smallUl li');
        $ul.css({
            width: $('.banner .oUl li').eq(0).width() * $('.banner .oUl li').size()
        });
        $smallLi.eq(0).addClass('active');
        var i = 0;
        var timer = setInterval(function () {
            i++;
            move();
        }, 2000);
        /*下图标*/
        $smallLi.click(function () {
            console.log($(this).index());
            i = $(this).index();
            move();
        });
        //右
        $('.lt').click(function () {
            i++;
            move();
        });
        //左
        $('.gt').click(function () {
            i--;
            move();
        });
        /*轮播图运动*/
        function move() {
            $ul.stop();
            if (i == $lis.size()) {
                i = 1;
                $ul.css({'left': 0});
            };
            if (i < 0) {
                i = $lis.size()-2;
                $ul.css({'left':  -$('.banner .oUl li').eq(0).width() * ($('.banner .oUl li').size()-1)});
            };
            $ul.animate({
                left: -i * $lis.width()
            });
            /*下图标运动*/
            if (i < $lis.size() - 1) {
                $smallLi.eq(i).addClass('active').siblings().removeClass('active');
            } else {
                $smallLi.eq(0).addClass('active').siblings().removeClass('active');
            };
            
        };
        $('.banner').hover(function () {
            clearInterval(timer);
            $('.gt').css({
                'display':'block'
            });
            $('.lt').css({
                'display':'block'
            });
        }, function () {
            $('.gt').css({
                'display':'none'
            });
            $('.lt').css({
                'display':'none'
            })
            timer = setInterval(function () {
                i++;
                move();
            }, 2000);
        });
    },
    getCase: function () {/*成功案例*/
        var apiUrl='http://localhost:3008/api/';
        $.get(apiUrl, function (data) {
            $('.newsdata').mouseenter(function () {
                var dataLd=$(this).attr('data-id');
                var str='';
                for(var i=0;i<data.api.length;i++){
                    if(dataLd==data.api[i].cid){
                       str+='<li><img width="300px" height="200px" src="'+'/'+data.api[i].pic+'" alt="&nbsp;"/></li>'
                    }
                }
                console.log(str);
                $('.main_bottom-table .clear').html(str);
            })
        },'json');
    }

};