<template>
  <div>
    <q-toolbar class="border q-px-xl ">
      <q-btn stretch no-caps flat label="Руслан Шевцов" />

      <q-space />
      <q-form @submit="onSubmit" @reset="onReset" class="row justify-center items-center q-pa-md form">
        <q-input placeholder="Поиск по истории сообщений" dense outlined="" v-model="text" input-class="text-left" class="q-ml-md search">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-form>
      <q-space />
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
    </q-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    };
  }
};
</script>

<style lang="css">
.border {
  border-bottom: 1px solid #e0e0e0;
}
.search {
  width: 420px
}
</style>
