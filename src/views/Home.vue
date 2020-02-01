<template>
  <div class="home window-height column items-center q-pa-lg justify-center">
    <h2>Домашняя страница</h2>
    <Auth></Auth>
  </div>
</template>

<script>
import Auth from '../components/Auth';
export default {
  name: 'home',
  components: {
    Auth
  }
};
</script>
