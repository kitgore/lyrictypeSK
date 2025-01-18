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
    let primaryArtist = '';
    let artistImg = '';
    let lyrics = '';
    let blink = false;
    let inputElement;
    let displayedArtist = 'Artist';
    let previousArtists = [];

    let recentlyPlayed = [];

    // Set the artist input to whats in the input field
    async function handleArtistInput(event) {
        artistInput = event.target.value;
    }

    async function handleEnter(event){
        if (event.key === 'Enter') {
            blurInput(); // Remove focus from the input field
            event.preventDefault(); // Prevent form submission
            const data = await getArtistLyrics(artistInput);
            setDisplayFromData(data);
        }
    }

    function setDisplayFromData(data){
        if (data && data.lyrics) {
                console.log(data)
                lyrics = data.lyrics;
                songTitle = data.title;
                artistName = data.artist;
                imageUrl = data.image;
                primaryArtist = data.primaryArtist;
                artistImg = data.artistImg;
                recentlyPlayed = [{ name: primaryArtist, imageUrl: artistImg }, 
                    ...recentlyPlayed.filter(artist => artist.name !== primaryArtist)]; // Move the artist to the front of the list
                displayedArtist = primaryArtist;

        } else {
            lyrics = "Lyrics not found.";
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
        focusInput();
        inputElement.addEventListener('input', handleArtistInput);
        inputElement.addEventListener('keydown', handleEnter);
        inputElement.addEventListener('blur', blurInput);
    });

    $: fullArtistList = [...recentlyPlayed, ...Array(7 - recentlyPlayed.length).fill({ name: null, imageUrl: null })];
</script>

<div class = "appContainer">
    <div class = "upperContainer">
        <div class="upperTextContainer">
            <div class="recentArtistsTitle">
                <h3>Recently Played</h3>
            </div>
            <div class="artistTitle">
                <h2 class="displayedArtist">{displayedArtist}</h2>
                <svg class="musicSVG" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6779 0.220394C18.4735 0.0457943 18.2035 -0.0307252 17.9372 0.0112826L6.29208 1.84998C5.84528 1.92052 5.51616 2.30568 5.51616 2.75804V6.43547V12.258H3.67743C1.6497 12.2581 0 13.7703 0 15.629C0 17.4878 1.6497 19 3.67743 19C5.70516 19 7.35485 17.4878 7.35485 15.629V13.1774V7.22104L17.1613 5.67265V10.7258H15.3226C13.2949 10.7258 11.6452 12.238 11.6452 14.0968C11.6452 15.9555 13.2949 17.4678 15.3226 17.4678C17.3503 17.4678 19 15.9555 19 14.0968V11.6451V4.59678V0.919349C19 0.650492 18.8822 0.395068 18.6779 0.220394Z" fill="black"/>
                </svg>       
            </div>         
        </div>
        <div class="contentContainer">
            <div class = "sidebar">
                    <div class="recent-artists">
                        {#each fullArtistList as artist, index}
                            <ArtistButton name={artist.name} imageUrl={artist.imageUrl || '/default-image.svg'} />
                        {/each}
                    </div>
            </div>
            <div class = "mainContainer">
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
        --sidebar-width: 21%;
    }
    .recentArtistsTitle{
        width: var(--sidebar-width);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1%;
    }
    .contentContainer{
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .artistTitle{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 3%;
        gap: .5em;
        font-size: 2vh;
    }

    .musicSVG{
        height: 2.7vh;
        width: 2.7vh;
    }
    .appContainer {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .upperTextContainer{
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        height: 13%;

    }
    .upperContainer {
        display: flex;
        height: 87%;
        width: 100%;
        flex-direction: column;
    }
    .sidebar{
        width: var(--sidebar-width);
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .recent-artists {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 0 6% 0 10%;
        justify-content: space-between;
    }

    h3 {
        display: flex;
        justify-content: end;
        line-height: 110%;
        text-align: center;
        font-size: 2.5vh;
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
        height: 100%;
        border-radius: .2em;
    }

    .artistNameText{
        flex: 0 0 17%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Geneva", sans-serif;
        font-size: 2.5vh;
    }
    .artist-input-container {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 8%;
        position: relative;
        margin: 3% 0;
    }

    .artist-input {
        flex: 0 0 83%;
        white-space: pre-wrap;
        padding: .5%;
        padding-left: 5px;
        letter-spacing: -.05em;
        font-family: "Geneva", sans-serif;
        font-size: 2.5vh;
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
        top: 16%;
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