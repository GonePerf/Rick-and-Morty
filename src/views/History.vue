<script>

export default {
  name: 'History',
}
</script>

<template>
  <div class="history-box">
    <h1 class="info">Message sent successfully  <img src="../assets/img/nike.png" alt=""></h1>
    <h1 class="title">Message history</h1>
    <div class="messages-box">
      <div class="message">
        <h2 class="message-title">My latest message title</h2>
      </div>
      <div class="message">
        <h2 class="message-title">To Mr. Meeseeks</h2>
      </div>
      <div class="message">
        <h2 class="message-title">To my buddy Rick</h2>
        <div class="message-info">
          <div class="left">
            <div class="img">
              <img src="https://rickandmortyapi.com/api/character/avatar/267.jpeg">
            </div>
            <div class="more-info">
              <h3 class="name">Sent to: Rick Sanchez</h3>
              <h3 class="date">Date: 01.01.2021</h3>
              <h3 class="time">At: 21:37</h3>
            </div>
          </div>
          <div class="right">
            <img src="../assets/img/nike.png" alt=""> Using Quickpost™
          </div>
        </div>
        <div class="message-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie sagittis lorem, ac posuere sem bibendum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sit amet facilisis justo, nec imperdiet ex. Vestibulum facilisis hendrerit ipsum, et ultricies urna dapibus a. Curabitur viverra odio mollis magna commodo imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu mauris a nibh sollicitudin luctus vitae sed neque.

        </div>
      </div>
      <div class="message">
        <h2 class="message-title">My first message</h2>
      </div>
    </div>
  </div>
</template>