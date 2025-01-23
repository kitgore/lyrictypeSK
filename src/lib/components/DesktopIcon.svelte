<script>
    export let label = ''; // The label text for the icon
    export let onClick; // Event handler for when the icon is clicked
    export let position = { x: 0, y: 0 };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- TODO: Add keyboard navigation and focus styles -->
<div class="desktop-icon" on:click={onClick} style="top: {position.y}vh; left: {position.x}vw;">
    <div class="icon-svg">
        <slot class="icon-svg" name="icon"></slot> <!-- Slot for SVG content -->
    </div>
    <div class="icon-label">{label}</div>
</div>
<style>
    .desktop-icon {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }
    .icon-label {
        background-color: var(--secondary-color); 
        color: var(--primary-color);; 
        text-align: center;
        padding: 2px 3px; 
        margin-top: 8px; 
        border: 1px solid var(--primary-color);;
        width: max-content;
        font-size: 1em;
    }
</style>
