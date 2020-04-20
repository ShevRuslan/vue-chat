<template>
  <div class="q-pa-md row justify-center full-height items-end">
    <div class="scroll-y" style="width: 50%; height:700px">
      <!-- <q-infinite-scroll class="fit scroll" @load="onLoad" reverse>
        <q-chat-message
            v-for="message in messages"
            :name="message.user"
            avatar="https://sun9-19.userapi.com/c855324/v855324919/1e8396/iziVQwerb1g.jpg"
            :text="[message.message]"
            :sent="message.user == getInfoAboutUser.login ? true : false"
            :stamp="formatTime(message.time)"
            :key="message.key"
          />
      </q-infinite-scroll> -->
      <q-chat-message
            v-for="message in messages"
            :name="message.user"
            avatar="https://sun9-19.userapi.com/c855324/v855324919/1e8396/iziVQwerb1g.jpg"
            :text="[message.message]"
            :sent="message.sender == getInfoAboutUser.login ? true : false"
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
    },
    onLoad(index, done) {
      setTimeout(() => {
        if (this.messages) {
          this.messages.splice(0, 0, {}, {}, {}, {}, {}, {}, {})
          done()
        }
      }, 2000)
    }
  }
};
</script>
