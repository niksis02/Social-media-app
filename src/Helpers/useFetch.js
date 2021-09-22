import { useEffect, useState } from "react/cjs/react.development"

const useFetch = (url, query, page) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchData(page, query, url) {
        if(query) {
            try {
                setLoading(true);
                console.log('query before fetch:', query);
                console.log('page before fetch:', page);
                const response = await fetch(url, {
                    method: 'post',
                    headers: {'Content-Type':'Application/json'},
                    body: JSON.stringify({
                        query,
                        page
                    })
                });
                const result = await response.json();
                setLoading(false);
                if(result.status === 'error') {
                    setError(result.msg);
                }
                if(result.status === 'ok') {
                    console.log('query after fetch:', query);
                    console.log('page after fetch:', page);
                    console.log(result.msg);
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

    useEffect(() => {
        fetchData(page, query, url);
    }, [page, query, url])

    return {data, loading, error};
}

export default useFetch;