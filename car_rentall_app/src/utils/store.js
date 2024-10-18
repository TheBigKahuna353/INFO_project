import create from 'zustand';


const getLocalLoggedIn = () => localStorage.getItem('loggedIn');
const getLocalAuthToken = () => localStorage.getItem('auth_token');
const getLocalCategory = () => JSON.parse(localStorage.getItem('category'));
const getLocalDarkMode = () => localStorage.getItem('darkMode');

const setLocalLoggedIn = (value) => localStorage.setItem('loggedIn', value);
const setLocalAuthToken = (value) => localStorage.setItem('auth_token', value);
const setLocalCategory = (value) => localStorage.setItem('category', JSON.stringify(value));
const setLocalDarkMode = (value) => localStorage.setItem('darkMode', value);

const useAllStore = create((set) => ({
    loggedIn: getLocalLoggedIn() || false,
    setLoggedIn: (value) => {
        setLocalLoggedIn(value);
        set({loggedIn: value});
    },
    auth_token: getLocalAuthToken() || '',
    setAuthToken: (value) => {
        setLocalAuthToken(value);
        set({auth_token: value});
    },
    category: getLocalCategory() || '',
    setCategory: (value) => {
        setLocalCategory(value);
        set({category: value});
    },
    darkMode: getLocalDarkMode() || false,
    setDarkMode: (value) => {
        setLocalDarkMode(value);
        set({darkMode: value});
    }
}));

export default useAllStore;