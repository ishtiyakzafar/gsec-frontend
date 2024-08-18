const initialState = {};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER': {
			const data = action.payload;
			return data;
		}

		default:
			return state;
	}
};

export default userReducer;
