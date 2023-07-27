document.getElementById("sumtime").style.display = "inline";
time = document.lastModified;
rtime = [6, 7, 8, 9, ".", 0, 1, ".", 3, 4];
result = "";
rtime.forEach((i) => {
  result += time[i] != undefined ? time[i] : ".";
});
document.getElementById("sumtime").innerHTML = `${result}`;