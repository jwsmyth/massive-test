import * as actions from '../actionTypes';

const initialState = {
	isLoading: false,
	error: null,
	accounts: [],
	ownership: [],
};

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.REQUEST_ALL_USERS:
		case actions.ADMIN_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case actions.GET_ALL_USERS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				accounts: [...action.payload],
			};
		case actions.GET_ALL_USERS_FAILED:
		case actions.ADMIN_UPDATE_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: {
					msg: action.payload.message,
					code: action.payload.response.status,
				},
			};
		case actions.ADMIN_UPDATE_USER_SUCCESS:
			const updatedAccount = action.payload;
			const newFullName =
				updatedAccount.firstName + ' ' + updatedAccount.lastName;
			return {
				...state,
				isLoading: false,
				error: null,
				accounts: state.accounts.map(account =>
					account.userAccountId === updatedAccount.userAccountId
						? { ...updatedAccount, fullName: newFullName }
						: account
				),
			};
		case actions.CLEAR_USERS:
		case actions.CLEAR_OWNERSHIP:
			return {
				...state,
				isLoading: false,
				error: false,
				accounts: [],
				ownership: [],
			};
		case actions.ADMIN_GET_USER_GAMES_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: false,
				ownership: action.payload,
			};
		case actions.ADMIN_GET_USER_GAMES_FAILED:
		case actions.ADMIN_GRANT_OWNERSHIP_FAILED:
		case actions.ADMIN_REVOKE_OWNERSHIP_FAILED:
			return {
				...state,
				isLoading: false,
				error: {
					msg: action.payload.message,
					code: action.payload,
				},
			};
		case actions.ADMIN_GRANT_OWNERSHIP_SUCCESS:
			const alreadyInLibrary = state.ownership.find(
				title => title.gameId === action.payload.gameId
			);
			if (alreadyInLibrary) {
				return {
					...state,
					error: null,
				};
			} else {
				return {
					...state,
					error: null,
					ownership: [...state.ownership, action.payload],
				};
			}
		case actions.ADMIN_REVOKE_OWNERSHIP_SUCCESS:
			return {
				...state,
				error: null,
				ownership: state.ownership.filter(
					title => title.userAccountId !== action.payload.userAccountId
				),
			};
		default:
			return state;
	}
};

export default UsersReducer;
