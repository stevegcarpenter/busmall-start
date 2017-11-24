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
  chart: null,

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
    productRank.showResults();

    // empty both bags, set bag-a active and then fill bag-a
    // games always start picking from on bag-a
    this.bag.a = [];
    this.bag.b = [];
    this.bag.active = 'a';
    this.clickCount = 0;

    // clear product stats
    for (let i in this.productList) {
      let prod = this.productList[i];
      // bag-a is the starting bag
      this.bag.a.push(prod);
      console.log('Initializing product:', prod);
    }
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
    button.className = 'game-button';
    button.value = text;
    section.appendChild(button);
    button.addEventListener('click', handler);
  },

  showResults: function () {
    var section = document.getElementById('results-section');
    var canvas = document.createElement('canvas');
    section.appendChild(canvas);
    canvas.id = 'results-chart';

    var ctx = canvas.getContext('2d');
    productRank.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productRank.productList.map(function (prod) { return prod.displayName; }),
        datasets: [{
          label: 'Product Vote Count',
          data: productRank.productList.map(function (prod) { return prod.voteTally; }),
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fixedStepSize: 1
            }
          }]
        }
      }
    });
  },

  updateResults: function () {
    productRank.chart.data.datasets[0].data = productRank.productList.map(function (prod) {
      return prod.voteTally;
    });
    productRank.chart.update();
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

      productRank.stashProductStats();
      productRank.updateResults();

      if (productRank.clickCount === MAXCLICKS) {
        productRank.showButton('Restart Game', productRank.startGame);
      }

      productRank.displayImages();
    }
  },

  startGame: function () {
    productRank.initGame();
    productRank.displayImages();
  },

  stashProductStats: function () {
    window.localStorage.setItem('products', JSON.stringify(this.productList));
  },

  unstashLocalStorage: function () {
    var json = window.localStorage.getItem('products');

    if (!json)
      return;

    var products = JSON.parse(json);
    products.map(function (p) {
      var prod = productRank.productHash[p.path];
      // restore preserved data
      prod.voteTally = p.voteTally;
      prod.shownTally = p.shownTally;
    });
  },
};

productRank.generateProducts();
productRank.configureListeners();
productRank.unstashLocalStorage();
productRank.startGame();