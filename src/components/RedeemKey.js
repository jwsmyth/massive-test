import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Typography } from '@material-ui/core';
import { REDEEM_KEY_ACTION } from '../actions/gameActions';

const RedeemKey = ({ errorMessage, setErrorMessage }) => {
	const [key, setKey] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();
		if (!key) return;
		dispatch(REDEEM_KEY_ACTION(key));
	};

	const handleChange = e => {
		if (errorMessage) setErrorMessage('');
		setKey(e.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<TextField
					variant="outlined"
					type="text"
					label="Redeem key"
					size="small"
					fullWidth
					value={key}
					onChange={e => handleChange(e)}
				/>
			</form>
			{errorMessage && (
				<Typography variant="body2" color="error">
					{errorMessage}
				</Typography>
			)}
		</div>
	);
};

export default RedeemKey;
