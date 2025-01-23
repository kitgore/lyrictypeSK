import { writable } from 'svelte/store'

export let recentArtists = writable([]);

const inverseTheme = {
    primary: '#f0f6f0',
    secondary: '#222323',
};

const blue = {
    primary: '#051b2c',
    secondary: '#8bc8fe',
};

const paperback = {
    primary: '#382b26',
    secondary: '#b8c2b9',
};

const whiteGreen = {
    primary: '#004c3d',
    secondary: '#ffeaf9',
};

const casio = {
    primary: '#000000',
    secondary: '#83b07e',
};

const gatoRoboto = {
    primary: '#323c39',
    secondary: '#d3c9a1',
};

const peachy = {
    primary: '#242234',
    secondary: '#facab8',
};

const purp = {
    primary: '#17141c',
    secondary: '#a692b0',
};

const redWhite = {
    primary: '#c62b69',
    secondary: '#edf4ff',
};

const sunset = {
    primary: '#f44e38',
    secondary: '#1d0f44',
};

const endgame = {
    primary: '#1b1233',
    secondary: '#dcf29d',
};

const milkcarton = {
    primary: '#f5f4e9',
    secondary: '#5b88e2',
};

const puffs = {
    primary: '#6f4d3d',
    secondary: '#cb9867',
}

const theme = whiteGreen

export const themeColors = writable({
    primary: theme.primary, // var(--primary-color);
    secondary: theme.secondary, // white
});

