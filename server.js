/************************/
/* CONFIG               */
/************************/

const START_PLAYER_ID = 308;
const API_URL = "https://fdnd.directus.app/items/person";
const PAGE_LIMIT = 100;

/*********/
/* STATE */
/*********/

let players = [];
let currentIndex = 0;

/*******************/
/* FETCH ALL PAGES */
/*******************/

async function fetchAllPlayers() {
  let allPlayers = [];
  let offset = 0;
  let hasMore = true;

  try {
    while (hasMore) {
      const url = `${API_URL}?limit=${PAGE_LIMIT}&offset=${offset}`;
      const response = await fetch(url);
      const { data } = await response.json();

      allPlayers.push(...data);
      offset += PAGE_LIMIT;

      if (data.length < PAGE_LIMIT) {
        hasMore = false;
      }
    }
  } catch (err) {
    console.error("Fout bij ophalen van pagina’s:", err);
  }

  return allPlayers;
}

/*******************/
/* INITIALIZE DATA */
/*******************/

async function getInfo() {
  players = await fetchAllPlayers();

  if (!players.length) {
    console.warn("Geen spelers opgehaald");
    return;
  }

  // Zoek start-ID
  const startIndex = players.findIndex(
    (p) => Number(p.id) === Number(START_PLAYER_ID),
  );

  currentIndex = startIndex !== -1 ? startIndex : 0;

  showPlayer(currentIndex);
}

const errorEl = document.querySelector(".id-error");

function showIdError(msg) {
  if (errorEl) errorEl.textContent = msg;
}

function clearIdError() {
  if (errorEl) errorEl.textContent = "";
}

const idInput = document.getElementById("player-id");
const loadBtn = document.getElementById("load-player");

function handleLoadById() {
  const value = idInput.value.trim();
  if (!value) return;

  showPlayerById(value);
}

// Klik op knop
loadBtn?.addEventListener("click", handleLoadById);

// Enter in input
idInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleLoadById();
  }
});

/*******************/
/* SEARCH PLAYER */
/*******************/

function showPlayerById(id) {
  const index = players.findIndex((p) => Number(p.id) === Number(id));

  if (index === -1) {
    showIdError(`Geen speler gevonden met ID ${id}`);
    return;
  }

  clearIdError();
  showPlayer(index);
}

/*****************/
/* RENDER PLAYER */
/*****************/

function renderPlayer(player) {
  if (!player) return;

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.dataset.field;
    const value = player[key];

    if (!value) {
      el.textContent = "";
      return;
    }

    if (el.tagName === "A") {
      el.textContent = value;
      el.href = `https://github.com/${value}`;
    } else {
      el.textContent = value;
    }
  });

  syncGlitchText();
  restartBoot();
}

/*********************/
/* PLAYER NAVIGATION */
/*********************/

function showPlayer(index) {
  currentIndex = (index + players.length) % players.length;
  renderPlayer(players[currentIndex]);
}

/**********************/
/* GLITCH / BOOT SYNC */
/**********************/

const nameSpan = document.querySelector('[data-field="name"]');
const h1 = document.querySelector(".player-name.glitch");

function syncGlitchText() {
  if (!nameSpan || !h1) return;
  h1.dataset.text = nameSpan.textContent.trim();
}

function restartBoot() {
  if (!h1) return;
  h1.classList.remove("boot");
  void h1.offsetWidth; // force reflow
  h1.classList.add("boot");
}

/*********************/
/* MUTATION OBSERVER */
/*********************/

if (nameSpan) {
  const obs = new MutationObserver(syncGlitchText);
  obs.observe(nameSpan, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

/*********************/
/* READY TO RIDE BTN */
/*********************/

document.querySelector(".start-button")?.addEventListener("click", () => {
  const target = document.querySelector("#section-2");
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
});

/****************/
/* OPTIONAL NAV */
/****************/

document.getElementById("next-player")?.addEventListener("click", () => {
  showPlayer(currentIndex + 1);
});

document.getElementById("prev-player")?.addEventListener("click", () => {
  showPlayer(currentIndex - 1);
});

/*********/
/* START */
/*********/

getInfo();
