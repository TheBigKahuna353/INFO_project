import create from 'zustand';


const getLocalLoggedIn = () => JSON.parse(localStorage.getItem('loggedIn'));
const getLocalAuthToken = () => JSON.parse(localStorage.getItem('auth_token'));
const getLocalCategory = () => JSON.parse(localStorage.getItem('category'));

const setLocalLoggedIn = (value) => localStorage.setItem('loggedIn', JSON.stringify(value));
const setLocalAuthToken = (value) => localStorage.setItem('auth_token', JSON.stringify(value));
const setLocalCategory = (value) => localStorage.setItem('category', JSON.stringify(value));

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
    }
}));

export default useAllStore;