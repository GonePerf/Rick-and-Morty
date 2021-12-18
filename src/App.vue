<script>
import { onMounted } from '@vue/runtime-core'
import Navbar from './components/Navbar.vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch('fetchMessages');
    })
  }
}

</script>

<template>
  <Navbar />
  <router-view/>
</template>
