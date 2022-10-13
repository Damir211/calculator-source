<template>
  <div class="calculator__block calculator__block-input">
    <div class="calculator__title">
      {{ title }}
    </div>
    <div class="input">
      <input
        class="input__main"
        type="text"
        inputmode="numeric"
        :value="formatedModalValue"
        @input="inputHandler"
        @blur="blurHandler"
        v-if="typeInput === 'default'"
      />
      <input
        class="input__main"
        type="text"
        :value="formatedFirstPay"
        readonly
        v-else-if="typeInput === 'percent'"
      />
      <div class="input__info" v-if="typeInput === 'default'">
        {{ placeholder }}
      </div>
      <div
        class="input__info input__info-fill"
        v-else-if="typeInput === 'percent'"
      >
        <input
          class="input__percent"
          type="text"
          inputmode="numeric"
          :value="formatedModalValue"
          @input="inputHandler"
          @blur="blurHandler"
        />
        <span>%</span>
      </div>
      <div class="input__range" ref="range">
        <div class="input__round" style="left: 0" ref="rangeRound"></div>
        <div class="input__line" ref="rangeLine"></div>
      </div>
    </div>
  </div>
</template>

<script>
import rangeMixin from "@/mixins/range.mixin";

export default {
  name: "AppInput",
  props: {
    title: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "",
    },
    firstPay: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: Number,
    },
    typeInput: {
      type: String,
      default: "default",
    },
    maxValue: {
      type: Number,
      default: 0,
      required: true,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    currencyMask: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  mixins: [rangeMixin],
  methods: {
    inputHandler(e) {
      let currentValue = +e.target.value.replace(/[^0-9]/g, "");
      if (this.maxValue) {
        currentValue =
          currentValue > this.maxValue ? this.maxValue : currentValue;
      }
      if (this.modelValue === currentValue) {
        e.target.value = this.formatedModalValue;
      } else {
        this.$emit("update:modelValue", currentValue);
        if (this.rangeInited)
          this.updateRangePosition(this.inputValueToPercent(currentValue));
      }
    },
    blurHandler(e) {
      let currentValue = +e.target.value.replace(/[^0-9]/g, "");
      if (this.minValue > currentValue) {
        this.$emit("update:modelValue", this.minValue);
      }
    },
    inputValueToPercent(value) {
      let valueToPercent =
        ((value - this.minValue) * 100) / (this.maxValue - this.minValue);
      return (valueToPercent = valueToPercent >= 0 ? valueToPercent : 0);
    },
    inputValueToNumeric(percent) {
      let valueToNumeric =
        (this.maxValue - this.minValue) *
          (Number.parseFloat(percent.toFixed(1)) / 100) +
        this.minValue;
      return Math.round(valueToNumeric);
    },
  },
  computed: {
    formatedModalValue() {
      if (this.currencyMask) {
        return new Intl.NumberFormat("ru-RU").format(this.modelValue);
      } else {
        return String(this.modelValue);
      }
    },
    formatedFirstPay() {
      return (
        new Intl.NumberFormat("ru-RU").format(this.firstPay) + this.placeholder
      );
    },
  },
  watch: {
    rangePercentValue(percent) {
      this.$emit("update:modelValue", this.inputValueToNumeric(percent));
    },
  },
  mounted() {
    this.setupRange(
      this.$refs.range,
      this.$refs.rangeLine,
      this.$refs.rangeRound
    );
    this.updateRangePosition(this.inputValueToPercent(this.modelValue));
  },
  beforeUnmount() {
    if (this.rangeInited) {
      this.destroyRange();
    }
  },
};
</script>

