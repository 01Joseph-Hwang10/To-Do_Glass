import { useEffect, useState } from "react"


const useNav = () => {
    const [onLanding,setOnLanding] = useState(false);

    useEffect(() => {
        if(document.getElementById("landing")) {
            setOnLanding(true)
        } else {
            setOnLanding(false);
        }
    },[onLanding])

    return {
        onLanding,
        setOnLanding
    }
}


export default useNav;
