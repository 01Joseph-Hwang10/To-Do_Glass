

export const scrollToTop = (smooth=false) => {
    const behavior = (function(){return(smooth?'smooth':'auto')})()
    window.scrollTo({
        top:0,
        behavior: behavior,
    })
}