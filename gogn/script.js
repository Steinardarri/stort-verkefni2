const URL = './videos.json';

class Videos {
  constructor(container) {
    this.container = container;
  }

  loadCategories(videos, categories) {
    console.log('loadCategories()');
    this.videosArray = videos;

    const loading = document.querySelector('.video__loading');
    this.container.removeChild(loading);

    // Kallar á createCategories() fyrir hvert object í categories fylkinu
    for (let i = 0; i < categories.length; i += 1) {
      this.createCategories(categories[i]);
    }
  }

  createCategories(catObj) {
    console.log('createCategories()');

    const categoryRow = document.createElement('div');
    categoryRow.classList.add('category');
    categoryRow.classList.add('row');

    const heading = document.createElement('h2');
    heading.classList.add('category__heading');
    console.log(catObj.title);
    heading.appendChild(document.createTextNode(catObj.title));
    categoryRow.appendChild(heading);

    const videoList = document.createElement('div');
    videoList.classList.add('category__videolist');
    // this.videoList = videoList;
    for (let i = 0; i < catObj.videos.length; i += 1) {
      const videoDiv = this.createVideo(catObj.videos[i], videoList);
      videoList.appendChild(videoDiv);
    }
    categoryRow.appendChild(videoList);

    console.log(catObj.videos);

    this.container.appendChild(categoryRow);
  }

