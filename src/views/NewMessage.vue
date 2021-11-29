<script>

export default {
  name: 'NewMessage',
}
</script>

<template>
  <div class="new-message-box">
    <h1>Send a new message</h1>
    <form>
      <label for="title" class="error">Title</label>
      <input type="text" id="title" class="input-error" v-model="title" placeholder="Enter the title">
      <p class="error">Please enter the text</p>
      <label for="message">Message</label>
      <textarea name="message" id="message" placeholder="Enter the message here..."></textarea>
      <p class="error"></p>
      <select name="character" id="character">
        <option value="1">Rick</option>
        <option value="2">Rick</option>
        <option value="3">Rick</option>
        <option value="4">Rick</option>
      </select>
      <p class="error"></p>
      <div class="intergalaxy-quickpost">
        <input type="checkbox" checked="checked" id="quickpost">
        <label for="quickpost">I want to use InterGalaxy Quickpost™</label>
      </div>
      <button>Send</button>
    </form>
  </div>
</template>
