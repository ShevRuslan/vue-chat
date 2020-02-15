<template>
  <div>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="200"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple v-for="user in users" v-bind:key="user.id" @click="changeUser(user.name)">
            <q-item-section avatar>
              <q-avatar>
                <img :src="user.img" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ user.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn dense round unelevated color="primary" icon="chevron_left" @click="miniState = true" />
      </div>
    </q-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      left: false,
      drawer: false,
      miniState: false,
      users: [
        {
          name: 'Ruslan2',
          img: 'https://sun9-19.userapi.com/c855324/v855324919/1e8396/iziVQwerb1g.jpg',
          time: '17:01',
          lastMessage: 'Дарова!',
          id: '1'
        },
        {
          name: 'Ruslan23',
          img: 'https://sun9-21.userapi.com/c857532/v857532016/157744/miRG5h_IcBY.jpg',
          time: '17:01',
          lastMessage: 'Дарова!',
          id: '2'
        }
      ]
    };
  },
  methods: {
    ...mapActions(['addUser']),
    drawerClick(e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false;

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation();
      }
    },
    changeUser(user) {
      console.log(user);
      this.addUser(user);
    }
  }
};
</script>
