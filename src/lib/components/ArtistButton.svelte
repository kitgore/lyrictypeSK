<script>
    export let name;
    export let imageUrl;
    
</script>

<div class="artist-button">
    <!-- <img src={imageUrl} alt="{name}" class="artist-image" /> -->
    <!-- <span>{name}</span> -->
    <div class="artist-placeholder-image"/>
    <div class="artist-placeholder-text"/>
</div>

<style>
    .artist-button {
        border: 2px solid black;
        border-radius: 1em; /* Rounded corners */
        height: calc(100% / 9 - 10px); /* Divide the space evenly among 9 items, accounting for the gap */
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
        width: 30px; /* Adjust size as needed */
        height: 30px; /* Adjust size as needed */
        margin-right: 10px;
        border-radius: 50%; /* Make the image round */
    }
    span {
        color: black;
    }
</style>
