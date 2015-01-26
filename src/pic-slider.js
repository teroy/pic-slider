var PicSlider = function () {
    var sliderArray = [];
    var picSlider;
    var picSliderHeight;
    var picSliderWidth;
    var picSliderContainer;
    var startIndex = 1;
    var picCount;
    var timer;
    var direction;
    var scorll = function () {
        if (picSlider.repeater) {
            //清除图片轮询
            clearTimeout(picSlider.repeater);
        }
        startIndex = startIndex === picCount ? 1 : ++ startIndex;
        var positionX = 0 - (startIndex - 1) * picSliderWidth;
        var positionY = 0 - (startIndex - 1) * picSliderHeight;
        startSlider(positionX, positionY);
        picSlider.repeater = setTimeout(scorll, timer);
    };
    var startSlider = function (positionX, positionY) {
        if (picSliderContainer.repeater) {
            //清除图片滚动
            clearTimeout(picSliderContainer.repeater);
        }
        if (direction === 'v') {
            //垂直滚动
            var currentY = parseInt(picSliderContainer.style.top);
            var dist = positionY - currentY;
            if (currentY === positionY) {
                return;
            }
            else if (currentY < positionY) {
                var dist = Math.ceil((positionY - currentY) / 3);
                currentY = currentY + dist;
            }
            else {
                var dist = Math.ceil((currentY - positionY) / 3);
                currentY = currentY - dist;
            }
            picSliderContainer.style.top = currentY + 'px';
        }
        else {
            //水平滚动
            var currentX = parseInt(picSliderContainer.style.left);
            var dist = positionX - currentX;
            if (currentX === positionX) {
                return;
            }
            else if (currentX < positionX) {
                var dist = Math.ceil((positionX - currentX) / 3);
                currentX = currentX + dist;
            }
            else {
                var dist = Math.ceil((currentX - positionX) / 3);
                currentX = currentX - dist;
            }
            picSliderContainer.style.left = currentX + 'px';
        }

        picSliderContainer.repeater = setTimeout(function () {
            startSlider(positionX, positionY);
        }, 50);
    };
    var init = function (config) {
        //判断当前id是否已存在
        for (var i = 0; i < sliderArray.length; i++) {
            if (sliderArray[i] === config.id) {
                return;
            }
        }

        //将当前id添加进数组
        sliderArray[sliderArray.length] = config.id;

        //根据id初始化 picSlider & picSliderContainer DOM对象
        picSlider = document.getElementById(config.id);
        picSliderContainer = picSlider.getElementsByClassName('picSliderContainer')[0];

        //初始化picSliderContainer DOM对象的css属性left和top,确保存在初次读取的值
        picSliderContainer.style.left = '0px';
        picSliderContainer.style.top = '0px';

        //初始化picSlider DOM对象的宽度和高度
        picSliderHeight = config.height;
        picSliderWidth = config.width;
        picSlider.style.height = config.height + 'px';
        picSlider.style.width = config.width + 'px';

        //初始化滚动图片的数量
        picCount = picSliderContainer.getElementsByTagName('div').length;

        //初始化滚动方向
        direction = config.direction;
        if (direction === 'v') {
            var divs = picSliderContainer.getElementsByTagName('div');
            for (var i = divs.length - 1; i >= 0; i--) {
                //设置元素为块元素
                divs[i].style.display = 'block';
            }
        }

        //图片数量大于1的时候才执行循环滚动
        if (picCount > startIndex) {
            timer = config.timer;
            setTimeout(scorll, timer);
        }
    };
    return {
        initalize: init
    };
}();