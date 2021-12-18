<script>
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
  name: 'NewMessage',
  setup() {

    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.dispatch('fetchRickAndMortyCharacters');
      store.commit('setMessageSent', false);
    });

    const form = reactive({
      title: '',
      content: '',
      character: null,
      quickpost: true,
    });

    const errors = reactive({
      title: false,
      message: false,
      character: false,
      specialCharactersError: false
    });

    const validateTitle = () => {
      // REGEX TO CHECK IF TITLE HAS SPECIAL CHARACTERS, I ALLOWED SOME OF THEM - ? ! . ,
      if(/[^a-zA-Z .,0-9!?]/.test(form.title)) {
        errors.specialCharactersError = true;
        errors.title = true;
      }
      else if (form.title.length < 3 || form.title.length > 32) {
        errors.title = true;
        errors.specialCharactersError = false;
      } else {
        errors.title = false;
        errors.specialCharactersError = false;
      }
    }

    const validateMessage = () => {
      if (form.content.length < 5 || form.content.length > 256) {
        errors.message = true;
      } else {
        errors.message = false;
      }
    }
    

    const sendMessage = () => {

      store.dispatch('addMessage', form);
      store.dispatch('fetchMessages');
      // FOR DISPLAYING: SEND MESSAGE SUCCESSFULLY
      store.commit('setMessageSent', true);
      router.push('/history');

      form.title = ''; form.content = '';
      form.character = null; form.quickpost = true;
    }


    return {
      form,
      errors,
      validateTitle,
      validateMessage,
      sendMessage,
      characters: computed(() => {
        return store.getters.characters;
      }),
      validate: computed(() => {
        if(errors.title || errors.message || !form.character) {
          return true;
        } else {
          return false;
        }
      }),
    }
  }
}
</script>

<template>
  <div class="new-message-box">
    <h1>Send a new message</h1>
    <form @submit.prevent="sendMessage">

      <!-- TYTUŁ -->
      <label for="title" 
        :class="{ 'error' : errors.title }"
      >Title</label>

      <input type="text" id="title" placeholder="Enter the title"
        :class="{ 'input-error' : errors.title }"
        v-model="form.title"
        @blur="validateTitle"
      >

      <p class="error" v-if="!errors.specialCharactersError">
        {{ errors.title ? `Please enter the text (3-32 characters)` : '' }}
      </p>
      <p class="error" v-else>
        Special characters are not allowed
      </p>

      
      <!-- TREŚĆ -->
      <label for="message" 
        :class="{ 'error' : errors.message }"
      >Message</label>

      <textarea name="message" id="message" placeholder="Enter the message here..."
        :class="{ 'input-error' : errors.message }"
        v-model="form.content" 
        @blur="validateMessage"
      ></textarea>

      <p class="error">
        {{ errors.message ? 'Please enter the text (5-256 characters)' : '' }}
      </p>
      
      
      <!-- POSTAĆ -->
      <label for="message">Character</label>

      <v-select class="custom-select" placeholder="Pick a character" label="name"
        :class="{ 'select-error' : errors.character }"
        :options="characters"
        v-model="form.character"
      ></v-select>

      <p class="error">
        {{ errors.character ? 'Pick character' : '' }}
      </p>
      
      
      <!-- SZYBKA POCZTA MIEDZYGWIAZDOWA -->
      <div class="intergalaxy-quickpost">

        <input type="checkbox" checked="checked" id="quickpost" 
          v-model="form.quickpost"
        >

        <label for="quickpost">
          I want to use InterGalaxy Quickpost™
        </label>

      </div>
      
      <button type="submit" :disabled="validate">
        Send
      </button>
      
    </form>
  </div>
</template>
