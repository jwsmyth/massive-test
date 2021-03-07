import {
	ExitToApp,
	Home,
	People,
	Person,
	SportsEsports,
} from '@material-ui/icons';

export const SidebarData = [
	{
		title: 'Home',
		path: '/',
		icon: <Home />,
	},
	{
		title: 'My library',
		path: '/my-library',
		icon: <SportsEsports />,
	},
	{
		title: 'Users',
		path: '/users',
		icon: <People />,
	},
	{
		title: 'My account',
		path: '/account',
		icon: <Person />,
	},
	{
		title: 'Logout',
		path: '#',
		icon: <ExitToApp />,
		invoker: true,
	},
];
