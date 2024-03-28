<script>
    export let text = '';
    export let onClick = () => {};
  </script>
  
  <button on:click={onClick}>
    <slot /> <!-- Allows for custom HTML, like images inside the button -->
  </button>