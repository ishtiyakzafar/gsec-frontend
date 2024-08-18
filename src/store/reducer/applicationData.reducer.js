let initialState = {
	// IPOBondName: 'JDIAL',
	// noOfShares: [ 19 ],
	// bidPrice: [ 14250 ],
	// cutOff: [ 750 ],
	// IPOBondType: 'IPO',
	// Appsource: '2',
	// FormType: 'Online',
	// PaymentMode: 'UPI',
	// BankCode: '0224234234',
	// BankName: 'Bhopal',
	// BankLoc: '16',
	// UPINo: 'ram.pal2587@UPI'
};

const applicationDataReducer = (state = initialState, action) => {
	//console.log(action.type)
	switch (action.type) {
		case 'APPLICATION-DATA':
			return action.payload;
		default:
			return state;
	}
};

export default applicationDataReducer;
