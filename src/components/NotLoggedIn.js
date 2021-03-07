import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const NotLoggedIn = () => {
	const classes = useStyles();
	return (
		<div className={classes.divLogin}>
			<Typography variant="h6" className={classes.centeredText}>
				Please{' '}
				<Link to="/login">
					<Button variant="outlined">login</Button>
				</Link>{' '}
				to view this page
			</Typography>
		</div>
	);
};

export default NotLoggedIn;

const useStyles = makeStyles(theme => ({
	divLogin: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20vh',
	},
	centeredText: {
		textAlign: 'center',
		marginBottom: theme.spacing(3),
	},
}));
