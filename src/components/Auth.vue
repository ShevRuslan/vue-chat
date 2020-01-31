<template>
  <q-card class="my-card">
    <q-card-section>
      <h5 class="text-center q-ma-none ">Регистрация</h5>
    </q-card-section>

    <q-card-actions>
      <q-form class="col">
        <q-input outlined label="Логин" class="input" v-model="data.login" />
        <q-input v-model="data.password" :type="isPwd ? 'password' : 'text'" outlined label="Пароль" class="input">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-input v-model="data.secretKey" outlined label="Секретный ключ" class="input" />
        <q-btn label="Зарегистрироваться" type="submit" color="primary" class="input" v-on:click="submit" />
      </q-form>
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
  .input {
    width: 100%;
    margin-bottom: 15px;
  }
}
</style>
