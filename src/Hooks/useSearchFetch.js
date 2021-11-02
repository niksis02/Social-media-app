import { useEffect, useState } from 'react';

const useSearchFetch = (url, body, method) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(-1);
    console.log('page:', page);

    function pageHandler() {
        if(!loading) {
            setPage(pg => pg + 1);
        }
    }

    useEffect(() => {
        async function fetchData(url, body, method) {
            if(body.query) {
                body.page = page;
                setLoading(true);
                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {'Content-Type':'Application/json'},
                        body: JSON.stringify(body)
                    });
    
                    const result = await response.json();
    
                    setLoading(false);
                    if(result.status === 'error') {
                        setError(result.msg);
                    }
                    if(result.status === 'ok') {
                        if(page === 0) {
                            setData(result.msg);
                        }
                        
                        else {
                            setData(list => [...list, ...result.msg]);
                        }
                    }
                }
                catch(err) {
                    setError(err.message);
                }
            }
            else {
                return;
            }
        }

        fetchData(url, body, method);
    }, [url, body, method, page]);

    return {data, loading, error, setPage, pageHandler};
}

export default useSearchFetch;