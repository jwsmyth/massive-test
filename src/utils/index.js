import { useState, useEffect } from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
	Button,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';

export const SpinnerBackdrop = ({ isLoading }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		if (isLoading) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [isLoading]);

	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress data-testid="spinner-icon" color="inherit" />
			</Backdrop>
		</div>
	);
};

export const PopModal = ({ callback, game }) => {
	const [open, setOpen] = useState(true);
	const classes = useStyles();

	const handleClose = () => {
		callback();
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle>Congratulations</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<img
						alt={game.thumbnail}
						src={game.thumbnail}
						style={{ maxWidth: 150, maxHeight: 150 }}
					/>
					<DialogContentText
						component={'div'}
						style={{ paddingLeft: 8, paddingRight: 8 }}
					>
						<Typography variant="body1">
							You've successfully redeemed <strong>{game.name}</strong>.
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" data-testid="ok-button">
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export const convertDate = dateToConvert => {
	// TO accomodate all the browsers
	return dateToConvert.split('T')[0];
};

export const filterOwnedGames = (ownership, allGames) => {
	const _ids = ownership.map(x => x.gameId);
	const filterOutDuplicates = allGames.filter(y => !_ids.includes(y.gameId));
	return filterOutDuplicates;
};

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	dialogContent: {
		display: 'flex',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
		},
	},
}));
