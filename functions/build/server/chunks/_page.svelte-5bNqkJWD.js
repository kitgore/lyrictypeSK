import { c as create_ssr_component, a as subscribe, b as add_styles, v as validate_component, d as add_attribute, f as each, m as missing_component, o as onDestroy, e as escape } from './ssr-Bd7Khq4f.js';
import { initializeApp } from 'firebase/app';
import { isSupported, getAnalytics } from 'firebase/analytics';
import { w as writable } from './index-Eb7JSzp9.js';
import Cookies from 'js-cookie';
import 'firebase/functions';
import 'textfit';

const firebaseConfig = {
  apiKey: "AIzaSyANsCsZVKzJqglxrsICtxKjeYBXw4NU61I",
  authDomain: "lyrictype-cdf2c.firebaseapp.com",
  projectId: "lyrictype-cdf2c",
  storageBucket: "lyrictype-cdf2c.firebasestorage.app",
  messagingSenderId: "835790496614",
  appId: "1:835790496614:web:9b0172bea6f1949c04dea7",
  measurementId: "G-F36K2T3S6Y"
};
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  }).catch((error) => {
    console.error("Error checking Firebase Analytics support:", error);
  });
}
const cookiesAccepted = writable(Cookies.get("cookiesAccepted") === "true" || false);
const defaultTheme = {
  primary: "#000000",
  secondary: "#ffffff",
  name: "Default"
};
const darkTheme = {
  primary: "#f0f6f0",
  secondary: "#222323",
  name: "Dark",
  monoBackground: "#222323",
  inverseImage: true
};
const blue = {
  primary: "#051b2c",
  secondary: "#8bc8fe",
  name: "Blue"
};
const paperback = {
  primary: "#382b26",
  secondary: "#b8c2b9",
  name: "Paperback"
};
const whiteGreen = {
  primary: "#004c3d",
  secondary: "#ffeaf9",
  name: "Bamboo"
};
const casio = {
  primary: "#000000",
  secondary: "#83b07e",
  name: "Casio"
};
const gatoRoboto = {
  primary: "#323c39",
  secondary: "#d3c9a1",
  name: "Hazy"
};
const peachy = {
  primary: "#242234",
  secondary: "#facab8",
  name: "Peachy"
};
const purp = {
  primary: "#17141c",
  secondary: "#a692b0",
  name: "Purp"
};
const redWhite = {
  primary: "#c62b69",
  secondary: "#edf4ff",
  name: "Hibiscus"
};
const endgame = {
  primary: "#1b1233",
  secondary: "#dcf29d",
  name: "Pistachio"
};
const matcha = {
  primary: "#2b4022",
  secondary: "#7da580",
  name: "Matcha"
};
const milkcarton = {
  primary: "#5b88e2",
  secondary: "#f5f4e9",
  name: "Milk Carton"
};
const puffs = {
  primary: "#6f4d3d",
  secondary: "#cb9867",
  name: "Puffs"
};
const creme = {
  primary: "#2e3037",
  secondary: "#ebe5ce",
  name: "Creme"
};
const blueberry = {
  primary: "#40318e",
  secondary: "#88d7de",
  name: "Blueberry"
};
const matrix = {
  primary: "#26c30f",
  secondary: "#000000",
  name: "Matrix",
  monoBackground: "#000000",
  inverseImage: true
};
const coffee = {
  primary: "#2d2020",
  secondary: "#eacda8",
  name: "Coffee"
};
const strawberryMilk = {
  primary: "#1c221c",
  secondary: "#e0c9e0",
  name: "Strawberry Milk"
};
const redrum = {
  primary: "#2b0000",
  secondary: "#cc0e13",
  name: "Redrum"
};
const themeChoices = [
  defaultTheme,
  darkTheme,
  creme,
  strawberryMilk,
  whiteGreen,
  casio,
  blue,
  paperback,
  gatoRoboto,
  peachy,
  purp,
  redWhite,
  endgame,
  milkcarton,
  puffs,
  blueberry,
  matrix,
  coffee,
  redrum,
  matcha
];
const currentTheme = writable(defaultTheme);
const themeColors = writable({
  primary: currentTheme.primary,
  secondary: currentTheme.secondary
});
const backgroundColors = writable({
  primary: currentTheme.primary,
  secondary: currentTheme.secondary
});
const imageColors = writable({
  primary: currentTheme.primary,
  secondary: currentTheme.secondary
});
const ditherImages = writable(true);
const recentArtists = writable([]);
currentTheme.subscribe((theme) => {
  themeColors.set({
    primary: theme.primary,
    secondary: theme.secondary
  });
  backgroundColors.set({
    primary: theme.monoBackground ? theme.monoBackground : theme.primary,
    secondary: theme.monoBackground ? theme.monoBackground : theme.secondary
  });
  imageColors.set({
    primary: theme.inverseImage ? theme.secondary : theme.primary,
    secondary: theme.inverseImage ? theme.primary : theme.secondary
  });
});
cookiesAccepted.subscribe((accepted) => {
  if (accepted) {
    Cookies.set("cookiesAccepted", "true");
    const savedTheme = Cookies.get("currentTheme");
    const savedColors = Cookies.get("themeColors");
    const savedBackground = Cookies.get("backgroundColor");
    const savedDither = Cookies.get("ditherImages");
    const savedArtists = Cookies.get("recentArtists");
    if (savedTheme)
      currentTheme.set(JSON.parse(savedTheme));
    if (savedColors)
      themeColors.set(JSON.parse(savedColors));
    if (savedBackground)
      backgroundColors.set(JSON.parse(savedBackground));
    if (savedDither)
      ditherImages.set(JSON.parse(savedDither));
    if (savedArtists)
      recentArtists.set(JSON.parse(savedArtists));
    currentTheme.subscribe((value) => {
      Cookies.set("currentTheme", JSON.stringify(value));
      themeColors.set({
        primary: value.primary,
        secondary: value.secondary
      });
      backgroundColors.set({
        primary: value.monoBackground ? value.monoBackground : value.primary,
        secondary: value.monoBackground ? value.monoBackground : value.secondary
      });
      imageColors.set({
        primary: value.inverseImage ? value.secondary : value.primary,
        secondary: value.inverseImage ? value.primary : value.secondary
      });
    });
    themeColors.subscribe((value) => {
      Cookies.set("themeColors", JSON.stringify(value));
    });
    backgroundColors.subscribe((value) => {
      Cookies.set("backgroundColor", JSON.stringify(value));
    });
    ditherImages.subscribe((value) => {
      Cookies.set("ditherImages", JSON.stringify(value));
    });
    imageColors.subscribe((value) => {
      Cookies.set("imageColors", JSON.stringify(value));
    });
    recentArtists.subscribe((value) => {
      Cookies.set("recentArtists", JSON.stringify(value));
    });
  } else {
    Cookies.remove("currentTheme");
    Cookies.remove("themeColors");
    Cookies.remove("backgroundColor");
    Cookies.remove("ditherImages");
    Cookies.remove("recentArtists");
    Cookies.remove("cookiesAccepted");
  }
});
const initialState = {
  activeWindowId: null,
  windowStates: [],
  nextZIndex: 1
};
const windowStore = writable(initialState);
const windowActions = {
  activateWindow: (id) => {
    if (!id)
      return;
    windowStore.update((state) => {
      const newNextZIndex = state.nextZIndex + 1;
      return {
        ...state,
        activeWindowId: id,
        nextZIndex: newNextZIndex,
        windowStates: state.windowStates.map((window2) => ({
          ...window2,
          zIndex: window2.id === id ? newNextZIndex : window2.zIndex,
          isActive: window2.id === id
        }))
      };
    });
  },
  addWindow: (windowData) => {
    if (!windowData.id)
      return;
    windowStore.update((state) => {
      const existingWindow = state.windowStates.find((w) => w.id === windowData.id);
      if (existingWindow) {
        return {
          ...state,
          activeWindowId: windowData.id,
          windowStates: state.windowStates.map((w) => ({
            ...w,
            isActive: w.id === windowData.id
          }))
        };
      }
      const newNextZIndex = state.nextZIndex + 1;
      const newWindow = {
        ...windowData,
        zIndex: newNextZIndex,
        isActive: true,
        position: windowData.position
      };
      return {
        activeWindowId: windowData.id,
        nextZIndex: newNextZIndex,
        windowStates: state.windowStates.map((w) => ({ ...w, isActive: false })).concat(newWindow)
      };
    });
  },
  removeWindow: (id) => {
    if (!id)
      return;
    windowStore.update((state) => {
      const filteredWindows = state.windowStates.filter((w) => w.id !== id);
      const lastWindow = filteredWindows[filteredWindows.length - 1];
      return {
        activeWindowId: lastWindow?.id ?? null,
        nextZIndex: state.nextZIndex,
        windowStates: filteredWindows.map((w) => ({
          ...w,
          isActive: w.id === lastWindow?.id
        }))
      };
    });
  },
  updatePosition: (id, newPosition) => {
    if (!id)
      return;
    windowStore.update((state) => ({
      ...state,
      windowStates: state.windowStates.map(
        (window2) => window2.id === id ? { ...window2, position: newPosition } : window2
      )
    }));
  }
};
const css$7 = {
  code: ".app-window.svelte-bzne2i{position:absolute;display:flex;flex-direction:column;background-color:var(--secondary-color);transition:box-shadow 0.2s ease}.app-window.active.svelte-bzne2i{box-shadow:0 0 10px rgba(0, 0, 0, 0.2)}.title-bar.svelte-bzne2i{position:relative;background-color:var(--secondary-color);border:2px solid var(--primary-color);;;position:relative;display:flex;justify-content:center;align-items:center;height:4vh;color:var(--primary-color)}.lines-container.svelte-bzne2i{display:flex;flex-direction:column;justify-content:center;align-items:center;width:99%;height:100%;position:absolute}.lines-svg.svelte-bzne2i{max-height:70%}.title-text.svelte-bzne2i{background-color:var(--secondary-color);padding:0 .5vw;z-index:1;position:absolute;top:50%;transform:translateY(-50%);font-size:3vh;user-select:none;color:var(--primary-color);line-height:.9}.close-button.svelte-bzne2i{position:absolute;right:1.5vw;top:50%;transform:translateY(-50%);width:2.6vh;height:2.6vh;background-color:var(--secondary-color);border:2px solid var(--primary-color);;;font-size:1.5vh;color:var(--primary-color);;;display:flex;align-items:center;justify-content:center;cursor:pointer;outline:none;padding:0}.window-content.svelte-bzne2i{display:flex;flex-direction:row;flex-grow:1;border:2px solid var(--primary-color);;;border-top:none}.content-area.svelte-bzne2i{width:92%;overflow-y:auto;height:100%}.scrollbar-container.svelte-bzne2i{width:8%;height:100%;display:flex;justify-content:center;align-items:center}",
  map: null
};
const AppWindow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { title = "Window" } = $$props;
  let { position = { x: 0, y: 0 } } = $$props;
  let { onClose } = $$props;
  let { dimensions = { width: 80, height: 78 } } = $$props;
  let { showScrollbar = true } = $$props;
  let contentElement;
  let appWindow;
  let windowState = {};
  const unsubscribe = windowStore.subscribe((state) => {
    windowState = state.windowStates.find((w) => w.id === id) || {};
  });
  onDestroy(() => {
    if (unsubscribe)
      unsubscribe();
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0)
    $$bindings.onClose(onClose);
  if ($$props.dimensions === void 0 && $$bindings.dimensions && dimensions !== void 0)
    $$bindings.dimensions(dimensions);
  if ($$props.showScrollbar === void 0 && $$bindings.showScrollbar && showScrollbar !== void 0)
    $$bindings.showScrollbar(showScrollbar);
  $$result.css.add(css$7);
  return ` <div class="${"app-window " + escape(windowState.isActive ? "active" : "", true) + " svelte-bzne2i"}" style="${"top: " + escape(windowState.position?.y || position.y, true) + "vh; left: " + escape(windowState.position?.x || position.x, true) + "vw; width: " + escape(dimensions.width, true) + "%; height: " + escape(dimensions.height, true) + "vh; z-index: " + escape(windowState.zIndex || 1, true) + ";"}"${add_attribute("this", appWindow, 0)}> <div class="title-bar svelte-bzne2i"><div class="lines-container svelte-bzne2i" data-svelte-h="svelte-124ty4m"><svg width="100%" height="60%" viewBox="0 0 100 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="lines-svg svelte-bzne2i"><line x1="0" y1="2" x2="100%" y2="2" stroke="var(--primary-color)" stroke-width="1.5"></line><line x1="0" y1="6" x2="100%" y2="6" stroke="var(--primary-color)" stroke-width="1.5"></line><line x1="0" y1="10" x2="100%" y2="10" stroke="var(--primary-color)" stroke-width="1.5"></line><line x1="0" y1="14" x2="100%" y2="14" stroke="var(--primary-color)" stroke-width="1.5"></line><line x1="0" y1="18" x2="100%" y2="18" stroke="var(--primary-color)" stroke-width="1.5"></line><line x1="0" y1="22" x2="100%" y2="22" stroke="var(--primary-color)" stroke-width="1.5"></line></svg></div> <div class="title-text svelte-bzne2i">${escape(title)}</div> <button class="close-button svelte-bzne2i"></button></div> <div class="window-content svelte-bzne2i"${add_attribute("this", contentElement, 0)}><div class="content-area svelte-bzne2i">${slots.default ? slots.default({}) : ``}</div> <div class="scrollbar-container svelte-bzne2i">${``}</div></div> </div>`;
});
function atkinsonDither(imageData, primaryColor, secondaryColor) {
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
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
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  const matrix2 = [
    [0, 0, 1 / 8, 1 / 8],
    [1 / 8, 1 / 8, 1 / 8, 0],
    [0, 1 / 8, 0, 0]
  ];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldPixel = data[idx];
      const isDark = oldPixel < 128;
      const newColor = isDark ? darkColor : lightColor;
      data[idx] = newColor[0];
      data[idx + 1] = newColor[1];
      data[idx + 2] = newColor[2];
      const newPixel = isDark ? 0 : 255;
      const error = (oldPixel - newPixel) / 8;
      for (let i = 0; i < matrix2.length; i++) {
        for (let j = 0; j < matrix2[i].length; j++) {
          if (matrix2[i][j] === 0)
            continue;
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
async function applyDitheringToImage(originalUrl, primaryColor, secondaryColor, shouldDither = true, targetSize = null) {
  const proxiedUrl = `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
  try {
    const img = await loadImage(proxiedUrl);
    if (!shouldDither)
      return proxiedUrl;
    const canvas = document.createElement("canvas");
    if (targetSize) {
      canvas.width = targetSize;
      canvas.height = targetSize;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const ditheredData = atkinsonDither(imageData, primaryColor, secondaryColor);
    ctx.putImageData(ditheredData, 0, 0);
    return canvas.toDataURL();
  } catch (error) {
    console.error("Error in applyDitheringToImage:", error);
    throw error;
  }
}
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}
const css$6 = {
  code: ".artist-button.svelte-id0zin.svelte-id0zin,.artist-button-empty.svelte-id0zin.svelte-id0zin{border:2px solid var(--primary-color);border-radius:.8rem;height:calc(80% / 9);display:flex;align-items:center;justify-content:left;text-align:left;padding:2%}.artist-button.svelte-id0zin.svelte-id0zin{cursor:pointer}.artist-button.svelte-id0zin.svelte-id0zin:hover{background-color:var(--primary-color)}.artist-button.svelte-id0zin:hover span.svelte-id0zin{color:var(--secondary-color)}.artist-placeholder-image.svelte-id0zin.svelte-id0zin{height:calc(100%);aspect-ratio:1/1;background-size:2px 2px;background-image:linear-gradient(45deg, var(--primary-color), 25%, transparent 25%, transparent 75%, var(--primary-color) 75%, var(--primary-color)),\r\n            linear-gradient(45deg, var(--primary-color) 25%, var(--secondary-color), 25%, var(--secondary-color) 75%, var(--primary-color) 75%, var(--primary-color));border-radius:35%;margin-right:10px}.image-container.svelte-id0zin.svelte-id0zin{height:100%;aspect-ratio:1/1;margin-right:10px;position:relative}.artist-image.svelte-id0zin.svelte-id0zin{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:25%;object-fit:cover}.loading-placeholder.svelte-id0zin.svelte-id0zin{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:25%;background-color:var(--primary-color);opacity:0.2;animation:svelte-id0zin-pulse 1.5s infinite}.artist-placeholder-text.svelte-id0zin.svelte-id0zin{width:calc(70% );height:calc(50% );background-size:2px 2px;background-image:linear-gradient(45deg, var(--primary-color), 25%, transparent 25%, transparent 75%, var(--primary-color) 75%, var(--primary-color)),\r\n            linear-gradient(45deg, var(--primary-color) 25%, var(--secondary-color), 25%, var(--secondary-color) 75%, var(--primary-color) 75%, var(--primary-color));border-radius:.5em}span.svelte-id0zin.svelte-id0zin{color:var(--primary-color);font-size:2.3vh;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;max-width:100%}@keyframes svelte-id0zin-pulse{0%{opacity:0.2}50%{opacity:0.3}100%{opacity:0.2}}",
  map: null
};
const ArtistButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $ditherImages, $$unsubscribe_ditherImages;
  let $imageColors, $$unsubscribe_imageColors;
  $$unsubscribe_ditherImages = subscribe(ditherImages, (value) => $ditherImages = value);
  $$unsubscribe_imageColors = subscribe(imageColors, (value) => $imageColors = value);
  let { name } = $$props;
  let { imageUrl } = $$props;
  let ditheredImageUrl = "";
  let isLoading = true;
  let currentImageUrl = "";
  async function processDithering() {
    if (!imageUrl || imageUrl === "/default-image.svg") {
      isLoading = false;
      ditheredImageUrl = "";
      return;
    }
    if (currentImageUrl !== imageUrl) {
      isLoading = true;
      ditheredImageUrl = "";
      currentImageUrl = imageUrl;
    }
    try {
      console.log("Applying dithering to image:", imageUrl, $imageColors.primary, $imageColors.secondary, $ditherImages, 200);
      ditheredImageUrl = $ditherImages ? await applyDitheringToImage(imageUrl, $imageColors.primary, $imageColors.secondary, $ditherImages, 200) : imageUrl;
    } catch (error) {
      console.error("Error processing image:", error);
      ditheredImageUrl = imageUrl;
    } finally {
      isLoading = false;
    }
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.imageUrl === void 0 && $$bindings.imageUrl && imageUrl !== void 0)
    $$bindings.imageUrl(imageUrl);
  $$result.css.add(css$6);
  {
    if (imageUrl && imageUrl !== "/default-image.svg") {
      processDithering();
    }
  }
  {
    if ($ditherImages !== void 0 && imageUrl && imageUrl !== "/default-image.svg") {
      processDithering();
    }
  }
  $$unsubscribe_ditherImages();
  $$unsubscribe_imageColors();
  return `${name ? ` <div class="artist-button svelte-id0zin" role="button" aria-label="Artist Button"><div class="image-container svelte-id0zin">${isLoading || !ditheredImageUrl ? `<div class="loading-placeholder svelte-id0zin"></div>` : `<img${add_attribute("src", ditheredImageUrl, 0)}${add_attribute("alt", "", 0)} class="artist-image svelte-id0zin">`}</div> <span class="svelte-id0zin">${escape(name)}</span></div>` : `<div class="artist-button-empty svelte-id0zin" data-svelte-h="svelte-1timspn"><div class="artist-placeholder-image svelte-id0zin"></div> <div class="artist-placeholder-text svelte-id0zin"></div></div>`}`;
});
const css$5 = {
  code: '.svelte-1wjzcmo{box-sizing:border-box;--sidebar-width:21%}.appContainer.svelte-1wjzcmo{display:flex;flex-direction:column;height:100%;width:100%}.mainSection.svelte-1wjzcmo{display:flex;height:87%;width:100%;flex-direction:column}.contentLayout.svelte-1wjzcmo{display:flex;flex-direction:row;height:100%}.loadingAnimationContainer.svelte-1wjzcmo{display:flex;justify-content:center;align-items:center;height:100%}.headerRow.svelte-1wjzcmo{display:flex;flex-direction:row;justify-content:left;align-items:center;height:13%}.sidebarTitle.svelte-1wjzcmo{width:var(--sidebar-width);display:flex;justify-content:center;align-items:center;padding-left:1%;color:var(--primary-color)}.currentArtist.svelte-1wjzcmo{font-family:"Geneva", sans-serif;line-height:150%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:fit-content;min-width:0;font-size:3vh;font-weight:600;color:var(--primary-color)}.currentArtistContainer.svelte-1wjzcmo{display:flex;flex-direction:row;align-items:center;padding-left:3%;gap:.5em;font-size:2vh;max-width:60%}.musicIcon.svelte-1wjzcmo{height:2.4vh;width:2.6vh;margin:0 .7%}.sidebar.svelte-1wjzcmo{width:var(--sidebar-width);height:100%;display:flex;flex-direction:column}.artistList.svelte-1wjzcmo{flex-grow:1;display:flex;flex-direction:column;padding:0 6% 0 10%;justify-content:space-between}.mainContent.svelte-1wjzcmo{width:80%;height:100%}.lyricsContainer.svelte-1wjzcmo{border:2px solid var(--primary-color);background-color:var(--secondary-color);height:100%;border-radius:.2em}.inputContainer.svelte-1wjzcmo{display:flex;justify-content:center;width:100%;height:8%;position:relative;margin:3% 0}.inputLabel.svelte-1wjzcmo{flex:0 0 17%;display:flex;justify-content:center;align-items:center;font-family:"Geneva", sans-serif;font-size:3vh;color:var(--primary-color)}.inputField.svelte-1wjzcmo{flex:0 0 83%;white-space:pre-wrap;padding:.5%;padding-left:5px;letter-spacing:-.05em;font-family:"Geneva", sans-serif;font-size:2.5vh;line-height:130%;font-weight:400;border:2px solid var(--primary-color);background-color:var(--secondary-color);height:100%;color:var(--primary-color)}.inputChar.svelte-1wjzcmo{display:inline-block;font-family:"Geneva", sans-serif;font-size:1.3em;font-weight:200;color:var(--primary-color)}.cursor.svelte-1wjzcmo{display:inline-block;width:2.5px;line-height:80%;height:65%;margin-left:-4px;position:absolute;top:16%;background-color:currentColor;animation:svelte-1wjzcmo-blink-animation 1s steps(1) infinite;color:var(--primary-color)}.hiddenInput.svelte-1wjzcmo{position:absolute;top:0;left:0;opacity:0;height:0;width:0;pointer-events:none}.loadingAnimation{transform:scale(3)}h3.svelte-1wjzcmo{display:flex;justify-content:end;line-height:110%;text-align:center;font-size:2.5vh}@keyframes svelte-1wjzcmo-blink-animation{50%{opacity:0}}',
  map: null
};
const TypingTest = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fullArtistList;
  let $recentArtists, $$unsubscribe_recentArtists;
  let $themeColors, $$unsubscribe_themeColors;
  $$unsubscribe_recentArtists = subscribe(recentArtists, (value) => $recentArtists = value);
  $$unsubscribe_themeColors = subscribe(themeColors, (value) => $themeColors = value);
  let artistInput = "";
  let inputElement;
  let displayedArtist = "Artist";
  $$result.css.add(css$5);
  fullArtistList = [
    ...$recentArtists,
    ...Array(7 - $recentArtists.length).fill({
      name: null,
      imageUrl: null,
      artistId: null
    })
  ];
  $$unsubscribe_recentArtists();
  $$unsubscribe_themeColors();
  return ` <div class="appContainer svelte-1wjzcmo"><div class="mainSection svelte-1wjzcmo"><div class="headerRow svelte-1wjzcmo"><div class="sidebarTitle svelte-1wjzcmo" data-svelte-h="svelte-15japan"><h3 class="svelte-1wjzcmo">Recently Played</h3></div> <div class="currentArtistContainer svelte-1wjzcmo"><div class="currentArtist svelte-1wjzcmo">${escape(displayedArtist)}</div></div> <svg class="musicIcon svelte-1wjzcmo" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6779 0.220394C18.4735 0.0457943 18.2035 -0.0307252 17.9372 0.0112826L6.29208 1.84998C5.84528 1.92052 5.51616 2.30568 5.51616 2.75804V6.43547V12.258H3.67743C1.6497 12.2581 0 13.7703 0 15.629C0 17.4878 1.6497 19 3.67743 19C5.70516 19 7.35485 17.4878 7.35485 15.629V13.1774V7.22104L17.1613 5.67265V10.7258H15.3226C13.2949 10.7258 11.6452 12.238 11.6452 14.0968C11.6452 15.9555 13.2949 17.4678 15.3226 17.4678C17.3503 17.4678 19 15.9555 19 14.0968V11.6451V4.59678V0.919349C19 0.650492 18.8822 0.395068 18.6779 0.220394Z"${add_attribute("fill", $themeColors.primary, 0)} class="svelte-1wjzcmo"></path></svg></div> <div class="contentLayout svelte-1wjzcmo"><div class="sidebar svelte-1wjzcmo"><div class="artistList svelte-1wjzcmo">${each(fullArtistList, (artist, index) => {
    return `${validate_component(ArtistButton, "ArtistButton").$$render(
      $$result,
      {
        name: artist.name,
        imageUrl: artist.imageUrl || "/default-image.svg"
      },
      {},
      {}
    )}`;
  })}</div></div> <div class="mainContent svelte-1wjzcmo"><div class="lyricsContainer svelte-1wjzcmo">${`${``}`}</div></div></div></div> <div class="inputContainer svelte-1wjzcmo" role="button" tabindex="0"><div class="inputLabel svelte-1wjzcmo" data-svelte-h="svelte-1v4jet">Artist Name:</div> <div class="inputField svelte-1wjzcmo">${each(artistInput.split(""), (char, i) => {
    return `<span class="inputChar svelte-1wjzcmo">${escape(char)}</span>`;
  })} ${``}</div> <input class="hiddenInput svelte-1wjzcmo" type="text" aria-hidden="true"${add_attribute("this", inputElement, 0)}${add_attribute("value", artistInput, 0)}></div> </div>`;
});
const css$4 = {
  code: ".icon.svelte-e60iny{height:1.4em;width:1.4em;margin-right:1%}.hotbar.svelte-e60iny{position:fixed;top:0;left:0;width:100vw;height:2em;background-color:var(--secondary-color);z-index:2;font-size:1em;font-weight:500;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;padding-left:1.5%;display:flex;justify-content:left;align-items:center;color:var(--primary-color);;;border-bottom:2px solid var(--primary-color);;}.background.svelte-e60iny{position:fixed;top:0;left:0;width:100vw;height:100vh;background-size:4px 4px;background-image:linear-gradient(45deg, var(--background-primary-color), 25%, transparent 25%, transparent 75%, var(--background-primary-color) 75%, var(--background-primary-color)),\r\n            linear-gradient(45deg, var(--background-primary-color) 25%, var(--background-secondary-color), 25%, var(--background-secondary-color) 75%, var(--background-primary-color) 75%, var(--background-primary-color));background-position:0 0, 10px 10px;z-index:-2}",
  map: null
};
const Background = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $themeColors, $$unsubscribe_themeColors;
  $$unsubscribe_themeColors = subscribe(themeColors, (value) => $themeColors = value);
  $$result.css.add(css$4);
  $$unsubscribe_themeColors();
  return `<div class="hotbar svelte-e60iny"><svg class="icon svelte-e60iny" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8474 4.1044C12.7506 4.02169 12.6227 3.98545 12.4966 4.00534L6.98046 4.87631C6.76882 4.90972 6.61292 5.09216 6.61292 5.30644V7.04838V9.80644H5.74194C4.78144 9.80646 4 10.5228 4 11.4032C4 12.2837 4.78144 13 5.74194 13C6.70244 13 7.48388 12.2837 7.48388 11.4032V10.2419V7.42049L12.129 6.68705V9.08064H11.2581C10.2976 9.08064 9.51614 9.79695 9.51614 10.6774C9.51614 11.5579 10.2976 12.2742 11.2581 12.2742C12.2186 12.2742 13 11.5579 13 10.6774V9.51612V6.17742V4.43548C13 4.30813 12.9442 4.18714 12.8474 4.1044Z"${add_attribute("fill", $themeColors.primary, 0)}></path><rect x="0.5" y="0.5" width="16" height="16" rx="3.5"${add_attribute("stroke", $themeColors.primary, 0)}></rect></svg>
    lyrictype.com</div> <div class="background svelte-e60iny"></div>`;
});
const css$3 = {
  code: ".desktop-icon.svelte-1ma8ynb{position:absolute;display:flex;flex-direction:column;align-items:center;cursor:pointer}.icon-label.svelte-1ma8ynb{background-color:var(--secondary-color);color:var(--primary-color);;;text-align:center;padding:2px 3px;margin-top:8px;border:1px solid var(--primary-color);;;width:max-content;font-size:1em}",
  map: null
};
const DesktopIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "" } = $$props;
  let { onClick } = $$props;
  let { position = { x: 0, y: 0 } } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  $$result.css.add(css$3);
  return `   <div class="desktop-icon svelte-1ma8ynb" style="${"top: " + escape(position.y, true) + "vh; left: " + escape(position.x, true) + "vw;"}"><div class="icon-svg">${slots.icon ? slots.icon({ class: "icon-svg" }) : ``} </div> <div class="icon-label svelte-1ma8ynb">${escape(label)}</div> </div>`;
});
const css$2 = {
  code: ".page-container.svelte-1b8d077{font-size:.9em;height:80%;width:90%;display:flex;flex-direction:column;padding:0.5em;margin:0.5em;white-space:nowrap}.system-info.svelte-1b8d077{text-indent:5em}.body.svelte-1b8d077{text-indent:3em;text-align:left;width:60%}.registered-info.svelte-1b8d077{text-indent:5em;text-decoration:underline}.items.svelte-1b8d077{margin-bottom:0.5rem;width:45%}.computer-info.svelte-1b8d077{text-indent:5em}.logo-container.svelte-1b8d077{justify-content:left;width:40%;padding-top:3%}.logo.svelte-1b8d077{width:80%;padding:1em}.logo-and-body-container.svelte-1b8d077{display:flex;justify-content:space-between}",
  map: null
};
const AboutDisplay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="page-container svelte-1b8d077" data-svelte-h="svelte-cx45xz"><div class="logo-and-body-container svelte-1b8d077"><div class="logo-container svelte-1b8d077"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 769.44 626.47" class="logo svelte-1b8d077"><defs><style>.cls-1, .cls-2 {
                                stroke-width: 0px;
                            }
                            
                            .cls-2 {
                                fill: none;
                            }</style></defs><path class="cls-2" d="M549.27,360.72c-.18-.05-.28-.08-.28-.08v.03c.09.02.18.04.28.05Z"></path><polygon class="cls-2" points="548.99 360.65 505.74 500.25 549 360.67 548.99 360.65"></polygon><path class="cls-2" d="M604.33,546.68l43.1-141.27c-.58-.48-1.18-.94-1.76-1.41-28.59-22.37-91.78-41.87-96.39-43.27-.09-.02-.18-.04-.27-.05l-43.26,139.58c25.67,6.26,93.87,41.33,98.59,46.43Z"></path><polygon class="cls-2" points="549 360.63 548.99 360.65 549 360.67 549 360.63"></polygon><path class="cls-2" d="M608.73,166.66l-45.78,148.51,41.41,12.78c15.89,4.8,34.75,15.65,57.05,33.1l44.84-146.08c-28.04-23.88-61.54-40.47-97.52-48.31h0Z"></path><polygon class="cls-1" points="99.34 258.9 130.85 251.92 140.17 222.88 140.14 222.89 108.23 231.05 99.34 258.9"></polygon><polygon class="cls-1" points="181.94 171.78 223.93 166.15 234.54 132.41 192.05 138.72 181.94 171.78"></polygon><polygon class="cls-1" points="119.49 192.72 151.6 185.65 160.89 156.65 128.39 164.87 119.49 192.72"></polygon><polygon class="cls-1" points="139.38 128.74 171.4 121.71 180.19 92.79 148.25 100.92 139.38 128.74"></polygon><polygon class="cls-1" points="218.3 406.24 218.33 406.2 165.6 414.01 151.5 459.53 203.66 452.41 218.3 406.24"></polygon><polygon class="cls-1" points="298.34 145.92 298.39 145.92 298.36 145.89 298.34 145.92"></polygon><polygon class="cls-1" points="153.87 392.68 111.45 399.02 101.39 432.64 143.95 426.96 153.87 392.68"></polygon><polygon class="cls-1" points="285.41 422.79 285.38 422.79 222.67 433.85 206.97 486.45 269.18 475.44 285.41 422.79"></polygon><polygon class="cls-1" points="79.27 325.64 110.72 318.7 119.57 290.34 87.51 297.92 79.27 325.64"></polygon><polygon class="cls-1" points="231.53 199.22 284.23 191.41 298.34 145.92 246.17 153.14 231.53 199.22"></polygon><polygon class="cls-1" points="153.88 392.65 153.87 392.68 153.88 392.68 153.88 392.65"></polygon><polygon class="cls-1" points="99.61 353.59 99.6 353.63 99.62 353.63 99.61 353.59"></polygon><polygon class="cls-1" points="59.4 389.52 90.89 382.54 99.6 353.63 67.71 361.79 59.4 389.52"></polygon><polygon class="cls-1" points="304.68 358.97 242.48 369.98 226.77 422.55 288.89 411.68 304.68 358.97"></polygon><polygon class="cls-1" points="258.34 276.04 205.57 282.69 191.55 329.4 244.32 321.62 258.34 276.04"></polygon><polygon class="cls-1" points="349.59 214.62 365.42 162.64 303.75 172.97 287.45 225.63 349.59 214.62"></polygon><polygon class="cls-1" points="141.28 301.49 183.9 296.48 194.45 262 194.44 261.97 151.88 268.32 141.28 301.49"></polygon><polygon class="cls-1" points="321.96 548.58 462.53 95.98 395.74 106.29 255.35 561.18 321.96 548.58"></polygon><polygon class="cls-1" points="279.06 209.81 226.32 216.52 212.33 263.16 264.96 255.33 279.06 209.81"></polygon><polygon class="cls-1" points="258.34 276.04 258.34 276.04 258.38 276.04 258.34 276.04"></polygon><polygon class="cls-1" points="215.07 195.18 172.1 202.07 162.02 235.19 204.63 230.01 215.07 195.18"></polygon><polygon class="cls-1" points="325.32 292.17 325.32 292.17 263.74 303.12 246.84 355.84 309.61 344.77 325.32 292.17"></polygon><polygon class="cls-1" points="346.09 225.8 346.07 225.87 346.09 225.87 346.09 225.8"></polygon><polygon class="cls-1" points="346.07 225.87 283.95 236.8 268.11 288.78 329.75 278.46 346.07 225.87"></polygon><polygon class="cls-1" points="120.67 368.82 163.82 363.08 173.78 328.8 131.22 335.08 120.67 368.82"></polygon><polygon class="cls-1" points="237.66 342.98 184.9 350.15 170.38 396.92 223.62 389.09 237.66 342.98"></polygon><polygon class="cls-1" points="50.76 328.26 26.35 331.8 20.21 351.29 44.06 348.51 50.76 328.26"></polygon><polygon class="cls-1" points="46.96 428.02 39.17 455.17 70.73 448.69 79.52 419.73 46.96 428.02"></polygon><polygon class="cls-1" points="90.77 465.21 80.65 498.94 123.13 493.17 133.7 458.9 90.77 465.21"></polygon><polygon class="cls-1" points="197.61 472.43 145.46 479.62 130.84 525.66 183.57 518.55 197.61 472.43"></polygon><polygon class="cls-1" points="50.76 328.26 50.76 328.26 50.76 328.26 50.76 328.26"></polygon><polygon class="cls-1" points="0 417.54 23.83 414.63 29.92 393.97 5.63 398.03 0 417.54"></polygon><polygon class="cls-1" points="29.92 393.97 29.96 393.97 29.92 393.97 29.92 393.97"></polygon><polygon class="cls-1" points="203.09 499.97 186.73 552.07 248.36 541.68 264.62 489.6 203.09 499.97"></polygon><path class="cls-1" d="M635.92,110.03c-10.64,7.76-19.81,16.1-30.72,23.54-3.41-11.78-7.29-23.11-9.99-33.1-33.06-5.61-75.3-8.16-111.25-4.96-3.64.34-7.35.69-11.05,1.11l-19.67,63.82c46.17-5.35,83.91-4.95,113.13,2.07l-44.89,144.84c-32.64-7.11-70.48-8.23-112.74-2.58l-14.31,46.93c37.92-4.74,66.11-5.25,102.57.7l34.2-18.08s12.43,25.47,12.6,25.53c35.89,6.15,73.74,22.83,101.95,45.74.59.48,1.18.93,1.76,1.41l-43.99,146.93c-30.86-21.38-66.52-43.05-119.99-55.75l3.87,58.04c45.42,12.27,82.14,35.48,125.26,70.23l43.86-21.14,54.73-176.11-21.88-32.73,34.47-10.61,45.61-144.32-20.33-72.69c-35.14-27.93-69.13-46.69-113.2-58.84ZM661.5,362.65c-20.83-23.28-97.43-49.98-98.47-45.87l45.78-148.51h0c35.99,7.84,69.48,24.43,97.52,48.31l-44.84,146.08Z"></path><polygon class="cls-1" points="69.97 264.55 46.25 267.88 40 286.85 63.77 284.08 69.97 264.55"></polygon><path class="cls-1" d="M483.87,93.91s0,0,0,0c0,0,.02,0,.03,0h-.03Z"></path><polygon class="cls-1" points="130.68 66.92 106.95 70.83 100.75 90.39 124.63 87.58 130.68 66.92"></polygon><polygon class="cls-1" points="305.02 124.6 319.03 78.49 266.88 85.71 252.33 132.51 305.02 124.6"></polygon><polygon class="cls-1" points="319.03 78.49 319.03 78.49 319.06 78.48 319.03 78.49"></polygon><polygon class="cls-1" points="369.75 147.81 386.15 95.77 324.51 106.09 308.17 158.76 369.75 147.81"></polygon><polygon class="cls-1" points="441.71 161.79 441.7 161.83 441.71 161.82 441.71 161.79"></polygon><polygon class="cls-1" points="91.2 196.99 91.19 197.03 91.2 197.03 91.2 196.99"></polygon><polygon class="cls-1" points="110.85 130.79 110.85 130.76 87.1 134.2 81.43 153.68 104.76 151.49 110.85 130.79"></polygon><polygon class="cls-1" points="91.19 197.03 66.79 200.5 60.65 219.96 84.51 217.71 91.19 197.03"></polygon><polygon class="cls-1" points="244.64 99.22 255.24 65.54 212.74 71.82 202.66 104.94 244.64 99.22"></polygon><polygon class="cls-1" points="201 26.42 200.96 26.42 168.94 34.02 160.64 61.82 192.12 54.84 201 26.42"></polygon><polygon class="cls-1" points="151.94 0 127.06 4.62 120.88 23.61 145.19 20.76 151.94 0"></polygon></svg></div> <div class="body svelte-1b8d077"><div class="items svelte-1b8d077"><p>System:</p> <div class="system-info svelte-1b8d077"><p>PixlgardenOS</p> <p>Version 0.0.1</p> <br></div> <p>Registered Users:</p> <div class="registered-info svelte-1b8d077">/* Registered Users*/
                        <p>kitgore</p> <p>noschwa</p> <p>elleneg</p> <br></div> <p>Computer:</p> <div class="computer-info svelte-1b8d077"><p>LYRICALGANGSTER-42069</p> <p>Locked-In Core(R) 68000</p> <p>1.0GHz, 16MB of RAM</p> <p>128MB HDD</p> <br></div></div></div></div> </div>`;
});
const css$1 = {
  code: ".checkbox.svelte-1dgv98f.svelte-1dgv98f{position:relative;display:inline-block;cursor:pointer}input.svelte-1dgv98f.svelte-1dgv98f{position:absolute;opacity:0;cursor:pointer}.box.svelte-1dgv98f.svelte-1dgv98f{width:24px;height:24px;border:2px solid var(--primary-color);border-radius:4px;display:grid;place-items:center}.checkmark.svelte-1dgv98f.svelte-1dgv98f{width:16px;height:16px}input:checked+.box.svelte-1dgv98f .checkmark.svelte-1dgv98f{color:white}",
  map: null
};
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $themeColors, $$unsubscribe_themeColors;
  $$unsubscribe_themeColors = subscribe(themeColors, (value) => $themeColors = value);
  let { checked = false } = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  $$result.css.add(css$1);
  $$unsubscribe_themeColors();
  return `<label class="checkbox svelte-1dgv98f"><input type="checkbox" class="svelte-1dgv98f"${add_attribute("checked", checked, 1)}> <div class="box svelte-1dgv98f">${checked ? `<svg viewBox="0 0 13 12" class="checkmark svelte-1dgv98f" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 0V3.5216L4.06094 12H3.60973H3.15853L0 8.99369V5.36216L3.66794 8.83457L13 0Z"${add_attribute("fill", $themeColors.primary, 0)}></path></svg>` : ``}</div> </label>`;
});
const css = {
  code: `.svelte-1pp02q0{font-family:"Geneva", sans-serif;color:var(--primary-color)}.settingInline.svelte-1pp02q0{display:flex;align-items:center}h3.svelte-1pp02q0{margin:2% 0%;font-family:'SysFont', sans-serif;font-size:1.6em;padding-right:5%;font-weight:100}.container.svelte-1pp02q0{padding:0% 4%}.theme-selector.svelte-1pp02q0{display:flex;align-items:stretch;gap:0}.theme-display.svelte-1pp02q0{border:2px solid var(--primary-color);min-width:8em;text-align:center;font-size:1.3em;font-family:'Geneva', sans-serif;display:flex;align-items:center;justify-content:center}.arrow-btn.svelte-1pp02q0{font-family:'SysFont', sans-serif;background-color:var(--secondary-color);color:var(--primary-color);border:2px solid var(--primary-color);border-radius:5px;font-size:1.5em;width:max-content;text-align:center;cursor:pointer;height:100%;display:flex;align-items:center}.arrow-btn.svelte-1pp02q0:first-child{border-right:none;border-radius:4px 0 0 4px}.arrow-btn.svelte-1pp02q0:last-child{border-left:none;border-radius:0 4px 4px 0}.arrow-btn.svelte-1pp02q0:hover{background-color:var(--secondary-color);color:var(--primary-color)}`,
  map: null
};
const SettingsDisplay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentTheme;
  let $cookiesAccepted, $$unsubscribe_cookiesAccepted;
  let $ditherImages, $$unsubscribe_ditherImages;
  $$unsubscribe_currentTheme = subscribe(currentTheme, (value) => value);
  $$unsubscribe_cookiesAccepted = subscribe(cookiesAccepted, (value) => $cookiesAccepted = value);
  $$unsubscribe_ditherImages = subscribe(ditherImages, (value) => $ditherImages = value);
  let themeIndex = 0;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container svelte-1pp02q0"><div class="settingInline svelte-1pp02q0"><h3 class="svelte-1pp02q0" data-svelte-h="svelte-9a5e0r">Remember Preferences<br class="svelte-1pp02q0">(Cookies)</h3> ${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      { checked: $cookiesAccepted },
      {
        checked: ($$value) => {
          $cookiesAccepted = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="settingInline svelte-1pp02q0"><h3 class="svelte-1pp02q0" data-svelte-h="svelte-5zcaol">Theme</h3> <div class="theme-selector svelte-1pp02q0"><button class="arrow-btn svelte-1pp02q0" data-svelte-h="svelte-qlpqjh">&lt;</button> <div class="theme-display svelte-1pp02q0">${escape(themeChoices[themeIndex].name)}</div> <button class="arrow-btn svelte-1pp02q0" data-svelte-h="svelte-1wpjlcv">&gt;</button></div></div> <div class="settingInline svelte-1pp02q0"><h3 class="svelte-1pp02q0" data-svelte-h="svelte-1ci9mwq">Recolor Images</h3> ${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      { checked: $ditherImages },
      {
        checked: ($$value) => {
          $ditherImages = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <br class="svelte-1pp02q0"> <br class="svelte-1pp02q0"> </div>`;
  } while (!$$settled);
  $$unsubscribe_currentTheme();
  $$unsubscribe_cookiesAccepted();
  $$unsubscribe_ditherImages();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $themeColors, $$unsubscribe_themeColors;
  let $backgroundColors, $$unsubscribe_backgroundColors;
  $$unsubscribe_themeColors = subscribe(themeColors, (value) => $themeColors = value);
  $$unsubscribe_backgroundColors = subscribe(backgroundColors, (value) => $backgroundColors = value);
  windowStore.subscribe((state) => {
    state.windowStates;
  });
  let windows = [
    {
      id: "typingTestWindow",
      title: "Media Typer",
      isOpen: false,
      showScrollbar: true,
      component: TypingTest,
      position: { x: 10, y: 10 },
      dimensions: { width: 80, height: 80 }
    },
    {
      id: "aboutDisplayWindow",
      title: "System Info",
      isOpen: false,
      showScrollbar: false,
      component: AboutDisplay,
      position: { x: 30, y: 10 },
      dimensions: { width: 37, height: 85 }
    },
    {
      id: "settingsWindow",
      title: "Settings",
      showScrollbar: false,
      isOpen: false,
      component: SettingsDisplay,
      position: { x: 10, y: 10 },
      dimensions: { width: 37, height: 78 }
    }
  ];
  function closeWindow(id) {
    if (!id)
      return;
    const index = windows.findIndex((w) => w.id === id);
    if (index !== -1) {
      windows[index].isOpen = false;
      windows = windows.slice();
      windowActions.removeWindow(id);
    }
  }
  function openWindow(id) {
    if (!id)
      return;
    const window2 = windows.find((w) => w.id === id);
    if (window2 && !window2.isOpen) {
      window2.isOpen = true;
      windows = windows.slice();
      windowActions.addWindow({
        id: window2.id,
        title: window2.title,
        position: window2.position,
        dimensions: window2.dimensions
      });
    } else if (window2) {
      windowActions.activateWindow(id);
    }
  }
  $$unsubscribe_themeColors();
  $$unsubscribe_backgroundColors();
  return `<head data-svelte-h="svelte-txxrmg"><title>LyricType</title></head>  <div${add_styles({
    "--primary-color": $themeColors.primary,
    "--secondary-color": $themeColors.secondary,
    "--background-primary-color": $backgroundColors.primary,
    "--background-secondary-color": $backgroundColors.secondary
  })}>${validate_component(Background, "Background").$$render($$result, {}, {}, {})} ${validate_component(DesktopIcon, "DesktopIcon").$$render(
    $$result,
    {
      label: "Media Typer",
      onClick: () => openWindow("typingTestWindow"),
      position: { x: 90.5, y: 8 }
    },
    {},
    {
      icon: () => {
        return `<svg slot="icon" width="80" height="80" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="0.5" width="35" height="39" rx="1.5"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></rect><rect x="5" y="4.5" width="27" height="20" rx="1.5"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></rect><rect x="3" y="39.5" width="31" height="6"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></rect><line x1="18.5" y1="31.5" x2="30.5" y2="31.5"${add_attribute("stroke", $themeColors.primary, 0)}></line><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H8.5V8H7.5V7ZM7.5 10H8.5V11H7.5V10ZM8.5 13H7.5V14H8.5V13ZM7.5 16H8.5V17H7.5V16ZM8.5 19H7.5V20H8.5V19ZM10.5 7H11.5V8H10.5V7ZM11.5 10H10.5V11H11.5V10ZM10.5 13H11.5V14H10.5V13ZM11.5 16H10.5V17H11.5V16ZM10.5 19H11.5V20H10.5V19ZM14.5 7H13.5V8H14.5V7ZM13.5 10H14.5V11H13.5V10ZM14.5 19H13.5V20H14.5V19ZM16.5 7H17.5V8H16.5V7ZM17.5 10H16.5V11H17.5V10ZM19.5 7H20.5V8H19.5V7ZM23.5 7H22.5V8H23.5V7Z"${add_attribute("fill", $themeColors.primary, 0)}></path></svg>`;
      }
    }
  )} ${validate_component(DesktopIcon, "DesktopIcon").$$render(
    $$result,
    {
      label: "System Info",
      onClick: () => openWindow("aboutDisplayWindow"),
      position: { x: 90.5, y: 28 }
    },
    {},
    {
      icon: () => {
        return `<svg slot="icon" width="80" height="80" viewBox="0 0 54 56" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_116_279)"><path d="M26.4524 1L5.5 23.2581L27.8492 47L48.8016 24.7419L26.4524 1Z"${add_attribute("fill", $themeColors.secondary, 0)}></path><path d="M26.4524 1L5.5 23.2581L27.8492 47L48.8016 24.7419L26.4524 1Z"${add_attribute("stroke", $themeColors.primary, 0)}></path></g><path d="M38.3254 21.7742L45.3095 29.1935V38.0968H42.5158V36.6129H32.0397L30.6428 35.129H29.246L25.0555 30.6774V29.1935L26.4524 27.7097V26.2258L30.6428 21.7742H38.3254Z"${add_attribute("fill", $themeColors.secondary, 0)}></path><path d="M26.4524 27.7097V26.2258L30.6428 21.7742H38.3254L45.3095 29.1935V38.0968H42.5158V36.6129H32.0397L30.6428 35.129H29.246L25.0555 30.6774V29.1935M26.4524 27.7097H29.246M26.4524 27.7097L25.0555 29.1935M29.246 27.7097L30.6428 26.2258H32.0397L33.4365 27.7097V29.1935M29.246 27.7097V29.1935L30.6428 30.6774H32.0397L33.4365 29.1935M33.4365 29.1935H39.7222M25.0555 29.1935H20.8651"${add_attribute("stroke", $themeColors.primary, 0)}></path><rect x="45.3095" y="28.4516" width="4.19048" height="11.871"${add_attribute("fill", $themeColors.primary, 0)}></rect><rect x="29.246" y="28.4516" width="4.19048" height="1.48387"${add_attribute("fill", $themeColors.primary, 0)}></rect><defs><filter id="filter0_d_116_279" x="0.813293" y="0.270531" width="52.675" height="55.4589" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_116_279"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_116_279" result="shape"></feBlend></filter></defs></svg>`;
      }
    }
  )} ${validate_component(DesktopIcon, "DesktopIcon").$$render(
    $$result,
    {
      label: "Settings",
      onClick: () => openWindow("settingsWindow"),
      position: { x: 91, y: 48 }
    },
    {},
    {
      icon: () => {
        return `<svg slot="icon" width="80" height="80" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 46.3475H44C45.1046 46.3475 46 45.4521 46 44.3475V8.23414C46 7.77527 45.8422 7.33034 45.5531 6.97401L41.3062 1.73986C40.9264 1.27182 40.3559 1 39.7531 1H3C1.89543 1 1 1.89543 1 3V44.3475C1 45.4521 1.89543 46.3475 3 46.3475Z"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></path><path d="M7.0882 47V29.7518C7.0882 28.6472 7.98363 27.7518 9.0882 27.7518H38.4411C39.5457 27.7518 40.4411 28.6472 40.4411 29.7518V47"${add_attribute("stroke", $themeColors.primary, 0)}></path><path d="M34.6176 1L34.6176 14.0071C34.6176 15.1117 33.7222 16.0071 32.6176 16.0071L13.3235 16.0071C12.2189 16.0071 11.3235 15.1117 11.3235 14.0071L11.3235 1.00001"${add_attribute("stroke", $themeColors.primary, 0)}></path><rect x="24" y="4.10992" width="5.88235" height="8.78723" rx="1.5"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></rect></svg>`;
      }
    }
  )} ${validate_component(DesktopIcon, "DesktopIcon").$$render(
    $$result,
    {
      label: "Trash",
      position: { x: 91, y: 68 }
    },
    {},
    {
      icon: () => {
        return `<svg slot="icon" width="80" height="80" viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12.5" y="0.5" width="8" height="1.93617"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></rect><rect x="0.5" y="2.45744" width="31" height="2.91489"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></rect><path d="M1.5 5.39362H30.5V44C30.5 44.8284 29.8284 45.5 29 45.5H3C2.17157 45.5 1.5 44.8284 1.5 44V5.39362Z"${add_attribute("fill", $themeColors.secondary, 0)}${add_attribute("stroke", $themeColors.primary, 0)}></path><path d="M6 9.78723L6.89893 10.667C7.28334 11.0433 7.5 11.5585 7.5 12.0964V39.0445C7.5 39.7203 7.1588 40.3503 6.5929 40.7195L6 41.1064"${add_attribute("stroke", $themeColors.primary, 0)}></path><path d="M12 9.78723L12.8989 10.667C13.2833 11.0433 13.5 11.5585 13.5 12.0964V39.0445C13.5 39.7203 13.1588 40.3503 12.5929 40.7195L12 41.1064"${add_attribute("stroke", $themeColors.primary, 0)}></path><path d="M18 9.78723L18.8989 10.667C19.2833 11.0433 19.5 11.5585 19.5 12.0964V39.0445C19.5 39.7203 19.1588 40.3503 18.5929 40.7195L18 41.1064"${add_attribute("stroke", $themeColors.primary, 0)}></path><path d="M24 9.78723L24.8989 10.667C25.2833 11.0433 25.5 11.5585 25.5 12.0964V39.0445C25.5 39.7203 25.1588 40.3503 24.5929 40.7195L24 41.1064"${add_attribute("stroke", $themeColors.primary, 0)}></path></svg>`;
      }
    }
  )} ${each(windows.filter((w) => w.isOpen), (window2) => {
    return `${validate_component(AppWindow, "AppWindow").$$render(
      $$result,
      {
        id: window2.id,
        title: window2.title,
        showScrollbar: window2.showScrollbar,
        position: window2.position,
        dimensions: window2.dimensions,
        onClose: () => closeWindow(window2.id)
      },
      {},
      {
        default: () => {
          return `${validate_component(window2.component || missing_component, "svelte:component").$$render($$result, {}, {}, {})} `;
        }
      }
    )}`;
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5bNqkJWD.js.map
