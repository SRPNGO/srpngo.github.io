let resultTime, time, result;
document.getElementById("sumtime").style.display = "inline";
time = document.lastModified;
resultTime = [6, 7, 8, 9, ".", 0, 1, ".", 3, 4];
result = "";
resultTime.forEach((i) => {
  result += time[i] != undefined ? time[i] : ".";
});
document.getElementById("sumtime").innerHTML = `${result}`;
