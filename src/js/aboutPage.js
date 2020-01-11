import '../scss/style.scss';
import pin from '../assets/img/pin.svg';

ymaps.ready(init);
function init(ymaps) {
  const myMap = new ymaps.Map('map', {
    center: [64.529109, 40.566819],
    zoom: 16,
    controls: [],
  });

  const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="popover"></div>', {
      build() {
        this.constructor.superclass.build.call(this);

        this._$element = $('.popover', this.getParentElement());
        // this.applyElementOffset();
      },

      // applyElementOffset() {
      //   this._$element.css({
      //     left: -(this._$element[0].offsetWidth / 2),
      //     top: -(this._$element[0].offsetHeight / 2),
      //   });
      // },

      _isElement(element) {
        return element && element[0];
      },
    },
  );

  const myPlacemark = new ymaps.Placemark(
    myMap.getCenter(), {
      balloonContent: '',
    }, {
      iconLayout: 'default#image',
      iconImageHref: pin,
      iconImageSize: [28, 37],
      iconImageOffset: [-20, -20],
      hideIconOnBalloonOpen: false,
      balloonLayout: MyBalloonLayout,
      balloonOffset: [-80, -150],
    },
  );

  myMap.behaviors
    .disable(['drag', 'rightMouseButtonMagnifier']);
  myMap.controls.add('zoomControl', {
    position: {
      left: 'auto',
      right: 10,
      bottom: 'auto',
      top: 140,
    },
    size: 'small',
  });

  myMap.controls.add('geolocationControl', {
    position: {
      left: 'auto',
      right: 10,
      bottom: 'auto',
      top: 218,
    },
  });
  myMap.geoObjects.add(myPlacemark);
  myPlacemark.ballon.open();
}
