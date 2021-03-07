import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
	Grid,
	Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import {
	ADMIN_GET_USER_GAMES_ACTION,
	ADMIN_GRANT_OWNERSHIP_ACTION,
	ADMIN_REVOKE_OWNERSHIP_ACTION,
} from '../../actions/usersActions';
import { filterOwnedGames, SpinnerBackdrop } from '../../utils';

const UserLibrary = ({ usersState, accountId, allGames }) => {
	const [game, setGame] = useState('');
	const [store, setStore] = useState('');
	const [openGames, setOpenGames] = useState(false);
	const [openStore, setOpenStore] = useState(false);
	const [ownership, setOwnership] = useState(null);
	const [grantMessage, setGrantMessage] = useState('');
	const [revokeMessage, setRevokeMessage] = useState('');
	const dispatch = useDispatch();

	const classes = useStyles();

	const grantOwnership = store => {
		try {
			dispatch(ADMIN_GRANT_OWNERSHIP_ACTION(accountId, store));
			setStore('');
			setGrantMessage(
				<Alert variant="filled" severity="success">
					Ownership granted!
				</Alert>
			);
		} catch (error) {
			setGrantMessage(
				<Alert variant="filled" severity="error">
					Something went wrong...
				</Alert>
			);
		}
		setTimeout(() => {
			setGrantMessage('');
		}, 5000);
	};

	const revokeOwnership = game => {
		try {
			dispatch(ADMIN_REVOKE_OWNERSHIP_ACTION(accountId, game));
			setGame('');
			setRevokeMessage(
				<Alert variant="filled" severity="success">
					Ownership revoked!
				</Alert>
			);
		} catch (error) {
			setRevokeMessage(
				<Alert variant="filled" severity="error">
					Something went wrong...
				</Alert>
			);
		}
		setTimeout(() => {
			setRevokeMessage('');
		}, 5000);
	};

	useEffect(() => {
		dispatch(ADMIN_GET_USER_GAMES_ACTION(accountId));
	}, [dispatch, accountId]);

	useEffect(() => {
		setOwnership(usersState.ownership);
	}, [usersState.ownership]);

	return (
		<>
			{usersState.isLoading && (
				<SpinnerBackdrop isLoading={usersState.isLoading} />
			)}
			{ownership && (
				<>
					<Typography variant="h6" className={classes.headingMargin}>
						GAME OWNERSHIP
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={9}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel id="purchasedGamesLabel">
									Purchased games
								</InputLabel>
								<Select
									labelId="purchasedGamesLabel"
									label="Purchased games"
									open={openGames}
									onClose={() => setOpenGames(false)}
									onOpen={() => setOpenGames(true)}
									value={game}
									onChange={e => setGame(e.target.value)}
								>
									{ownership.map(title => (
										<MenuItem value={title.gameId} key={title.userAccountId}>
											{title.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3} className={classes.flex}>
							<Button
								className={(classes.formControl, classes.revokeBtn)}
								variant="contained"
								color="default"
								size="small"
								onClick={() => revokeOwnership(game)}
								disabled={!game}
							>
								Revoke
							</Button>
						</Grid>
						<Grid item xs={9}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel id="gameStoreLabel">Game store</InputLabel>
								<Select
									labelId="gameStoreLabel"
									label="Game store"
									open={openStore}
									onClose={() => setOpenStore(false)}
									onOpen={() => setOpenStore(true)}
									value={store}
									onChange={e => setStore(e.target.value)}
								>
									{allGames &&
										filterOwnedGames(ownership, allGames).map(title => (
											<MenuItem value={title.gameId} key={title.gameId}>
												{title.name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3} className={classes.flex}>
							<Button
								className={(classes.formControl, classes.btn)}
								variant="contained"
								color="primary"
								onClick={() => grantOwnership(store)}
								size="small"
								disabled={!store}
							>
								Grant
							</Button>
						</Grid>
						<Grid item xs={9}>
							{!usersState.isLoading && grantMessage}
							{!usersState.isLoading && revokeMessage}
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

export default UserLibrary;

const useStyles = makeStyles(theme => ({
	button: {
		display: 'block',
		marginTop: theme.spacing(2),
	},
	formControl: {
		width: '100%',
	},
	btn: {
		width: '100%',
		height: 'min-content',
		alignSelf: 'center',
	},
	headingMargin: {
		marginTop: 16,
		marginBottom: 16,
	},
	revokeBtn: {
		background: red[600],
		color: '#fff',
		'&:hover': {
			background: red[400],
		},
		width: '100%',
		height: 'min-content',
		alignSelf: 'center',
	},
	flex: {
		display: 'flex',
	},
}));
