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
                <img src={imageUrl} class="album-art" alt="album art">
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
            <p class="stat">{accuracy === 100 ? "100%" : accuracy.toFixed(1) + "%"}</p>
        </div>
    </div>
    <div class="bottom-container">
        <div class="button-container">
            <button class="control-button">
                <svg class="customsvgsize1" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.7429 16.8075H14.7429C14.7429 16.4488 14.5508 16.1176 14.2394 15.9395C13.928 15.7614 13.5451 15.7637 13.2359 15.9456L13.7429 16.8075ZM3.07794 23.0811L2.57092 22.2191H2.57092L3.07794 23.0811ZM3.07794 2.03152L3.58496 1.16959H3.58496L3.07794 2.03152ZM13.7429 8.30505L13.2359 9.16698C13.5451 9.34886 13.928 9.35119 14.2394 9.1731C14.5508 8.995 14.7429 8.66377 14.7429 8.30505H13.7429ZM15.25 2.03152L14.7429 2.89345L15.25 2.03152ZM31.6768 11.6944L32.1838 10.8324L31.6768 11.6944ZM31.6768 13.4182L32.1838 14.2802L31.6768 13.4182ZM15.25 23.0811L14.7429 22.2191L15.25 23.0811ZM13.2359 15.9456L2.57092 22.2191L3.58496 23.943L14.25 17.6695L13.2359 15.9456ZM2.57092 22.2191H2.57092H0.570923C0.570923 23.766 2.2517 24.7273 3.58496 23.943L2.57092 22.2191ZM2.57092 22.2191V2.89346H0.570923V22.2191H2.57092ZM2.57092 2.89346L2.57092 2.89345L3.58496 1.16959C2.25169 0.385311 0.570923 1.34662 0.570923 2.89346H2.57092ZM2.57092 2.89345L13.2359 9.16698L14.25 7.44311L3.58496 1.16959L2.57092 2.89345ZM14.7429 8.30505V2.89346H12.7429V8.30505H14.7429ZM14.7429 2.89346V2.89345L15.757 1.16959C14.4237 0.385311 12.7429 1.34663 12.7429 2.89346H14.7429ZM14.7429 2.89345L31.1698 12.5563L32.1838 10.8324L15.757 1.16959L14.7429 2.89345ZM31.1698 12.5563L32.1838 14.2802C33.4984 13.5069 33.4984 11.6057 32.1838 10.8324L31.1698 12.5563ZM31.1698 12.5563L14.7429 22.2191L15.757 23.943L32.1838 14.2802L31.1698 12.5563ZM14.7429 22.2191H12.7429C12.7429 23.766 14.4237 24.7273 15.757 23.943L14.7429 22.2191ZM14.7429 22.2191V16.8075H12.7429V22.2191H14.7429Z" fill="black"/>
                </svg>                    
            </button>
            <button class="control-button">
                <svg class="customsvgsize1" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.91669 19.0166V16.0417C2.91669 11.2092 6.8342 7.29167 11.6667 7.29167H30.625V7.29167" stroke="black" stroke-width="2" stroke-linecap="round"/>
                    <path d="M27.7084 2.91667L32.0834 7.29167L27.7084 11.6667" stroke="black" stroke-width="2" stroke-linecap="round"/>
                    <path d="M32.0833 14.5542V17.5291C32.0833 22.3616 28.1658 26.2791 23.3333 26.2791H4.375" stroke="black" stroke-width="2" stroke-linecap="round"/>
                    <path d="M7.29169 30.625L2.91669 26.25L7.29169 21.875" stroke="black" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <button class="control-button smallerpadding">
                <svg class="customsvgsize2" viewBox="0 0 52 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5599 20.52H20.7999M23.9199 14.04V39.96M14.5599 27H20.7999M27.0399 20.52H37.4399M14.5599 33.48H20.7999M11.4399 14.04H40.5599V39.96H11.4399V14.04Z" stroke="black" stroke-width="2"/>
                </svg>
            </button>
        </div>
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
        margin-top: 3%;
        margin-bottom: -3%;
    }
    .bottom-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 25%;
        /* align-items: center; */
    }
    .button-container {
        display: flex;
        justify-content: space-around; /* Space out the buttons evenly */
        width: 100%;
        height: 75%; 
        /* padding: 1em;  */
    }

    .control-button {
        font-size: 2em; 
        padding: 0.5em 1em;
        /* margin: 0 0.5em; */
        border: 2px solid black; 
        background-color: white; 
        cursor: pointer; 
        border-radius: 10px;
        height: 100%;
        width: 13%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .smallerpadding{
        padding: 0.5em 0.75em;
    }
    .control-button:hover {
        background-color: #f0f0f0;
    }
    .customsvgsize1{
        height: 1.5em;
        width: 1.5em;
    }
    .customsvgsize2{
        height: 3em;
        width: 3em;
    }
    .song-info{
        display: flex;
        flex-direction: row;
        /* padding-top: 8%; */
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
        height: 90%;
        object-fit: contain;
        display: block;  /* removes any unwanted space below the image */
        max-width: 100%;  /* ensures image doesn't overflow */
        max-height: 100%;
    }
    .song-info-text-container{
        display: flex;
        flex-direction: column;
    }
    .wpmAndAcc{
        display: flex;
        flex-direction: column;
        width: 20%;
        height: 80%;
        justify-content: center;
        margin-top: -1.5%;
    }
    .statTitle{
        font-size: 1.4em;
        margin-bottom: 0;
        margin-top: 0;
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