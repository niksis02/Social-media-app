import { useEffect, useState } from "react";

const useScrollFetch = (url, page, id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchData(url, page, id) {
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({
                    page,
                    id
                })
            });
            const result = await response.json();
            setLoading(false);

            if(result.status === 'ok') {
                if(page === 0) {
                    setData(result.msg);
                }
                
                else {
                    setData(list => [...list, ...result.msg]);
                }
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
        fetchData(url, page, id);
    }, [url, page, id])

    return { data, setData, loading, error };
}
 
export default useScrollFetch;