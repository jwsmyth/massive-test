import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import MyLibrary from './components/Library/MyLibrary';
import GamePage from './components/Library/GamePage';
import UserAccount from './components/Users/UserAccount';
import UserList from './components/Users/UserList';
import EditUserAsAdmin from './components/Users/EditUserAsAdmin';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GET_USER_ACTION } from './actions/authActions';

const App = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	// Check for user at first render
	useEffect(() => {
		dispatch(GET_USER_ACTION());
	}, [dispatch]);

	return (
		<div>
			<Container maxWidth="lg">
				<Router>
					<Navbar />
					<div className={classes.appbarMargin} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/account" component={UserAccount} />
						<Route exact path="/my-library" component={MyLibrary} />
						<Route path="/my-library/:id" component={GamePage} />
						<Route path="/users" component={UserList} />
						<Route path="/edit-user/:id" component={EditUserAsAdmin} />
					</Switch>
				</Router>
			</Container>
		</div>
	);
};

export default App;

// Set margin for navbar
const useStyles = makeStyles(theme => ({
	appbarMargin: {
		padding: theme.spacing(5),
		...theme.mixins.toolbar,
	},
}));
