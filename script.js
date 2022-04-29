let params = new URL(document.location).searchParams;
let seed = params.get("seed");
let endDate = params.get("end_date");
let grid = document.getElementById("grid");
let block = document.getElementById("block");
let drinks = shuffle(
  [
    "جالكسي",
    "ميلكي واي",
    "مارس",
    "توكس",
    "شاي مراكش",
    "كابتشينو ريد فيلفيت",
    "فلات وايت جوز الهند",
    "شاي تي لاتيه",
    "لاتيه ماكياتو كراميل",
    "ماتشا",
    "هوجيتشا",
    "سنتشا",
    "ماتشا لاتيه",
    "قهوة عربية",
    "ايس تي خوخ",
    "ايس تي ليمون",
    "شاي كركدية و توت بري",
    "كستر الطيبين",
    "تراميسو",
    "لاتيه كوكيز و قرفة",
    "بستاشو لاتيه",
    "توفي نت لاتيه",
    "تانجرين"
  ],
  seed
).slice(0, 14);
let powerups = [
  "استكشف المربع التالي",
  "استكشف المربع التالي",
  "استكشف المربع التالي",
  "تخطي المربع التالي",
  "تخطي المربع التالي",
  "اختر مشروبا للآخرين"
];
let tiles = shuffle([...drinks, ...powerups], seed);

tiles = shuffle(tiles, seed);
let savedState = localStorage.getItem(seed);
if (savedState) {
  grid.innerHTML = savedState;
} else {
  //16
  buildBlocks();
}
window.setInterval(countdown, 1000);

function buildBlocks() {
  for (let i = 0; i < tiles.length; i++) {
    grid.appendChild(block.content.cloneNode(true));
  }
}

function countdown() {
  const now = new Date().getTime();
  const diff = Date.parse(endDate) - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById(
    "timer"
  ).innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
}

function getElementIndex(element) {
  return [...element.parentNode.children].indexOf(element);
}
function toggle(e) {
  let currentClassName = e.className;
  e.className = "block selected";
  if (currentClassName === "block" && window.confirm("كشف المربع؟")) {
    e.innerHTML = tiles[getElementIndex(e)];
    e.className = "block revealed";
  } else if (
    currentClassName === "block revealed" &&
    window.confirm("إكمال المربع؟")
  ) {
    e.className = "block revealed completed";
  } else {
    e.className = currentClassName;
  }
  localStorage.setItem(seed, grid.innerHTML);
}

function reset() {
  if (window.confirm("إعادة تعيين؟")) {
    localStorage.removeItem(seed);
    grid.innerHTML = "";
    buildBlocks();
  }
}

///////// Shuffle /////////

function shuffle(array, seed) {
  // <-- ADDED ARGUMENT
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed; // <-- ADDED LINE
  }

  return array;
}

function random(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}