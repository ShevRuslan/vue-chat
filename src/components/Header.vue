<template>
  <div>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-btn stretch flat label="Vue-Chat" no-caps />
      <q-select
        standout="bg-primary text-white"
        dense
        v-model="text"
        input-debounce="0"
        use-input
        hide-selected
        label="Поиск человека..."
        label-color="white"
        :options="options"
        @filter="filterFn"
        @input="onChange"
        style="width: 250px"
        :loading="false"
        option-label="login"
        color="white"
        hide-dropdown-icon
        input-style="color:white"
      >
        <template v-if="noResult" v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Пользователь не найден
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section side>
              <template v-if="scope.opt.img != null">
                <q-avatar size="38px" color="primary" text-color="white">
                  <img :src="scope.opt.img" style="object-fit:cover" />
                </q-avatar>
              </template>
              <template v-else>
                <q-avatar size="38px" color="primary" text-color="white">
                  {{ scope.opt.login[0].toUpperCase() }}
                </q-avatar>
              </template>
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.login" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-space />

      <q-btn dense flat>
        <q-avatar size="38px">
          <template v-if="img != null">
            <img :src="img" style="object-fit:cover" />
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
              <q-item-section @click="openSettingsModal">Настройки</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section>Помощь</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section @click="logout">Выйти</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>

    <!-- Юзер, которого нашли в поиске -->
    <q-dialog v-model="card">
      <q-card class="my-card q-px-md q-pt-md">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="144px">
              <template v-if="foundUser.img != null">
                <img :src="foundUser.img" style="object-fit:cover" />
              </template>
              <template v-else>
                {{ foundUser.login[0] }}
              </template>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption>{{ foundUser.status }}</q-item-label>
            <q-item-label>
              <p class="text-h5 q-mb-none">{{ foundUser.login }}</p>
            </q-item-label>
            <q-item-label header class="q-pa-none text-green-5">Сейчас онлайн</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-actions class="q-px-none" align="right">
          <q-btn
            color="primary"
            v-close-popup
            icon-right="mail"
            flat
            class="full-width"
            label="Написать сообщение"
            no-caps
            @click="writeMessage({ login: foundUser.login, img: foundUser.img })"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Настройки -->
    <ProfileSettings v-model="settingsModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import API from '../service/api.js';
import ProfileSettings from './ProfileSettings';
export default {
  data() {
    return {
      text: null,
      options: [],
      noResult: false,
      card: false,
      settingsModal: false,
      foundUser: {
        img: '',
        login: '',
        status: ''
      },
      newImg: null,
      previewNewImg: '',
      changeInfo: {
        login: '',
        status: '',
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      sendLoading: false,
      showChangePassword: false
    };
  },
  components: {
    ProfileSettings
  },
  computed: {
    ...mapGetters(['getInfoAboutUser']),
    login() {
      return this.getInfoAboutUser.login;
    },
    img() {
      return this.getInfoAboutUser.img;
    },
    status() {
      return this.getInfoAboutUser.status;
    },
    changedLogin: {
      get() {
        if (this.changeInfo.login != '') return this.changeInfo.login;
        return this.login;
      },
      set(newValue) {
        this.changeInfo.login = newValue;
      }
    },
    changedStatus: {
      get() {
        if (this.changeInfo.status != '') return this.changeInfo.status;
        return this.status;
      },
      set(newValue) {
        this.changeInfo.status = newValue;
      }
    }
  },
  methods: {
    ...mapActions(['addUser']),
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'home' });
    },
    filterFn(val, update) {
      this.noResult = false;
      if (val === '') {
        update(() => {
          this.options = [];
        });

        return;
      }
      update(async () => {
        if (val.trim('') != '') {
          const api = new API();
          const { user } = await api.searchUser(val);
          if (!user.length) this.noResult = true;
          this.options = await user;
        }
      });
      return;
    },
    onChange(value) {
      this.text = null;
      this.foundUser = value;
      this.card = true;
    },
    writeMessage(value) {
      this.addUser(value);
    },
    openSettingsModal() {
      this.settingsModal = true;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
