<script>
    export let title = 'Media Typer'; // Default title
    export let position = { x: 0, y: 0 }; // Default position
    export let onClose;
    export let dimensions = { width: 80, height: 78}; // Default dimensions
    export let showScrollbar = true;
    import CustomScrollbar from './CustomScrollbar.svelte';
  import TypingTest from './TypingTest.svelte';
    let contentElement; // Reference to the scrollable content
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let originalPos = { x: 0, y: 0 };
    let appWindow;

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

    function onDrag(event) {
        if (!isDragging) return;
        const currentPos = {
            x: event.clientX - startPos.x + originalPos.x,
            y: event.clientY - startPos.y + originalPos.y,
        };
        appWindow.style.left = `${currentPos.x}px`;
        appWindow.style.top = `${currentPos.y}px`;
    }

    function onDragEnd() {
        isDragging = false;
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', onDragEnd);
    }
</script>
  
<div class="app-window" bind:this={appWindow}
    style="top: {position.y}vh; left: {position.x}vw; width: {dimensions.width}%; height: {dimensions.height}vh;">
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
    <button class="close-button" on:click={onClose}></button>
</div>
    <div class="window-content" bind:this={contentElement}>
        <div class="content-area">
            <slot></slot>
        </div>
        <div class="scrollbar-container">
            {#if contentElement && showScrollbar}
                <CustomScrollbar content={contentElement} />
            {/if}
        </div>
    </div>
</div>
<style>
.app-window {
    position: absolute;
    display: flex;
    flex-direction: column;
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
    height: 4vh;
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
    padding: 0 .5vw;
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3vh;
    user-select: none;;
}

.close-button {
    position: absolute;
    right: 1.5vw;
    top: 50%;
    transform: translateY(-50%);
    width: 2.6vh; 
    height: 2.6vh;
    background-color: white;
    border: 2px solid black;
    font-size: 1.5vh;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    padding: 0;
}

.window-content {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    border: 2px solid black;
    border-top: none;
}

.content-area {
    width: 92%;
    overflow-y: auto;
    height: 100%;
}
.scrollbar-container {
    width: 8%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  