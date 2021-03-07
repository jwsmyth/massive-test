import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { AppBar, Toolbar, IconButton, CssBaseline } from '@material-ui/core';
import {
	ExitToApp,
	People,
	Person,
	Home,
	SportsEsports,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGOUT_ACTION } from '../../actions/authActions';
import Logo from '../../assets/logo.png';

const Navbar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const { isAuth, user } = useSelector(state => state.auth);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" color="default">
				<Toolbar>
					<Sidebar />
					<Link to="/">
						<img src={Logo} alt="ACME Games Logo" style={{ maxWidth: 150 }} />
					</Link>
					<div className={classes.grow} />
					<div className={classes.smallAndUp}>
						<Link
							to="/"
							className={classes.cancelLinkStyles}
							data-testid="home-route"
						>
							<IconButton>
								<Home />
							</IconButton>
						</Link>
						<Link
							to="/my-library"
							className={classes.cancelLinkStyles}
							data-testid="my-library-route"
						>
							<IconButton>
								<SportsEsports />
							</IconButton>
						</Link>
						{user && user.isAdmin && (
							<Link
								to="/users"
								className={classes.cancelLinkStyles}
								data-testid="users-route"
							>
								<IconButton>
									<People />
								</IconButton>
							</Link>
						)}
					</div>
					{isAuth && user ? (
						<>
							<Link to="/account" data-testid="account-route">
								<IconButton>
									<Person />
								</IconButton>
							</Link>
							<IconButton
								onClick={() => dispatch(LOGOUT_ACTION(history))}
								data-testid="logout-route"
							>
								<ExitToApp />
							</IconButton>
						</>
					) : (
						<>
							<Link to="/login" data-testid="login-route">
								<IconButton>
									<Person />
								</IconButton>
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;

/** STYLES **/
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		marginRight: theme.spacing(3),
	},
	grow: {
		flexGrow: 1,
	},
	smallAndUp: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	navbarItems: {
		marginRight: theme.spacing(1),
		textDecoration: 'none',
	},
	cancelLinkStyles: {
		textDecoration: 'none',
		color: 'inherit',
		underline: 'none',
	},
}));
