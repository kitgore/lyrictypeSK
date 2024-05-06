<script>
    export let name;
    export let imageUrl;
    
</script>

<div class="artist-button">
    {#if name}
        <img src={imageUrl} alt={""} class="artist-image"/>
        <span>{name}</span>
    {:else}
        <div class="artist-placeholder-image"></div>
        <div class="artist-placeholder-text"></div>
    {/if}
</div>

<style>
    .artist-button {
        border: 2px solid black;
        border-radius: 1em;
        height: calc(95% / 9 - 10px);
        display: flex;
        align-items: center;
        justify-content: left;
        text-align: left;
        padding: 5px;
    }
    .artist-placeholder-image{
        width: 2.2em;
        height: 2.2em;
        background-color: #ededed;
        border-radius: 30%;
        margin-right: 10px;
    }
    .artist-placeholder-text{
        width: 60%;
        height: 1.2em;
        background-color: #ededed;
        border-radius: .5em;
    }
    .artist-image {
        width: 2.2em;
        height: 2.2em;
        background-color: #ededed;
        border-radius: 30%;
        margin-right: 10px;
    }
    span {
        color: black;
    }
</style>
