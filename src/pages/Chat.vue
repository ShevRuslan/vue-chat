<template>
  <q-layout view="hhh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <Header></Header>
    </q-header>

    <ChatLeftMenu></ChatLeftMenu>

    <q-page-container>
      <q-page class="column main justify-between">
        <CompanionSettings v-bind:connections="connections"></CompanionSettings>
        <ListMessages v-bind:messages="messages"></ListMessages>
        <FormSendMessage v-on:submit="send"></FormSendMessage>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from '../components/Header';
import ChatLeftMenu from '../components/ChatLeftMenu';
import CompanionSettings from '../components/CompanionSettings';
import ListMessages from '../components/ListMessages';
import FormSendMessage from '../components/FormSendMessage';
import Api from '../service/api';
import { mapActions } from 'vuex';
export default {
  components: {
    Header,
    ChatLeftMenu,
    CompanionSettings,
    ListMessages,
    FormSendMessage
  },
  data() {
    return {
      messages: [],
      info: [],
      connections: 0,
      username: ''
    };
  },
  created: function() {
    this.getInfoAboutUser();
    
    this.$socket.emit('joined', this.username);

    window.onbeforeunload = () => {
      this.$socket.emit('leave', this.username);
    };

    this.$socket.on('joined', data => {
      this.info.push({
        username: data,
        type: 'joined'
      });
      setTimeout(() => {
        this.info = [];
      }, 5000);
    });

    this.$socket.on('leave', data => {
      console.log(this.info);
      this.info.push({
        username: data,
        type: 'left'
      });
      setTimeout(() => {
        this.info = [];
      }, 5000);
    });
  },
  sockets: {
    connections: function(data) {
      this.connections = data;
    },
    chatMessage: function(data) {
      this.messages.push({
        message: data.message,
        user: data.user
      });
      this.$q.notify({
        type: 'positive',
        message: `${data.user} - ${data.message}`,
        actions: [{ icon: 'close', color: 'white' }],
        position: 'bottom-left'
      });
    }
  },
  updated() {
    console.log(this.info, this.connections);
  },
  methods: {
    ...mapActions(['addInfoAboutUser']),

    send: function(newMessage) {
      let createTime = Date.now();
      const messageObj = {
        message: newMessage,
        user: this.username,
        time: createTime
      };
      this.messages.push(messageObj);

      this.$socket.emit('chatMessage', messageObj);
    },
    async getInfoAboutUser() {
      const api = new Api();
      const { user } = await api.getInfoUser();
      this.addInfoAboutUser(user);
      this.username = user.login;
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
}
</style>
