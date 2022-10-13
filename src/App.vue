<template>
  <auto-calculator />
</template>

<script>
import AutoCalculator from "@/components/AutoCalculator.vue";

export default {
  name: "App",
  components: {
    AutoCalculator,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  & > * {
    flex-shrink: 0;
  }
}
body {
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  font-family: "Gilroy", sans-serif;
  -webkit-overflow-scrolling: touch;
}
[disabled],
.disabled {
  opacity: 0.4;
  pointer-events: none;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.notif{
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  background: #ff9514;
  color: #fff;
  text-align: center;
  transition: 0.3s;
  &:not(.active){
    top: -20%;
    opacity: 0;
  }
  &.active{
    top: 2%;
    opacity: 1;
  }
  @media screen and (min-width: 1440px) {
    padding: 0.972vw;
    font-size: 2.083vw;
    line-height: 2.500vw;
    width: 32.639vw;
    max-width: calc(100% - 2.778vw);
    border-radius: 0.694vw;
  }
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    padding: 14px;
    font-size: 30px;
    line-height: 36px;
    width: 470px;
    max-width: calc(100% - 40px);
    border-radius: 10px;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    padding: 14px;
    font-size: 24px;
    line-height: 36px;
    width: 420px;
    max-width: calc(100% - 40px);
    border-radius: 10px;
  }
  @media screen and (max-width: 319px) {
    padding: 4.375vw;
    font-size: 7.500vw;
    line-height: 11.250vw;
    width: 131.250vw;
    max-width: calc(100% - 12.500vw);
    border-radius: 3.125vw;
  }
}
.title {
  font-family: "Nekst-Black";
  color: #111111;
  width: 100%;
  margin-top: 0;
  @media screen and (min-width: 1440px) {
    max-width: 52.292vw;
    font-size: 3.75vw;
    line-height: 90%;
    margin-bottom: 2.222vw;
  }
  @media screen and (min-width: 1120px) and (max-width: 1439px) {
    max-width: 753px;
    font-size: 54px;
    line-height: 90%;
    margin-bottom: 32px;
  }
  @media screen and (min-width: 768px) and (max-width: 1119px) {
    max-width: 753px;
    font-size: 54px;
    line-height: 90%;
    margin-bottom: 44px;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    max-width: 100%;
    font-size: 34px;
    line-height: 90%;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 319px) {
    max-width: 100%;
    font-size: 10.625vw;
    line-height: 90%;
    margin-bottom: 10vw;
  }
}
</style>
