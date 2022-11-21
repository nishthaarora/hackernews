export function getLocalStorageItems() {
  return JSON.parse(localStorage.getItem("saved") || "[]");
}
