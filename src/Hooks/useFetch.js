import { useState, useEffect } from 'react';

const useFetch = (url, body, method) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData(url, body, method) {
            setLoading(true);
            try {
                let options;
                if(method === 'get') {
                    options = {
                        headers: {
                            'authorization': token
                        },
                        signal: controller.signal
                    }
                }
                else {
                    options = {
                        method: method, 
                        headers: {
                            'Content-Type': 'Application/json',
                            'authorization': token
                        },
                        body: JSON.stringify(body),
                        signal: controller.signal
                    }
                }
                const response = await fetch(url, options)

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
                if(err.name !== 'AbortError') {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }

        fetchData(url, body, method);
        return () => controller.abort();
    }, [url, body, token]);

    return { data, loading, error};
}
 
export default useFetch;