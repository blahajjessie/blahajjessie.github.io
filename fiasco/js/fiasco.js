
var eps = ["fiasco/fiasco1.m4a", "fiasco/fiasco2.m4a", "fiasco/fiasco3.mp3"]
var curr  = 2;
var e1player
window.onload=()=>{
   e1player = new Shikwasa.Player({
    container: document.querySelector('.fiascoe1'),
    themeColor: '#000000',
    audio: {
      title: 'Episode ' + (curr + 1),
      artist: 'Fiasco',
      cover: 'https://shikwasa.js.org/assets/logo.png',
      src: 'fiasco/fiasco' + (curr + 1 )+ '.m4a',
    }
  })
  

}

function nextep(){
  curr ++;
  curr = curr % eps.length
  e1player = new Shikwasa.Player({
    container: document.querySelector('.fiascoe1'),
    themeColor: '#000000',
    audio: {
      title: 'Episode ' + (curr + 1),
      artist: 'Fiasco',
      cover: 'https://shikwasa.js.org/assets/logo.png',
      src: 'fiasco/fiasco' + (curr + 1 )+ '.m4a'
    }
  })

}


