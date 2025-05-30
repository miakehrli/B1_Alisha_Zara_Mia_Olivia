document
  .getElementById("gewinnspiel-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const fehlerDiv = document.getElementById("fehler");
    const spinner = document.getElementById("spinner");

    const daten = {
      vorname: form.vorname.value.trim(),
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      score: form.score.value.trim(),
    };

    // Vorname check

    if (!daten.vorname || daten.vorname.length < 2) {
      fehlerDiv.textContent = "❌ Bitte einen gültigen Vornamen eingeben.";
      return;
    }

    // Name check

    if (!daten.name || daten.name.length < 2) {
      fehlerDiv.textContent = "❌ Bitte einen gültigen Nachnamen eingeben.";
      return;
    }

    // einfache E-Mail-Validierung
    if (!daten.email.includes("@")) {
      fehlerDiv.textContent = "❌ Bitte gültige E-Mail-Adresse eingeben.";
      return;
    }

    fehlerDiv.textContent = "";
    spinner.style.display = "block";

    try {
      // Prüfen, ob E-Mail schon existiert
      const sql = `SELECT * FROM formular WHERE email = '${daten.email}'`;
      const vorhandene = await databaseClient.executeSqlQuery(sql);
      if (vorhandene[1] && vorhandene[1].length > 0) {
        fehlerDiv.textContent = "⚠️ Diese E-Mail ist bereits registriert.";
        spinner.style.display = "none";
        return;
      }

      // Neue Daten speichern
      await databaseClient.insertInto("formular", daten);
      alert("✅ Danke für deine Teilnahme!");
      form.reset();
    } catch (err) {
      console.error(err);
      fehlerDiv.textContent = "❌ Fehler beim Speichern.";
    } finally {
      spinner.style.display = "none";
    }
  });
