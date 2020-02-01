<template>
  <q-card class="my-card ">
    <q-card-section>
      <h5 class="text-center q-ma-none ">Авторизация</h5>
    </q-card-section>

    <q-card-actions class="column items-start">
      <q-form class="width">
        <q-input
          outlined
          label="Логин"
          class="input"
          v-model="data.login"
          ref="login"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Введите логин!']"
        />
        <q-input
          v-model="data.password"
          :type="isPwd ? 'password' : 'text'"
          outlined
          label="Пароль"
          class="input"
          ref="password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Введите пароль!']"
        >
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-btn label="Авторизироваться" type="submit" color="primary" class="input" v-on:click="submit" />
      </q-form>
      <q-btn size="12px" flat v-on:click="$emit('showAuth')">Зарегистрироваться</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      data: {
        login: '',
        password: ''
      },
      isPwd: true
    };
  },
  methods: {
    submit: async function() {
      this.$refs.login.validate(); //Запускаем валидацию поля логина
      this.$refs.password.validate(); //Запускаем валидацию поля пароля
      //Если ошибок нет - отправляем запрос на сервер
      if (!this.$refs.login.hasError && !this.$refs.password.hasError) {
        const serializeData = JSON.stringify(this.data);
        const response = await fetch('/login', { body: serializeData, method: 'POST' });
        console.log(response.json());
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 420px;
  .width {
    width: 100%;
  }
  .input {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
