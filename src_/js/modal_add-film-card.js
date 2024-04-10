// ----- IMPORT

import { optionsIMDB } from './api/imdb-api';

// ----- DECLARATIONS

let queueFilms = [];
let uniqQueueFilms = [];

export let watchFilms = [];
let uniqFilms = [];

// ----- FUNCTIONS | dataSaveWatch

export const dataSaveWatch = function (data) {
  if (localStorage.watched) {
    watchFilms = JSON.parse(localStorage.watched);
  }
  if (localStorage.queue) {
    const storedFilms = JSON.parse(localStorage.queue);

    for (let i = 0; i < storedFilms.length; i++) {
      if (storedFilms[i].id === data.id) {
        storedFilms.splice(i, 1);
        queueFilms = [];
      }
    }
    localStorage.queue = JSON.stringify(storedFilms);
  }

  watchFilms.push(data);
  uniqFilms = uniqBy(watchFilms, 'id');

  localStorage.setItem('watched', JSON.stringify(uniqFilms));
};

// ----- FUNCTIONS | removeSaveWatch

export const removeSaveWatch = function (data) {
  if (localStorage.watched) {
    watchFilms = JSON.parse(localStorage.watched);
  }
  if (localStorage.queue) {
    const storedFilms = JSON.parse(localStorage.queue);
    for (let i = 0; i < storedFilms.length; i++) {
      if (storedFilms[i].id === data.id) {
        storedFilms.splice(i, 1);
        queueFilms = [];
      }
    }
    localStorage.queue = JSON.stringify(storedFilms);
  }
  watchFilms.push(data);
  uniqFilms = uniqBy(watchFilms, 'id');

  unselectBtnStatus = optionsIMDB.specs.unselectBtn;
  console.log(uniqFilms);

  const copyItems = [];
  for (let i = 0; i < uniqFilms.length; i++) {
    copyItems.push(uniqFilms[i].id);
  }
  let dataIndex = copyItems.indexOf(data.id);

  uniqFilms.splice(dataIndex, 1);
  localStorage.setItem('watched', JSON.stringify(uniqFilms));
};

// ----- FUNCTIONS | dataSaveQueue

export const dataSaveQueue = function (data) {
  if (localStorage.queue) {
    queueFilms = JSON.parse(localStorage.queue);
  }

  if (localStorage.watched) {
    const storedFilms = JSON.parse(localStorage.watched);

    for (let i = 0; i < storedFilms.length; i++) {
      if (storedFilms[i].id === data.id) {
        storedFilms.splice(i, 1);
        watchFilms = [];
      }
    }
    localStorage.watched = JSON.stringify(storedFilms);
  }

  //if ((unselectBtnStatus = 1)) {
  queueFilms.push(data);
  uniqQueueFilms = uniqBy(queueFilms, 'id');
  localStorage.setItem('queue', JSON.stringify(uniqQueueFilms));
  //}
};

// ----- FUNCTIONS | removeSaveQueue

export const removeSaveQueue = function (data) {
  if (localStorage.queue) {
    queueFilms = JSON.parse(localStorage.queue);
  }

  if (localStorage.watched) {
    const storedFilms = JSON.parse(localStorage.watched);

    for (let i = 0; i < storedFilms.length; i++) {
      if (storedFilms[i].id === data.id) {
        storedFilms.splice(i, 1);
        watchFilms = [];
      }
    }
    localStorage.watched = JSON.stringify(storedFilms);
  }

  queueFilms.push(data);
  uniqQueueFilms = uniqBy(queueFilms, 'id');

  const copyItems = [];
  for (let i = 0; i < uniqQueueFilms.length; i++) {
    copyItems.push(uniqQueueFilms[i].id);
  }
  let dataIndex = copyItems.indexOf(data.id);

  uniqQueueFilms.splice(dataIndex, 1);

  localStorage.setItem('queue', JSON.stringify(uniqQueueFilms));
  //}
};

// ----- FUNCTIONS | uniqBy

const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : o => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};
