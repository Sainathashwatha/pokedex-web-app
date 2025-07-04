const container = document.getElementById('cards-container');
const search = document.getElementById('search');
let allPokemon = [];

fetch('http://localhost:3000/api/pokemon')
  .then(res => res.json())
  .then(data => {
    allPokemon = data;
    renderCards(data);
  });

function renderCards(data) {
  container.innerHTML = '';

  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="http://localhost:3000/images/${p.image_url}" />
        <h4>${p.name}</h4>
        <p>${p.type1}${p.type2 ? ' / ' + p.type2 : ''}</p>
        <small>HP: ${p.hp}, ATK: ${p.attack}</small><br/>
        <button onclick="addToCompare(${p.id})">Compare</button>
      </div>
    `;
  });

   gsap.from('.card', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6
  });
}


search.addEventListener('input', () => {
  const filtered = allPokemon.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  );
  renderCards(filtered);
});

document.getElementById('addForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  fetch('http://localhost:3000/api/pokemon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(res => {
      alert('Pokémon added!');
      location.reload(); // Refresh to see the new Pokémon
    });
});



document.getElementById('sort').addEventListener('change', function () {
  const value = this.value;
  let sorted = [...allPokemon];

  if (value === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === 'attack') {
    sorted.sort((a, b) => b.attack - a.attack);
  } else if (value === 'speed') {
    sorted.sort((a, b) => b.speed - a.speed);
  }
  renderCards(sorted);
});


let compareList = [];

function addToCompare(id) {
  const selected = allPokemon.find(p => p.id === id);
  if (!compareList.includes(selected)) {
    compareList.push(selected);
  }
  if (compareList.length === 2) {
    showCompare(compareList[0], compareList[1]);
    compareList = [];
  }
}

function showCompare(p1, p2) {
  const modal = document.getElementById('compareModal');
  const grid = document.getElementById('compareGrid');

  const winnerClass = (val1, val2) => val1 > val2 ? 'winner' : '';

  grid.innerHTML = `
    <div class="card compare-card">
      <img src="http://localhost:3000/images/${p1.image_url}" />
      <h3>${p1.name}</h3>
      <p>Type: ${p1.type1}${p1.type2 ? ' / ' + p1.type2 : ''}</p>
      <p class="${winnerClass(p1.hp, p2.hp)}">HP: ${p1.hp}</p>
      <p class="${winnerClass(p1.attack, p2.attack)}">Attack: ${p1.attack}</p>
      <p class="${winnerClass(p1.defense, p2.defense)}">Defense: ${p1.defense}</p>
      <p class="${winnerClass(p1.speed, p2.speed)}">Speed: ${p1.speed}</p>
    </div>

    <div class="card compare-card">
      <img src="http://localhost:3000/images/${p2.image_url}" />
      <h3>${p2.name}</h3>
      <p>Type: ${p2.type1}${p2.type2 ? ' / ' + p2.type2 : ''}</p>
      <p class="${winnerClass(p2.hp, p1.hp)}">HP: ${p2.hp}</p>
      <p class="${winnerClass(p2.attack, p1.attack)}">Attack: ${p2.attack}</p>
      <p class="${winnerClass(p2.defense, p1.defense)}">Defense: ${p2.defense}</p>
      <p class="${winnerClass(p2.speed, p1.speed)}">Speed: ${p2.speed}</p>
    </div>
  `;

  modal.style.display = 'block';

   gsap.from('.modal-content', {
    y: -100,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });
}


document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('compareModal').style.display = 'none';
});

 window.addEventListener('click', (e) => {
  const modal = document.getElementById('compareModal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
