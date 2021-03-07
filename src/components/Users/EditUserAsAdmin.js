import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import UserInformation from './UserInformation';
import { ADMIN_UPDATE_USER_ACTION } from '../../actions/usersActions';
import AdminPrivilegesRequired from '../AdminPrivilegesRequired';
import UserLibrary from './UserLibrary';
import { ADMIN_GET_ALL_GAMES_ACTION } from '../../actions/gameActions';

const EditUserAsAdmin = ({ location }) => {
	const initialState = location.state.user;
	const currentAuth = location.state.currentAuth;
	const usersState = useSelector(state => state.users);
	const allGames = useSelector(state => state.games.allGames);
	const [updatedUser, setUpdatedUser] = useState(initialState);
	const [previousUser, setPreviousUser] = useState(null);
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();

	const handleChange = e => {
		setUpdatedUser({
			...updatedUser,
			[e.target.name]:
				e.target.name === 'isAdmin' ? e.target.checked : e.target.value,
		});
	};

	const handleUpdateUser = e => {
		e.preventDefault();
		dispatch(ADMIN_UPDATE_USER_ACTION(updatedUser));
		setEdit(prevEdit => !prevEdit);
	};

	const handleCancel = () => {
		setUpdatedUser(previousUser);
		setEdit(false);
	};

	const toggleEdit = e => {
		e.preventDefault();
		setPreviousUser(updatedUser);
		setEdit(true);
	};

	useEffect(() => {
		if (!allGames) dispatch(ADMIN_GET_ALL_GAMES_ACTION());
	}, [allGames, dispatch]);

	return (
		<Container maxWidth="sm">
			{!currentAuth.user.isAdmin ? (
				<AdminPrivilegesRequired />
			) : (
				<>
					<UserInformation
						handleUpdateUser={handleUpdateUser}
						updatedUser={updatedUser}
						toggleEdit={toggleEdit}
						handleCancel={handleCancel}
						handleChange={handleChange}
						edit={edit}
					/>
					<UserLibrary
						usersState={usersState}
						accountId={initialState.userAccountId}
						allGames={allGames}
					/>
				</>
			)}
		</Container>
	);
};

export default EditUserAsAdmin;
