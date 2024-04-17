<script>
    import { onMount } from 'svelte';
    import app from '$lib/services/initFirebase';
    import AppWindow from '$lib/components/AppWindow.svelte';
  import TypingTest from '../lib/components/TypingTest.svelte';
  import Background from '../lib/components/Background.svelte';



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

<Background></Background>

<br>
<br>
<br>
<br>
<!-- Display the lyrics -->
<AppWindow>
    <TypingTest></TypingTest>
</AppWindow>