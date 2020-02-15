<template>
  <div>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-btn stretch flat label="Vue-Chat" no-caps />
      <q-select
        ref="search"
        dark
        dense
        standout
        use-input
        hide-selected
        color="black"
        :stack-label="false"
        label="Найдите собеседника..."
        style="width: 300px"
        v-model="search"
      />
      <q-space />

      <q-btn dense flat>
        <q-avatar size="38px">
          <template v-if="img != null">
            <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
          </template>
          <template v-else>
            {{ login[0] }}
          </template>
        </q-avatar>
        <q-icon name="arrow_drop_down" size="16px" />

        <q-menu auto-close>
          <q-list>
            <q-item class="GL__menu-link-signed-in">
              <q-item-section>
                <div>
                  Вход выполнен <strong>{{ login }}</strong>
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable class="GL__menu-link">
              <q-item-section>Ваш профиль</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section>Помощь</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section>Настройки</q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable>
              <q-item-section>Выйти</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      tab: '',
      search: ''
    };
  },
  computed: {
    ...mapGetters(['getInfoAboutUser']),
    login() {
      return this.getInfoAboutUser.login;
    },
    img() {
      return this.getInfoAboutUser.img;
    }
  }
};
</script>
