import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store from './store';
import { Provider } from 'react-redux';

import './index.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme';

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
