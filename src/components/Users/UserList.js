import { useState, useEffect } from 'react';
import User from './User';
import TableHeaders from './TableHeaders';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Input,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TablePagination,
	Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { GET_ALL_USERS_ACTION } from '../../actions/usersActions';
import { SpinnerBackdrop } from '../../utils';
import AdminPrivilegesRequired from '../AdminPrivilegesRequired';
import { ADMIN_GET_ALL_GAMES_ACTION } from '../../actions/gameActions';

const columns = [
	{ id: 'fullName', name: 'Full name', minWidth: '25%' },
	{ id: 'emailAddress', name: 'Email', minWidth: '35%' },
	{ id: 'dateOfBirth', name: 'Date of Birth', minWidth: '30%' },
	{ id: 'isAdmin', name: 'Admin', minWidth: '10%' },
];

const UserList = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState('');
	const currentAuth = useSelector(state => state.auth);
	const usersState = useSelector(state => state.users);
	const dispatch = useDispatch();
	const history = useHistory();

	const classes = useStyles();
	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = e => {
		setRowsPerPage(+e.target.value);
		setPage(0);
	};

	useEffect(() => {
		dispatch(GET_ALL_USERS_ACTION());
		dispatch(ADMIN_GET_ALL_GAMES_ACTION());
	}, [dispatch]);

	// Attach user to history
	const editUser = user => {
		history.push(`/edit-user/${user.userAccountId}`, {
			user,
			currentAuth,
		});
	};

	const filterOutMyself = accounts => {
		return accounts.filter(
			x => x.userAccountId !== currentAuth.user.userAccountId
		);
	};

	return (
		<>
			{usersState.isLoading && (
				<SpinnerBackdrop isLoading={usersState.isLoading} />
			)}
			{usersState && !usersState.error ? (
				<>
					<Grid
						container
						style={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<Grid item>
							<Typography variant="h6">USERS</Typography>
						</Grid>
						<Grid item>
							<Search style={{ verticalAlign: 'middle' }} />
							<Input
								placeholder="Search"
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Paper className={(classes.root, classes.onDesktop)}>
						<TableContainer className={classes.tableContainer}>
							<Table stickyHeader aria-label="sticky table">
								<TableHeaders columns={columns} />
								<TableBody>
									{usersState &&
										filterOutMyself(usersState.accounts)
											.filter(x => {
												return searchTerm
													? x.fullName
															.toLowerCase()
															.includes(searchTerm.toLowerCase())
													: x;
											})
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map(user => (
												<User
													user={user}
													columns={columns}
													key={user.userAccountId}
													editUser={editUser}
												/>
											))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							count={usersState.accounts.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Paper>
				</>
			) : (
				<AdminPrivilegesRequired />
			)}
		</>
	);
};

export default UserList;

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
	},
	tableContainer: {
		maxHeight: '60vh',
	},
}));
