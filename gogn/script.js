const URL = './videos.json';

class Videos {

}

class Player {

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
