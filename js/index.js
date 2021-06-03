window.addEventListener("load", function () {
    // 获取元素
    var focus = document.querySelector(".focus");
    var ul = focus.children[0];
    // 获取focus宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 利用定时器自动播放轮播图
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = "all .3s";
        ul.style.transform = "translateX(" + translatex + "px)";
    }, 2000);
    // 等着我们过渡完成之后，再去判断监听过渡完的事件
    ul.addEventListener("transitionend", function () {
        if (index >= 3) {
            index = 0;
            ul.style.transition = "none";
            var translatex = -index * w;
            ul.style.transform = "translateX(" + translatex + "px)";
        } else if (index < 0) {
            index = 2;
            ul.style.transition = "none";
            var translatex = -index * w;
            ul.style.transform = "translateX(" + translatex + "px)";
        }
        // 3.小圆点跟随变化
        // 把ol里面带有current类名的选出来去掉类名 remove
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号的小li加上current add
        ol.children[index].classList.add('current');
    });
    // 手指滑动轮播图
    // 触摸元素 touchstart：获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    // 移动手指 touchmove：计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = "none";
        ul.style.transform = "translateX(" + translatex + "px)";
        flag = true;
        e.preventDefault();
    });
    // 手指离开 根据移动距离去判断回弹还是播放上一张下一张
    ul.addEventListener('touchend', function () {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // 如果小于50像素就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 手指离开重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = "all .3s";
            ul.style.transform = "translateX(" + translatex + "px)";
        }, 2000);
    });
    // 返回顶部
    var goback = document.querySelector('.goback');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    });
    goback.addEventListener('click', function () {
        window.scroll(0, 0);
    })
});