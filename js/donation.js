//Document Queries

const donationForPerPlayerInputField = document.querySelector(
  "#donation-for-per-player"
);
const donationForManagerInputField = document.querySelector(
  "#donation-for-manager"
);
const donationForCoachInputField = document.querySelector(
  "#donation-for-coach"
);

const calculateTotalForAthletesButton = document.querySelector(
  "#calculate-total-for-athletes"
);
const calculateTotalDonationButton = document.querySelector(
  "#calculate-total-donation"
);

const totalDonationForPlayersElement = document.querySelector(
  "#total-donation-for-players"
);
const totalDonationElement = document.querySelector("#total-donation");

//Handling Selection Changed Event: Clearing Calculations
donationCalculator.addEventListener("selection-changed-event", function () {
  totalDonationForPlayersElement.textContent = 0;
  totalDonationElement.textContent = 0;
});

//Validating User Input on Input Fields
[
  donationForPerPlayerInputField,
  donationForManagerInputField,
  donationForCoachInputField,
].forEach((inputField) => {
  inputField.addEventListener("input", function (event) {
    const newCharacter = event.data;
    const isInsertEvent = event.inputType.startsWith("insert");
    if (isInsertEvent && (newCharacter < "0" || newCharacter > "9")) {
      new bootstrap.Modal("#wrong-input-modal").show();
      this.value = Number(this.value.slice(0, -1));
      return;
    }
    if (isInsertEvent) {
      this.value = Number(this.value);
    }
  });

  inputField.addEventListener("blur", function () {
    this.value = Number(this.value);
    //Ensures there is always a number in the input field before calculation
  });
});

//Calculate Buttons Event Handling
calculateTotalForAthletesButton.addEventListener("click", function () {
  const perPlayerDonation = Number(donationForPerPlayerInputField.value);
  const numberOfSelectedPlayers = selectedAthletesIndices.length;
  totalDonationForPlayersElement.textContent =
    perPlayerDonation * numberOfSelectedPlayers;
});

calculateTotalDonationButton.addEventListener("click", function () {
  const totalForPlayers = Number(totalDonationForPlayersElement.textContent);

  const forManager = Number(donationForManagerInputField.value);
  const forCoach = Number(donationForCoachInputField.value);

  totalDonationElement.textContent = totalForPlayers + forManager + forCoach;
});
