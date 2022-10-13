<template>
  <div class="calculator">
    <h1 class="title">Рассчитайте стоимость автомобиля в лизинг</h1>
    <form class="calculator__form" @submit.prevent="submitHandler">
      <app-input
        :title="'Стоимость автомобиля'"
        :placeholder="'₽'"
        :typeInput="'default'"
        :minValue="1000000"
        :maxValue="6000000"
        :currencyMask="true"
        v-model="car_coast"
        :class="{disabled: loading}"
      />
      <app-input
        :title="'Первоначальный взнос'"
        :placeholder="'₽'"
        :firstPay="initail_payment"
        :typeInput="'percent'"
        :minValue="10"
        :maxValue="60"
        v-model="initail_payment_percent"
        :class="{disabled: loading}"
      />
      <app-input
        :title="'Срок лизинга'"
        :placeholder="'мес.'"
        :typeInput="'default'"
        :minValue="1"
        :maxValue="60"
        v-model="lease_term"
        :class="{disabled: loading}"
      />

      <div class="calculator__block calculator__block-result">
        <div class="calculator__title">Сумма договора лизинга</div>
        <div class="calculator__result">
          {{ total_sum ? new Intl.NumberFormat("ru-RU").format(total_sum) : 0 }}
          ₽
        </div>
      </div>
      <div class="calculator__block calculator__block-result">
        <div class="calculator__title">Ежемесячный платеж от</div>
        <div class="calculator__result">
          {{
            !isFinite(monthly_payment_from)
              ? 0
              : new Intl.NumberFormat("ru-RU").format(monthly_payment_from)
          }}
          ₽
        </div>
      </div>
      <div class="calculator__block calculator__block-button">
        <button type="submit" class="calculator__button" :class="{loading: loading}">
          Оставить заявку
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AppInput from "@/components/ui/AppInput.vue";
import { sendCalculatorForm } from '@/api'

export default {
  name: "AutoCalculator",
  data() {
    return {
      car_coast: 3300000,
      initail_payment_percent: 13,
      lease_term: 60,
      percent: 0.035,
      loading: false,
    };
  },
  computed: {
    initail_payment() {
      return Math.ceil(this.car_coast * (this.initail_payment_percent / 100));
    },
    monthly_payment_from() {
      return Math.ceil(
        (this.car_coast - this.initail_payment) *
          ((this.percent * Math.pow(1 + this.percent, this.lease_term)) /
            (Math.pow(1 + this.percent, this.lease_term) - 1))
      );
    },
    total_sum() {
      return this.initail_payment + this.lease_term * this.monthly_payment_from;
    },
  },
  components: {
    AppInput,
  },
  methods: {
    submitHandler() {
      let data = {
        car_coast: this.car_coast,
        initail_payment: this.initail_payment,
        initail_payment_percent: this.initail_payment_percent,
        lease_term: this.lease_term,
        total_sum: this.total_sum,
        monthly_payment_from: this.monthly_payment_from,
      };

      this.loading = true;
      sendCalculatorForm(data)
        .then((res)=>{
          this.loading = false;
          this.$showNotif('Данные успешно отправлены');
        })
        .catch((error)=>{
          this.loading = false;
          this.$showNotif('Произошла ошибка');
        });
    },
  }
};
</script>

