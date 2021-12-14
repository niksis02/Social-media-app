import { useEffect, useRef } from "react";

const InfiniteScrollUp = ({children, cb}) => {
    const upRef = useRef();
    const bottomRef = useRef(null);

    function scrollCallback(entries) {
        console.log('entries', entries);
        if(entries[0].isIntersecting) {
            console.log('intersecting');
            cb();
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(scrollCallback, {
            rootMargin: '1px',
            threshold: '0.5'
        });

        if(upRef && upRef.current) {
            observer.observe(upRef.current);
        }

        return () => {
            observer.disconnect();
        }
    }, []);

    return ( 
        <>
            <div ref={upRef} style={{height: '2px'}}></div>
            {children}
        </>
     );
}
 
export default InfiniteScrollUp;