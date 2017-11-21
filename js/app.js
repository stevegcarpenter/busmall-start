function generateDisplayString(str, delimiter) {
  return str
    .split(delimiter)
    .map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}

function Product(filenameBase) {
  this.baseName = filenameBase;
  this.displayName = generateDisplayString(filenameBase, '-');
  this.voteTally = 0;
  this.filePath = '/img/'.concat(filenameBase).concat('.jpg');
}

/*****************************************************************************
 * All Execution and Globals Below
 */
var productList = [];
var baseProductNames = [
  'baby-broom',
  'banana',
  'bathroom',
  'boots',
  'bubblegum',
  'cthulhu',
  'dragon',
  'pen',
  'scissors',
  'six-pack-bicycle',
  'tauntaun',
  'usb',
  'wine-glass',
  'bag',
  'baseball-wineholder',
  'big-chair',
  'breakfast',
  'chair',
  'dog-duck',
  'neck-protector',
  'pet-sweep',
  'shark',
  'sweep',
  'unicorn',
  'water-can'
];

var productRank = {
  imageEls: [
    document.getElementById('img-1'),
    document.getElementById('img-2'),
    document.getElementById('img-3'),
  ],

  getRandomIndex: function() {
    // TODO: Hmm... what's going to happen here?
  },

  displayImages: function() {
    // TODO: Hmm... what's going to happen here?
  },

  tallyClicks: function(elementId) {
    // TODO: Hmm... what's going to happen here?
  },

  displayResults: function() {
    // TODO: Hmm... what's going to happen here?
  },

  showButton: function() {
    // TODO: Hmm... what's going to happen here?
  },

  onClick: function() {
    // TODO: Hmm... what's going to happen here?
  }
};

// productRank.imageEls.addEventListener('click', productRank.onClick);
// productRank.displayImages();

function initElement() {
  var img = document.getElementById('img-1');
  // NOTE: showAlert(); or showAlert(param); will NOT work here.
  // Must be a reference to a function name, not a function call.
  console.log('Added click listener!');
  img.addEventListener('click', showAlert);
}

function showAlert(e) {
  e.preventDefault();
  console.log('Entered Event');
  console.log('target:', e.target);
  console.log('target.id:', e.target.id);
}

initElement();