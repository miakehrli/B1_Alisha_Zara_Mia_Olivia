document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  const produktKarten = document.querySelectorAll(".produkt-karte");
  const noResultsMessage = document.querySelector(".no-results-message");

  function filterProdukte() {
    const suchbegriff = searchInput.value.trim().toLowerCase();
    let treffer = 0;

    produktKarten.forEach((karte) => {
      const name = karte.getAttribute("data-name").toLowerCase();

      if (name.includes(suchbegriff)) {
        karte.style.display = "block";
        treffer++;
      } else {
        karte.style.display = "none";
      }
    });

    // Zeige oder verstecke die "Kein Produkt gefunden"-Meldung
    if (treffer === 0) {
      noResultsMessage.style.display = "block";
    } else {
      noResultsMessage.style.display = "none";
    }
  }

  searchButton.addEventListener("click", filterProdukte);
  searchInput.addEventListener("input", filterProdukte);
});
