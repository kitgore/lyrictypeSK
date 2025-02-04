<script>
    export let id;
    export let title = 'Window';
    export let position = { x: 0, y: 0 };
    export let onClose;
    export let dimensions = { width: 80, height: 78 };
    export let showScrollbar = true;
    
    import { windowStore, windowActions } from '$lib/services/store.js';
    import CustomScrollbar from './CustomScrollbar.svelte';
    import { onMount, onDestroy } from 'svelte';
    
    let contentElement;
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let originalPos = { x: 0, y: 0 };
    let appWindow;
    let mounted = false;

    // Subscribe to the window store
    let windowState = {};
    const unsubscribe = windowStore.subscribe(state => {
        windowState = state.windowStates.find(w => w.id === id) || {};
    });

    onMount(() => {
        mounted = true;
        // Ensure window is in store when mounted
        if (!windowState.id) {
            windowActions.addWindow({
                id,
                title,
                position,
                dimensions
            });
        }
    });
    
    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
    
    function onWindowClick() {
        if (mounted && id) {
            windowActions.activateWindow(id);
        }
    }

    function onDragStart(event) {
        if (!mounted || !appWindow) return;
        
        isDragging = true;
        windowActions.activateWindow(id);
        
        startPos = {
            x: event.clientX,
            y: event.clientY
        };
        
        originalPos = {
            x: appWindow.offsetLeft,
            y: appWindow.offsetTop
        };
        
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
    }

    function onDrag(event) {
        if (!isDragging || !appWindow) return;
        
        const currentPos = {
            x: event.clientX - startPos.x + originalPos.x,
            y: event.clientY - startPos.y + originalPos.y
        };
        
        appWindow.style.left = `${currentPos.x}px`;
        appWindow.style.top = `${currentPos.y}px`;
    }

    function onDragEnd() {
        isDragging = false;
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', onDragEnd);
        
        // Update the stored position when dragging ends
        if (appWindow) {
            const newPosition = {
                x: (appWindow.offsetLeft / window.innerWidth) * 100,
                y: (appWindow.offsetTop / window.innerHeight) * 100
            };
            windowActions.updatePosition(id, newPosition);
        }
    }
</script>
  
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="app-window {windowState.isActive ? 'active' : ''}"
    bind:this={appWindow}
    on:mousedown={onWindowClick}
    style="
        top: {windowState.posit11ion?.y || position.y}vh;
        left: {windowState.position?.x || position.x}vw;
        width: {dimensions.width}%;
        height: {dimensions.height}vh;
        z-index: {windowState.zIndex || 1};
    "
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="title-bar" on:mousedown|preventDefault={onDragStart}>
        <div class="lines-container">
            <svg 
                width="100%" 
                height="60%" 
                viewBox="0 0 100 24" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                class="lines-svg"
            >
                <line x1="0" y1="2" x2="100%" y2="2" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="0" y1="6" x2="100%" y2="6" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="0" y1="10" x2="100%" y2="10" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="0" y1="14" x2="100%" y2="14" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="0" y1="18" x2="100%" y2="18" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="0" y1="22" x2="100%" y2="22" stroke="var(--primary-color)" stroke-width="1.5"/>
            </svg>
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
    background-color: var(--secondary-color);
    transition: box-shadow 0.2s ease;
}

.app-window.active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.title-bar {
    position: relative;
    background-color: var(--secondary-color);
    border: 2px solid var(--primary-color);;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4vh;
    color: var(--primary-color);
}

.lines-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 99%;
    height: 100%;
    position: absolute;
}

.lines-svg {
    max-height: 70%;
}


.title-text {
    background-color: var(--secondary-color);
    padding: 0 .5vw;
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3vh;
    user-select: none;
    color: var(--primary-color);
    line-height: .9;
}

.close-button {
    position: absolute;
    right: 1.5vw;
    top: 50%;
    transform: translateY(-50%);
    width: 2.6vh; 
    height: 2.6vh;
    background-color: var(--secondary-color);
    border: 2px solid var(--primary-color);;
    font-size: 1.5vh;
    color: var(--primary-color);;
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
    border: 2px solid var(--primary-color);;
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

/* .app-window.active .title-bar {
    background-color: var(--secondary-color);
    border-color: var(--primary-color);
    border-width: 3px;
} */
</style>
  