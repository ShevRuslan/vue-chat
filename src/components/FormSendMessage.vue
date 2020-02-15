<template>
  <div>
    <q-form @submit="onSubmit" class="row justify-center items-center q-pa-md form">
      <q-input v-model="newMessage" outlined autogrow dense class="input" placeholder="Напишите сообщение..." />
      <div class="q-pl-md">
        <q-btn type="submit" dense round unelevated color="primary" icon="chevron_right" />
      </div>
    </q-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      newMessage: ''
    };
  },
  watch: {
    newMessage(value) {
      value ? this.$socket.emit('typing', this.getUser) : this.$socket.emit('stopTyping');
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.newMessage);
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  border: 1px solid #e0e0e0;
}
.input {
  width: 500px;
}
</style>
