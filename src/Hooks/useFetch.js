import { useState, useEffect } from 'react';

const useFetch = (url, body, method) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    async function fetchData(url, body, method) {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: method, 
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': token
                },
                body: JSON.stringify(body)
            })

            const result = await response.json();
            setLoading(false);

            if(result.status === 'ok') {
                setData(result.msg);
            }

            if(result.status === 'error') {
                setError(result.msg);
            }
        }
        catch(err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchData(url, body, method);
    }, [url, body]);

    return { data, loading, error};
}
 
export default useFetch;