  createVideo(id) {
    console.log('createVideos()');
    const videoObj = this.videosArray.find(x => x.id === id);

    const videoDiv = document.createElement('a');
    videoDiv.href = 'player.html?id=' + id;
    videoDiv.classList.add('category__video');
    videoDiv.classList.add('col');
    videoDiv.classList.add('col-6');

    const videoDivImage = document.createElement('img');
    videoDivImage.classList.add('category__video__image');
    videoDivImage.setAttribute('src', videoObj.poster);
    // videoDivImage.style.backgroundImage = `url('${videoObj.poster}')`;
    videoDiv.appendChild(videoDivImage);

    const videoDivDuration = document.createElement('p');
    videoDivDuration.classList.add('category__video__duration');
    const duration = this.parseDuration(videoObj.duration);
    videoDivDuration.appendChild(document.createTextNode(duration));
    videoDiv.appendChild(videoDivDuration);

    const videoDivTitle = document.createElement('h3');
    videoDivTitle.classList.add('category__video__title');
    videoDivTitle.appendChild(document.createTextNode(videoObj.title));
    videoDiv.appendChild(videoDivTitle);

    const videoDivDate = document.createElement('p');
    videoDivDate.classList.add('category__video__date');
    const date = this.parseDate(videoObj.created);
    videoDivDate.appendChild(document.createTextNode(date));
    videoDiv.appendChild(videoDivDate);

    return videoDiv;
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
    // Fær inn lengd myndbands í sekúndum og breytir í mínútur:sekúndur
    const minutes = Math.round(duration / 60);
    let sm = minutes.toString();
    if (sm.length === 1) sm = 0 + sm;
    const seconds = Math.round(duration % 60);
    let ss = seconds.toString();
    if (ss.length === 1) ss = 0 + ss;

    return `${sm}:${ss}`;
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
  constructor(container) {
    this.container = container;
    this.videoObj = null;
  }

  loadVideo(id, videos) {
    this.videosArray = videos;
    const videoObj = this.videosArray.find(x => x.id === id);

    if (!videoObj) {
      this.error('Vídeó er ekki til');
    } else {
      console.log('empty');
      // this.empty(this.container);
      const loading = document.querySelector('.video__loading');
      this.container.removeChild(loading);

      console.log('header');
      const titleElement = document.createElement('h1');
      titleElement.classList.add('title');
      titleElement.appendChild(document.createTextNode(videoObj.title));
      const headerContainer = document.querySelector('.header');
      headerContainer.appendChild(titleElement);

      console.log('video');
      this.createVideo(videoObj);
    }
  }

  createVideo(video) {
    // const {
    //  video: src,
    //  poster,
    // } = video;

    const videoElement = document.createElement('video');
    videoElement.src = video;
    videoElement.classList.add('player__video');
    videoElement.autoplay = true;
    videoElement.setAttribute('poster', video.poster);
    videoElement.setAttribute('src', video.video);
    this.container.appendChild(videoElement);
    this.videoObj = videoElement;
  }

  controls() {

    console.log('controls()');

    const controlContainer = document.querySelector('.controls');

    const backwardsButton = document.createElement('button');
    backwardsButton.classList.add('button');
    backwardsButton.classList.add('button__backwards');
    backwardsButton.addEventListener('click', this.onBackClick.bind(this));
    controlContainer.appendChild(backwardsButton);

    const playPauseButton = document.createElement('button');
    playPauseButton.classList.add('button');
    playPauseButton.classList.add('button__play');
    playPauseButton.addEventListener('click', this.onPlayPause.bind(this));
    // playPauseButton.addEventListener('click', this.onPlayPause(playPauseButton));
    controlContainer.appendChild(playPauseButton);

    const muteButton = document.createElement('button');
    muteButton.classList.add('button');
    muteButton.classList.add('button__mute');
    muteButton.addEventListener('click', this.onMute.bind(this));
    // muteButton.addEventListener('click', this.onMuteButton);
    controlContainer.appendChild(muteButton);

    const fullscreenButton = document.createElement('button');
    fullscreenButton.classList.add('button');
    fullscreenButton.classList.add('button__fullscreen');
    fullscreenButton.addEventListener('click', this.onFullscreen.bind(this));
    controlContainer.appendChild(fullscreenButton);

    const forwardsButton = document.createElement('button');
    forwardsButton.classList.add('button');
    forwardsButton.classList.add('button__forwards');
    forwardsButton.addEventListener('click', this.onForwardClick.bind(this));
    controlContainer.appendChild(forwardsButton);
  }

  onForwardClick() {
    this.videoObj.currentTime += 3;
  }

  onBackClick() {
    this.videoObj.currentTime -= 3;
  }

  onPlayPause() {
    if (this.videoObj.paused) {
      this.videoObj.play();
    } else {
      this.videoObj.pause();
    }
  }

  onPlayPauseButton(button) {
    if (button.classList.contains('button__play')) {
      button.classList.remove('button__play');
      button.classList.add('button__pause');
    } else {
      button.classList.remove('button__pause');
      button.classList.add('button__play');
    }
  }

  onFullscreen() {
    if (this.videoObj.requestFullscreen) {
      this.videoObj.requestFullscreen();
    } else if (this.videoObj.mozRequestFullscreen) {
      this.videoObj.mozRequestFullscreen();
    } else if (this.videoObj.webkitRequestFullscreen) {
      this.videoObj.webkitRequestFullscreen();
    }
  }

  onMute() {
    if (this.videoObj.muted) {
      this.videoObj.muted = false;
    } else {
      this.videoObj.muted = true;
    }
  }

  onMuteButton(button) {
    if (button.classList.contains('button__unmute')) {
      button.classList.remove('button__unmute');
      button.classList.add('button__mute');
    } else {
      button.classList.remove('button__mute');
      button.classList.add('button__unmute');
    }
  }


  load() {
    const request = new XMLHttpRequest();
    const qs = new URLSearchParams(window.location.search);

    const id = parseInt(qs.get('id'), 10);
    request.open('GET', URL, true);
    request.onload = () => {
      console.log('onload');
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.response);
        console.log('loadVideo')
        this.loadVideo(id, data.videos);
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

document.addEventListener('DOMContentLoaded', () => {
  const videosContainer = document.querySelector('.videos');
  const playerContainer = document.querySelector('.player');

  const videos = new Videos(videosContainer);
  const player = new Player(playerContainer);

  if (videosContainer) {
    console.log('loadV');
    videos.load();
  } else {
    console.log('loadP');
    player.load();
    player.controls();
  }
});
