import { useState } from 'react';
import {
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NotLoggedIn from '../NotLoggedIn';
import { UPDATE_USER_ACTION } from '../../actions/authActions';

const UserAccount = () => {
	const initialState = useSelector(state => state.auth.user);
	const [updatedUser, setUpdatedUser] = useState(initialState);
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();

	const classes = useStyles();

	const handleChange = e => {
		setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
	};

	const handleUpdateUser = e => {
		e.preventDefault();
		dispatch(UPDATE_USER_ACTION(updatedUser));
		setEdit(prevEdit => !prevEdit);
	};

	const handleCancel = () => {
		setUpdatedUser(initialState);
		setEdit(false);
	};

	return (
		<Container maxWidth="sm">
			{!updatedUser ? (
				<NotLoggedIn />
			) : (
				<>
					<form onSubmit={handleUpdateUser}>
						<Typography
							variant="h6"
							className={classes.centeredText}
							gutterBottom
						>
							MY ACCOUNT
						</Typography>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} className={classes.accountItem}>
								<TextField
									label="First name"
									name="firstName"
									variant="outlined"
									fullWidth
									disabled={!edit}
									value={updatedUser.firstName}
									onChange={handleChange}
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.accountItem}>
								<TextField
									label="Last name"
									name="lastName"
									variant="outlined"
									fullWidth
									disabled={!edit}
									value={updatedUser.lastName}
									onChange={handleChange}
									required
								/>
							</Grid>
							<Grid item xs={12} className={classes.accountItem}>
								<TextField
									type="email"
									label="Email"
									name="emailAddress"
									variant="outlined"
									fullWidth
									disabled={!edit}
									value={updatedUser.emailAddress}
									onChange={handleChange}
									required
								/>
							</Grid>
							<Grid item xs={12} className={classes.accountItem}>
								<TextField
									type="password"
									name="password"
									label="Password"
									variant="outlined"
									fullWidth
									disabled={!edit}
									value={updatedUser.password}
									onChange={handleChange}
									required
								/>
							</Grid>
						</Grid>
						<div className={classes.btns}>
							{edit && (
								<Button
									variant="outlined"
									color="primary"
									onClick={handleCancel}
								>
									Cancel
								</Button>
							)}
							<div className={classes.editButton}>
								{!edit ? (
									<Button
										variant="contained"
										color="primary"
										onClick={e => {
											e.preventDefault();
											setEdit(prevEdit => !prevEdit);
										}}
									>
										Edit
									</Button>
								) : (
									<Button type="submit" variant="contained" color="primary">
										Save changes
									</Button>
								)}
							</div>
						</div>
					</form>
				</>
			)}
		</Container>
	);
};

export default UserAccount;

const useStyles = makeStyles(theme => ({
	centeredText: {
		textAlign: 'center',
		marginBottom: theme.spacing(3),
	},
	btns: {
		display: 'flex',
		marginTop: theme.spacing(3),
	},
	editButton: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'flex-end',
	},
}));
