<template>
  <q-card class="my-card ">
    <q-card-section>
      <h5 class="text-center q-ma-none ">
        Авторизация
      </h5>
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
          :rules="[val => !!val || 'Введите логин!', val => val.length >= 8 || 'Логин должен быть больше 8 символов']"
        />
        <q-input
          v-model="data.password"
          :type="isPwd ? 'password' : 'text'"
          outlined
          label="Пароль"
          class="input"
          ref="password"
          lazy-rules
          :rules="[
            val => !!val || 'Введите пароль!',
            val => val.length >= 8 || 'Пароль должен быть больше 8 символов!'
          ]"
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
import Api from '../service/api';

export default {
  name: 'Auth',
  data() {
    return {
      data: {
        login: '',
        password: ''
      },
      isPwd: true,
      closeError: null
    };
  },
  methods: {
    submit: async function() {
      if (typeof this.closeError == 'function') {
        this.closeError();
      }
      this.$refs.login.validate(); //Запускаем валидацию поля логина
      this.$refs.password.validate(); //Запускаем валидацию поля пароля

      //Если ошибок нет - отправляем запрос на сервер
      if (!this.$refs.login.hasError && !this.$refs.password.hasError) {
        const api = new Api();
        const serializeData = JSON.stringify(this.data);
        try {
          const response = await api.loginUser(serializeData);
          const { token, refreshToken } = await response;

          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          this.$router.push({ name: 'chat' });
        } catch (e) {
          const { errors } = e.response.data;
          let errorsTemplate = ``;
          for (let error in errors) {
            errorsTemplate += `${errors[error].msg} <br>`;
          }
          this.closeError = this.$q.notify({
            message: errorsTemplate,
            type: 'negative',
            html: true,
            actions: [{ icon: 'close', color: 'white' }]
          });
        }
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
