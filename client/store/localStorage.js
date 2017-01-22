/* global localStorage */
const getLocalStore = () => {
    try {
        const serializedState = localStorage.getItem('favoritesFilms');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveStore = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('favoritesFilms', serializedState);
    } catch (err) {
        // Ignore
    }
};

export { getLocalStore, saveStore };
