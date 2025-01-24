import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        csrf: {
            checkOrigin: false, // You might need this for development
        }
    }
};

export default config;