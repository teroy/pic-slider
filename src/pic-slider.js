/*
 * teroy 
 * 图片滚动插件
 * 支持IE9+
 */
var PicSlider = function () {
    var sliderArray = [];

    var Slider = function (config) {
        //初始化参数
        this.startIndex = 1; //滚动项为1
        this.rollFrequency = 3; //滚动前进为1/3
        this.rollTimespan = 50; //滚动间隔为50ms

        //获取DOM对象
        this.picSlider = document.getElementById(config.id);
        this.picSliderContainer = this.picSlider.getElementsByClassName('picSliderContainer')[0];

        //picSliderContainer的left和top属性
        this.picSliderContainer.style.top = '0px';
        this.picSliderContainer.style.left = '0px';

        //picSlider的height和width属性
        this.picSliderHeight = config.height;
        this.picSliderWidth = config.width;
        this.picSlider.style.height = config.height + 'px';
        this.picSlider.style.width = config.width + 'px';

        //滚动间隔时间
        this.timer = config.timer;

        //滚动方向
        this.direction = config.direction;

        //滚动块数量
        var divs = this.picSliderContainer.getElementsByTagName('div');
        this.picCount = divs.length;

        //垂直滚动处理
        if (this.direction === 'v') {
            for (var i = this.picCount - 1; i >= 0; i-- ){
                divs[i].style.display = 'block';
            }
        }
    };

    Slider.prototype.start = function () {
        var self = this;
        //滚动块数量大于1才开始滚动
        if (self.picCount > 1) {
            setTimeout(function () { self.next(); }, self.timer);
        }
    };

    Slider.prototype.next = function () {
        var self = this;
        //确定当前滚动块序号
        self.startIndex = self.startIndex === self.picCount ? 1 : ++self.startIndex;
        //确定当前最终到达位置
        var positionX = 0 - (self.startIndex - 1) * self.picSliderWidth;
        var positionY = 0 - (self.startIndex - 1) * self.picSliderHeight;
        //开始滚动
        self.goScroll(positionX, positionY);
    };

    Slider.prototype.goScroll = function (positionX, positionY) {
        var self = this;
        if (self.direction === 'v') {
            //垂直方向滚动
            var currentY = parseInt(self.picSliderContainer.style.top);
            if (currentY === positionY) {
                //已经达到滚动终点 开始下一次轮询滚动
                setTimeout(function () { self.next(); }, self.timer);
                return;
            }
            else if (currentY < positionY) {
                var dist = Math.ceil((positionY - currentY) / self.rollFrequency);
                currentY = currentY + dist;
            }
            else {
                var dist = Math.ceil((currentY - positionY) / self.rollFrequency);
                currentY = currentY - dist;
            }
            self.picSliderContainer.style.top = currentY + 'px';
        }
        else {
            //水平方向滚动
            var currentX = parseInt(self.picSliderContainer.style.left);
            if (currentX === positionX) {
                //已经达到滚动终点 开始下一次轮询滚动
                setTimeout(function () { self.next(); }, self.timer);
                return;
            }
            else if (currentX < positionX) {
                var dist = Math.ceil((positionX - currentX) / self.rollFrequency);
                currentX = currentX + dist;
            }
            else {
                var dist = Math.ceil((currentX - positionX) / self.rollFrequency);
                currentX = currentX - dist;
            }
            self.picSliderContainer.style.left = currentX + 'px';
        }
        setTimeout(function () { self.goScroll(positionX, positionY); }, self.rollTimespan);
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

        //实例化Slider对象
        var slider = new Slider(config);
        slider.start();
    };

    return {
        initalize: init
    };
}();