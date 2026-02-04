getInfo();

async function getInfo() {
  const url = "https://fdnd.directus.app/items/person/308";
  const response = await fetch(url);
  const { data } = await response.json();

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.dataset.field;
    el.textContent = data[key] ?? "";
  });
}
