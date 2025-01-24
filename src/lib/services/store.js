import { writable } from 'svelte/store'

export let recentArtists = writable([]);

const defaultTheme = {
    primary: '#000000',
    secondary: '#ffffff',
    name: "Default"
}

const inverseTheme = {
    primary: '#f0f6f0',
    secondary: '#222323',
    name: "Inverse"
};

const blue = {
    primary: '#051b2c',
    secondary: '#8bc8fe',
    name: "Blue"
};

const paperback = {
    primary: '#382b26',
    secondary: '#b8c2b9',
    name: "Paperback"
};

const whiteGreen = {
    primary: '#004c3d',
    secondary: '#ffeaf9',
    name: "White Green"
};

const casio = {
    primary: '#000000',
    secondary: '#83b07e',
    name: "Casio"
};

const gatoRoboto = {
    primary: '#323c39',
    secondary: '#d3c9a1',
    name: "Gato Roboto"
};

const peachy = {
    primary: '#242234',
    secondary: '#facab8',
    name: "Peachy"
};

const purp = {
    primary: '#17141c',
    secondary: '#a692b0',
    name: "Purp"
};

const redWhite = {
    primary: '#c62b69',
    secondary: '#edf4ff',
    name: "Red White"
};

const endgame = {
    primary: '#1b1233',
    secondary: '#dcf29d',
    name: "Endgame"
};

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
    name: "Blueberry"
}

const matrix = {
    primary: '#26c30f',
    secondary: '#000000',
    name: "Matrix"
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

export const themeChoices = [ defaultTheme, inverseTheme, blue, paperback, whiteGreen, casio, gatoRoboto, peachy, purp, redWhite, endgame, milkcarton, 
    puffs, creme, blueberry, matrix, coffee, strawberryMilk, redrum ];

export const currentTheme = writable(defaultTheme);

export const themeColors = writable({
    primary: currentTheme.primary, // var(--primary-color);
    secondary: currentTheme.secondary, // white
});

export const ditherImages = writable(true);

currentTheme.subscribe(theme => {
    themeColors.set({
        primary: theme.primary,
        secondary: theme.secondary
    });
});