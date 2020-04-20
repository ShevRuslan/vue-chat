<template>
  <q-card class="my-card q-pa-lg">
    <q-card-section>
      <h5 class="text-center q-ma-none q-mb-md">Регистрация</h5>
    </q-card-section>

    <q-card-actions class="column items-start">
      <q-form class="col width">
        <q-input
          outlined
          label="Логин"
          class="input"
          v-model.trim="data.login"
          ref="login"
          lazy-rules
          :rules="[val => !!val || 'Введите логин!', val => val.length >= 8 || 'Логин должен быть больше 8 символов!']"
        />
        <q-input
          outlined
          label="E-mail"
          class="input"
          v-model.trim="data.email"
          ref="email"
          lazy-rules
          :rules="[val => !!val || 'Введите email!', val => val.length >= 8 || 'E-mail должен быть больше 8 символов!']"
        />
        <q-input
          v-model.trim="data.password"
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
        <q-input
          v-model.trim="data.secretKey"
          outlined
          label="Секретный ключ"
          class="input"
          ref="secretKey"
          lazy-rules
          :rules="[
            val => !!val || 'Введите секретный ключ!',
            val => val.length >= 8 || 'Пароль должен быть больше 8 символов!'
          ]"
        />

        <q-btn label="Зарегистрироваться" type="submit" color="primary" class="input" v-on:click="submit" />
      </q-form>
      <q-btn size="12px" flat v-on:click="$emit('showAuth')">Авторизироваться</q-btn>
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
        email: '',
        password: '',
        secretKey: '',
        img: ''
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
      this.$refs.email.validate(); //Запускаем валидацию поля email
      this.$refs.password.validate(); //Запускаем валидацию поля пароля
      this.$refs.secretKey.validate(); //Запускаем валидацию поля секретного ключа

      //Если ошибок нет - отправляем запрос на сервер
      if (!this.$refs.login.hasError && !this.$refs.password.hasError && !this.$refs.secretKey.hasError && !this.$refs.email.hasError) {
        const api = new Api();
        const serializeData = JSON.stringify(this.data);

        try {
          const response = await api.registerUser(serializeData);
          const { token, refreshToken } = await response;

          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          this.$router.push({name: 'chat'})
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
  width: 500px;
  .width {
    width: 100%;
  }
  .input {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
