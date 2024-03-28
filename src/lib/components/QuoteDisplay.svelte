<script>
  import { onMount } from 'svelte';
  export let lyrics = '';
  let userInput = '';
  let spans;

  let inputElement;
  
  function focusInput() {
    inputElement.focus();
  }
  
  onMount(() => {
    focusInput();
  });

  // Function to wrap each character of the lyrics in a span and add it to the DOM
  $: formattedLyrics = lyrics.split('').map((char, index) => {
    return { char, class: '' };
  });

  // Function to update the class of each character span based on user input
  $: {
    if (userInput && formattedLyrics.length > 0) {
      formattedLyrics = formattedLyrics.map((item, index) => {
        if (userInput.length > index) {
          if (userInput[index] === item.char) {
            return { ...item, class: 'correct' };
          } else {
            return { ...item, class: 'incorrect' };
          }
        }
        return { ...item, class: '' };
      });
    }
  };
</script>

<!-- Add an onclick handler to the lyrics container -->
<div class="quote-display" 
role="button" 
tabindex="0" 
on:click={focusInput}
on:keydown={focusInput}
>
  {#each formattedLyrics as { char, class: spanClass }, i}
    <span class={spanClass}>{char}</span>
  {/each}
</div>

<input bind:this={inputElement} class="quote-input" type="text" bind:value={userInput} />

<style>
  /* .quote-display {
    margin-bottom: 1rem;
    margin-left: calc(1rem + 2px);
    margin-right: calc(1rem + 2px);
    font-size: calc(1rem + 2vw);
    color: #777777;
    font-family: 'Roboto Mono', monospace;
  } */
  
  .quote-display{
    white-space: pre-wrap;
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
  }

  .quote-input {
    position: absolute;
    opacity: 0;
    background-color: transparent;
  }

  .correct {
    color: rgb(54, 142, 94);
  }

  .incorrect {
    color: #bd5454;
  }

  .blinking-cursor {
    box-shadow: .08em 0px 0px 0px #dadada;
    animation: 0.8s blink step-end infinite;
  }

  @keyframes blink {
    from, to {
      box-shadow: .08em 0px 0px 0px #dadada;
    }
    50% {
      box-shadow: none;
    }
  }

  /* Include additional styles from your old CSS as needed */
</style>

