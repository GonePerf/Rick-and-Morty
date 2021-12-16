<script>
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'NewMessage',
  setup() {

    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchRickAndMortyCharacters');
    });

    const form = reactive({
      title: '',
      message: '',
      character: null,
      quickpost: true,
    });

    const errors = reactive({
      title: false,
      message: false,
      character: false,
    });

    const validateTitle = () => {
      if (form.title.length < 3) {
        errors.title = true;
      } else {
        errors.title = false;
      }
    }

    const validateMessage = () => {
      if (form.message.length < 15) {
        errors.message = true;
      } else {
        errors.message = false;
      }
    }

    const sendMessage = () => {
      console.log(form.title, form.message, form.character, form.quickpost);

      form.title = ''; form.message = ''; form.character = null; form.quickpost = true;
    }


    return {
      form,
      errors,
      validateTitle,
      validateMessage,
      validate: computed(() => {
        if(errors.title || errors.message || !form.character) {
          return true;
        } else {
          return false;
        }
      }),
      sendMessage,
      characters: computed(() => {
        return store.getters.characters;
      }),
      store
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

      <p class="error">{{ errors.title ? 'Please enter the text' : '' }}</p>

      
      <!-- TREŚĆ -->
      <label for="message" 
        :class="{ 'error' : errors.message }"
      >Message</label>

      <textarea name="message" id="message" placeholder="Enter the message here..."
        :class="{ 'input-error' : errors.message }"
        v-model="form.message" 
        @blur="validateMessage"
      ></textarea>

      <p class="error">{{ errors.message ? 'Message must be longer than 15 characters' : '' }}</p>
      
      
      <!-- POSTAĆ -->
      <v-select class="custom-select" placeholder="Pick a character" label="name"
        :class="{ 'select-error' : errors.character }"
        :options="characters"
        :reduce="character => character.id" 
        v-model="form.character"
      ></v-select>

      <p class="error">{{ errors.character ? 'Pick character' : '' }}</p>
      
      
      <!-- SZYBKA POCZTA MIEDZYGWIAZDOWA -->
      <div class="intergalaxy-quickpost">

        <input type="checkbox" checked="checked" id="quickpost" 
          v-model="form.quickpost"
        >

        <label for="quickpost">I want to use InterGalaxy Quickpost™</label>

      </div>
      
      <button type="submit" 
        :disabled="validate"
      >Send</button>
      
    </form>
  </div>
</template>
