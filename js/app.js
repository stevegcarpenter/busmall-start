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
const NUMIMGTODISPLAY = 3;
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
  /* two bags to hold products for display purposes */
  bag: {
    a: [],
    b: [],
  },
  imgEls: [],
  clickCount: 0,

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
    var section = document.getElementById('images-section');
    for (let i = 0; i < NUMIMGTODISPLAY; i++) {
      // obtain the image element
      var imgEl = document.createElement('img');
      imgEl.id = 'img-'.concat(i);
      imgEl.className = 'click-images';

      // store it for retrieval
      this.imgEls.push(imgEl);
      imgEl.addEventListener('click', this.onClick);

      // Attach to page
      section.appendChild(imgEl);
    }
  },

  initGame: function () {
    console.log('Re-initializing game.')
    // clear product stats
    for (let i in this.productList) {
      let prod = this.productList[i];
      prod.voteTally = 0;
      prod.shownTally = 0;
      // bag-a is the starting bag
      this.bag.a.push(prod);
    }
    // set bag-b empty
    this.bag.b = [];
    this.clickCount = 0;
  },

  getRandomIndex: function(arrayLength) {
    // Generate a random index number that falls within our product list
    var ran = Math.floor(Math.random() * arrayLength);
    console.log('RandomIndex:', ran);
    return ran;
  },

  displayImages: function() {
    let idx;
    var prod;

    // populate all image elements
    for (let i = 0; i < this.imgEls.length; i++) {
      // Program starts with only bag-a populated
      if (this.bag.a.length > 0) {
        idx = this.getRandomIndex(this.bag.a.length);
        // get product, remove it from bag-a list
        prod = this.bag.a.splice(idx, 1)[0];
        // add product to bag-b
        this.bag.b.push(prod);
      } else {
        // find an image, avoid duplicate
        idx = this.getRandomIndex(this.bag.b.length);
        prod = this.bag.b.splice(idx, 1)[0];
      }

      // Set the image source and append it to the section
      var imgEl = this.imgEls[i];
      imgEl.src = prod.path;
    }
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

  onClick: function(e) {
    var pathArr = e.target.src.split('/');
    var path = 'img/'.concat(pathArr[pathArr.length - 1])

    console.log('Received click inside:', path);
  }
};

productRank.generateProducts();
productRank.configureListeners();
productRank.displayImages();