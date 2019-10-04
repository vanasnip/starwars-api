const find = (query) => {
  return document.querySelector(query);
}
const input = document.getElementById('searchTxt');
const btn = document.getElementById('searchBtn');
const body = find('body');
let mainDivContainer;
function createMainDiv() {
  mainDivContainer = document.createElement('div');
  mainDivContainer.id = 'main-div';
  body.appendChild(mainDivContainer);
}
function clearMainDiv() {
  mainDivContainer.remove();
}

const searchStars = async function (search) {
  const raw = await fetch(`https://swapi.co/api/people/?search=${search}`);
  const data = await raw.json();
  displayData(data, search);
}
const fetchNextPrev = async function (url) {
  const raw = await fetch(url);
  const data = await raw.json();
  displayData(data);
}


const runSearch = (val) => {
  const mainDiv = find('#main-div');
  if (mainDiv) mainDiv.remove();
  createMainDiv();
  searchStars(val);
  input.value = ''; //clear input
  btn.disabled = true;
}

input.onkeyup = ev => {
  let val = ev.target.value
  let { keyCode } = ev;
  if (val !== '') {
    btn.disabled = false
    if (keyCode === 13) {
      runSearch(val);
    }
  } else {
    btn.disabled = true;
  }
}
btn.onclick = () => {
  runSearch(input.value);
}

function displayCount(count) {
  find('body')
}

const displayData = (data, search) => {
  const { results, count, next, previous } = data;

  buildCountDisplay(count, search);
  buildResultsTiles(results);
  if (count > 10) {
    addNextPreBtn(next, previous);
  }
  console.log(data);
}
const addNextPreBtn = (next, prev) => {
  let btn, direction;
  const resCount = find('#result-count');

  [next, prev].forEach((url, i) => {
    btn = document.createElement('button');
    btn.onclick = () => {
      const res = find(`.results`);
      Object.values(res.children).forEach(child => child.remove());
      fetchNextPrev(url)
    };
    direction = i === 0 ? 'next' : 'prev';
    btn.innerText = direction;
    if (find(`.${direction}-res`)) find(`.${direction}-res`).remove();
    btn.className = `${direction}-res`;
    resCount.appendChild(btn);
  })
}
const buildCountDisplay = (count, search) => {
  if (!find('#result-count')) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = `results for "${search}", returned ${count} results`;
    div.id = 'result-count';
    div.appendChild(p);
    mainDivContainer.appendChild(div);
  }
}

const buildResultsTiles = (results) => {
  let uList = find('.results');
  if (!uList) {
    uList = document.createElement('ul');
    uList.className = 'results';
    mainDivContainer.appendChild(uList);
  }
  results.forEach(result => {
    const { name } = result;
    const li = document.createElement('li');
    li.className = 'res-tile';
    const p = document.createElement('p');
    p.innerText = name;
    li.appendChild(p);
    uList.appendChild(li);
  })
}

