export const tokenHeader = getState => {
	// Fetch token
	const token = getState().auth.token;

	// Setup header
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// Add token to header
	if (token) {
		config.headers['authorization'] = `Bearer ${token}`;
	}
	return config;
};

// Compare two objects
export const checkShallowEquality = (oldObject, newObject) => {
	const oldValues = Object.values(oldObject);
	const newValues = Object.values(newObject);
	for (let i = 0; i < oldValues.length; i++) {
		if (oldValues[i] !== newValues[i]) return false;
	}
	return true;
};
