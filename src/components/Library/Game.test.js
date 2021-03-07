import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Game from './Game';

describe('<Game />', () => {
	const mockGame = {
		gameId: 1,
		thumbnail: 'image',
		name: 'Game name number 1',
	};
	const setup = () => {
		return render(
			<Router>
				<Game game={mockGame} />
			</Router>
		);
	};

	it('Renders successfully', () => {
		setup();
	});

	it('Correctly display games name', () => {
		const display = setup();
		display.getByText(mockGame.name);
	});

	it('Correctly links to game page', () => {
		const display = setup();
		fireEvent.click(display.getByTestId('gamepage-link'));
		expect(window.location.pathname).toBe(`/my-library/${mockGame.gameId}`);
	});
});
