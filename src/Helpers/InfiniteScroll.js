import { useEffect, useRef } from "react";

const InfiniteScroll = ({children, cb}) => {
    const bottomRef = useRef();

    function scrollCallback(entries) {
        if(entries[0].isIntersecting) {
            cb();
            console.log('isIntersecting');
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(scrollCallback, {
            rootMargin: '10px',
            threshold: '1.0'
        });

        if(bottomRef && bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            observer.disconnect();
        }
    }, []);

    return ( 
        <>
            {children}
            <div ref={bottomRef} style={{height: '2px'}}></div>
        </>
     );
}
 
export default InfiniteScroll;