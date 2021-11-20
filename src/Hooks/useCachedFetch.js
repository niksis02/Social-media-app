import { useEffect, useState, useRef } from "react";

const useCachedFetch = (url, options) => {
    const cache = useRef({});
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData(url, options) {
            setLoading(true);
            try {
                if(cache.current[url]) {
                    const data = cache.current[url];
                    setData(data);
                    setLoading(false);
                }
                else {
                    const response = await fetch(url, options)
                    const result = await response.json();
                    setLoading(false);
                    if(result.status === 'ok') {
                        setData(result.msg);
                        cache.current[url] = result.msg;
                    }

                    if(result.status === 'error') {
                        setError(result.msg);
                    }
                }
            }
            catch(err) {
                setError(err.message);
            }
        }

        fetchData(url, options);
    }, [url, options]);
    return { data, loading, error };
}
 
export default useCachedFetch;