<style lang="scss">
.calculator {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media screen and (min-width: 1440px) {
    padding: 3.264vw;
    justify-content: center;
  }
  @media screen and (min-width: 1120px) and (max-width: 1439px) {
    padding: 47px;
    justify-content: center;
  }
  @media screen and (min-width: 768px) and (max-width: 1119px) {
    padding: 64px 36px;
    justify-content: flex-start;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    padding: 44px 20px;
  }
  @media screen and (max-width: 319px) {
    padding: 13.75vw 6.25vw;
  }
  &__title {
    color: #575757;
    @media screen and (min-width: 1440px) {
      font-size: 1.111vw;
      line-height: 1.389vw;
    }
    @media screen and (min-width: 768px) and (max-width: 1439px) {
      font-size: 16px;
      line-height: 20px;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 14px;
      line-height: 136%;
    }
    @media screen and (max-width: 319px) {
      font-size: 4.375vw;
      line-height: 136%;
    }
    & + .input {
      @media screen and (min-width: 1440px) {
        margin-top: 1.667vw;
      }
      @media screen and (min-width: 768px) and (max-width: 1439px) {
        margin-top: 24px;
      }
      @media screen and (min-width: 320px) and (max-width: 767px) {
        margin-top: 8px;
      }
      @media screen and (max-width: 319px) {
        margin-top: 2.5vw;
      }
    }
    & + *:not(.input) {
      @media screen and (min-width: 1440px) {
        margin-top: 0.556vw;
      }
      @media screen and (min-width: 768px) and (max-width: 1439px) {
        margin-top: 8px;
      }
      @media screen and (min-width: 320px) and (max-width: 767px) {
        margin-top: 2px;
      }
      @media screen and (max-width: 319px) {
        margin-top: 0.625vw;
      }
    }
  }
  &__form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }
  &__block {
    transition: opacity 0.3s;
    @media screen and (min-width: 1440px) {
      width: calc(33.3333333% - 1.458vw);
    }
    @media screen and (min-width: 1120px) and (max-width: 1439px) {
      width: calc(33.3333333% - 21px);
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
      width: 100%;
    }
    @media screen and (max-width: 319px) {
      width: 100%;
    }
    &.calculator__block-input {
      @media screen and (min-width: 768px) and (max-width: 1119px) {
        width: 100%;
      }
    }
    &.calculator__block-result,
    &.calculator__block-button {
      @media screen and (min-width: 768px) and (max-width: 1119px) {
        width: calc(50% - 16px);
      }
    }
    &.calculator__block-input:not(:first-child) {
      @media screen and (min-width: 768px) and (max-width: 1119px) {
        margin-top: 39px;
      }
      @media screen and (min-width: 320px) and (max-width: 767px) {
        margin-top: 25px;
      }
      @media screen and (max-width: 319px) {
        margin-top: 7.813vw;
      }
    }
    &:nth-child(n + 4) {
      @media screen and (min-width: 1440px) {
        margin-top: 3.472vw;
      }
      @media screen and (min-width: 1120px) and (max-width: 1439px) {
        margin-top: 50px;
      }
      @media screen and (min-width: 768px) and (max-width: 1119px) {
        margin-top: 44px;
      }
      @media screen and (min-width: 320px) and (max-width: 767px) {
        margin-top: 30px;
      }
      @media screen and (max-width: 319px) {
        margin-top: 9.375vw;
      }
    }
  }
  &__button {
    font-family: "Nekst-Black";
    background-color: #ff9514;
    color: #ffffff;
    border: none;
    width: 100%;
    transition: 0.3s;
    cursor: pointer;
    position: relative;
    @media screen and (min-width: 1440px) {
      padding: 0.972vw 0.972vw 1.25vw 0.972vw;
      border-radius: 2.778vw;
      font-size: 2.083vw;
      line-height: 2.5vw;
    }
    @media screen and (min-width: 768px) and (max-width: 1439px) {
      padding: 14px 14px 18px 14px;
      border-radius: 40px;
      font-size: 30px;
      line-height: 36px;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
      padding: 18px 14px 22px 14px;
      border-radius: 40px;
      font-size: 22px;
      line-height: 20px;
    }
    @media screen and (max-width: 319px) {
      padding: 5.625vw 4.375vw 6.875vw 4.375vw;
      border-radius: 12.5vw;
      font-size: 6.875vw;
      line-height: 6.25vw;
    }
    &:hover {
      background-color: #111111;
    }
    &:active {
      background-color: #575757;
    }
    &.loading {
      color: transparent;
      pointer-events: none;
      &::before {
        position: absolute;
        content: "";
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        @media screen and (min-width: 1440px) {
          top: calc(50% - 0.903vw);
          left: calc(50% - 0.903vw);
          width: 1.806vw;
          height: 1.806vw;
          border: 0.139vw solid #fff;
          border-bottom-color: transparent;
        }
        @media screen and (min-width: 320px) and (max-width: 1439px) {
          top: calc(50% - 13px);
          left: calc(50% - 13px);
          width: 26px;
          height: 26px;
          border: 2px solid #fff;
          border-bottom-color: transparent;
        }
        @media screen and (max-width: 319px) {
          top: calc(50% - 4.063vw);
          left: calc(50% - 4.063vw);
          width: 8.125vw;
          height: 8.125vw;
          border: 0.625vw solid #fff;
          border-bottom-color: transparent;
        }
      }
    }
  }
  &__result {
    font-family: "Nekst-Black";
    color: #333333;
    @media screen and (min-width: 1440px) {
      font-size: 3.75vw;
      line-height: 90%;
    }
    @media screen and (min-width: 768px) and (max-width: 1439px) {
      font-size: 54px;
      line-height: 90%;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 22px;
      line-height: 20px;
    }
    @media screen and (max-width: 319px) {
      font-size: 6.875vw;
      line-height: 6.25vw;
    }
  }
}
</style>
