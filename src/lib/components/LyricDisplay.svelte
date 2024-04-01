<script>
  import { onMount } from 'svelte';
  export let lyrics = '';
  let userInput = '';
  let startTime = null;
  let endTime = null;
  let testStarted = false;
  let cursorPosition = 0;
  let inputElement;

  //TODO:
  // Add a blinking cursor to the input field
  // Do not allow chacter typing on spaces/tabs
  // Replace incorrect characters with typed characters (in red)
  
  function focusInput() {
    inputElement.focus();
  }
  
  onMount(() => {
    focusInput();
  });

  function startTest() {
    if (!testStarted) {
      startTime = new Date();
      testStarted = true;
    }
  }

  // Function to end the test and calculate WPM and accuracy
  function endTest() {
    endTime = new Date();
    const durationInMinutes = (endTime - startTime) / 60000;
    const charactersTyped = userInput.length; // Use userInput length instead
    const wpm = (charactersTyped / 5) / durationInMinutes;

    // Make sure to calculate accuracy after the entire userInput is processed
    const incorrectChars = formattedLyrics.reduce((acc, { class: charClass }) => acc + (charClass === 'incorrect' ? 1 : 0), 0);
    const accuracy = ((charactersTyped - incorrectChars) / lyrics.length) * 100; // Ensure to divide by total lyrics length for accuracy

    console.log(`WPM: ${wpm.toFixed(2)}, Accuracy: ${accuracy.toFixed(2)}%`);
  }

  // Reactive statement to update formattedLyrics based on lyrics
  $: formattedLyrics = lyrics.split('').map((char, index) => {
    return { char, class: '' };
  });

  // Reactive statement to update the class of each character span based on user input
  $: {
    if (userInput && formattedLyrics.length > 0) {
      if (!testStarted) startTest();
      if (userInput.length === lyrics.length) endTest(); // Assuming completion is based on length match
      
      // Normalize userInput by collapsing multiple spaces and leaving single spaces intact.
      const normalizedUserInput = userInput.replace(/ +/g, ' ');

      // Split the lyrics into characters but keep the newlines and other whitespace intact.
      const lyricsChars = lyrics.split('');

      // Create an array of the same length as lyricsChars to track correct and incorrect input.
      const updatedFormattedLyrics = lyricsChars.map((char, index) => {
        if (index < normalizedUserInput.length) {
          let inputChar = normalizedUserInput[index];
          // If the character in lyrics is a whitespace (space, newline, etc.), treat any space typed by the user as correct.
          if (/\s/.test(char) && inputChar === ' ') {
            inputChar = char;
          }
          return {
            char,
            class: inputChar === char ? 'correct' : 'incorrect'
          };
        }
        // For the characters not yet reached by userInput, return them as neutral.
        return { char, class: '' };
      });

      formattedLyrics = updatedFormattedLyrics;
    } else if (userInput.length === 0) {
      // If userInput is empty, reset all classes to ''
      formattedLyrics = formattedLyrics.map(item => ({ ...item, class: '' }));
    }
  };

  $: cursorPosition = userInput.length;
</script>

<!-- Add an onclick handler to the lyrics container -->
<div class="quote-display" role="button" tabindex="0" on:click={focusInput} on:keydown={focusInput}>
  {#each formattedLyrics as { char, class: spanClass }, i}
    {#if i === cursorPosition}
      <span class="blinking-cursor"></span>
    {/if}
    <span class={spanClass}>{char}</span>
  {/each}
  <!-- Handle the case where the cursor should be at the end of the text -->
  {#if cursorPosition === formattedLyrics.length}
    <span class="blinking-cursor"></span>
  {/if}
</div>

<input bind:this={inputElement} class="quote-input" type="text" bind:value={userInput} />

<style>
  .quote-display{
    white-space: pre-wrap;
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
    letter-spacing: -.18em;
    font-family: "Geneva", sans-serif;
    font-size: 2em;
    line-height: 200%;
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
    /* Ensure minimal layout impact */
    display: inline-block;
    width: 2px; /* Adjust based on the desired cursor thickness */
    height: 1.2em; /* Typically, matching the line height of the text */
    margin: 0; /* Ensure no additional space is added around the cursor */
    margin-right: -6px;
    margin-left: 4px;
    vertical-align: text-bottom; /* Aligns the cursor better with the baseline of the text */
    background-color: currentColor; /* Inherits the text color; adjust if a different cursor color is preferred */
    /* Blink animation */
    animation: blink-animation 1s steps(1) infinite;
  }
  .cursor-placeholder {
    /* Ensure this does not introduce additional spacing */
    width: 0;
    margin: 0;
    padding: 0;
    display: inline-block;
    letter-spacing: 0.1em;
  }

  @keyframes blink-animation {
    50% {
      opacity: 0;
    }
  }
</style>

