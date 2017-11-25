const URL = './videos.json';

class Videos {
  constructor() {
    this.container = document.querySelector('.videos');
    console.log(typeof container);

  }

  loadCategories(videos, categories) {
    console.log('loadCategories()');
    this.videosArray = videos;

    const loading = document.querySelector('.video__loading');
    this.container.removeChild(loading);

    categories.forEach(this.createCategories);
    // Kallar á createCategories() fyrir hvert object í categories fylkinu
  }

  createCategories(catObj) {
    console.log('createCategories()');

    const categoryRow = document.createElement('div');
    categoryRow.classList.add('category');
    categoryRow.classList.add('row');

    const heading = document.createElement('h2');
    heading.classList.add('catergory__heading');
    console.log(catObj.title);
    heading.appendChild(document.createTextNode(catObj.title));
    categoryRow.appendChild(heading);

    const videoList = document.createElement('div');
    // this.videoList = videoList;
    videoList.classList.add('category__videolist');
    categoryRow.appendChild(videoList);

    console.log(catObj.videos);
    console.log(typeof container);

    this.container.appendChild(categoryRow);

    catObj.videos.forEach(this.createVideos);

  }

  createVideos(id) {
    console.log('createVideos()');
    const videoObj = this.videosArray.find(x => x.id === id);

    const videoDiv = document.createElement('a');
    // Setja href til videoObj.video
    videoDiv.classList.add('catergory__video');

    const videoDivImage = document.createElement('div');
    videoDivImage.classList.add('catergory__video__image');
    // Tengja við rétta mynd einhvernvegin => videoObj.poster
    videoDiv.appendChild(videoDivImage);

    const videoDivDuration = document.createElement('p');
    videoDivImage.classList.add('catergory__video__duration');
    const duration = this.parseDuration(videoObj.duration);
    videoDivDuration.appendChild(document.createTextNode(duration));
    videoDiv.appendChild(videoDivDuration);

    const videoDivTitle = document.createElement('h3');
    videoDivTitle.classList.add('catergory__video__title');
    videoDivTitle.appendChild(document.createTextNode(videoObj.title));
    videoDiv.appendChild(videoDivTitle);

    const videoDivDate = document.createElement('p');
    videoDivDate.classList.add('catergory__video__date');
    const date = this.parseDate(videoObj.created);
    videoDivDate.appendChild(document.createTextNode(date));
    videoDiv.appendChild(videoDivDate);

    videoList.appendChild(videoDiv);
  }

  parseDate(date) {
    const timeSince = Date.now() - date;

    // Strengur fyrir klukkutíma
    const hoursSince = Math.floor(timeSince / (1000 * 60 * 60));

    if (hoursSince === 1) {
      return `Fyrir ${hoursSince} klukkustund síðan`;
    }
    if (hoursSince < 24) {
      return `Fyrir ${hoursSince} klukkustundum síðan`;
    }

    // Strengur fyrir daga
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

    // Strengur fyrir mánuði
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

  parseDuration(duration) {
    // TODO athuga hvort þetta komi inn sem double tala.
    const hours = duration / 60;
    const seconds = duration % 60;

    return `${hours}:${seconds}`;
    // Fær inn lengd myndbands í sekúndum og breytir í mínútur:sekúndur
  }


  load() {
    const request = new XMLHttpRequest();

    request.open('GET', URL, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.response);
        this.loadCategories(data.videos, data.categories);
      } else {
        this.error();
      }
    };

    request.onerror = () => {
      this.error();
    };

    request.send();
  }
}

class Player {
  constructor() {
    this.playerContainer = document.querySelector('.player__container');
  }

  loadVideo(id, videos) {
    this.videosArray = videos;

    const videoObj = this.videosArray.find(x => x.id === id);

    if (!videoObj) {
      this.error('Vídeó er ekki til');
    } else {
      this.empty(this.playerContainer);
      this.setHeader(videoObj.title);
      this.createVideo(videoObj);
    }
  }

  createVideo(video) {
    const {
      video: src,
      poster,
    } = video;

    const videoElement = document.createElement('video');
    videoElement.classList.add('player__video');
    // videoElement.
  }

  controls() {
    // Býr til div fyrir takka og 5 takka div innan þess
    // - 'Backwards' takki sem fer 3 sek aftur til baka í myndbandinu
    // - 'Play/Pause' takki sem spilar eða pásar myndbandið
    // - 'Mute' takki sem slekkur á hljóði án þess að breyta hljóðstyrk
    // - 'Fullscreen' takki sem lur myndbandið taka allan skjáin
    // - 'Forwards' takki sem fer 3 sek fram í myndbandinu

    const {
      video,
    } = this;

    const backwardsButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // backwardsButton.classList.add('backwards');
    backwardsButton.classList.add('button');
    backwardsButton.addEventListener('click', video.currentTime -= 3);
    this.container.appendChild(backwardsButton);

    const playPauseButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // playPauseButton.classList.add('playPause');
    playPauseButton.classList.add('button');
    playPauseButton.addEventListener('click', this.playPause());
    this.container.appendChild(playPauseButton);

    const muteButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // muteButton.classList.add('mute');
    muteButton.classList.add('button');
    muteButton.addEventListener('click', this.mute());
    this.container.appendChild(muteButton);

    const fullscreenButton = document.createElement('button');
    // Tengja icon mynd við, sér klassi fyrir hvern takka ?
    // fullscreenButton.classList.add('fullscreen');
    fullscreenButton.classList.add('button');
    fullscreenButton.addEventListener('click', this.fullscreen());
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
      video,
    } = this;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  fullscreen() {
    const {
      video,
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
      video,
    } = this;

    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  }


  load() {
    const request = new XMLHttpRequest();
    const qs = new URLSearchParams(window.location.search);

    const id = parseInt(qs.get('id'), 10);
    request.open('GET', URL, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.response);
        this.loadVideo(id, data.videos);
      } else {
        this.error();
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new Videos();
  const player = new Player();

  const videosContainer = document.querySelector('.videos');

  if (videosContainer) {
    console.log('loadV');
    videos.load();
  } else {
    console.log('loadP');
    player.load();
    player.controls();
  }
});
