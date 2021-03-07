import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Game from './Game';
import NotLoggedIn from '../NotLoggedIn';
import RedeemKey from '../RedeemKey';
import {
	GET_OWNED_GAMES_ACTION,
	USER_IS_NOTIFIED_ACTION,
} from '../../actions/gameActions';
import { SpinnerBackdrop, PopModal } from '../../utils';

const MyLibrary = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const isAuthenticated = useSelector(state => state.auth.isAuth);
	const { isLoading, library, error, redeemedLatest, notify } = useSelector(
		state => state.games
	);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();

	const classes = useStyles();

	const userHasBeenNotified = () => {
		dispatch(USER_IS_NOTIFIED_ACTION());
	};

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(GET_OWNED_GAMES_ACTION());
		}
	}, [dispatch, isAuthenticated]);

	useEffect(() => {
		if (error) setErrorMessage(error.msg);
	}, [error]);

	return (
		<>
			{redeemedLatest && notify && (
				<PopModal callback={userHasBeenNotified} game={redeemedLatest} />
			)}
			{isLoading && <SpinnerBackdrop isLoading={isLoading} />}
			{isAuthenticated && library && (
				<>
					<div className={classes.header}>
						<Typography align="center" variant="h6">
							MY LIBRARY ({library.length})
						</Typography>
						<Grid container className={classes.headerInputs}>
							<Grid item xs={12} sm={6} className={classes.headerInput}>
								<TextField
									variant="outlined"
									label="Search"
									size="small"
									fullWidth
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.headerInput}>
								<RedeemKey
									errorMessage={errorMessage}
									setErrorMessage={setErrorMessage}
								/>
							</Grid>
						</Grid>
					</div>
					<div>
						<Grid className={classes.gridContainer} container spacing={3}>
							{library
								.filter(titles => {
									return searchTerm
										? titles.name
												.toLowerCase()
												.includes(searchTerm.toLowerCase())
										: titles;
								})
								.map(game => (
									<Grid item key={game.gameId}>
										<Game game={game} />
									</Grid>
								))}
						</Grid>
					</div>
					{!library.length && (
						<div className={classes.header}>
							<Typography variant="h6" style={{ textAlign: 'center' }}>
								Apparently you don't have any games... Redeem one!
							</Typography>
						</div>
					)}
				</>
			)}
			{!isAuthenticated && <NotLoggedIn />}
		</>
	);
};

export default MyLibrary;

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	header: {
		paddingBottom: theme.spacing(2),
	},
	gridContainer: {
		justifyContent: 'center',
	},
	headerInputs: {
		margin: 'auto',
		justifyContent: 'center',
		width: '75%',
	},
	headerInput: {
		padding: theme.spacing(2),
	},
}));
