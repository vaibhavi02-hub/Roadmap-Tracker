export function saveProgress(data) {
  localStorage.setItem("roadmapProgress", JSON.stringify(data));
}

export function loadProgress() {
  const data = localStorage.getItem("roadmapProgress");
  return data ? JSON.parse(data) : null;
}