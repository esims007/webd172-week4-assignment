const loadCarsButton = document.getElementById("loadCars");
const carOutput = document.getElementById("cars");
const carForm = document.getElementById("carForm");
const carIdInput = document.getElementById("carId");
const carResult = document.getElementById("carResult");

const displayCars = ({ id, make, model, year }) => `
  <article class="car">
    <p><strong>ID:</strong> ${id}</p>
    <h3>${make} ${model}</h3>
    <p><strong>Year:</strong> ${year}</p>
  </article>
`;

//Part 7 - Fetch the Data
loadCarsButton.addEventListener("click", async () => {
  const response = await fetch("/api/cars");
  const cars = await response.json();

  carOutput.innerHTML = cars.map(car => displayCars(car)).join("");
});

carForm.addEventListener("submit", async event=> {
  event.preventDefault();

  const id = carIdInput.value;
  const response = await fetch(`/api/cars/${id}`);
  const data = await response.json();

  if (!response.ok) {
    carResult.innerHTML = `<p class="error">${data.message}</p>`;
    return;
  }

  carResult.innerHTML = displayCars(data);
});