import { render, fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import Login from './Login';

describe('<Login />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
	const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

	it('Renders successfully', () => {
		useSelectorMock.mockReturnValue({ error: null });
		render(<Login />);
	});

	it('Form is displayed correctly', () => {
		useSelectorMock.mockReturnValue({ error: null });
		const formFields = render(<Login />);
		formFields.getByTestId('email-input');
		formFields.getByTestId('password-input');
		formFields.getByTestId('login-button');
	});

	it('Login button works', () => {
		useSelectorMock.mockReturnValue({ error: null });
		const click = jest.fn();
		useDispatchMock.mockReturnValue(click);
		const component = render(<Login />);
		fireEvent.click(component.getByTestId('login-button'));
		expect(click).toBeCalled();
	});
});
