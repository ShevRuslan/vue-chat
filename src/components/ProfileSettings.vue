<template>
  <q-dialog v-model="showModal">
    <q-card style="width: 600px; max-width: 80vw;">
      <q-card-section class="row items-center">
        <div class="text-h6">Моя учетная запись</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="showModal=!value" />
      </q-card-section>

      <q-separator inset />

      <q-item>
        <q-item-section avatar top>
          <div class="wrapper-avatar">
            <q-avatar size="144px">
              <template v-if="img != null || previewNewImg != null">
                <img :src="previewNewImg || img" style="object-fit:cover" />
              </template>
              <template v-else>
                {{ login[0] }}
              </template>
            </q-avatar>
            <div class="wrapper-change__image">
              <q-btn fab icon="add" color="dark" dence @click="emulateFileUpload" />
              <q-file ref="file" outlined v-model="newImg" rounded style="display:none" @input="previewFile" />
            </div>
          </div>
          <div class="delete-img text-center q-mt-md full-width">
            <q-btn label="Удалить" flat color="dark" dence class="full-width" no-caps />
          </div>
        </q-item-section>

        <q-item-section class="q-ml-md">
          <q-form class="col form">
            <div class="form-item q-pt-md">
              <div class="text-subtitle1 text-weight-thin">Логин</div>
              <q-input
                outlined
                v-model.trim="changedLogin"
                class="input"
                dense
                ref="login"
                lazy-rules
                :rules="[
                  val => !!val || 'Введите логин!',
                  val => val.length >= 8 || 'Логин должен быть больше 8 символов'
                ]"
              />
            </div>
            <div class="form-item">
              <div class="text-subtitle1 text-weight-thin">Статус</div>
              <q-input outlined value="Это статус" class="input" v-model.trim="changedStatus" dense />
            </div>
            <div class="form-item q-pb-lg">
              <div class="text-caption cursor-pointer" @click="changeShowPassword" style="text-decoration:underline">
                Сменить пароль
              </div>
            </div>
            <q-slide-transition>
              <div v-show="showChangePassword">
                <div class="form-item">
                  <div class="text-subtitle1 text-weight-thin">Старый пароль</div>
                  <q-input outlined v-model.trim="changeInfo.oldPassword" class="input" dense />
                </div>
                <div class="form-item">
                  <div class="text-subtitle1 text-weight-thin">Новый пароль</div>
                  <q-input outlined v-model.trim="changeInfo.newPassword" class="input" dense />
                </div>
                <div class="form-item">
                  <div class="text-subtitle1 item-name">Повторите пароль</div>
                  <q-input outlined v-model.trim="changeInfo.repeatNewPassword" class="input" dense />
                </div>
              </div>
            </q-slide-transition>
          </q-form>
        </q-item-section>
      </q-item>
      <q-separator inset />
      <q-card-section>
        <div class="row wrapper-actions">
          <q-btn
            label="Изменить"
            type="button"
            color="positive"
            class="btn"
            @click="onChangeInfo"
            flat
            dense
            no-caps
            :loading="sendLoading"
          />
          <q-btn label="Удалить аккаунт" type="submit" color="negative" class="btn" flat dense no-caps>
            <q-tooltip>
              Если вы удалите аккаунт, вы уже не сможете его восстановить.
            </q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import API from '../service/api.js';
export default {
  props: {
    value: {
      type: Boolean,
    }
  },
  data() {
    return {
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
      showChangePassword: false,
    };
  },
  computed: {
    ...mapGetters(['getInfoAboutUser']),
    showModal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
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
    ...mapActions(['addInfoAboutUser']),
    emulateFileUpload() {
      this.$refs.file.pickFiles();
    },
    async onChangeInfo() {
      this.$refs.login.validate();
      if (!this.$refs.login.hasError) {
        this.sendLoading = true;
        const api = new API();
        const formData = new FormData();
        formData.append('img', this.newImg);
        for (let key in this.changeInfo) {
          formData.append(key, this.changeInfo[key]);
        }
        const { response } = await api.changeInfo(formData);

        console.log(response);

        if (response != null) {
          this.sendLoading = false;
          this.addInfoAboutUser(response);
          this.$q.notify({
            type: 'positive',
            message: `Информация успешно обновлена!`,
            actions: [{ icon: 'close', color: 'white' }],
            position: 'bottom-left'
          });
        }
      }
    },
    previewFile(e) {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.previewNewImg = reader.result;
      };
      reader.readAsDataURL(e);
    },
    changeShowPassword() {
      this.showChangePassword = !this.showChangePassword;
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper-avatar:hover {
  .wrapper-change__image {
    opacity: 0.4;
  }
}
.wrapper-avatar {
  position: relative;
  .wrapper-change__image {
    position: absolute;
    top: 0;
    transition: 0.3s all ease-in-out;
    opacity: 0;
    .q-btn {
      width: 144px;
      height: 144px;
      border-radius: 100%;
    }
  }
}
.form {
  width: 100%;
  .form-item {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .btn {
      width: 50%;
    }
    .input {
      width: 100%;
      margin: 5px 0px;
    }
  }
}
.wrapper-actions {
  width: 100%;
  .btn {
    width: 50%;
  }
}
</style>
