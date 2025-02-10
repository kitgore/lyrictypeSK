import { writable, derived } from 'svelte/store'
import Cookies from 'js-cookie';

export const cookiesAccepted = writable(Cookies.get('cookiesAccepted') === 'true' || false)

const defaultCorrection = {
    correct: "#368e5e",
    incorrect: "#bd5454"
}

const defaultTheme = {
    primary: '#000000',
    secondary: '#ffffff',
    name: "Default"
}

const darkTheme = {
    primary: '#f0f6f0',
    secondary: '#222323',
    name: "Dark",
    monoBackground: '#222323',
    inverseImage: true
};

const blue = {
    primary: '#051b2c',
    secondary: '#8bc8fe',
    name: "Blue"
};

const paperback = {
    primary: '#382b26',
    secondary: '#b8c2b9',
    name: "Paperback",
    correct: "#507354"
};

const whiteGreen = {
    primary: '#004c3d',
    secondary: '#ffeaf9',
    name: "Bamboo"
};

const casio = {
    primary: '#000000',
    secondary: '#83b07e',
    name: "Casio",
    correct: "#497444",
    incorrect: "#b06464"
};

const gatoRoboto = {
    primary: '#323c39',
    secondary: '#d3c9a1',
    name: "Hazy"
};

const peachy = {
    primary: '#242234',
    secondary: '#facab8',
    name: "Peachy",
    incorrect: "#fa7373"
};

const purp = {
    primary: '#17141c',
    secondary: '#a692b0',
    name: "Purp",
    correct: "#5c8961",
};

const redWhite = {
    primary: '#c62b69',
    secondary: '#edf4ff',
    name: "Hibiscus"
};

const endgame = {
    primary: '#1b1233',
    secondary: '#dcf29d',
    name: "Pistachio"
};

const matcha = {
    primary: '#2b4022',
    secondary: '#7da580',
    name: "Matcha"
}

const milkcarton = {
    primary: '#5b88e2',
    secondary: '#f5f4e9',
    name: "Milk Carton"
};

const puffs = {
    primary: '#6f4d3d',
    secondary: '#cb9867',
    name: "Puffs"
}

const creme = {
    primary: '#2e3037',
    secondary: '#ebe5ce',
    name: "Creme"
}

const blueberry = {
    primary: '#40318e',
    secondary: '#88d7de',
    name: "Blueberry",
    correct: "#912c95",
    incorrect: "#d64c89"
}

const matrix = {
    primary: '#26c30f',
    secondary: '#000000',
    name: "Matrix",
    monoBackground: '#000000',
    inverseImage: true,
    correct: '#d1ffcd',
    incorrect: '#da3333'
}

const coffee = {
    primary: '#2d2020',
    secondary: '#eacda8',
    name: "Coffee"
}

const strawberryMilk = {
    primary: '#1c221c',
    secondary: '#e0c9e0',
    name: "Strawberry Milk"
}

const redrum = {
    primary: '#2b0000',
    secondary: '#cc0e13',
    name: "Redrum"
}

export const themeChoices = [ defaultTheme, darkTheme, creme, strawberryMilk, whiteGreen, casio, blue, paperback,  gatoRoboto, peachy, purp, redWhite, endgame, milkcarton, 
    puffs,  blueberry, matrix, coffee,  redrum, matcha ];

export const currentTheme = writable(defaultTheme);
export const themeColors = writable({
    primary: currentTheme.primary,
    secondary: currentTheme.secondary
});
export const backgroundColors = writable({
    primary: currentTheme.primary,
    secondary: currentTheme.secondary
});
export const imageColors = writable({
    primary: currentTheme.primary,
    secondary: currentTheme.secondary
});

export const correctionColors = writable(defaultCorrection);

export const ditherImages = writable(true);
export const recentArtists = writable([]);


currentTheme.subscribe(theme => {
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
    correctionColors.set({
        correct: theme.correct ? theme.correct : defaultCorrection.correct,
        incorrect: theme.incorrect ? theme.incorrect : defaultCorrection.incorrect
    });
});

