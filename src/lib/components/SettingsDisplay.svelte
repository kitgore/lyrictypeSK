<script>
    import { onMount } from "svelte";
    import { themeColors, ditherImages, themeChoices, currentTheme, cookiesAccepted } from "$lib/services/store.js";
    import Checkbox from "./Checkbox.svelte";
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
    <div class="settingInline">
        <h3>Remember Preferences<br>(Cookies)</h3>
        <Checkbox bind:checked={$cookiesAccepted} />
    </div>
    <div class="settingInline">
        <h3>Theme</h3>
        <div class="theme-selector">
            <button class="arrow-btn" on:click={() => cycleTheme(-1)}>&lt</button>
            <div class="theme-display">
                {themeChoices[themeIndex].name}
            </div>
            <button class="arrow-btn" on:click={() => cycleTheme(1)}>&gt</button>
        </div>
    </div>
    <div class="settingInline">
        <h3>Recolor Images</h3>
        <Checkbox bind:checked={$ditherImages} />
    </div>
    <br/>
    <br/>
</div>

<style>
    * {
        font-family: "Geneva", sans-serif;
        color: var(--primary-color);
    }
    .settingInline {
        display: flex;
        align-items: center;
    }

    h2 {
        margin: 2% 0%;
        text-decoration: underline;
    }
    h3{
        margin: 2% 0%;
        font-family: 'SysFont', sans-serif;
        font-size: 1.6em;
        padding-right: 5%;
        font-weight: 100;
    }
    .container {
        padding: 0% 4%;
    }
    .theme-selector {
        display: flex;
        align-items: stretch;
        gap: 0;
    }

    .theme-display {
       border: 2px solid var(--primary-color);
       min-width: 8em;
       text-align: center;
       font-size: 1.3em;
       font-family: 'Geneva', sans-serif;
       display: flex;
       align-items: center;
       justify-content: center;
   }
    .arrow-btn {
        font-family: 'SysFont', sans-serif;
        background-color: var(--secondary-color);
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        border-radius: 5px;
        font-size: 1.5em; 
        width: max-content;
        text-align: center;
        cursor: pointer;
        height: 100%;     
        display: flex; 
        align-items: center; 
    }

    .arrow-btn:first-child {
        border-right: none;
        border-radius: 4px 0 0 4px;
    }

    .arrow-btn:last-child {
        border-left: none;
        border-radius: 0 4px 4px 0;
    }


    .arrow-btn:hover {
        background-color: var(--secondary-color); 
        color: var(--primary-color); 
    }
</style>
