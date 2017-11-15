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
