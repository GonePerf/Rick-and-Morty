<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  name: 'History',
  setup() {
    const store = useStore();
    // VARIABLE IDENTIFYING THE MESSAGE WHITH THE DETAILS DISPLAYED
    const openMessage = ref(null);

    // FUNCTION TO SET openMessage VARIABLE
    const setMessage = (m) => {
      if(m === openMessage.value) {
        openMessage.value = null;
      } else {
        openMessage.value = m;
      }
    }

    return {
      openMessage,
      setMessage,
      messages: computed(() => store.getters.messages),
      messageSent: computed(() => store.getters.messageSent),
    }
  }
}
</script>

<template>
  <div class="history-box">
    
    <!-- DISPLAY ONLY WHEN USER SEND MESSAGE -->
    <h1 v-if="messageSent" class="info">
      Message sent successfully 
      <img src="../assets/img/nike.png" alt="">
    </h1>

    <h1 class="title">Message history</h1>

    <div class="messages-box">

      <div class="message" v-for="message in messages" :key="message.id">
        
        <!-- IF USER CLICK THE TITLE, DETAILS WILL BE SHOWN -->
        <h2 class="message-title" @click="setMessage(message)">
          {{ message.title }}
        </h2>

        <!-- IF DETAILS ARE SHOWN, ARROW WILL BE ROTATE  -->
        <img class="arrow" src="../assets/img/arrow.png"
          :class="{ 'open' : openMessage && openMessage === message  }"
        >
        
        <!-- SIMPLE TRANSITION FOR BETTER USER EXPERIENCE -->
        <transition name="message">

          <!-- DETAILS OF THE MESSAGE DISPLAYED  -->
          <div v-if="openMessage && message.id === openMessage.id">
            <div class="message-info">

              <div class="left">
                <div class="img">
                  <img :src="message.character.image">
                </div>
                <div class="more-info">
                  <h3 class="name">Sent to: {{ message.character.name }}</h3>
                  <h3 class="date">Date: {{ message.date }}</h3>
                  <h3 class="time">At: {{ message.time }}</h3>
                </div>
              </div>

              <div class="right">
                <img src="../assets/img/nike.png" v-if="message.quickpost">
                <img src="../assets/img/close.png" v-else>
                &nbsp;&nbsp;Using Quickpost™
              </div>

            </div>

            <div class="message-content">
              {{ message.content }}
            </div>

          </div>
        </transition>
      </div>

      <!-- WHEN USER HAS NOT SENT ANY MESSAGE -->
      <h3 v-if="!messages.length">
        You don't have messages yet :/
      </h3>

    </div>
  </div>
</template>

<style scoped>
/* ANIMATION */
.message-enter-active {
  transition: all 0.3s ease-out;
}

.message-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.message-enter-from,
.message-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>