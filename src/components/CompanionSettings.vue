<template>
  <div>
    <q-toolbar class="border q-px-xl" style="height:80px">

      <div class="fit wrapper-companion-settings row">

        <div class="col-xl-4 col-3 setting-item">
          <template v-if="img != null">
          <q-avatar size="38px">
            <img :src="img" style="object-fit:cover" />
          </q-avatar>
        </template>
        <q-btn stretch no-caps flat rounded :label="login" />
       </div>

        <div class="col-xl-4 col-6 setting-item">
          <q-form class="form">
          <q-input
            placeholder="Поиск по истории сообщений"
            dense
            outlined=""
            input-class="text-left"
            class="search"
          >
            <template v-slot:append>
              <q-icon v-if="text === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" />
            </template>
          </q-input>
        </q-form>
        </div>


        <div class="col-xl-4 col-3 setting-item">
          <q-btn-dropdown stretch flat label="Настройки" no-caps>
          <q-list>
            <q-item-label header>Folders</q-item-label>
            <q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="folder" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Photos</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Files</q-item-label>
            <q-item v-for="n in 3" :key="`y.${n}`" clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="assignment" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Vacation</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        </div>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['connections'],
  data() {
    return {
      text: ''
    };
  },
  computed: {
    ...mapGetters(['getCompanion']),
    login() {
      return this.getCompanion.login;
    },
    img() {
      return this.getCompanion.img;
    }
  }
};
</script>

<style lang="scss">
.border {
  border-bottom: 1px solid #e0e0e0;
}
.search {
  width: 420px;
}
.form {
  width: 100%;
  .search {
    width: inherit;
  }
}
.wrapper-companion-settings {
  justify-items: space-between;
  .setting-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
