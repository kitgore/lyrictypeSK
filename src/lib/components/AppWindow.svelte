<script>
    export let title = 'Media Typer'; // Default title
    export let position = { x: 0, y: 0 }; // Default position
    export let onClose;
    import CustomScrollbar from './CustomScrollbar.svelte';
    let contentElement; // Reference to the scrollable content
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let originalPos = { x: 0, y: 0 };
    let appWindow;

    // Start dragging
    function onDragStart(event) {
        isDragging = true;
        startPos = {
            x: event.clientX,
            y: event.clientY,
        };
        originalPos = {
            x: appWindow.offsetLeft,
            y: appWindow.offsetTop,
        };
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
    }

    // While dragging
    function onDrag(event) {
        if (!isDragging) return;
        const currentPos = {
            x: event.clientX - startPos.x + originalPos.x,
            y: event.clientY - startPos.y + originalPos.y,
        };
        appWindow.style.left = `${currentPos.x}px`;
        appWindow.style.top = `${currentPos.y}px`;
    }

    // Stop dragging
    function onDragEnd() {
        isDragging = false;
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', onDragEnd);
    }
</script>
  
<div class="app-window" bind:this={appWindow}
    style="top: {position.y}vh; left: {position.x}vw;">
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="title-bar" on:mousedown={onDragStart}>
    <div class="lines-container">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    </div>
    <div class="title-text">{title}</div>
    <button class="close-button" on:click={onClose}>X</button>
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
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 78vh; /* Full height of the viewport */
    width: 80%; /* Assuming the container should span the entire width */
    background-color: white;
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
    user-select: none;;
}

.close-button {
    position: absolute;
    right: 1.5vw; /* Offset from the right edge */
    top: 50%; /* Center vertically */
    transform: translateY(-50%);
    width: 2.6vh; /* Width of the close button */
    height: 2.6vh; /* Height of the close button */
    background-color: white; /* White background */
    border: 2px solid black; /* Black border */
    font-size: 1.5vh; /* Button text size */
    color: black; /* Button text color */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; /* Cursor on hover */
    outline: none; /* Remove outline */
    padding: 0; /* Remove padding */
}

.window-content {
    display: flex;
    flex-direction: row;
    flex-grow: 1; /* This will make the content fill the rest of the window container's height */
    border: 2px solid black;
    border-top: none; /* Assuming you want a continuous border without double lines */
}

.content-area {
    width: 90%; /* Take up the majority of the space */
    overflow-y: auto; /* If the content overflows, let it scroll */
    margin-right: 4%; /* Spacing between content and scrollbar */
    height: 100%;
}
</style>
  