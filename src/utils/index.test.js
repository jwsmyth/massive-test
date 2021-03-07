import { fireEvent, render } from '@testing-library/react';
import { PopModal, SpinnerBackdrop } from './index.js';

describe('<SpinnerBackdrop />', () => {
	it('Renders successfully', () => {
		render(<SpinnerBackdrop />);
	});

	it('Spinner is present', () => {
		const visibleSpinner = render(<SpinnerBackdrop />);
		visibleSpinner.getByTestId('spinner-icon');
	});
});

describe('<PopModal />', () => {
	const mockGame = {
		name: 'name',
		thumbnail: 'thumbnail',
	};
	it('Renders successfully', () => {
		render(<PopModal game={mockGame} />);
	});

	it('Closes successfully', () => {
		const cb = jest.fn();
		const modal = render(<PopModal callback={cb} game={mockGame} />);
		const btn = modal.getByTestId('ok-button');
		fireEvent.click(btn);
		expect(cb).toHaveBeenCalled();
	});
});
