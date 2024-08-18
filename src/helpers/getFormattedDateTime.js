export function getFormattedDateTime(date) {
	let p = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	})
		.formatToParts(date)
		.reduce((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});

	return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute} ${p.dayPeriod}`;
}

export function getFormattedDateApplicationHistory(date) {
	let p = new Intl.DateTimeFormat('en', {
		year: '2-digit',
		month: 'short',
		day: '2-digit'
	})
		.formatToParts(date)
		.reduce((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});

	return `${p.day} ${p.month} '${p.year}`;
}

export function getDateTypeForIPOSchedule(dates) {

	let dateType = [];
	for (let i = 0; i < dates.length; i++) {
		if(new Date(dates[i]).getTime() <= new Date().getTime()){
			dateType.push(2)
		}else if(new Date(dates[i]).getTime() > new Date().getTime()){
			dateType.push(0)
		}
		// dateType.push(dates[i].getTime() <= new Date().getTime() ? 1 : 0);
	}
	//console.log('dateType..',dateType)
	// for (let i = 0; i < dateType.length; i++) {
	// 	if (dateType[i] === 1) {
	// 		if (dateType[i + 1] === 1) {
	// 			dateType.splice(i, 1, 2);
	// 		}
	// 	}
	// }
	for (let i = 0; i < dateType.length; i++) {
		if (dateType[i] === 0) {
			if (dateType[i + 1] === 0 || typeof dateType[i + 1] == undefined ) {
				dateType[i]= 1;
				// dateType.splice(i, 1, 2);
			}
		}
	}
	return dateType;
}
