import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Game = ({ game, children }) => {
	const classes = useStyles();
	return (
		<Card elevation={3} className={classes.root}>
			<Link
				to={{
					pathname: `/my-library/${game.gameId}`,
					state: {
						game,
					},
				}}
				className={classes.cancelLinkStyles}
				data-testid="gamepage-link"
			>
				<CardMedia className={classes.imageHighlighting}>
					<img src={game.thumbnail} alt={game.name} />
				</CardMedia>
				<CardContent className={classes.cardContent}>
					<Typography className={classes.content} variant="caption">
						{game.name}
					</Typography>
				</CardContent>
			</Link>
		</Card>
	);
};

export default Game;

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 240,
		backgroundColor: '#303030',
	},
	cancelLinkStyles: {
		textDecoration: 'none',
		color: 'inherit',
		underline: 'none',
	},
	imageHighlighting: {
		opacity: 0.85,
		'&:hover': {
			opacity: 1,
		},
	},
	cardContent: {
		paddingRight: theme.spacing(0),
		paddingLeft: theme.spacing(0),
		textAlign: 'center',
		flexWrap: 'wrap',
	},
}));
