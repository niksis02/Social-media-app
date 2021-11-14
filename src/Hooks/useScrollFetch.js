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
                    body: JSON.stringify(body)
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
    
        fetchData(url, body, method);
    }, [url, body, method, page]);

    return { data, loading, error, setData, setPage, pageHandler };
}
 
export default useScrollFetch;