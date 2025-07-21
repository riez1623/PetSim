let pet = {
  name: "Riezachu",
  hunger: 100,
  happiness: 100,
  age: 0
};

function savePet() {
  localStorage.setItem("petData", JSON.stringify(pet));
  localStorage.setItem("lastVisit", Date.now());
}

function loadPet() {
  let savedPet = localStorage.getItem("petData");
  let lastVisit = localStorage.getItem("lastVisit");

  if (savedPet && lastVisit) {
    pet = JSON.parse(savedPet);
    let now = Date.now();
    let minsGone = Math.floor((now - lastVisit) / 60000); // ms to mins

    pet.hunger = Math.max(0, pet.hunger - minsGone * 2);
    pet.happiness = Math.max(0, pet.happiness - minsGone * 1);
    pet.age += Math.floor(minsGone / 60);

    alert(`You were gone for ${minsGone} minutes.\nYour pet missed you! 🥺`);
  }
}

function updateUI() {
  document.getElementById("stats").innerHTML = `
    Name: ${pet.name}<br>
    Age: ${pet.age}<br>
    Hunger: ${pet.hunger}/100<br>
    Happiness: ${pet.happiness}/100
  `;

  const petEmoji = pet.hunger <= 20 || pet.happiness <= 20 ? "😢" : "🐶";
  document.getElementById("pet").textContent = petEmoji;
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

// Start the app
window.onload = () => {
  loadPet();
  updateUI();

  // Slowly reduce stats every minute
  setInterval(() => {
    pet.hunger = Math.max(0, pet.hunger - 1);
    pet.happiness = Math.max(0, pet.happiness - 1);
    updateUI();
    savePet();
  }, 60000);
};
