import { useState, useEffect} from 'react';

const useClickChecker = (ref1, ref2) => {
    const [outside, setOutside] = useState(true);

    useEffect(() => {
        function handleClickOutside(event) {
            if(ref2) {
                if (ref1.current && !ref1.current.contains(event.target) && ref2.current && !ref2.current.contains(event.target)) {
                    setOutside(true);
                }
            }
            if(!ref2) {
                if (ref1.current && !ref1.current.contains(event.target)) {
                    setOutside(true);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref1, ref2]);

    return { outside, setOutside };
}

export default useClickChecker;