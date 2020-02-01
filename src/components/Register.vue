<template>
  <q-card class="my-card">
    <q-card-section>
      <h5 class="text-center q-ma-none ">Регистрация</h5>
    </q-card-section>

    <q-card-actions class="column items-start">
      <q-form class="col width">
        <q-input outlined label="Логин" class="input" v-model="data.login" />
        <q-input v-model="data.password" :type="isPwd ? 'password' : 'text'" outlined label="Пароль" class="input">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-input v-model="data.secretKey" outlined label="Секретный ключ" class="input" />
        <q-btn label="Зарегистрироваться" type="submit" color="primary" class="input" v-on:click="submit" />
      </q-form>
      <q-btn size="12px" flat v-on:click="$emit('showAuth')">Авторизироваться</q-btn>
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
        password: '',
        secretKey: ''
      },
      isPwd: true
    };
  },
  methods: {
    submit: async function() {
      const serializeData = JSON.stringify(this.data);
      const response = await fetch('/auth', { body: serializeData, method: 'POST' });
      console.log(response.json());
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
    margin-bottom: 15px;
  }
}
</style>
