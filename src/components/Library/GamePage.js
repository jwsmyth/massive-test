import { useState, useEffect } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const GamePage = ({ location }) => {
	const [game, setGame] = useState(null);

	const classes = useStyles();

	// Check if state is undefined
	useEffect(() => {
		if (location.state) setGame(location.state.game);
	}, [location.state]);

	return (
		<Container maxWidth="md">
			{game && (
				<>
					<Card elevation={0} className={classes.root}>
						<CardMedia>
							<img src={game.thumbnail} title={game.name} alt={game.name} />
						</CardMedia>
						<div>
							<CardContent className={classes.content}>
								<Typography variant="h6">{game.name}</Typography>
								<Typography variant="subtitle2">
									Age restriction: {game.ageRestriction}
								</Typography>
							</CardContent>
						</div>
					</Card>
				</>
			)}
		</Container>
	);
};

export default GamePage;

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		height: '100%',
		backgroundColor: 'inherit',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	content: {
		paddingTop: 0,
	},
}));
