'use strict';

function generateDisplayString(str, delimiter) {
  return str
    .split(delimiter).map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    }).join(' ');
}

function Product(filenameBase) {
  this.displayName = generateDisplayString(filenameBase, '-');
  this.baseName = filenameBase;
  this.path = 'img/'.concat(filenameBase).concat('.jpg');
  this.voteTally = 0;
  this.shownTally = 0;
}

/*****************************************************************************
 * All Execution and Globals Below
 */
var baseProductNames = [
  'bag',
  'banana',
  'baseball-wineholder',
  'bathroom',
  'big-chair',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'neck-protector',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'six-pack-bicycle',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

var productRank = {
  productHash: {}, /* key is product path */
  productList: [], /* list of all products */
  /* two bags to hold products */
  bag: {
    a: [],
    b: [],
  },
  imageIds: ['img-1', 'img-2', 'img-3'],
  imageEls: [],

  generateProducts: function () {
    for (let i = 0; i < baseProductNames.length; i++) {
      var prod = new Product(baseProductNames[i]);
      console.log('Product:', prod);
      // add it to the hash based on filepath
      this.productHash[prod.path] = prod;
      // add it to the product list
      this.productList.push(prod);
    }
  },

  configureListeners: function () {
    for (let i = 0; i < this.imageIds.length; i++) {
      // obtain the image element
      var imgEl = document.getElementById(this.imageIds[i]);
      // store it for retrieval
      this.imageEls.push(imgEl);
      imgEl.addEventListener('click', this.onClick);
    }
  },

  initGame: function () {
    // clear product stats
    this.productList.map(function (prod) {
    for (var i in this.productList) {
      prod = this.productList[i];
      prod.voteTally = 0;
      prod.shownTally = 0;
      this.bag.a.push(prod);
    }
  },

  getRandomIndex: function(arrayLength) {
    // Generate a random index number that falls within our product list
    var ran = Math.floor(Math.random() * arrayLength);
    console.log('RandomIndex:', ran);
    return ran;
  },

  displayImages: function() {
    var dupeLUT = {};
    this.imageEls.map(function (imgEl) {
      let idx;
      var prod;
      // Bag a products have top priority
      if (this.bag.a.length > 0) {
        idx = this.getRandomIndex(this.bag.a.length);
        // get product, remove it from bag-a list
        prod = this.bag.a.splice(idx, 1)[0];
        // add to the dupeLUT
        dupeLUT[prod.path] = true;
      } else {
        // find an image, avoid duplicate
        do {
          idx = this.getRandomIndex(this.productList.length);
          prod = this.productList[idx];
        } while (dupeLUT[prod.src] === true);
        dupeLUT[prod.src] = true;
      }

      // Set the image
      imgEl.src = prod.src;
    });
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

productRank.generateProducts();
// productRank.configureListeners();
// productRank.displayImages();

// function initElement() {
//   var img = document.getElementById('img-1');
//   // NOTE: showAlert(); or showAlert(param); will NOT work here.
//   // Must be a reference to a function name, not a function call.
//   console.log('Added click listener!');
//   img.addEventListener('click', showAlert);
// }

// function showAlert(e) {
//   e.preventDefault();
//   console.log('Entered Event');
//   console.log('target:', e.target);
//   console.log('target.id:', e.target.id);
//   console.log('target.src', e.target.src);
//   e.target.src = 'img/banana.jpg';
// }

// initElement();
