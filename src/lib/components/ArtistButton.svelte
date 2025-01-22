<script>
    export let name;
    export let imageUrl;
</script>

{#if name}
    <div class="artist-button" role="button" on:click  aria-label="Artist Button" on:keydown={console.log("bruh")}>
        <div class="image-container">
            <img src={imageUrl} alt={""} class="artist-image"/>
        </div>
        <span>{name}</span>
    </div>
{:else}
    <div class="artist-button-empty">
        <div class="artist-placeholder-image"></div>
        <div class="artist-placeholder-text"></div>
    </div>
{/if}

<style>
    .artist-button, .artist-button-empty {
        border: 2px solid black;
        border-radius: 1em;
        height: calc(80% / 9);
        display: flex;
        align-items: center;
        justify-content: left;
        text-align: left;
        padding: 5px;
    }

    .artist-button:hover {
        background-color: #000000;
    }

    .artist-button:hover span {
        color: white;
    }

    .artist-placeholder-image {
        height: 100%;
        aspect-ratio: 1/1;
        background-color: #ededed;
        border-radius: 35%;
        margin-right: 10px;
    }

    .image-container {
        height: 100%;
        aspect-ratio: 1/1;
        margin-right: 10px;
        position: relative;
    }

    .artist-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 25%;
        object-fit: cover;
    }

    .artist-placeholder-text {
        width: 70%;
        height: 50%;
        background-color: #ededed;
        border-radius: .5em;
    }

    span {
        color: black;
        font-size: 2.3vh;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
    </style>