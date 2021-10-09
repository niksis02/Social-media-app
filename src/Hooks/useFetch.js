import { useState, useEffect } from 'react';

const useFetch = (url, token, id) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchData(url, token, id) {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'post', 
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    id
                })
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
        fetchData(url, token, id);
    }, [url, id, token])

    return { data, loading, error};
}
 
export default useFetch;