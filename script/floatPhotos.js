let imgs = [...document.querySelectorAll("img"),...document.querySelectorAll(".imageContainer")];
for (let i = 1; i < imgs.length; i += 2) {
  imgs[i].style.float = 'left'
}
