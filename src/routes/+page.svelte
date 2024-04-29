<script>
    import { onMount } from 'svelte';
    import app from '$lib/services/initFirebase';
    import AppWindow from '$lib/components/AppWindow.svelte';
    import TypingTest from '../lib/components/TypingTest.svelte';
    import Background from '../lib/components/Background.svelte';
    import DesktopIcon from '../lib/components/DesktopIcon.svelte';
    import AboutDisplay from '../lib/components/AboutDisplay.svelte';
    import SettingsDisplay from '../lib/components/SettingsDisplay.svelte';

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
    { id: 'aboutDisplayWindow', title: 'About Us', isOpen: false, component: AboutDisplay, position: { x: 10, y: 10 } },
    { id: 'settingsWindow', title: 'Settings', isOpen: false, component: SettingsDisplay, position: { x: 10, y: 10 } }
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
<DesktopIcon label="Trash" position={ {x: 92, y: 78} }>
        <svg slot="icon" width="80" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="0.7" stroke-linecap="square" stroke-linejoin="round" style="margin: auto; display: block;">
            <polyline points="9 6 12 6 15 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m4 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
            <line x1="9" y1="11" x2="9" y2="17"></line>
            <line x1="11" y1="11" x2="11" y2="17"></line>
            <line x1="13" y1="11" x2="13" y2="17"></line>
            <line x1="15" y1="11" x2="15" y2="17"></line>
            <path d="M7 4h10a2 2 0 0 1 2 2v2H5V6a2 2 0 0 1 2-2z" />
        </svg>
</DesktopIcon>
<DesktopIcon label="About Us" onClick={() => openWindow('aboutDisplayWindow')} position={ {x: 92, y: 31.33} }>
    <svg slot="icon" width="80" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="0.7" stroke-linecap="square" stroke-linejoin="round" style="margin: auto; display: block;">
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
</DesktopIcon>
<DesktopIcon label="Settings" onClick={() => openWindow('settingsWindow')} position={ {x: 92, y: 54.66} }>
    <svg slot="icon" width="80" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: auto; display: block;">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06 .06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06c.26.26.61.41.98.46a1.65 1.65 0 0 0 1.82-.33 1.65 1.65 0 0 0 .33-1.82V2a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09c.39.07.73.31 1 .66.26.26.41.61.46.98a1.65 1.65 0 0 0 .33 1.82 1.65 1.65 0 0 0 1.82.33H22a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.82-.33"></path>
    </svg>
</DesktopIcon>
{#each windows as window (window.id)}
    {#if window.isOpen}
        <AppWindow title={window.title} position={window.position} onClose={() => closeWindow(window.id)}>
            <svelte:component this={window.component} />
        </AppWindow>
    {/if}
{/each}