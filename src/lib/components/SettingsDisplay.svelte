<script>
    import { onMount } from "svelte";
    import { themeColors, ditherImages, themeChoices, currentTheme } from "$lib/services/store.js";
    let themeIndex = 0; // Initialize with 0
    
    // Get initial index when component mounts
    onMount(() => {
        themeIndex = themeChoices.findIndex((theme) => 
            theme.primary === $currentTheme.primary && 
            theme.secondary === $currentTheme.secondary
        );
    });

    function cycleTheme(direction) {
        themeIndex = (themeIndex + direction + themeChoices.length) % themeChoices.length;
        currentTheme.set(themeChoices[themeIndex]);
    }
</script>

<div class="container">
    <h2>Theme</h2>
    <div class="theme-selector">
        <button class="arrow-btn" on:click={() => cycleTheme(-1)}>
            &lt;
        </button>
            <div class="theme-text">
                {themeChoices[themeIndex].name}
            </div>
        <button class="arrow-btn" on:click={() => cycleTheme(1)}>
            &gt;
        </button>
    </div>
    <br/>
    <h2>Image Dithering</h2>
    <div>
        <input type="checkbox" bind:checked={$ditherImages} />
        <label for="ditherImage">Dither images</label>
    </div>
    <br/>
    <br/>
    <button class="arrow-btn" >Reset settings</button>
</div>

<style>
    * {
        font-family: "Geneva", sans-serif;
        color: var(--primary-color);
    }

    h2 {
        margin: 2% 0%;
        text-decoration: underline;
    }
    .container {
        padding: 0% 4%;
    }
    .theme-selector {
        display: flex; 
        justify-content: space-around;
        font-size: 1.5em;
        width: 60%;
    }
    .theme-text{
        display: flex; 
        align-items: center; 
        justify-content: center;
        width: 50%;
    }

    .arrow-btn {
        font-family: 'SysFont', sans-serif;
        background-color: var(--secondary-color);
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        border-radius: 5px;
        padding: 0 10px;
        margin: 5px;
        font-size: 1.5em; 
        width: max-content;
        text-align: center;
        cursor: pointer;
        height: 3%;     
        display: flex; 
        align-items: center; 
    }


    .arrow-btn:hover {
        background-color: var(--secondary-color); 
        color: var(--primary-color); 
    }
</style>
