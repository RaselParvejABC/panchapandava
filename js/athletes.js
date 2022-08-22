// States

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

const athleteActions = {
  select: "select",
  deselect: "deselect",
  noChance: "no-chance",
};

// Populating Athletes Arena
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
                data-athlete-index="${index}" data-athlete-action="${athleteActions.select}"
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

// Used-more-than-once Document Queries
const selectedAthletesListElement = document.querySelector(
  "#selected-athletes-arena > ol"
);

const arrayOfAthleteSelectionButtons = Array.from(
  document.querySelectorAll("button.athlete-selection-button")
);

// Custom Events

const selectionChangedEvent = new Event("selection-changed-event");
const vacancyCreatedEvent = new Event("vacancy-created-event");
const noVacancyEvent = new Event("no-vacancy-event");

//Dispatching Custom Events
function dispatchAnEventOnElement(element, event) {
  element.dispatchEvent(event);
}
function dispatchAnEventOnEachElementOfArray(array, event) {
  array.forEach(function (element) {
    dispatchAnEventOnElement(element, event);
  });
}

// Selecting an Athlete

function selectAthlete(athleteIndex) {
  selectedAthletesIndices.unshift(athleteIndex);
  dispatchAnEventOnElement(selectedAthletesListElement, selectionChangedEvent);
  if (selectedAthletesIndices.length === 5) {
    dispatchAnEventOnEachElementOfArray(
      arrayOfAthleteSelectionButtons,
      noVacancyEvent
    );
  }
}

// Deselecting an Athlete

function deselectAthlete(athleteIndex) {
  selectedAthletesIndices.splice(
    selectedAthletesIndices.indexOf(athleteIndex),
    1
  );
  dispatchAnEventOnElement(selectedAthletesListElement, selectionChangedEvent);

  if (selectedAthletesIndices.length === 4) {
    dispatchAnEventOnEachElementOfArray(
      arrayOfAthleteSelectionButtons,
      vacancyCreatedEvent
    );
  }
}

// Athlete Selection Button Behavior

arrayOfAthleteSelectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", function () {
    console.log("Hello");
    const athleteIndex = this.closest(".athlete-card").dataset.athleteIndex;
    const athleteAction = this.closest(".athlete-card").dataset.athleteAction;
    if (athleteAction === athleteActions.select) {
      this.closest(".athlete-card").dataset.athleteAction =
        athleteActions.deselect;
      this.textContent = "Click to Deselect";
      this.classList.remove("btn-primary");
      this.classList.add("btn-secondary");
      selectAthlete(athleteIndex);
      return;
    }
    if (athleteAction === athleteActions.deselect) {
      this.closest(".athlete-card").dataset.athleteAction =
        athleteActions.select;
      this.textContent = "Click to Select";
      this.classList.remove("btn-secondary");
      this.classList.add("btn-primary");
      deselectAthlete(athleteIndex);
      return;
    }
    if (athleteAction === athleteActions.noChance) {
      new bootstrap.Modal("#no-vacancy-modal").show();
    }
  });

  selectionButton.addEventListener("no-vacancy-event", function () {
    if (
      this.closest(".athlete-card").dataset.athleteAction ===
      athleteActions.select
    ) {
      this.closest(".athlete-card").dataset.athleteAction =
        athleteActions.noChance;
      this.textContent = "No Vacancy";
      this.classList.remove("btn-primary");
      this.classList.add("btn-info");
    }
  });
  selectionButton.addEventListener("vacancy-created-event", function () {
    if (
      this.closest(".athlete-card").dataset.athleteAction ===
      athleteActions.noChance
    ) {
      this.closest(".athlete-card").dataset.athleteAction =
        athleteActions.select;
      this.textContent = "Click to Select";
      this.classList.remove("btn-info");
      this.classList.add("btn-primary");
    }
  });
});

// Selected Athletes List Behavior
selectedAthletesListElement.addEventListener(
  "selection-changed-event",
  function () {
    if (selectedAthletesIndices.length === 0) {
      this.innerHTML = "Your Selections will appear here.";
      return;
    }
    this.innerHTML = selectedAthletesIndices
      .map(function (athleteIndex) {
        return `<li>${allAthletesList[athleteIndex].name}</li>`;
      })
      .join("\n");
  }
);
