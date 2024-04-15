import { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();
		fetch(url, {
			signal: abortCont.signal,
			headers: {
				"Access-Control-Allow-Headers" : "Content-Type, Authorization",
				"Access-Control-Expose-Headers": "Authorization",
				"Access-Control-Allow-Origin": "*",
				'Content-Type': 'application/json',
				"Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
			},
		}).then(res => {
			if(!res.ok){
				throw Error('Could not fetch data for a server');
			}
			return res.json();
		}).then(fetchedData => {
			setData(fetchedData);
			setIsLoading(false);
			setError(null);
		}).catch(err => {
			if(!err.name === 'AbortError'){
				setError(err.message);
			}
			setIsLoading(false);
		})	
			return () => abortCont.abort();
		},
	[url]);

	return {data, isLoading, error}
}

export default useFetch;