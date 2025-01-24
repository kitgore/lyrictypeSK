<script>
    import { onMount } from 'svelte';
    import { intBufferFromImage, GRAY8 } from "@thi.ng/pixel";
    import { ditherWith, ATKINSON } from "@thi.ng/pixel-dither";
    
    export let imageUrl;
    export let primaryColor = "#000000";
    export let secondaryColor = "#FFFFFF";
    
    let canvas;
    let loading = true;
    let error = null;
    
    async function processImage() {
        try {
            loading = true;
            error = null;
    
            console.log('Processing image:', imageUrl); // Debug log
    
            // Build the proxy URL
            const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
            console.log('Proxy URL:', proxyUrl); // Debug log
    
            // Fetch the image through the proxy
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            console.log('Proxy response:', response.status, response.headers.get('content-type')); // Debug log
    
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
    
            // Load image using the object URL
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = () => {
                    console.log('Image loaded:', img.width, 'x', img.height); // Debug log
                    resolve();
                };
                img.onerror = (e) => {
                    console.error('Image load error:', e); // Debug log
                    reject(new Error('Failed to load image'));
                };
                img.src = objectUrl;
            });
    
            // Clean up the object URL
            URL.revokeObjectURL(objectUrl);
    
            // Create temporary canvas and draw image
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            tempCtx.drawImage(img, 0, 0);
    
            // Get image data
            const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
            
            // Convert hex to RGB
            const color1 = {
                r: parseInt(primaryColor.slice(1, 3), 16),
                g: parseInt(primaryColor.slice(3, 5), 16),
                b: parseInt(primaryColor.slice(5, 7), 16)
            };
            
            const color2 = {
                r: parseInt(secondaryColor.slice(1, 3), 16),
                g: parseInt(secondaryColor.slice(3, 5), 16),
                b: parseInt(secondaryColor.slice(5, 7), 16)
            };
    
            console.log('Processing with colors:', color1, color2); // Debug log
    
            // Process with thi.ng/pixel
            const pixelBuffer = intBufferFromImage(imageData);
            const grayImg = pixelBuffer.as(GRAY8);
    
            // Apply Atkinson dithering
            ditherWith(ATKINSON, grayImg, {
                threshold: 0.5,
                bleed: 1.0
            });
    
            // Create output buffer
            const output = new Uint8ClampedArray(pixelBuffer.width * pixelBuffer.height * 4);
    
            // Map dithered grayscale values to the two colors
            for (let i = 0; i < grayImg.data.length; i++) {
                const pixelIndex = i * 4;
                const isColor2 = grayImg.data[i] > 127;
                
                const color = isColor2 ? color2 : color1;
                
                output[pixelIndex] = color.r;
                output[pixelIndex + 1] = color.g;
                output[pixelIndex + 2] = color.b;
                output[pixelIndex + 3] = 255;
            }
    
            // Update display canvas
            canvas.width = pixelBuffer.width;
            canvas.height = pixelBuffer.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.putImageData(new ImageData(output, pixelBuffer.width, pixelBuffer.height), 0, 0);
    
            console.log('Processing complete'); // Debug log
    
        } catch (err) {
            console.error('Error processing image:', err);
            error = err.message || 'Unknown error occurred';
        } finally {
            loading = false;
        }
    }
    
    $: if (imageUrl && canvas) {
        processImage();
    }
    
    onMount(() => {
        if (imageUrl) {
            processImage();
        }
    });
    </script>
    
    <div class="albumCover">
        {#if loading}
        <div class="loading">Loading...</div>
        {/if}
        
        {#if error}
        <div class="error">{error}</div>
        {/if}
        
        <canvas
            bind:this={canvas}
            class="albumArt"
            style="display: {loading ? 'none' : 'block'}"
        ></canvas>
    </div>
    
    <style>
    .albumCover {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .albumArt {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .loading, .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .error {
        color: red;
    }
    </style>