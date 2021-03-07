import * as actions from '../actionTypes';
import * as api from '../apiEndpoints';

import { tokenHeader } from './helpers';

export const GET_OWNED_GAMES_ACTION = (isKeyRedeemed = false) => async (
	dispatch,
	getState
) => {
	dispatch({
		type: actions.REQUEST_OWNED_GAMES,
	});

	try {
		const { data } = await api.getOwnedGames(tokenHeader(getState));

		dispatch({
			type: actions.GET_OWNED_GAMES_SUCCESS,
			payload: data,
		});

		// If user has redeemed, fetch latest game in library array after new it has been updated in state
		if (isKeyRedeemed) {
			dispatch(DISPLAY_REDEEMED_GAME_ACTION());
		}
	} catch (error) {
		dispatch({
			type: actions.GET_OWNED_GAMES_FAILED,
			payload: error,
		});
	}
};

export const REDEEM_KEY_ACTION = key => async (dispatch, getState) => {
	dispatch({
		type: actions.REQUEST_REDEEM_KEY,
	});

	try {
		await api.redeemKey(key, tokenHeader(getState));

		dispatch({
			type: actions.REDEEM_KEY_SUCCESS,
		});

		dispatch(GET_OWNED_GAMES_ACTION(true));
	} catch (error) {
		dispatch({
			type: actions.REDEEM_KEY_FAILED,
			payload: error,
		});
	}
};

export const DISPLAY_REDEEMED_GAME_ACTION = () => dispatch => {
	dispatch({
		type: actions.REQUEST_REDEEMED_GAME,
	});

	dispatch({
		type: actions.GET_REDEEMED_GAME,
	});
};

export const USER_IS_NOTIFIED_ACTION = () => async dispatch => {
	dispatch({
		type: actions.USER_IS_NOTIFIED,
	});
};

export const ADMIN_GET_ALL_GAMES_ACTION = () => async (dispatch, getState) => {
	dispatch({
		type: actions.REQUEST_ALL_GAMES,
	});

	try {
		const { data } = await api.getAllGames(tokenHeader(getState));

		dispatch({
			type: actions.ADMIN_GET_ALL_GAMES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actions.ADMIN_GET_ALL_GAMES_FAILED,
			payload: error,
		});
	}
};
