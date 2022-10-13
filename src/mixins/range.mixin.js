export default {
  data() {
    return {
      rangeHandlers: [
        {
          startHandler: 'mousedown',
          moveHandler: 'mousemove',
          endHandler: 'mouseup'
        }, {
          startHandler: 'touchstart',
          moveHandler: 'touchmove',
          endHandler: 'touchend'
        }
      ],
      rangeInited: false,
      rangeShiftX: 0,


      rangePercentValue: 0,
      rangeMaxLeftPosition: 0,

      range: null,
      rangeLine: null,
      rangeRound: null,

    }
  },
  methods: {
    onMouseMove(event) {
      let clientX = (typeof event.clientX !== 'undefined' ? event.clientX : event.changedTouches[0].clientX);
      let newLeftPixelPosition = clientX - this.rangeShiftX - this.range.getBoundingClientRect().left;
      this.rangeMaxLeftPosition = (this.range.offsetWidth - this.rangeRound.offsetWidth) * 100 / this.range.offsetWidth;
      this.rangePercentValue = newLeftPixelPosition * 100 / (this.range.offsetWidth - this.rangeRound.offsetWidth);
      if (this.rangePercentValue < 0) {
        this.rangePercentValue = 0;
      }
      if (this.rangePercentValue > 100) {
        this.rangePercentValue = 100;
      }

      this.updateRangePosition(this.rangePercentValue);
    },
    updateRangePosition(percent) {
      let newLeftPercentPosition = percent * this.rangeMaxLeftPosition / 100;
      this.rangeRound.style.left = newLeftPercentPosition + '%';
      this.rangeLine.style.width = newLeftPercentPosition + '%';
    },
    desktopStartHandler(event) {
      event.preventDefault();
      this.rangeShiftX = (event.clientX ? event.clientX : event.changedTouches[0].clientX) - this.rangeRound.getBoundingClientRect().left;

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', this.onMouseMove);
      }, { once: true });
    },
    mobileStartHandler(event) {
      event.preventDefault();
      this.rangeShiftX = (event.clientX ? event.clientX : event.changedTouches[0].clientX) - this.rangeRound.getBoundingClientRect().left;

      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', this.onMouseMove);
      }, { once: true });
    },

    setupRange(range, rangeLine, rangeRound) {
      this.range = range;
      this.rangeLine = rangeLine;
      this.rangeRound = rangeRound;
      this.rangeInited = true;
      this.rangeMaxLeftPosition = (this.range.offsetWidth - this.rangeRound.offsetWidth) * 100 / this.range.offsetWidth;

      this.rangeRound.addEventListener('mousedown', this.desktopStartHandler);
      this.rangeRound.addEventListener('touchstart', this.mobileStartHandler);

    },
    destroyRange() {
      this.rangeRound.removeEventListener('mousedown', this.desktopStartHandler);
      this.rangeRound.removeEventListener('touchstart', this.mobileStartHandler);
    }

  },
}