<style lang="scss">
.input {
  position: relative;
  transition: 0.3s;
  .input__main {
    background-color: #f3f3f4;
    width: 100%;
    font-family: "Nekst-Black";
    color: #575757;
    transition: 0.3s;
    @media screen and (min-width: 1440px) {
      border-radius: 1.111vw;
      padding: 0.972vw 1.667vw;
      border: 0.139vw solid #f3f3f4;
      font-size: 2.083vw;
      line-height: 2.5vw;
    }
    @media screen and (min-width: 768px) and (max-width: 1439px) {
      border-radius: 16px;
      padding: 14px 24px;
      border: 2px solid #f3f3f4;
      font-size: 30px;
      line-height: 36px;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
      border-radius: 16px;
      padding: 15px 20px;
      border: 2px solid #f3f3f4;
      font-size: 22px;
      line-height: 26px;
    }
    @media screen and (max-width: 319px) {
      border-radius: 5vw;
      padding: 4.688vw 6.25vw;
      border: 0.625vw solid #f3f3f4;
      font-size: 6.875vw;
      line-height: 8.125vw;
    }
    &[readonly] {
      cursor: default;
    }
    &:not([readonly]):focus {
      background-color: #fff;
    }
  }
  &__percent {
    border: 2px solid #ebebec;
    background: #ebebec;
    width: 100%;
    height: 100%;
    color: #575757;
    text-align: right;
    @media screen and (min-width: 1440px) {
      padding: 0.903vw 2.222vw 0.903vw 0.347vw;
      border-radius: 1.111vw;
      font-size: 1.528vw;
      line-height: 120%;
    }
    @media screen and (min-width: 768px) and (max-width: 1439px) {
      padding: 13px 32px 13px 5px;
      border-radius: 16px;
      font-size: 22px;
      line-height: 120%;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
      padding: 12px 32px 12px 5px;
      border-radius: 12px;
      font-size: 22px;
      line-height: 120%;
    }
    @media screen and (max-width: 319px) {
      padding: 3.75vw 10vw 3.75vw 1.563vw;
      border-radius: 3.75vw;
      font-size: 6.875vw;
      line-height: 120%;
    }
    &:focus {
      background: #fff;
      border: 2px solid #ebebec;
    }
  }
  &__info {
    position: absolute;
    font-family: "Nekst-Black";
    text-align: right;
    color: #575757;
    &:not(.input__info-fill) {
      @media screen and (min-width: 1440px) {
        right: 1.667vw;
        top: 1.111vw;
        font-size: 2.083vw;
        line-height: 2.5vw;
      }
      @media screen and (min-width: 768px) and (max-width: 1439px) {
        right: 24px;
        top: 16px;
        font-size: 30px;
        line-height: 36px;
      }
      @media screen and (min-width: 320px) and (max-width: 767px) {
        right: 20px;
        top: 20px;
        font-size: 22px;
        line-height: 20px;
      }
      @media screen and (max-width: 319px) {
        right: 6.25vw;
        top: 6.25vw;
        font-size: 6.875vw;
        line-height: 6.25vw;
      }
    }
    &-fill {
      display: flex;
      align-items: center;
      @media screen and (min-width: 1440px) {
        top: 0.486vw;
        right: 0.486vw;
        bottom: 0.486vw;
        width: 4.861vw;
      }
      @media screen and (min-width: 768px) and (max-width: 1439px) {
        top: 7px;
        right: 7px;
        bottom: 7px;
        width: 70px;
      }
      @media screen and (min-width: 320px) and (max-width: 767px) {
        top: 6px;
        right: 6px;
        bottom: 6px;
        width: 70px;
      }
      @media screen and (max-width: 319px) {
        top: 1.875vw;
        right: 1.875vw;
        bottom: 1.875vw;
        width: 21.875vw;
      }
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        @media screen and (min-width: 1440px) {
          font-size: 1.528vw;
          line-height: 120%;
          right: 1.181vw;
        }
        @media screen and (min-width: 768px) and (max-width: 1439px) {
          font-size: 22px;
          line-height: 120%;
          right: 17px;
        }
        @media screen and (min-width: 320px) and (max-width: 767px) {
          font-size: 22px;
          line-height: 120%;
          right: 17px;
        }
        @media screen and (max-width: 319px) {
          font-size: 6.875vw;
          line-height: 120%;
          right: 5.313vw;
        }
      }
    }
  }
  &__range {
    position: absolute;
    bottom: 0;
    @media screen and (min-width: 1440px) {
      left: 1.667vw;
      right: 1.667vw;
      height: 0.139vw;
    }
    @media screen and (min-width: 768px) and (max-width: 1439px) {
      left: 24px;
      right: 24px;
      height: 2px;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
      left: 20px;
      right: 20px;
      height: 2px;
    }
    @media screen and (max-width: 319px) {
      left: 6.25vw;
      right: 6.25vw;
      height: 0.625vw;
    }
    &::before {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: #e1e1e1;
      content: "";
      @media screen and (min-width: 1440px) {
        height: 0.069vw;
      }
      @media screen and (min-width: 768px) and (max-width: 1439px) {
        height: 1px;
      }
      @media screen and (min-width: 320px) and (max-width: 767px) {
        height: 1px;
      }
      @media screen and (max-width: 319px) {
        height: 0.313vw;
      }
    }
  }
  &__round {
    background: #ff9514;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    @media screen and (min-width: 1440px) {
      width: 1.389vw;
      height: 1.389vw;
      top: calc(50% - 0.694vw);
    }
    @media screen and (min-width: 320px) and (max-width: 1439px) {
      width: 20px;
      height: 20px;
      top: calc(50% - 10px);
    }
    @media screen and (max-width: 319px) {
      width: 6.25vw;
      height: 6.25vw;
      top: calc(50% - 3.125vw);
    }
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: #ff9514;
      transition: 0.3s;
      @media screen and (min-width: 1440px) {
        width: 1.389vw;
        height: 1.389vw;
      }
      @media screen and (min-width: 320px) and (max-width: 1439px) {
        width: 20px;
        height: 20px;
      }
      @media screen and (max-width: 319px) {
        width: 6.25vw;
        height: 6.25vw;
      }
    }
    &:hover::before,
    &:active::before {
      @media screen and (min-width: 1440px) {
        width: 1.667vw;
        height: 1.667vw;
      }
      @media screen and (min-width: 320px) and (max-width: 1439px) {
        width: 24px;
        height: 24px;
      }
      @media screen and (max-width: 319px) {
        width: 7.5vw;
        height: 7.5vw;
      }
    }
  }
  &__line {
    position: absolute;
    left: 0;
    background: #ff9514;
    bottom: 0px;
    width: 0;
    @media screen and (min-width: 1440px) {
      height: 0.139vw;
      border-radius: 0.139vw 0 0 0;
    }
    @media screen and (min-width: 320px) and (max-width: 1439px) {
      height: 2px;
      border-radius: 2px 0 0 0;
    }
    @media screen and (max-width: 319px) {
      height: 0.625vw;
      border-radius: 0.625vw 0 0 0;
    }
  }
}
</style>
