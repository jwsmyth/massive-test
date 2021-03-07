import {
	Card,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/logo.png';
import { Facebook, Instagram, YouTube, LinkedIn } from '@material-ui/icons';

const Home = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<div className={classes.divLogo}>
						<img src={Logo} alt="ACME-logo" className={classes.logo} />
					</div>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Card className={classes.cardRoot} variant="outlined">
						<CardContent>
							<Typography className={classes.title} color="textSecondary">
								Upcoming
							</Typography>
							<Typography variant="body1">ACMECON</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.eventInfo}
							>
								17:00 | 13th of March 2021 | Malmö
							</Typography>
							<Typography variant="body1">SECRET EVENT</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.eventInfo}
							>
								00:00 | 23rd of March 2021
							</Typography>
							<Typography variant="body1">STATE OF THE GAME</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.eventInfo}
							>
								15:00 | 30th of March 2021 | Montreal
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Card className={classes.cardRoot} variant="outlined">
						<CardContent>
							<Typography className={classes.title} color="textSecondary">
								Social media
							</Typography>
							<Typography variant="body2" component="p">
								<IconButton>
									<Facebook />
								</IconButton>
								FACEBOOK
							</Typography>
							<Typography variant="body2" component="p">
								<IconButton>
									<Instagram />
								</IconButton>
								INSTAGRAM
							</Typography>
							<Typography variant="body2" component="p">
								<IconButton>
									<LinkedIn />
								</IconButton>
								LINKEDIN
							</Typography>
							<Typography variant="body2" component="p">
								<IconButton>
									<YouTube />
								</IconButton>
								YOUTUBE
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Card className={classes.cardRoot} variant="outlined">
						<CardContent>
							<Typography className={classes.title} color="textSecondary">
								Contact information
							</Typography>
							<Typography variant="body2" component="p">
								ADDRESS
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.eventInfo}
							>
								Barkgatan 5, 214 22 Malmö, SE
							</Typography>
							<Typography variant="body2" component="p">
								PHONE NUMBER
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.eventInfo}
							>
								+4620 000 000
							</Typography>
							<Typography variant="body2" component="p">
								EMAIL
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.eventInfo}
							>
								support@acmegames.com
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	cardRoot: {
		flexGrow: 1,
		minHeight: 290,
		[theme.breakpoints.down('xs')]: {
			minHeight: 'auto',
		},
	},
	logo: {
		overflow: 'auto',
	},
	divLogo: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '50vh',
		width: 'auto',
	},
	title: {
		fontSize: '1.2rem',
		marginBottom: 16,
	},
	eventInfo: {
		marginBottom: 8,
	},
}));
