import { useEffect, useRef } from "react";

const InfiniteScroll = ({children, containerRef, setPage}) => {
    const bottomRef = useRef();

    function scrollCallback(entries) {
        if(entries[0].isIntersecting) {
            setPage(num => num + 1);
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(scrollCallback, {
            root: containerRef,
            rootMargin: '10px'
        });

        if(bottomRef && bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [containerRef]);

    return ( 
        <>
            {children}
            <div ref={bottomRef} style={{height: '2px'}}></div>
        </>
     );
}
 
export default InfiniteScroll;