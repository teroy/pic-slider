
var PicSlider = function () {
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
            //���ѭ������
            clearTimeout(picSliderContainer.repeater);
        }
        if (direction === 'v') {
            //��ֱ����
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
            //ˮƽ����
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
        //����id��ʼ�� picSlider & picSliderContainer DOM����
        picSlider = document.getElementById(config.id);
        picSliderContainer = document.getElementById(config.containerId);

        //��ʼ��picSliderContainer DOM�����css����left��top,ȷ�����ڳ��ζ�ȡ��ֵ
        picSliderContainer.style.left = '0px';
        picSliderContainer.style.top = '0px';

        //��ʼ��picSlider DOM����Ŀ��Ⱥ͸߶�
        picSliderHeight = config.height;
        picSliderWidth = config.width;
        picSlider.style.height = picSliderHeight + 'px';
        picSlider.style.width = picSliderWidth + 'px';

        //��ʼ����������
        direction = config.direction;
        if (direction === 'v') {
            var divs = picSliderContainer.getElementsByTagName('div');
            for (var i = divs.length - 1; i >= 0; i--) {
                //����Ԫ��Ϊ��Ԫ��
                divs[i].style.display = 'block';
            }
        }

        //��ʼ������ͼƬ������
        picCount = picSliderContainer.getElementsByTagName('div').length;

        //ͼƬ��������1��ʱ���ִ��ѭ������
        if (picCount > startIndex) {
            timer = config.timer;
            setTimeout(scorll, timer);
        }
    };
    return {
        initalize: init
    };
}();