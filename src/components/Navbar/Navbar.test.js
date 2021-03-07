import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Navbar from './Navbar';

describe('<Navbar />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
	const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

	const getMockState = (x = true, y = true, z = false) => {
		return {
			isAuth: x,
			user: {
				name: 'test man',
				isAdmin: z,
			},
		};
	};

	const setup = () => {
		return render(
			<Router>
				<Navbar />
			</Router>
		);
	};

	it('Renders successfully', () => {
		useSelectorMock.mockReturnValue(getMockState());
		setup();
	});

	it('Authorized user: nav links', () => {
		useSelectorMock.mockReturnValue(getMockState());
		const navLinks = setup();

		// Should find
		navLinks.getByTestId('home-route');
		navLinks.getByTestId('my-library-route');
		navLinks.getByTestId('account-route');
		navLinks.getByTestId('logout-route');
		// Should not find
		expect(navLinks.queryByTestId('login-route')).toBeNull();
	});

	it('NOT authorized user: nav links', () => {
		useSelectorMock.mockReturnValue(getMockState(false, false));
		const navLinks = setup();

		// Should find
		navLinks.getByTestId('home-route');
		navLinks.getByTestId('my-library-route');
		navLinks.getByTestId('login-route');

		// Should not find
		expect(navLinks.queryByTestId('logout-route')).toBeNull();
		expect(navLinks.queryByTestId('account-route')).toBeNull();
	});

	it('Authorized user, isAdmin: nav links', () => {
		useSelectorMock.mockReturnValue(getMockState(true, true, true));
		const navLinks = setup();

		// Should find
		navLinks.getByTestId('home-route');
		navLinks.getByTestId('my-library-route');
		navLinks.getByTestId('account-route');
		navLinks.getByTestId('users-route');
		navLinks.getByTestId('logout-route');

		// Should not find
		expect(navLinks.queryByTestId('login-route')).toBeNull();
	});

	it('Nav links working', () => {
		useSelectorMock.mockReturnValue(getMockState(true, true, true));
		const navLinks = setup();

		expect(window.location.pathname).toBe('/');
		fireEvent.click(navLinks.getByTestId('my-library-route'));
		expect(window.location.pathname).toBe('/my-library');
		fireEvent.click(navLinks.getByTestId('account-route'));
		expect(window.location.pathname).toBe('/account');
		fireEvent.click(navLinks.getByTestId('users-route'));
		expect(window.location.pathname).toBe('/users');
		fireEvent.click(navLinks.getByTestId('home-route'));
		expect(window.location.pathname).toBe('/');
	});
});
