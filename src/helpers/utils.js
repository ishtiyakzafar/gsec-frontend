export const formatNumbers = (number) => {
	const nfObject = new Intl.NumberFormat('en-IN');
	return nfObject.format(number);
};

export const dateFormatter = (date_future, date_now = new Date().getTime()) => {
	var delta = Math.abs(date_future - date_now) / 1000;

	// calculate (and subtract) whole days
	var days = Math.floor(delta / 86400);
	delta -= days * 86400;

	// calculate (and subtract) whole hours
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;

	// calculate (and subtract) whole minutes
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;

	// what's left is seconds
	var seconds = delta % 60;

	// hours = hours + days * 24;
	if(days > 1)
	{
		return `<span>${parseInt(days)} days</span> <span>${parseInt(hours)}h</span> :<span>${parseInt(minutes)}m</span> :<span>${parseInt(seconds)}s</span>`;
	}
	else
	{
		return `<span>${parseInt(hours)}h</span> :<span>${parseInt(minutes)}m</span> :<span>${parseInt(seconds)}s</span>`;
	}
	
};

export const dateToRemainingTimeFormattor = (opendate, closedDate) => {
	var opendateTime = new Date(opendate).getTime();
	var date = new Date().getTime();
	var closedDateTime = new Date(closedDate).getTime();

	var diff = (closedDateTime - date) / 1000;
	var hours = Math.floor(diff / 3600);
	var minutes = Math.floor((diff % 3600) / 60);
	var seconds = Math.floor(diff % 60);

	// var diff = closedDateTime - date
	// var hours = Math.floor((diff / 3.6e5));
	// var minutes = Math.floor((diff % 3.6e5) / 6e4);
	// var seconds = Math.floor((diff % 6e4) / 1000);

	return {
		hr: Number(hours),
		min: Number(minutes),
		sec: Number(seconds)
	};
};

export const dateToDaysFormatter = (opendate, closedDate) => {
	if (new Date(opendate).getTime() >= new Date().getTime()) {
		// days to go
		let diff_in_time = new Date(opendate).getTime() - new Date().getTime();
		let diff_in_days = Math.round(diff_in_time / (1000 * 60 * 60 * 24));

		return `${diff_in_days} days to go`;
	} else {
		// remaining days
		let diff_in_time = new Date(closedDate).getTime() - new Date().getTime();
		let diff_in_days = Math.round(diff_in_time / (1000 * 60 * 60 * 24));

		return `${diff_in_days} remaining days`;
	}
};

const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

export const getOrdinal = (number) => {
	const suffixes = {
		one: 'st',
		two: 'nd',
		few: 'rd',
		other: 'th'
	};
	const ordinal_rules = new Intl.PluralRules('en', { type: 'ordinal' });
	return suffixes[ordinal_rules.select(number)];
};

export const BondCardDateFormatter = (date1) => {
	let d = new Date(date1);
	let date = d.getDate();
	let monthName = monthNames[d.getMonth()];

	return `${date} ${monthName}`;
};

export const calculateGain = (price1, price2) => {
	return (price1 - price2) / price2 * 100;
};
