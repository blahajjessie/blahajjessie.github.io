
var eps = ["fiasco/fiasco1.m4a", "fiasco/fiasco2.m4a", "fiasco/fiasco3.mp3", "fiasco/fiascoe4.opus"]
var curr  = 2;
var e1player

setInterval(()=>{
  let current = document.cookie;

}, 10000)

cookieobj = document.cookie.split('; ').reduce((prev, current) => {
  const [name, ...value] = current.split('=');
  prev[name] = value.join('=');
  return prev;
}, {});


window.onload=()=>{
   e1player = new Shikwasa.Player({
    container: document.querySelector('.fiascoe1'),
    themeColor: '#000000',
    audio: {
      title: 'Episode ' + (curr + 1),
      artist: 'Fiasco',
      src: eps[curr]
    },
    TFixed:{
      type:"fixed",
      position:"top"
    },
    preload:"auto"
  })
  let prevcookie = cookieobj;
  console.log(prevcookie)
  if (prevcookie.wasSomewhere){
    if (confirm("You were last at position " +prevcookie.time+ " in episode "+ (prevcookie.ep - -1) +" Resume there?")){
      curr = prevcookie.ep;
      e1player.update({
          title: 'Episode ' + (curr - -1),
          artist: 'Fiasco',
          time:prevcookie.time,
          src:  eps[curr]}
        )

        // Promise fulfilled? I sure hope it does
      setTimeout(()=>{
        e1player.seek(prevcookie.time);
        e1player.currentTime = prevcookie.time
        e1player.seek(prevcookie.time);
        console.log(e1player.currentTime)
        console.log(prevcookie.time)
  
        e1player.playbackRate = prevcookie.speed;
        updateButtons();
      }, 500)




      }
  }
  updateButtons();
  saver = setInterval(()=>{
    let current = document.cookie;
    document.cookie = `wasSomewhere=true` ;
    document.cookie =  `ep=${curr};`
    document.cookie = `time=${e1player.currentTime}`
    document.cookie = `speed=${e1player.playbackRate}`;
    document.cookie = `speed=${e1player.playbackRate}; `;
    var someDate = new Date();
    var result = someDate.setDate(someDate.getDate() + 3 );
    document.cookie = `expires=${someDate.toUTCString()}`
  
  }, 1000)

}



function updateButtons(){
  document.getElementById("prevep").innerText="Go to episode " + ((curr - 1 + eps.length) % eps.length + 1);
  document.getElementById("nextep").innerText="Go to episode " + ((curr-  -1 ) % eps.length  + 1)  ;
  document.getElementById("play").innerText="Play/Pause\nepisode " + (curr - -1) ;

}
function nextep(){
  curr ++;
  curr = curr % eps.length
  e1player.update({
      title: 'Episode ' + (curr + 1),
      artist: 'Fiasco',
      src:  eps[curr]}
    )
  updateButtons();


}

  function prevep(){
    curr --;
    curr = (curr + eps.length )% eps.length
    e1player.update(
      {
        title: 'Episode ' + (curr + 1),
        artist: 'Fiasco',
        src:  eps[curr]
      }
    )
  updateButtons();

  }
  
  

function play(){
  e1player.toggle();
}




