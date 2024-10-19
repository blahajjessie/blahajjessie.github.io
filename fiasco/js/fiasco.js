
var eps = ["fiasco/fiasco1.m4a", "fiasco/fiasco2.m4a", "fiasco/fiasco3.mp3", "fiasco/fiascoe4.opus"]
var curr  = 2;
var e1player
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
    }
  })

  document.body.style.zoom = "200%";
  

}

function nextep(){
  curr ++;
  curr = curr % eps.length
  e1player.update({
      title: 'Episode ' + (curr + 1),
      artist: 'Fiasco',
      src:  eps[curr]}
    )
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
  }
  
  

function play(){
  e1player.toggle();
}




