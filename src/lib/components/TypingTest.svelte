<script>
    import { getArtistLyrics } from '$lib/services/artistService';
    import TextInput from '$lib/components/TextInput.svelte';
    import LyricDisplay from '$lib/components/LyricDisplay.svelte';
    import ArtistButton from './ArtistButton.svelte';
    import { onMount } from 'svelte';

    let artistInput = '';
    let songTitle = '';
    let artistName = '';
    let imageUrl = '';
    let lyrics = '';
    let blink = false;
    let inputElement;

    let recentlyPlayed = [
        { name: 'Playboi Carti', imageUrl: '/path/to/playboi-carti-image.svg' },
        { name: 'Frank Ocean', imageUrl: '/path/to/frank-ocean-image.svg' },
        { name: 'Bladee', imageUrl: '/path/to/bladee-image.svg' },
        { name: 'Charli XCX', imageUrl: '/path/to/charli-xcx-image.svg' },
        // Add more artists as needed
    ];

    async function handleArtistInput(event) {
        artistInput = event.target.value; // Update the artist variable with the value from the input field
    }

    async function handleEnter(event){
        if (event.key === 'Enter') {
            blurInput(); // Remove focus from the input field
            event.preventDefault(); // Prevent form submission
            const data = await getArtistLyrics(artistInput);
            if (data && data.lyrics) {
                console.log(data)
                lyrics = data.lyrics; // Update the lyrics variable with the data returned from the service
                songTitle = data.title;
                artistName = data.artist;
                imageUrl = data.image;
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
        console.log("blur");
        inputElement.blur();
        blink = false;
        console.log(document.activeElement)
        console.log(blink)
    }

    onMount(() => {
        focusInput();N
        inputElement.addEventListener('input', handleArtistInput);
        inputElement.addEventListener('keydown', handleEnter);
        inputElement.addEventListener('blur', blurInput);
    });

    const placeholders = Array(7 - recentlyPlayed.length).fill({ name: null, imageUrl: null });
    let fullArtistList = recentlyPlayed.concat(placeholders);
</script>

<div class = "appContainer">
    <div class = "upperContainer">
        <div class = "sidebar">
            <h3>Recently Played</h3>
            <div class="recent-artists">
                <div class="recent-artists">
                    {#each fullArtistList as artist, index}
                        <ArtistButton name={artist.name || `Artist ${index + 1}`} imageUrl={artist.imageUrl || '/default-image.svg'} />
                    {/each}
                </div>
            </div>
        </div>
        <div class = "mainContainer">
            <h2>Playboi Carti</h2>
            <div class = "typingTest">
                {#if lyrics}
                    <LyricDisplay 
                    lyrics={lyrics} 
                    songTitle={songTitle} 
                    artistName={artistName} 
                    imageUrl={imageUrl} />
                {/if}
            </div>
        </div>
    </div>
    <div class="artist-input-container" role="button" tabindex="0" on:click={focusInput} on:keydown={console.log("todo")}>
        <div class = "artistNameText">Artist Name:</div>
        <div class="artist-input">
            {#each artistInput.split('') as char, i}
                <span class="char">{char}</span>
            {/each}
            {#if blink}
            <span class="blinking-cursor"></span>
            {/if}
        </div>
        <input 
        bind:this={inputElement} 
        class="invisible-input" 
        type="text"
        aria-hidden="true"
        bind:value={artistInput}
    />
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
    }
    .appContainer {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    .upperContainer {
        display: flex;
        height: 87%;
        width: 100%;
    }
    .sidebar{
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .recent-artists {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    h3 {
        display: flex;
        padding-top: 10px;
        margin-bottom: 10px;
        justify-content: center;
        line-height: 110%;
        text-align: center;
        font-size: 1.1em;
    }

    .artists-list {
        display: flex;
        flex-direction: column;
        gap: 8px; /* Space between artist items */
        flex-grow: 1; /* Allow list to fill remaining space */
    }

    .artist {
        border: 2px solid black;
        border-radius: 15px; /* Rounded corners */
        height: calc(100% / 9 - 10px); /* Divide the space evenly among 9 items, accounting for the gap */
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 5px;
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
        height: 80%;
    }

    .artistNameText{
        flex: 0 0 17%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Geneva", sans-serif;
        font-size: 1.2em;
    }
    .artist-input-container {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 8%;
        position: relative;
    }

    .artist-input {
        flex: 0 0 83%;
        white-space: pre-wrap;
        padding: 10px;
        padding-left: 5px;
        letter-spacing: -.05em;
        font-family: "Geneva", sans-serif;
        font-size: 1.1em;
        line-height: 130%;
        font-weight: 400;
        border: 2px solid black;
        height: 100%;
    }

    .blinking-cursor {
        display: inline-block;
        width: 2.5px;
        line-height: 80%;
        height: 65%;
        margin-left: -4px;
        position: absolute;
        top: 16%; /* Position from the top inside the input */
        background-color: currentColor;
        animation: blink-animation 1s steps(1) infinite;
    }

    .char {
        display: inline-block;
        font-family: "Geneva", sans-serif;
        font-size: 1.4em;
        font-weight: 500;
    }

    .invisible-input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        height: 0;
        width: 0;
        pointer-events: none;
    }

    @keyframes blink-animation {
        50% {
        opacity: 0;
        }
    }
</style>