<template>
  <div>
    <h1 class="title">Alerts</h1>
    <article class="message is-large is-danger">
      <div class="message-header">
        <p>Large message</p>
        <button class="delete is-large" aria-label="delete"></button>
      </div>
      <div class="message-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla.Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus.
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Alerts'
}
</script>
