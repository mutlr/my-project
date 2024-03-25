export let userToken = '';
export const baseUrl = 'http://localhost:3001';

export const setToken = (token: string) => {
    userToken = `Bearer ${token}`;
};