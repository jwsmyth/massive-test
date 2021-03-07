import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Login
export const auth = credentials => API.post('/auth', credentials);
// GET user info
export const getAccountInfo = config => API.get('/user/me', config);
// PUT user info
export const updateAccountInfo = (updatedUser, config) =>
	API.put('/user/me', updatedUser, config);
// GET owned games
export const getOwnedGames = config => API.get('/user/me/game', config);
// PUT redeem key, need to explicitly set empty body with axios put request
export const redeemKey = (key, config) =>
	API.put(`/user/me/key/${key}`, {}, config);

/***** REQUIRES ADMIN *****/
// GET all games
export const getAllGames = config => API.get('/game', config);
// GET all users
export const getAllUsers = config => API.get('/user', config);
// PUT user info
export const adminUpdateUser = (accountId, updatedUser, config) =>
	API.put(`/user/${accountId}`, updatedUser, config);
// GET users games
export const adminGetUserGames = (accountId, config) =>
	API.get(`/user/${accountId}/game`, config);
// PUT grant ownership
export const adminGrantOwnership = (accountId, gameId, config) =>
	API.put(`/user/${accountId}/game/${gameId}`, {}, config);
// DELETE revoke ownership
export const adminRevokeOwnership = (accountId, gameId, config) =>
	API.delete(`/user/${accountId}/game/${gameId}`, config);
