
export function toggleTheme() {
  const body = document.body;
  const current = localStorage.getItem("theme") || "light";
  const newTheme = current === "light" ? "dark" : "light";
  body.className = newTheme === "light" ? "" : "theme-dark";
  localStorage.setItem("theme", newTheme);
}

export function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("theme-dark");
  }
}
