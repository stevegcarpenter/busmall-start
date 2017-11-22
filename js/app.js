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
const MAXCLICKS = 25;
var baseProductNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
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
    active: 'a',
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
    console.log('Re-initializing game.');
    // blow away any buttons and tables
    let section = document.getElementById('button-section');
    section.innerHTML = '';
    section = document.getElementById('results-section');
    section.innerHTML = '';

    // clear product stats
    for (let i in this.productList) {
      let prod = this.productList[i];
      prod.voteTally = 0;
      prod.shownTally = 0;
      // bag-a is the starting bag
      this.bag.a.push(prod);
      console.log('Initializing product:', prod);
    }
    // set bag-b empty
    this.bag.b = [];
    this.clickCount = 0;
  },

  getRandomIndex: function(arrayLength) {
    // Generate a random index number that falls within our product list
    return Math.floor(Math.random() * arrayLength);
  },

  displayImages: function() {
    /*
     *Pull three items and put them in a products array. This guarantees
     * no duplicates for this particular showing of images. Whichever bag
     * was used to pull items from previously is the active bag. Place all
     * of the items in the opposite bag. This method should be fairly
     * efficient and guarantee no duplicates, that all images are displayed
     * before re-displaying other images.
     */
    let idx;
    var prod;
    var products = [];

    // populate all image elements
    for (let i = 0; i < this.imgEls.length; i++) {
      // Check if the active bag needs to be updated
      if (this.bag.a.length === 0) {
        this.bag.active = 'b';
      } else if (this.bag.b.length === 0) {
        this.bag.active = 'a';
      }

      // Use the active bucket as long as it isn't empty
      if (this.bag.active === 'a') {
        idx = this.getRandomIndex(this.bag.a.length);
        // get product, remove it from bag-a list
        prod = this.bag.a.splice(idx, 1)[0];
        console.log('Pulling', prod.displayName, ' from bag a');
        // add product to products
        products.push(prod);
      } else {
        // find an image, avoid duplicate
        idx = this.getRandomIndex(this.bag.b.length);
        // get product, remove it from bag-a list
        prod = this.bag.b.splice(idx, 1)[0];
        console.log('Pulling', prod.displayName, 'from bag b');
        // add product to products
        products.push(prod);
      }

      // Set the image source and append it to the section
      var imgEl = this.imgEls[i];
      imgEl.src = prod.path;
      // Increment the display
      prod.shownTally++;
    }

    // place all chosen items into the bucket last active
    if (this.bag.active === 'a') {
      this.bag.b.push.apply(this.bag.b, products);
    } else {
      this.bag.a.push.apply(this.bag.a, products);
    }
    console.log('bag a:', this.bag.a);
    console.log('bag b:', this.bag.b);
    console.log('prod arr', products);
  },

  showButton: function(text, handler) {
    var section = document.getElementById('button-section');
    var button = document.createElement('input');
    // clear the button section first
    section.innerHTML = '';
    button.type = 'button';
    button.value = text;
    section.appendChild(button);
    button.addEventListener('click', handler);
  },

  showResults: function() {
    var section = document.getElementById('results-section');
    var table = document.createElement('table');
    section.appendChild(table);

    productRank.appendTableRow(table, ['', 'Score', 'Percent Chosen'], 'th');

    for (var i in productRank.productList) {
      let prod = productRank.productList[i];
      let percent = Math.floor((prod.voteTally * 100) / prod.shownTally);
      productRank.appendTableRow(table, [prod.displayName, prod.voteTally, isNaN(percent) ? '0%' : percent.toString().concat('%')], 'td');
    }

    // Change the button to a replay button
    productRank.showButton('Restart Game', productRank.startGame);
  },

  appendTableRow: function (table, rowItems, type) {
    var row = document.createElement('tr');
    table.appendChild(row);

    for (let i = 0; i < rowItems.length; i++) {
      let cell = document.createElement(type);
      cell.textContent = rowItems[i];
      row.appendChild(cell);
    }
  },

  onClick: function(e) {
    console.log('Click Count:', productRank.clickCount);
    // Check if the game is already over
    if (productRank.clickCount < MAXCLICKS) {
      var pathArr = e.target.src.split('/');
      var path = 'img/'.concat(pathArr[pathArr.length - 1]);
      console.log('path:', path);
      var prod = productRank.productHash[path];

      productRank.clickCount++;
      prod.voteTally++;
      console.log('clickCount:', productRank.clickCount);
      console.log('Acquired product from click:', prod);

      productRank.displayImages();

      // Display the results button if the game just ended
      if (productRank.clickCount === MAXCLICKS) {
        productRank.showButton('Show Results', productRank.showResults);
      }
    }
  },

  startGame: function () {
    productRank.initGame();
    productRank.displayImages();
  }
};

productRank.generateProducts();
productRank.configureListeners();
productRank.startGame();