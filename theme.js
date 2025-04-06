
export function toggleTheme() {
  const body = document.body;
  const current = localStorage.getItem("theme") || "light";
  const newTheme = current === "light" ? "midnight" : "light";
  body.className = newTheme === "light" ? "" : "theme-midnight";
  localStorage.setItem("theme", newTheme);
}

export function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "midnight") {
    document.body.classList.add("theme-midnight");
  }
}
