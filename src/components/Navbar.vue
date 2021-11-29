<script>
export default {

}
</script>

<template>
  <header>
      <nav>
          <div class="logo">
              <img src="../assets/img/logo.png" alt="">
          </div>
          <ul>
              <li><router-link :to="{ name: 'NewMessage' }">New message</router-link></li>
              <li><router-link :to="{ name: 'History' }">History</router-link></li>
          </ul>
      </nav>
  </header>
</template>

<style>

</style>