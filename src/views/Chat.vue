<template>
  <q-layout view="hhh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <Header></Header>
    </q-header>

    <ChatLeftMenu></ChatLeftMenu>

    <q-page-container>
      <q-page class="column main justify-between">
        <CompanionSettings></CompanionSettings>
        <ListMessages></ListMessages>
        <FormSendMessage></FormSendMessage>
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
export default {
  components: {
    Header,
    ChatLeftMenu,
    CompanionSettings,
    ListMessages,
    FormSendMessage
  }
};
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
}
</style>
