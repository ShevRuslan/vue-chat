<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="row justify-center items-center q-pa-md form">
      <q-input v-model="text" outlined autogrow dense class="input" placeholder="Напишите сообщение..." />
       <div class="q-pl-md">
        <q-btn dense round unelevated color="primary" icon="chevron_right"/>
      </div>
    </q-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: null,
      age: null,

      accept: false
    };
  },

  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
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
