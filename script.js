let pet = {
  species: "",
  name: "",
  hunger: 100,
  happiness: 100,
  age: 0
};

let selectedSpecies = "";

function selectPet(species) {
  selectedSpecies = species;
  document.querySelectorAll("#pet-options img").forEach(img => img.classList.remove("selected"));
  document.querySelector(`img[alt="${species.charAt(0).toUpperCase() + species.slice(1)}"]`).classList.add("selected");
}

function startGame() {
  const nameInput = document.getElementById("petNameInput").value.trim();

  if (!selectedSpecies || !nameInput) {
    alert("Please select a pet and enter a name.");
    return;
  }

  pet.species = selectedSpecies;
  pet.name = nameInput;
  pet.hunger = 100;
  pet.happiness = 100;
  pet.age = 0;

  savePet();
  initGame();
}

function savePet() {
  localStorage.setItem("petData", JSON.stringify(pet));
  localStorage.setItem("lastVisit", Date.now());
}

function loadPet() {
  const savedPet = localStorage.getItem("petData");
  const lastVisit = localStorage.getItem("lastVisit");

  if (savedPet && lastVisit) {
    pet = JSON.parse(savedPet);
    const now = Date.now();
    const minsGone = Math.floor((now - lastVisit) / 60000);

    pet.hunger = Math.max(0, pet.hunger - minsGone * 2);
    pet.happiness = Math.max(0, pet.happiness - minsGone * 1);
    pet.age += Math.floor(minsGone / 60);

    alert(`You were gone for ${minsGone} minutes. ${pet.name} missed you!`);
  }
}

function updateUI() {
  document.getElementById("stats").innerHTML = `
    Name: ${pet.name}<br>
    Species: ${pet.species}<br>
    Age: ${pet.age}<br>
    Hunger: ${pet.hunger}/100<br>
    Happiness: ${pet.happiness}/100
  `;

  let imagePath = `img/${pet.species}.png`;

  if (pet.hunger <= 20 || pet.happiness <= 20) {
    imagePath = `img/sad.png`; // Optional sad image
  }

  document.getElementById("petImage").src = imagePath;
}

function feedPet() {
  pet.hunger = Math.min(100, pet.hunger + 20);
  updateUI();
  savePet();
}

function playWithPet() {
  pet.happiness = Math.min(100, pet.happiness + 15);
  updateUI();
  savePet();
}

function initGame() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  updateUI();

  setInterval(() => {
    pet.hunger = Math.max(0, pet.hunger - 1);
    pet.happiness = Math.max(0, pet.happiness - 1);
    updateUI();
    savePet();
  }, 60000);
}

// MAIN ENTRY
window.onload = () => {
  const existingPet = localStorage.getItem("petData");

  if (existingPet) {
    loadPet();
    initGame();
  } else {
    document.getElementById("setup").classList.remove("hidden");
  }
};
