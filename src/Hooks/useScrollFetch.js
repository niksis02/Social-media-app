import { useEffect, useState } from "react";

const useScrollFetch = (url, body, method) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(-1);
    const token = localStorage.getItem('token');

    function pageHandler() {
        setPage(pg => pg + 1);
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData(url, body, method) {
            body.page = page;
            setLoading(true);
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                         'Content-Type': 'Application/json' ,
                         'authorization': token
                        },
                    body: JSON.stringify(body),
                    signal: controller.signal
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
                if(err.name !== 'AbortError') {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }
    
        fetchData(url, body, method);

        return () => controller.abort();
    }, [url, body, method, page]);

    return { data, loading, error, setData, setPage, pageHandler };
}
 
export default useScrollFetch;