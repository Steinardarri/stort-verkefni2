const URL = './videos.json';

class Videos {

  loadCategories(videos, categories) {

    // Býr til div röð fyrir hvern 'categories'
      // Býr til <h2> með titil 'categories'
    // Býr til 'videos' div fyrir hvert myndband undir hverjum 'categories'
      // Smáḿynd, lengd myndbands í neðra hæra horni
      // Titill myndbands
      // Dagsetningar texti sem segir aldur myndbands

    const category = document.createElement('div');
    // Setja 'row' klassa
    const heading = document.createElement('h2');
    const video = document.createElement('div');
    // Setja 'video' klassa

    this.element.appendChild(

  }

  parseDate(date) {

    // Fær inn heiltölu dagsetningu myndbands (sekúndur síðan 1. jan 1970) og reiknar mismun frá núverandi dagsetningu
    // Skilar streng sem segir liðin tíma í dögum, vikum mánuðum eða árum
        // Notar aðeins efsta stig mögulegt
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
        // Byrjar á pásu
        // Ef myndbandið er á pásu þá kemur takki til að byrja það

  }

  controls() {

    // Býr til div fyrir takka og 5 takka div innan þess
        // 'Backwards' takki sem fer 3 sek aftur til baka í myndbandinu
        // 'Play/Pause' takki sem spilar eða pásar myndbandið
        // 'Mute' takki sem slekkur á hljóði án þess að breyta hljóðstyrk
        // 'Fullscreen' takki sem lur myndbandið taka allan skjáin
        // 'Forwards' takki sem fer 3 sek fram í myndbandinu

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
