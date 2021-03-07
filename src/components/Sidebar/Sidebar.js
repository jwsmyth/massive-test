import { useState } from 'react';
import { SidebarData } from './SidebarData';
import { LOGOUT_ACTION } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Close } from '@material-ui/icons';
import {
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const classes = useStyles();

	const toggleSidebar = open => event => setIsOpen(open);

	const callLogoutAction = () => {
		dispatch(LOGOUT_ACTION(history));
	};

	return (
		<div>
			<IconButton
				edge="start"
				className={classes.hamburger}
				aria-label="menu"
				onClick={toggleSidebar(true)}
			>
				<Menu />
			</IconButton>
			<Drawer anchor={'left'} open={isOpen} onClose={toggleSidebar(false)}>
				<div className={classes.sidebarWidth} onClick={toggleSidebar(false)}>
					<List>
						<ListItem>
							<div style={{ flexGrow: 1 }} />
							<IconButton>
								<Close />
							</IconButton>
						</ListItem>
						<Divider />
						{SidebarData.map((item, idx) => (
							<div key={idx}>
								{!item.invoker ? (
									<Link
										to={item.path}
										key={idx}
										className={classes.cancelLinkStyles}
									>
										<ListItem button>
											<ListItemIcon>{item.icon}</ListItemIcon>
											<ListItemText primary={item.title} />
										</ListItem>
									</Link>
								) : (
									<div key={idx} onClick={callLogoutAction}>
										<ListItem button>
											<ListItemIcon>{item.icon}</ListItemIcon>
											<ListItemText primary={item.title} />
										</ListItem>
									</div>
								)}
							</div>
						))}
					</List>
				</div>
			</Drawer>
		</div>
	);
};

export default Sidebar;

const useStyles = makeStyles(theme => ({
	hamburger: {
		marginRight: theme.spacing(2),
		display: 'none',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
		},
	},
	sidebarWidth: {
		width: 250,
	},
	cancelLinkStyles: {
		textDecoration: 'none',
		color: 'inherit',
		underline: 'none',
	},
}));
