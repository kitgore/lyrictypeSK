<script>
    import { onMount } from 'svelte';
    import app from '$lib/services/initFirebase';
    import AppWindow from '$lib/components/AppWindow.svelte';
    import TypingTest from '../lib/components/TypingTest.svelte';
    import Background from '../lib/components/Background.svelte';
    import DesktopIcon from '../lib/components/DesktopIcon.svelte';

    onMount(async () => {
        if (typeof window !== 'undefined') {
            const { getAnalytics, isSupported } = await import('firebase/analytics');
            isSupported().then((supported) => {
                if (supported) {
                    getAnalytics(app);
                    console.log("Analytics is supported");
                } else {
                    console.log("Analytics is not supported");
                }
            });
        }
    });

    let windows = [
        { id: 'typingTestWindow', title: 'Media Typer', isOpen: false, component: TypingTest, position: { x: 10, y: 10 } },
    ];

    function closeWindow(id) {
        const index = windows.findIndex(w => w.id === id);
        if (index !== -1) {
            windows[index].isOpen = false;
            windows = windows.slice(); // Reassign to trigger reactivity
        }
    }
    function openWindow(id){
        console.log("open window")
        const index = windows.findIndex(w => w.id === id);
        if (index !== -1) {
            windows[index].isOpen = true;
            windows = windows.slice(); // Reassign to trigger reactivity
        }
    }


</script>

<Background></Background>
<DesktopIcon label="Media Typer" onClick={() => openWindow('typingTestWindow')} position={ {x: 90.5, y: 8} }>
    <svg slot="icon" width="80" height="80" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1" y="0.5" width="35" height="39" rx="1.5" fill="white" stroke="black"/> <rect x="5" y="4.5" width="27" height="20" rx="1.5" fill="white" stroke="black"/> <rect x="3" y="39.5" width="31" height="6" fill="white" stroke="black"/> <line x1="18.5" y1="31.5" x2="30.5" y2="31.5" stroke="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H8.5V8H7.5V7ZM7.5 10H8.5V11H7.5V10ZM8.5 13H7.5V14H8.5V13ZM7.5 16H8.5V17H7.5V16ZM8.5 19H7.5V20H8.5V19ZM10.5 7H11.5V8H10.5V7ZM11.5 10H10.5V11H11.5V10ZM10.5 13H11.5V14H10.5V13ZM11.5 16H10.5V17H11.5V16ZM10.5 19H11.5V20H10.5V19ZM14.5 7H13.5V8H14.5V7ZM13.5 10H14.5V11H13.5V10ZM14.5 19H13.5V20H14.5V19ZM16.5 7H17.5V8H16.5V7ZM17.5 10H16.5V11H17.5V10ZM19.5 7H20.5V8H19.5V7ZM23.5 7H22.5V8H23.5V7Z" fill="black"/>
</DesktopIcon>

{#each windows as window (window.id)}
    {#if window.isOpen}
        <AppWindow title={window.title} position={window.position} onClose={() => closeWindow(window.id)}>
            <svelte:component this={window.component} />
        </AppWindow>
    {/if}
{/each}