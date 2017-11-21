'use strict';

function generateDisplayString(str, delimiter) {
  return str
    .split(delimiter)
    .map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}

function Product(filenameBase) {
  this.displayName = generateDisplayString(filenameBase, '-');
  this.src = 'img/'.concat(filenameBase).concat('.jpg');
  this.voteTally = 0;
  this.shownTally = 0;
}

/*****************************************************************************
 * All Execution and Globals Below
 */
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
  productHash: {}, /* look up table for events */
  productList: [], /* list of all products */
  unseen: [], /* only products that haven't been seen yet */
  imageIds: ['img-1', 'img-2', 'img-3'],
  imageEls: [],

  generateProducts: function () {
    baseProductNames.map(function (baseProductName) {
      var prod = new Product(baseProductName);
      // add it to the hash based on filepath
      this.productHash[prod.src] = prod;
      // add it to the product list
      this.productList.push(prod);
    });
  },

  configureListeners: function () {
    this.imageIds.map(function (imgId) {
      // obtain the image element
      var imgEl = document.getElementById(imgId);
      // store it for retrieval
      this.imageEls.push(imgEl);
      imgEl.addEventListener('click', this.onClick);
    });
  },

  initGame: function () {
    // clear product stats
    this.productList.map(function (prod) {
      prod.voteTally = 0;
      prod.shownTally = 0;
      this.unseen.push(prod);
    });
  },

  getRandomIndex: function(arrayLength) {
    var min = 0;
    var max = arrayLength - 1;
    // Generate a random index number that falls within our product list
    var ran = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('RandomIndex:', ran);
    return ran;
  },

  displayImages: function() {
    var dupeLUT = {};
    this.imageEls.map(function (imgEl) {
      let idx;
      var prod;
      // Unseen products have top priority
      if (this.unseen.length > 0) {
        idx = this.getRandomIndex(this.unseen.length);
        // get product, remove it from unseen list
        prod = this.unseen.splice(idx, 1)[0];
        // add to the dupeLUT
        dupeLUT[prod.src] = true;
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
productRank.configureListeners();
productRank.displayImages();

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