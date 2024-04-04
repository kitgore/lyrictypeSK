<script>
    import { getArtistLyrics } from '$lib/services/artistService';
    import TextInput from '$lib/components/TextInput.svelte';
    import LyricDisplay from '$lib/components/LyricDisplay.svelte';
    import { onMount } from 'svelte';

    let artist = ''; // This will store the artist name entered by the user
    let lyrics = ''; // This will store the lyrics returned from the service
    let artistName = '';
    let blink = false;
    let inputElement;

    async function handleArtistInput(event) {
        artistName = event.target.value; // Update the artist variable with the value from the input field
    }

    async function handleEnter(event){
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const data = await getArtistLyrics(artistName);
            if (data && data.lyrics) {
                lyrics = data.lyrics; // Update the lyrics variable with the data returned from the service
            } else {
                lyrics = "Lyrics not found."; // Fallback message
            }
        }
    }

    function focusInput() {
        inputElement.focus();
        blink = true;
    }
    function blurInput() {
        inputElement.blur();
        blink = false;
    }
    
    function toggleBlink() {
        blink = !blink;
    }

    onMount(() => {
        focusInput();
        inputElement.addEventListener('input', handleArtistInput);
        inputElement.addEventListener('keydown', handleEnter);
        inputElement.addEventListener('blur', blurInput);
    });
</script>

<div class = "typingTestContainer">
    <div class = "sidebar">
        <!-- <TextInput placeholder="Type an artist" on:keypress={handleArtistKeyPress} bind:value={artist} /> -->
    </div>
    <div class = "mainContainer">
        <h2>Playboi Carti</h2>
        <div class = "typingTest">
            {#if lyrics}
                <LyricDisplay {lyrics} />
            {/if}
        </div>
        <div class="artist-input-container" role="button" tabindex="0" on:click={focusInput} on:keydown={focusInput}>
            <div class="artist-input">
                {#each artistName.split('') as char, i}
                    <span class="char">{char}</span>
                {/each}
                {#if blink}
                <span class="blinking-cursor"></span>
                {/if}
            </div>
        </div>
        <input 
            bind:this={inputElement} 
            class="invisible-input" 
            type="text"
            aria-hidden="true"
            bind:value={artistName}
        />
    </div>
</div>

<style>
    .typingTestContainer {
        display: flex;
        height: 100%;
        width: 100%;
    }
    .sidebar{
        width: 20%;
        height: 100%;
    }
    .mainContainer{
        width: 80%;
        height: 100%;
    }
    h2{
        font-family: "Geneva", sans-serif;
        margin-left: 3%;
        line-height: 100%;
    }
    .typingTest{
        border: 2px solid black;
        height: 70%;
    }
    .artist-input-container {
        width: 100%; /* Take full width of its container */
        height: 6%; /* Take up 10% of the height of the main container */
        position: relative; /* For the absolute positioning of the cursor */
        margin-top: 3%;
    }

    .artist-input {
        white-space: pre-wrap;
        margin-top: 25px;
        padding: 10px;
        letter-spacing: -.1em;
        font-family: "Geneva", sans-serif;
        font-size: 1.4em;
        line-height: 160%;
        font-weight: 500;
        border: 2px solid black;
        height: 100%;
    }

    .blinking-cursor {
        display: inline-block;
        width: 2.5px;
        line-height: 160%;
        height: 120%;
        margin-left: -2px;
        position: absolute;
        top: 25%; /* Position from the top inside the input */
        background-color: currentColor;
        animation: blink-animation 1s steps(1) infinite;
    }

    .char {
        display: inline-block;
        font-family: "Geneva", sans-serif;
        font-size: 1.6em;
        font-weight: 500;
    }

    .invisible-input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
    }

    @keyframes blink-animation {
        50% {
        opacity: 0;
        }
    }
</style>