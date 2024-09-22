window.onload = ()=>{
    no_scroll = document.getElementById("noScroll")
    no_scroll.addEventListener("touchstart",  function(event) {event.preventDefault()})
    no_scroll.addEventListener("touchmove",   function(event) {event.preventDefault()})
    no_scroll.addEventListener("touchend",    function(event) {event.preventDefault()})
    no_scroll.addEventListener("touchcancel", function(event) {event.preventDefault()})
    
    var tapedTwice = false;
    
    function tapHandler(event) {
        if(!tapedTwice) {
            tapedTwice = true;
            setTimeout( function() { tapedTwice = false; }, 300 );
            return false;
        }
        event.preventDefault();
        restart();
     }
    
    no_scroll.addEventListener("touchstart", tapHandler);
};