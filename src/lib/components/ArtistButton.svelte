<script>
    export let name;
    export let imageUrl;
    
</script>

<!-- Structure for displaying artist information -->
<div class="artist-button">
    {#if name}
        <img src={imageUrl} alt={""} class="artist-image"/>
        <span>{name}</span>
    <!-- Placeholder displayed if image is not defined -->
    {:else}
        <div class="artist-placeholder-image"></div>
        <div class="artist-placeholder-text"></div>
    {/if}
</div>

<style>
    .artist-button {
        border: 2px solid black;
        border-radius: 1em;
        height: calc(80% / 9);
        display: flex;
        align-items: center;
        justify-content: left;
        text-align: left;
        padding: 5px;
    }
    .artist-placeholder-image{
        height: 100%;
        aspect-ratio: 1/1;
        background-color: #ededed;
        border-radius: 35%;
        margin-right: 10px;
    }
    .artist-placeholder-text{
        width: 70%;
        height: 50%;
        background-color: #ededed;
        border-radius: .5em;
    }
    .artist-image {
        height: 100%;
        aspect-ratio: 1/1;
        border-radius: 35%;
        margin-right: 10px;
        object-fit: contain;
        display: block;  /* removes any unwanted space below the image */
        max-width: 100%;  /* ensures image doesn't overflow */
        max-height: 100%; 
    }
    span {
        color: black;
        font-size: 2.3vh;
    }
</style>
