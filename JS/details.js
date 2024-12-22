import ui from "./UI.js";
const displaydetailsui = new ui();
export default class details {
  async getDetails(id) {
    const url = `https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/game?id=${id}`;
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      displaydetailsui.displayDetails(data);
    } catch (error) {
      console.error("Failed to fetch game details:", error);
    } finally {
      loading.classList.add("d-none");
    }
  }
}
