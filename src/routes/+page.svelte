<script>
    import { onMount } from 'svelte';
    import app from '$lib/services/initFirebase';
    import AppWindow from '$lib/components/AppWindow.svelte';
  import TypingTest from '../lib/components/TypingTest.svelte';



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


</script>

<h1>WELCOME TO LYRICTYPE</h1>



<!-- Display the lyrics -->
<AppWindow>
    <TypingTest></TypingTest>
</AppWindow>