cookiesAccepted.subscribe(accepted => {
    if (accepted) {
        Cookies.set('cookiesAccepted', 'true');
        
        const savedTheme = Cookies.get('currentTheme');
        const savedColors = Cookies.get('themeColors');
        const savedBackground = Cookies.get('backgroundColor');
        const savedDither = Cookies.get('ditherImages');
        const savedArtists = Cookies.get('recentArtists');

        if (savedTheme) currentTheme.set(JSON.parse(savedTheme));
        if (savedColors) themeColors.set(JSON.parse(savedColors));
        if (savedBackground) backgroundColors.set(JSON.parse(savedBackground));
        if (savedDither) ditherImages.set(JSON.parse(savedDither));
        if (savedArtists) recentArtists.set(JSON.parse(savedArtists));

        currentTheme.subscribe(value => {
            Cookies.set('currentTheme', JSON.stringify(value));
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
            correctionColors.set({
                correct: value.correct ? value.correct : defaultCorrection.correct,
                incorrect: value.incorrect ? value.incorrect : defaultCorrection.incorrect
            });
        });

        themeColors.subscribe(value => {
            Cookies.set('themeColors', JSON.stringify(value));
        });

        backgroundColors.subscribe(value => {
            Cookies.set('backgroundColor', JSON.stringify(value));
        });

        ditherImages.subscribe(value => {
            Cookies.set('ditherImages', JSON.stringify(value));
        });
        imageColors.subscribe(value => {
            Cookies.set('imageColors', JSON.stringify(value));
        });

        if (!savedArtists) {
            let currentArtists;
            recentArtists.subscribe(value => {
                currentArtists = value;
            })();  // Immediately unsubscribe after getting value
            Cookies.set('recentArtists', JSON.stringify(currentArtists));
        }

        recentArtists.subscribe(value => {
            Cookies.set('recentArtists', JSON.stringify(value));
        });
    } else {
        Cookies.remove('currentTheme');
        Cookies.remove('themeColors');
        Cookies.remove('backgroundColor');
        Cookies.remove('ditherImages');
        Cookies.remove('recentArtists');
        Cookies.remove('cookiesAccepted');
    }
});

const initialState = {
    activeWindowId: null,
    windowStates: [],
    nextZIndex: 1
};

export const windowStore = writable(initialState);

export const windowActions = {
    activateWindow: (id) => {
        if (!id) return;
        
        windowStore.update(state => {
            const newNextZIndex = state.nextZIndex + 1;
            return {
                ...state,
                activeWindowId: id,
                nextZIndex: newNextZIndex,
                windowStates: state.windowStates.map(window => ({
                    ...window,
                    zIndex: window.id === id ? newNextZIndex : window.zIndex,
                    isActive: window.id === id
                }))
            };
        });
    },

    addWindow: (windowData) => {
        if (!windowData.id) return;
        
        windowStore.update(state => {
            const existingWindow = state.windowStates.find(w => w.id === windowData.id);
            
            if (existingWindow) {
                return {
                    ...state,
                    activeWindowId: windowData.id,
                    windowStates: state.windowStates.map(w => ({
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
                windowStates: state.windowStates
                    .map(w => ({...w, isActive: false}))
                    .concat(newWindow)
            };
        });
    },

    removeWindow: (id) => {
        if (!id) return;
        
        windowStore.update(state => {
            const filteredWindows = state.windowStates.filter(w => w.id !== id);
            const lastWindow = filteredWindows[filteredWindows.length - 1];

            return {
                activeWindowId: lastWindow?.id ?? null,
                nextZIndex: state.nextZIndex,
                windowStates: filteredWindows.map(w => ({
                    ...w,
                    isActive: w.id === lastWindow?.id
                }))
            };
        });
    },

    updatePosition: (id, newPosition) => {
        if (!id) return;
        
        windowStore.update(state => ({
            ...state,
            windowStates: state.windowStates.map(window =>
                window.id === id 
                    ? { ...window, position: newPosition }
                    : window
            )
        }));
    }
};

export const tabIndexStore = derived(windowStore, ($windowStore) => {
    // Sort windows by z-index to determine tab order
    const sortedWindows = [...$windowStore.windowStates].sort((a, b) => a.zIndex - b.zIndex);
    
    // Create a map of window IDs to their base tab index
    const tabIndexMap = new Map();
    let baseTabIndex = 1; // Start from 1 since 0 is typically for main navigation
    
    sortedWindows.forEach(window => {
        tabIndexMap.set(window.id, baseTabIndex);
        // Increment by 100 to leave room for elements within each window
        baseTabIndex += 100;
    });
    
    return tabIndexMap;
});

export function getElementTabIndex(windowId, elementIndex) {
    let tabIndexMap;
    
    // Subscribe to the store to get current tab index map
    tabIndexStore.subscribe(value => {
        tabIndexMap = value;
    })();
    
    if (!tabIndexMap.has(windowId)) {
        return -1; // Window not found
    }
    
    const baseTabIndex = tabIndexMap.get(windowId);
    return baseTabIndex + elementIndex;
}