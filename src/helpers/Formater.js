function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(dateString) {
  return dateString.substring(0, 5);
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function addPadding(base64String) {
  const padding = base64String.length % 4;
  if (padding) {
    base64String += "=".repeat(4 - padding);
  }
  return base64String;
}

function sliceFileName(file) {
  const encodedFileName = file.substring(file.lastIndexOf("/") + 1);
  return decodeURIComponent(encodedFileName);
}

export { formatDate, formatTime, formatDateTime, addPadding, sliceFileName };
