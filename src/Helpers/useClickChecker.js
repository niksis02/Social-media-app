import { useState, useEffect} from 'react';

const useClickChecker = (ref) => {
    const [outside, setOutside] = useState(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutside(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return { outside, setOutside };
}

export default useClickChecker;