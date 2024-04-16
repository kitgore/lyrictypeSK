<script>
    export let wpm;
    export let accuracy;
    export let songTitle;
    export let artistName;
    export let imageUrl;
</script>

<div class="results-container">
    <div class="top-container">
        <div class="song-info">
            <div class="albumArtContainer">
                <!-- <img src={imageUrl} class="album-art" alt="album art"> -->
                <img src={"carti.jpg"} class="album-art" alt="album art">
            </div>
            <div class="song-info-text-container">
                <div class="song-title">{songTitle}</div>
                <div class="artist-name">{artistName}</div>
            </div>
        </div>
        <div class="wpmAndAcc">
            <p class="statTitle">wpm:</p>
            <p class="stat">{wpm.toFixed(1)}</p>
            <p class="statTitle">acc:</p>
            <p class="stat">{accuracy.toFixed(1)}%</p>
        </div>
    </div>
    <div class="bottom-container">
        <!-- Additional result display components here -->
    </div>
</div>

<style>
    *, *::before, *::after {
        box-sizing: border-box;
    }
    .results-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
    }
    .top-container{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 75%;
    }
    .bottom-container{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 25%;
    }
    .song-info{
        display: flex;
        flex-direction: row;
        padding-top: 8%;
        width: 80%;
        height: 80%;
    }
    .albumArtContainer{
        display: flex;
        width: 35%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    .album-art{
        margin: 0 0;
        height: 25vh;
    }
    .song-info-text-container{
        display: flex;
        flex-direction: column;
    }
    .wpmAndAcc{
        display: flex;
        flex-direction: column;
        width: 20%;
        height: 100%;
    }
    .statTitle{
        font-size: 1.4em;
        margin-bottom: 0;
    }
    .stat{
        font-size: 3em;
        margin-top: 5%;
        margin-bottom: 3%;
    }
    .song-title{
        font-size: 3.5em;
        margin-bottom: 2%;
    }
    .artist-name{
        font-size: 2em;
        margin-bottom: 0;
    }
</style>