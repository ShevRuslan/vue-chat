<template>
  <div>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="300"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple v-for="user in users" v-bind:key="user.id" @click="changeUser(user)">
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img :src="user.img" style="object-fit:cover"/>
                <q-badge floating color="teal">new</q-badge>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ user.login }}</q-item-label>
              <q-item-label caption>{{ user.newMessage }} new messages</q-item-label>
            </q-item-section>
            <q-item-section side>
              3 min ago
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
          login: 'Ruslan2',
          img: 'https://sun9-19.userapi.com/c855324/v855324919/1e8396/iziVQwerb1g.jpg',
          time: '17:01',
          lastMessage: 'Дарова!',
          newMessage: 10,
          id: '1'
        },
        {
          login: 'Ruslan23',
          img: 'https://sun9-60.userapi.com/c204720/v204720883/5e78e/KgdzSM84zFw.jpg',
          time: '17:01',
          lastMessage: 'Дарова!',
          newMessage: 5,
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
