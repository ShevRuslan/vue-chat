<template>
  <div class="window-height column items-center q-pa-lg justify-center">
    <h3>LeebarChat - чат твоей мечты!</h3>
    <transition name="component-fade" mode="out-in">
      <component v-on:showAuth="changeForm" v-bind:is="showAuth ? 'Auth' : 'Register'"></component>
    </transition>
  </div>
</template>

<script>
import Auth from '../components/Auth';
import Register from '../components/Register';

export default {
  name: 'home',
  components: {
    Auth,
    Register
  },
  data() {
    return {
      showAuth: true
    };
  },
  methods: {
    //Функция, для смены форм (авторизация -> регистрация; регистрация -> авторизация)
    changeForm: function() {
      this.showAuth = !this.showAuth;
    }
  }
};
</script>
<style lang="scss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
