import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AUTH_ACTION } from '../../actions/authActions';

import { useHistory } from 'react-router-dom';

import { Socials } from '../Socials';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

const Login = () => {
	const [credentials, setCredentials] = useState({
		emailAddress: '',
		password: '',
	});
	const { error } = useSelector(state => state.auth);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(AUTH_ACTION(credentials, history));
	};

	const handleChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (error) setErrorMessage(error.msg);
	}, [error]);

	return (
		<div className={classes.root}>
			<Grid className={classes.centerGrid} container spacing={4}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h2" align="center">
						ACME GAMES
					</Typography>
					<Socials />
				</Grid>
				<Grid className={classes.gridItem} item xs={12} sm={6}>
					<Paper className={classes.paper} elevation={0} align="center">
						<AccountCircle className={classes.largeIcon} />
						<form onSubmit={handleSubmit}>
							<div className={classes.errorDiv}>
								{errorMessage && (
									<Typography variant="body2" className={classes.errorMessage}>
										{errorMessage}
									</Typography>
								)}
							</div>
							<TextField
								className={classes.formFields}
								name="emailAddress"
								type="email"
								label="Email"
								fullWidth
								required
								onChange={handleChange}
								data-testid="email-input"
							/>
							<TextField
								className={classes.formFields}
								name="password"
								type="password"
								label="Password"
								fullWidth
								required
								onChange={handleChange}
								data-testid="password-input"
							/>
							<div className={classes.formFields}>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									type="submit"
									data-testid="login-button"
								>
									Login
								</Button>
							</div>
						</form>
						<div className={classes.extras}>
							<Typography className={classes.underline} variant="subtitle2">
								Create Account
							</Typography>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	formFields: {
		marginTop: theme.spacing(3),
	},
	paper: {
		padding: theme.spacing(4),
		width: '70%',
	},
	centerGrid: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '80vh',
	},
	gridItem: {
		display: 'flex',
		justifyContent: 'center',
	},
	extras: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(3),
	},
	underline: {
		'&:hover': {
			textDecoration: 'underline',
			cursor: 'pointer',
		},
	},
	largeIcon: {
		top: '-2rem',
		position: 'relative',
		transform: 'scale(5)',
		opacity: 0.3,
	},
	errorMessage: {
		color: theme.palette.error.main,
		position: 'relative',
		top: '1rem',
	},
}));
