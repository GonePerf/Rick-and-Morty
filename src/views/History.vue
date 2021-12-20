<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  name: 'History',
  setup() {
    const store = useStore();
    // VARIABLE IDENTIFYING THE MESSAGE WHITH THE DETAILS DISPLAYED
    const openMessage = ref(null);
    const quickpostInformation = ref('');

    // FUNCTION TO SET openMessage VARIABLE
    const setMessage = (m) => {
      if(m === openMessage.value) {
        openMessage.value = null;
      } else {
        openMessage.value = m;
      }
    }

    const deleteMessage = (m) => {
      if(confirm("Czy na pewno chcesz usunąć tę wiadomość?")) {
        // if(m.quickpost) {
        //   quickpostInformation.value = 'Messages using Quickpost™ cannot be canceled, the message has been removed only from the list';
        // }
        
        store.dispatch('deleteMessage', m);
        store.dispatch('fetchMessages');
      }
    }

    return {
      openMessage,
      setMessage,
      deleteMessage,
      quickpostInformation,
      messages: computed(() => store.getters.messages),
      messageSent: computed(() => store.getters.messageSent),
    }
  }
}
</script>

<template>
  <transition name="message">
    <h2 class="quickpost-info" v-if="quickpostInformation.length">{{ quickpostInformation }}</h2>
  </transition>
  
  <div class="history-box">
    
    <!-- DISPLAY ONLY WHEN USER SEND MESSAGE -->
    <h1 v-if="messageSent" class="info">
      Message sent successfully 
      <span class="material-icons check">check</span>
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
                <span class="material-icons check" v-if="message.quickpost">check</span> 
                <span class="material-icons close" v-else>close</span>
                &nbsp;&nbsp;Using Quickpost™
              </div>
              <div class="delete">
                <span class="material-icons delete" @click="deleteMessage(message)">delete</span>
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