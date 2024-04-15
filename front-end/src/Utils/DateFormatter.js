//date in yyyy-MM-dd format
export const formatHyphensDate = (date) => {
	if (date) {
	  const year = date.getFullYear();
	  const month = String(date.getMonth() + 1).padStart(2, '0');
	  const day = String(date.getDate()).padStart(2, '0');
	  return `${year}-${month}-${day}`;
	}
	return null;
};

//yyyy-MM-dd format into dd-MM-yyyy format
const formatDotsDateFromHyphens = (dateHyphens) => {
	if (!dateHyphens || !dateHyphens.includes('-')) {
	  return null;
	}
	const dateParts = dateHyphens.split('-');
	const day = dateParts[2];
	const month = dateParts[1];
	const year = dateParts[0];
  
	return `${day}.${month}.${year}`;
};

const trimStringUntilT = (str) => {
	if(!str){
		return null;
	}
	const index = str.indexOf('T');
	if (index === -1) {
		return str;
	}
	return str.slice(0, index);
}

export const localDateIntoDottedDate = (str) => {
	return formatDotsDateFromHyphens(trimStringUntilT(str));
} 