import * as actions from '../actionTypes';

const initialState = {
	isLoading: false,
	library: null,
	redeemedLatest: null,
	error: null,
	notify: false,
	allGames: null,
};

const errorMessage = (origin, status, message) => {
	switch (origin) {
		case 'GET_OWNED_GAMES_FAILED':
			if (status === 401) return 'You are not authorized';
			return message;
		case 'REDEEM_KEY_FAILED':
			if (status === 400) return 'Key is not valid';
			else if (status === 401) return 'You are not authorized';
			else if (status === 409) return 'This key has already been redeemed';
			return message;
		default:
			return message;
	}
};

const GamesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.REQUEST_OWNED_GAMES:
		case actions.REQUEST_REDEEMED_GAME:
		case actions.REQUEST_REDEEM_KEY:
		case actions.REQUEST_ALL_GAMES:
			return { ...state, isLoading: true };
		case actions.GET_OWNED_GAMES_SUCCESS:
			return {
				...state,
				isLoading: false,
				library: action.payload,
				error: null,
			};
		case actions.EMPTY_LIBRARY:
			return {
				...state,
				isLoading: false,
				library: null,
				redeemedLatest: null,
				error: null,
			};
		case actions.GET_OWNED_GAMES_FAILED:
			return {
				...state,
				isLoading: false,
				error: {
					msg: errorMessage(
						'GET_OWNED_GAMES_FAILED',
						action.payload.response.status,
						action.payload.message
					),
					code: action.payload.response.status,
				},
			};

		case actions.REDEEM_KEY_FAILED:
			return {
				...state,
				isLoading: false,
				error: {
					msg: errorMessage(
						'REDEEM_KEY_FAILED',
						action.payload.response.status,
						action.payload.message
					),
					code: action.payload.response.status,
				},
			};
		case actions.REDEEM_KEY_SUCCESS:
		case actions.USER_IS_NOTIFIED:
			return { ...state, isLoading: false, notify: false };
		case actions.GET_REDEEMED_GAME:
			// Only return the last item added to library array
			const lastItem = state.library[state.library.length - 1];
			return {
				...state,
				isLoading: false,
				redeemedLatest: lastItem,
				notify: true,
			};
		case actions.ADMIN_GET_ALL_GAMES_SUCCESS:
			return {
				...state,
				isLoading: false,
				allGames: action.payload,
			};
		case actions.ADMIN_GET_ALL_GAMES_FAILED:
			return {
				...state,
				isLoading: false,
				allGames: null,
				error: errorMessage(
					'ADMIN_GET_ALL_GAMES_FAILED',
					action.payload.response.status,
					action.payload.message
				),
			};
		default:
			return state;
	}
};

export default GamesReducer;
