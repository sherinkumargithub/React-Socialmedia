// CUSTOM HOOKS
// here this component is not an component it actually a custom hook, which we can build ourself based on the project needs and requirements
// remember the hook is also always a function

import { useState, useEffect } from "react";
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        // writing an object inside a useState
        width: undefined,
        height: undefined
    });
    
    // to run or analyse the image while the site load at first time only, so we need to happen this action for only one time , so here we using the useEffect hook
    useEffect(() =>{
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize();
        // this was the line very import for the resize function
        window.addEventListener("resize", handleResize)
        // clean up after it used
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return windowSize; 
}
export default useWindowSize;