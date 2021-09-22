import { useEffect, useRef,  } from "react";

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
            rootMargin: '0px'
        });

        observer.observe(bottomRef.current);

        return () => {
            observer.disconnect();
        }
    }, [])

    return ( 
        <>
            {children}
            <div ref={bottomRef}></div>
        </>
     );
}
 
export default InfiniteScroll;