const allAthletesList = [
  { name: "Lionel Messi", image: "/img/1.png" },
  { name: "Neymar Jr", image: "/img/2.png" },
  { name: "Kylian Mbappé", image: "/img/3.png" },
  { name: "Vítor Machado", image: "/img/4.png" },
  { name: "Sergio Ramos", image: "/img/5.png" },
  { name: "Renato Sanches", image: "/img/6.png" },
  { name: "Adam Gilchrist", image: "/img/7.png" },
  { name: "Sachin Tendulkar", image: "/img/8.png" },
  { name: "Brendon McCullum", image: "/img/9.png" },
];

const selectedAthletesIndices = [];

function populateAthletesArena() {
  const athleteArenaElement = document.querySelector("section#athletes-arena");
  athleteArenaElement.innerHTML = "";

  allAthletesList.forEach(function (athlete, index) {
    athleteArenaElement.insertAdjacentHTML(
      "beforeend",
      `
        <div>
              <div
                class="p-0 pb-4 bg-black-50 border rounded-top athlete-card"
                data-athlete-index="${index}"
              >
                <img
                  src="${athlete.image}"
                  class="img-fluid w-100 rounded-top"
                  alt=""
                />
                <p class="pt-3 lead">${athlete.name}</p>
                <button type="button" class="btn btn-primary athlete-selection-button">
                  Click to Select
                </button>
              </div>
            </div>
    `
    );
  });
}

populateAthletesArena();

function populateSelectedAthletesArena() {
    
}
