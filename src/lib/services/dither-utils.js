// dither-utils.js
export function atkinsonDither(imageData, primaryColor, secondaryColor) {
    // Convert hex to RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return [r, g, b];
    }

    const width = imageData.width;
    const height = imageData.height;
    const data = new Uint8ClampedArray(imageData.data);
    
    const darkColor = hexToRgb(primaryColor);
    const lightColor = hexToRgb(secondaryColor);
    
    // Convert to grayscale first
    for (let i = 0; i < data.length; i += 4) {
        const gray = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
        data[i] = data[i + 1] = data[i + 2] = gray;
    }

    // Atkinson dithering matrix
    const matrix = [
        [0, 0, 1/8, 1/8],
        [1/8, 1/8, 1/8, 0],
        [0, 1/8, 0, 0]
    ];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const oldPixel = data[idx];
            
            // Determine if pixel should be dark or light
            const isDark = oldPixel < 128;
            const newColor = isDark ? darkColor : lightColor;
            
            data[idx] = newColor[0];     // R
            data[idx + 1] = newColor[1]; // G
            data[idx + 2] = newColor[2]; // B
            
            const newPixel = isDark ? 0 : 255;
            const error = (oldPixel - newPixel) / 8;

            // Propagate error
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] === 0) continue;
                    
                    const ny = y + i;
                    const nx = x + j - 1;
                    
                    if (ny < height && nx >= 0 && nx < width) {
                        const nidx = (ny * width + nx) * 4;
                        data[nidx] += error;
                        data[nidx + 1] += error;
                        data[nidx + 2] += error;
                    }
                }
            }
        }
    }

    return new ImageData(data, width, height);
}

export async function applyDitheringToImage(originalUrl, primaryColor, secondaryColor, shouldDither = true, targetSize = null) {
    const proxiedUrl = `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
    
    try {
        const img = await loadImage(proxiedUrl);
        if (!shouldDither) return proxiedUrl;
        
        const canvas = document.createElement('canvas');
        
        // If targetSize is provided, scale the image
        if (targetSize) {
            canvas.width = targetSize;
            canvas.height = targetSize;
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const ditheredData = atkinsonDither(imageData, primaryColor, secondaryColor);
        
        ctx.putImageData(ditheredData, 0, 0);
        return canvas.toDataURL();
    } catch (error) {
        console.error('Error in applyDitheringToImage:', error);
        throw error;
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        
        img.src = url;
    });
}