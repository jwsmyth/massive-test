import * as actions from '../actionTypes';
import * as api from '../apiEndpoints';
import { tokenHeader } from './helpers';

export const GET_ALL_USERS_ACTION = () => async (dispatch, getState) => {
	dispatch({
		type: actions.REQUEST_ALL_USERS,
	});

	try {
		const { data } = await api.getAllUsers(tokenHeader(getState));

		dispatch({
			type: actions.GET_ALL_USERS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actions.GET_ALL_USERS_FAILED,
			payload: error,
		});
	}
};

export const ADMIN_UPDATE_USER_ACTION = updatedUser => async (
	dispatch,
	getState
) => {
	dispatch({
		type: actions.ADMIN_REQUEST,
	});

	try {
		const response = await api.adminUpdateUser(
			updatedUser.userAccountId,
			updatedUser,
			tokenHeader(getState)
		);

		const data = JSON.parse(response.config.data);
		dispatch({
			type: actions.ADMIN_UPDATE_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actions.ADMIN_UPDATE_USER_FAILED,
			payload: error,
		});
	}
};

export const ADMIN_GET_USER_GAMES_ACTION = accountId => async (
	dispatch,
	getState
) => {
	dispatch({
		type: actions.ADMIN_REQUEST,
	});

	try {
		const { data } = await api.adminGetUserGames(
			accountId,
			tokenHeader(getState)
		);

		dispatch({
			type: actions.ADMIN_GET_USER_GAMES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actions.ADMIN_GET_USER_GAMES_FAILED,
			payload: error,
		});
	}
};

export const ADMIN_GRANT_OWNERSHIP_ACTION = (accountId, gameId) => async (
	dispatch,
	getState
) => {
	dispatch({
		type: actions.ADMIN_REQUEST,
	});

	try {
		await api.adminGrantOwnership(accountId, gameId, tokenHeader(getState));
		dispatch({ type: actions.ADMIN_GRANT_OWNERSHIP_SUCCESS, payload: gameId });
	} catch (error) {
		dispatch({ type: actions.ADMIN_GRANT_OWNERSHIP_FAILED, payload: error });
	}

	dispatch(ADMIN_GET_USER_GAMES_ACTION(accountId));
};

export const ADMIN_REVOKE_OWNERSHIP_ACTION = (accountId, gameId) => async (
	dispatch,
	getState
) => {
	dispatch({ type: actions.ADMIN_REQUEST });

	try {
		await api.adminRevokeOwnership(accountId, gameId, tokenHeader(getState));
		dispatch({ type: actions.ADMIN_REVOKE_OWNERSHIP_SUCCESS, payload: gameId });
	} catch (error) {
		dispatch({ type: actions.ADMIN_REVOKE_OWNERSHIP_FAILED, payload: error });
	}
	dispatch(ADMIN_GET_USER_GAMES_ACTION(accountId));
};
