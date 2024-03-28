<script>
    import { onMount } from 'svelte';
    import app from '$lib/services/initFirebase';
    import TextInput from '$lib/components/TextInput.svelte';
    import { getArtistLyrics } from '$lib/services/artistService';
    import QuoteDisplay from '$lib/components/QuoteDisplay.svelte';

    let artist = '';
    let lyrics = ''; // This will store the lyrics returned from the service

    onMount(async () => {
        if (typeof window !== 'undefined') {
            const { getAnalytics, isSupported } = await import('firebase/analytics');
            isSupported().then((supported) => {
                if (supported) {
                    getAnalytics(app);
                    console.log("Analytics is supported");
                } else {
                    console.log("Analytics is not supported");
                }
            });
        }
    });

    async function handleArtistKeyPress(event) {
        if (event.detail.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            artist = event.detail.target.value; // Update the artist variable with the value from the input field
            const data = await getArtistLyrics(artist);
            if (data && data.lyrics) {
                lyrics = data.lyrics; // Update the lyrics variable with the data returned from the service
            } else {
                lyrics = "Lyrics not found."; // Fallback message
            }
        }
    }
</script>

<h1>WELCOME TO LYRICTYPE</h1>

<TextInput placeholder="Type an artist" on:keypress={handleArtistKeyPress} bind:value={artist} />

<!-- Display the lyrics -->
{#if lyrics}
    <QuoteDisplay {lyrics} />
{/if}

<style>
    .lyrics {
        white-space: pre-wrap; /* Preserves whitespace and line breaks in the lyrics */
        margin-top: 20px;
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 8px;
    }
</style>