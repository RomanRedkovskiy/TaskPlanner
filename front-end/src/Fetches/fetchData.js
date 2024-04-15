export default async function fetchData(url) {
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Expose-Headers": "Authorization",
			"Access-Control-Allow-Origin": "*",
			'Content-Type': 'application/json',
			"Access-Control-Allow-Methods": "GET"
		}
	});
	if (!res.ok) {
		throw Error('Could not fetch data for a server');
	}
	const fetchedData = await res.json();
	return fetchedData;
}