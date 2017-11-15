const URL = './videos.json';

class Videos {

}

class Player {




    fullscreen() {
      const { video } = this;

      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    }
}

load() {
  const request = new XMLHttpRequest();

  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status <400) {
      const data = JSON.parse(request.response);
      this.loadCategories(data.videos, data.categories)
    }
    else
    this.error
    }
  }

  request.onerror = () => {
    this.error();
  }

  request.send();
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
