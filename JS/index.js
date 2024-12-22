import ui from "./UI.js";
import details from "./details.js";

async function getgames(category = "mmorpg") {
  const url = `https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games?category=${category}`;
  const loading = document.querySelector(".loading");
  loading.classList.remove("d-none");

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const displaygamesui = new ui();
    displaygamesui.displayDataGame(data);
    startEvent();
  } catch (error) {
    console.error("Failed to fetch games:", error);
    displayError("Failed to load games. Please try again later.");
  } finally {
    loading.classList.add("d-none");
  }
}

function fetchcategory() {
  getgames("mmorpg");

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      document.querySelector(".menu .active").classList.remove("active");
      e.target.classList.add("active");

      const category = e.target.dataset.category;
      getgames(category);
    });
  });
}

export function startEvent() {
  document.querySelectorAll(".card").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      showDetails(id);
    });
  });
}

export function showDetails(idGame) {
  document.querySelector(".games").classList.add("d-none");
  document.querySelector(".details").classList.remove("d-none");

  const displaydetailsui = new details();
  displaydetailsui.getDetails(idGame);
}

function displayError(message) {
  const container = document.querySelector(".games");
  container.innerHTML = `<p>${message}</p>`;
}

fetchcategory();