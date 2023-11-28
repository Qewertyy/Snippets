// to get random item from an array
function random(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
