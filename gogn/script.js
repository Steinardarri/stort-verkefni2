const URL = './videos.json';

class Videos {

  function loadCategories(title) {

    const container = document.createElement('div');
    container.className = 'category';
    
    const heading = document.createElement('h2');
    heading.className = 'catergory__heading';
    
    const videoListContainer = document.createElement('div');
    videoListContainer.className = 'category__videolist';
    
    const hr = document.createElement('hr');
    hr.classList.add('hr');
     
    heading.textContent = title;

    container.appendChild(heading);
    container.appendChild(videoListContainer);
    videosContainer.appendChild(container);
    videosContainer.appendChild(hr);

    return videoListContainer;

  }

  parseDate(date) {

    // Fær inn heiltölu dagsetningu myndbands (sekúndur síðan 1. jan 1970) og reiknar mismun frá núverandi dagsetningu
    // Skilar streng sem segir liðin tíma í dögum, vikum mánuðum eða árum
    // - Notar aðeins efsta stig mögulegt
    
   const timeSince = Date.now() - date;
   
    //Strengur fyrir klukkutíma
   const hoursSince = Math.floor(timeSince / (1000 * 60 * 60));
    
    if (hoursSince === 1) {
      return `Fyrir ${hoursSince} klukkustund síðan`;
    }
    if (hoursSince < 24) {
      return `Fyrir ${hoursSince} klukkustundum síðan`;
    }

    //Strengur fyrir daga 
    const daysSince = Math.floor(timeSince / (1000 * 60 * 60 * 24));
    if (daysSince === 1) {
      return `Fyrir ${daysSince} degi síðan`;
    }
    if (daysSince < 7) {
      return `Fyrir ${daysSince} dögum síðan`;
    }

    // Strengur fyrir vikur
    const weeksSince = Math.floor(daysSince / 7);
    if (weeksSince === 1) {
      return `Fyrir ${weeksSince} viku síðan`;
    }
    if (daysSince < 30) {
      return `Fyrir ${weeksSince} vikum síðan`;
    }

    //Strengur fyrir mánuði
    const monthsSince = Math.floor(daysSince / 30);
    if (monthsSince === 1) {
      return `Fyrir ${monthsSince} mánuði síðan`;
    }
    if (daysSince < 365) {
      return `Fyrir ${monthsSince} mánuðum síðan`;
    }

    // Strengur fyrir ár
    const yearsSince = Math.floor(daysSince / 365);
    if (yearsSince === 1) {
      return `Fyrir ${yearsSince} ári síðan`;
    }
    return `Fyrir ${yearsSince} árum síðan`;
  }
  }

  



  load() {
    const request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.response);
        this.loadCategories(data.videos, data.categories)
      } else
        this.error();
    }

    request.onerror = () => {
      this.error();
    }

    request.send();
  }

}

class Player {

  loadVideo(video) {

    // Býr til <h1> með titli myndbands
    // Býr til div fyrir myndband
    // - Byrjar á pásu
    // - Ef myndbandið er á pásu þá kemur takki til að byrja það

  }

  controls() {

    // Býr til div fyrir takka og 5 takka div innan þess
    // - 'Backwards' takki sem fer 3 sek aftur til baka í myndbandinu
    // - 'Play/Pause' takki sem spilar eða pásar myndbandið
    // - 'Mute' takki sem slekkur á hljóði án þess að breyta hljóðstyrk
    // - 'Fullscreen' takki sem lur myndbandið taka allan skjáin
    // - 'Forwards' takki sem fer 3 sek fram í myndbandinu

    const {
      video
    } = this;

    const backwardsButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // backwardsButton.classList.add('forwards');
    backwardsButton.classList.add('button');
    backwardsButton.addEventListener('click', video.currentTime -= 3);
    this.container.appendChild(backwardsButton);

    const playPauseButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // playPauseButton.classList.add('forwards');
    playPauseButton.classList.add('button');
    playPauseButton.addEventListener('click', playPause());
    this.container.appendChild(playPauseButton);

    const muteButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // muteButton.classList.add('forwards');
    muteButton.classList.add('button');
    muteButton.addEventListener('click', mute());
    this.container.appendChild(muteButton);

    const fullscreenButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // fullscreenButton.classList.add('forwards');
    fullscreenButton.classList.add('button');
    fullscreenButton.addEventListener('click', fullscreen());
    this.container.appendChild(fullscreenButton);

    const forwardsButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // forwardsButton.classList.add('forwards');
    forwardsButton.classList.add('button');
    forwardsButton.addEventListener('click', video.currentTime += 3);
    this.container.appendChild(forwardsButton);

  }

  playPause() {
    const {
      video
    } = this;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  fullscreen() {
    const {
      video
    } = this;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullscreen) {
      video.mozRequestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }

  }

  mute() {
    const {
      video
    } = this;

    if (video.muted) {
      video.muted = false
    } else {
      video.muted = true;
    }
  }

}



load() {

  // Býr til beiðni fyrir myndbandið sem notandi vill sjá
  // Tékkar villur, keyrir loadVideo() fallið ef engin villa kemur

  // Sendir beiðnina undir lokin
}

}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new Videos();
  const player = new Player();

  const videosContainer = document.querySelector('.videos');

  if (videosContainer) {
    videos.load();
  } else {
    player.load();
    player.controls();
  }

});
