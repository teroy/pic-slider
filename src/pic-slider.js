/*
 * teroy 
 * ͼƬ�������
 * ֧��IE9+
 */
var PicSlider = function () {
    var sliderArray = [];

    var Slider = function (config) {
        //��ʼ������
        this.startIndex = 1; //������Ϊ1
        this.rollFrequency = 3; //����ǰ��Ϊ1/3
        this.rollTimespan = 50; //�������Ϊ50ms

        //��ȡDOM����
        this.picSlider = document.getElementById(config.id);
        this.picSliderContainer = this.picSlider.getElementsByClassName('picSliderContainer')[0];

        //picSliderContainer��left��top����
        this.picSliderContainer.style.top = '0px';
        this.picSliderContainer.style.left = '0px';

        //picSlider��height��width����
        this.picSliderHeight = config.height;
        this.picSliderWidth = config.width;
        this.picSlider.style.height = config.height + 'px';
        this.picSlider.style.width = config.width + 'px';

        //�������ʱ��
        this.timer = config.timer;

        //��������
        this.direction = config.direction;

        //����������
        var divs = this.picSliderContainer.getElementsByTagName('div');
        this.picCount = divs.length;

        //��ֱ��������
        if (this.direction === 'v') {
            for (var i = this.picCount - 1; i >= 0; i-- ){
                divs[i].style.display = 'block';
            }
        }
    };

    Slider.prototype.start = function () {
        var self = this;
        //��������������1�ſ�ʼ����
        if (self.picCount > 1) {
            setTimeout(function () { self.next(); }, self.timer);
        }
    };

    Slider.prototype.next = function () {
        var self = this;
        //ȷ����ǰ���������
        self.startIndex = self.startIndex === self.picCount ? 1 : ++self.startIndex;
        //ȷ����ǰ���յ���λ��
        var positionX = 0 - (self.startIndex - 1) * self.picSliderWidth;
        var positionY = 0 - (self.startIndex - 1) * self.picSliderHeight;
        //��ʼ����
        self.goScroll(positionX, positionY);
    };

    Slider.prototype.goScroll = function (positionX, positionY) {
        var self = this;
        if (self.direction === 'v') {
            //��ֱ�������
            var currentY = parseInt(self.picSliderContainer.style.top);
            if (currentY === positionY) {
                //�Ѿ��ﵽ�����յ� ��ʼ��һ����ѯ����
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
            //ˮƽ�������
            var currentX = parseInt(self.picSliderContainer.style.left);
            if (currentX === positionX) {
                //�Ѿ��ﵽ�����յ� ��ʼ��һ����ѯ����
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
        //�жϵ�ǰid�Ƿ��Ѵ���
        for (var i = 0; i < sliderArray.length; i++) {
            if (sliderArray[i] === config.id) {
                return;
            }
        }

        //����ǰid��ӽ�����
        sliderArray[sliderArray.length] = config.id;

        //ʵ����Slider����
        var slider = new Slider(config);
        slider.start();
    };

    return {
        initalize: init
    };
}();