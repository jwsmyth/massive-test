import * as actions from '../actionTypes';
import * as api from '../apiEndpoints';

import { tokenHeader, checkShallowEquality } from './helpers';

export const AUTH_ACTION = (credentials, history) => async dispatch => {
	dispatch({
		type: actions.REQUEST,
	});

	try {
		const { data } = await api.auth(credentials);

		dispatch({
			type: actions.LOGIN_SUCCESS,
			payload: data.token,
		});

		localStorage.setItem('acme_token', data.token);
		history.push('/');

		dispatch(GET_USER_ACTION(history));
	} catch (error) {
		dispatch({ type: actions.LOGIN_FAILED, payload: error });
	}
};

export const GET_USER_ACTION = () => async (dispatch, getState) => {
	dispatch({
		type: actions.REQUEST,
	});

	try {
		const { data } = await api.getAccountInfo(tokenHeader(getState));

		dispatch({
			type: actions.GET_USER,
			payload: data,
		});
	} catch (error) {
		dispatch({ type: actions.NO_ACTIVE_USER, payload: error });
	}
};

export const LOGOUT_ACTION = history => async dispatch => {
	dispatch({ type: actions.REQUEST });
	dispatch({ type: actions.EMPTY_LIBRARY });
	dispatch({ type: actions.CLEAR_USERS });
	dispatch({ type: actions.CLEAR_OWNERSHIP });
	dispatch({ type: actions.LOGOUT });
	history.push('/login');
};

export const UPDATE_USER_ACTION = updatedUser => async (dispatch, getState) => {
	dispatch({
		type: actions.REQUEST,
	});

	// Check shallow equality if something has changed from previous state
	if (!checkShallowEquality(getState().auth.user, updatedUser)) {
		try {
			// Check if first or last name has been changed to also changed full name
			if (
				getState().auth.user.firstName !== updatedUser.firstName ||
				getState().auth.user.lastName !== updatedUser.lastName
			) {
				const newFullName = [updatedUser.firstName, updatedUser.lastName].join(
					' '
				);
				updatedUser = { ...updatedUser, fullName: newFullName };
			}
			const response = await api.updateAccountInfo(
				updatedUser,
				tokenHeader(getState)
			);

			const data = JSON.parse(response.config.data);

			dispatch({
				type: actions.UPDATE_USER_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: actions.UPDATE_USER_FAILED,
				payload: error,
			});
		}
	} else {
		dispatch({
			type: actions.NO_CHANGE_IN_ACCOUNT,
		});
	}
};
