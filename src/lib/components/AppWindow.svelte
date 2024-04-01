<script>
    export let title = 'Media Typer'; // Default title
    import CustomScrollbar from './CustomScrollbar.svelte';
    let contentElement; // Reference to the scrollable content
</script>
  
<div class="app-window">
<div class="title-bar">
    <div class="lines-container">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    </div>
    <div class="title-text">{title}</div>
</div>
    <div class="window-content" bind:this={contentElement}>
        <div class="content-area">
            <slot></slot>
        </div>
        {#if contentElement}
            <CustomScrollbar content={contentElement} />
        {/if}
    </div>
</div>
<style>
.app-window {
    display: flex;
    flex-direction: column;
    height: 70vh; /* Full height of the viewport */
    width: 80%; /* Assuming the container should span the entire width */
}

.title-bar {
    position: relative;
    background-color: white;
    border: 2px solid black;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Use viewport height (vh) unit to define the height relative to the viewport */
    height: 4vh; /* Adjust this value as needed */
}

.lines-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 99%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
}

.line {
    background-color: black;
    width: 100%;
    height: .16vh;
    margin: .16vh 0;
}

.title-text {
    background-color: white;
    padding: 0 .5vw; /* Using viewport width to keep horizontal padding consistent */
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3vh; /* Font size scales with the height */
}

.window-content {
    display: flex;
    flex-direction: row;
    flex-grow: 1; /* This will make the content fill the rest of the window container's height */
    border: 2px solid black;
    border-top: none; /* Assuming you want a continuous border without double lines */
}

.content-area {
    width: 92%; /* Take up the majority of the space */
    overflow-y: auto; /* If the content overflows, let it scroll */
    margin-right: 2%; /* Spacing between content and scrollbar */
}
</style>
  