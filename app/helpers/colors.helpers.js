

const colors = {
  online: { color: "#0170D7", bgColor: "#DBFCFE" },
  "instructor led": { color: "#FF5C01", bgColor: "#FFECD3" },
  "new launch": { color: "#14b7a6", bgColor: "#ccfbf1" },
  "best selling": { color: "#6115DC", bgColor: "#F4DEFF" },
};

export const getColorAndBgColor = (word) => {
  return colors[word] || { color: "#000", bgColor: "#fff" };
};

const cardColors = {
  "best selling": { color: "#6115DC", bgColor: "#F4DEFF" },
  "new launch": { color: "#0170D7", bgColor: "#DBFCFE" },
  "job guarantee": { color: "#FF5C01", bgColor: "#FFECD3" },
  "admission closed": { color: "#F43F5E", bgColor: "#FFE4E6" },
  "coming soon": { color: "#6115DC", bgColor: "#F4DEFF" },
};

export const getCardColorAndBgColor = (status) => {
  return cardColors[status.toLowerCase()] || { color: "", bgColor: "" };
};
