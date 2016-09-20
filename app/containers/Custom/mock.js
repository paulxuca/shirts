const topLevelTabs = [
  {
    id: 'apparel',
    name: 'Change Apparel',
  },
  {
    id: 'element',
    name: 'Add Elements',
  },
  {
    id: 'detail',
    name: 'Review Details',
  },
];

const lowLevelTabs = {
  apparel: [
    {
      name: 'Sweaters and Sleeves',
      id: 'sweater',
    }, {
      id: 'shirt',
      name: 'Tees and Tanks',
    }, {
      name: 'Pants and Shorts',
      id: 'bottom',
    }, {
      name: 'Accessories and Hats',
      id: 'accessory',
    },
  ],
};

const apparelTypes = {
  sweater: [
    {
      image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/techno_defender/grey1.jpg',
      name: 'Gilden sweater techno defender sample',
      default: 0,
      price: 23.99,
      defaultPosition: {
        top: 100,
        left: 100,
        canvas: {
          height: 500,
          width: 300,
        },
      },
      variants: [
        {
          name: 'navy',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/techno_defender/navy1.jpg',
        },
        {
          name: 'grey',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/techno_defender/grey1.jpg',
        },
        {
          name: 'red',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/techno_defender/red1.jpg',
        },
      ],
    }, {
      image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/quarter_zip/navy2.jpg',
      name: 'Gilden quarter zip fleece sweater',
      default: 0,
      price: 30.99,
      defaultPosition: {
        top: 100,
        left: 100,
        canvas: {
          height: 500,
          width: 300,
        },
      },
      variants: [
        {
          name: 'red',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/quarter_zip/18800-red_A1_large.jpg',
        }, {
          name: 'black',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/quarter_zip/navy2.jpg5',
        },
      ],
    },
  ],
  shirt: [
    {
      image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/2001/2001_white.jpg',
      name: 'Gilden t-shirt 2001',
      default: 0,
      price: 13.99,
      defaultPosition: {
        top: 200,
        left: 125,
        canvas: {
          height: 300,
          width: 150,
        },
      },
      variants: [
        {
          name: 'white',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/2001/2001_white.jpg',
        }, {
          name: 'red',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/2001/2001_red.jpg',
        }, {
          name: '#BCE7EE',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/2001/2001_aqua.jpg',
        }, {
          name: '#5E2432',
          image: 'https://s3.amazonaws.com/shirts.qthreads/shirtpictures/gilden/2001/2001_truffle.jpg',
        },
      ],
    },
  ],
};

export {
  topLevelTabs,
  lowLevelTabs,
  apparelTypes,
};
