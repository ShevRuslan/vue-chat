<template>
  <div class="q-pa-md row justify-center full-height items-end">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message label="Sunday, 19th" />

      <q-chat-message
        v-for="message in messages"
        :name="message.user"
        avatar="https://sun9-19.userapi.com/c855324/v855324919/1e8396/iziVQwerb1g.jpg"
        :text="[message.message]"
        :sent="message.user == getInfoAboutUser.name ? true : false"
        :stamp="formatTime(message.time)"
        :key="message.key"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { date } from 'quasar';
export default {
  props: ['messages'],
  computed: {
    ...mapGetters(['getInfoAboutUser'])
  },
  methods: {
    formatTime(timestamp) {
      return date.formatDate(timestamp, 'HH:mm');
    }
  }
};
</script>
