// const initialState = false;

// const loggedInReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'LOGGED-IN': {
// 			const data = action.payload;
// 			return data;
// 		}

// 		default:
// 			return state;
// 	}
// };

// export default loggedInReducer;


let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};
// console.log(initialState);

const loggedInReducer = (state = initialState, action) => {
	//console.log(action.type)
	switch (action.type) {
		case 'LOGIN': {
			
			return {...state, loggedIn: true,user:action.payload}
		}
		case 'LOGOUT':
      		return {};
		default:
			return state;
	}
};

export default loggedInReducer;
