import * as actions from '../actionTypes';

const initialState = {
	token: localStorage.getItem('acme_token'),
	isLoading: false,
	isAuth: null,
	user: null,
	error: null,
};

const errorMessage = (origin, status, message) => {
	switch (origin) {
		case 'LOGIN_FAILED':
			if (status === 401) return 'Invalid username and/or password';
			return message;
		case 'UPDATE_USER_FAILED':
			if (status === 401) return 'You seem to not be authorized';
			else if (status === 403) return 'This is forbidden';
			return message;
		default:
			return message;
	}
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.REQUEST:
			return { ...state, isLoading: true };
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				token: action.payload,
				isAuth: true,
				isLoading: false,
				error: null,
			};
		case actions.GET_USER:
			return {
				...state,
				isAuth: true,
				isLoading: false,
				error: null,
				user: action.payload,
			};
		case actions.LOGIN_FAILED:
			const {
				message,
				response: { status },
			} = action.payload;

			return {
				...state,
				isLoading: false,
				error: {
					msg: errorMessage('LOGIN_FAILED', status, message),
					code: status,
				},
			};

		case actions.UPDATE_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: {
					msg: errorMessage(
						'UPDATE_USER_FAILED',
						action.payload.message,
						action.payload.response.status
					),
					code: status,
				},
			};

		case actions.UPDATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				user: {
					...state.user,
					...action.payload,
				},
			};

		case actions.NO_CHANGE_IN_ACCOUNT:
		case actions.NO_ACTIVE_USER:
			return { ...state, isLoading: false, error: null };

		case actions.LOGOUT:
			localStorage.removeItem('acme_token');
			return {
				...state,
				token: null,
				isLoading: false,
				isAuth: false,
				user: null,
				error: null,
			};

		default:
			return state;
	}
};

export default AuthReducer;
