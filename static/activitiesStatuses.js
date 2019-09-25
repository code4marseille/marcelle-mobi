export default {
  activities: [
    {
      name: 'Bowling',
      icon: 'fa-bowling-ball"></i>',
      conditions: {
        beau: false,
        minTemp: -50,
        maxTemp: 30,
        minWind: 0,
        maxWind: 100
      }
    },
    {
      name: 'Cinéma',
      icon: 'fa-film',
      conditions: {
        beau: false,
        minTemp: -50,
        maxTemp: 30,
        minWind: 0,
        maxWind: 100
      }
    },
    {
      name: 'Football',
      icon: 'fa-futbol',
      conditions: {
        beau: true,
        minTemp: 10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 40
      }
    },

    {
      name: 'Sports nautique',
      icon: 'fa-ship',
      conditions: {
        beau: true,
        minTemp: 10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 40
      }
    },
    {
      name: 'Randonnée',
      icon: 'fa-hiking',
      conditions: {
        beau: true,
        minTemp: 10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 40
      }
    },
    {
      name: 'Arcade',
      icon: 'fa-gamepad',
      conditions: {
        beau: false,
        minTemp: -50,
        maxTemp: 10,
        minWind: 0,
        maxWind: 100
      }
    },
    {
      name: 'Plage',
      icon: 'fa-water',
      conditions: {
        beau: true,
        minTemp: 20,
        maxTemp: 50,
        minWind: 0,
        maxWind: 40
      }
    },
    {
      name: 'Basket',
      icon: 'fa-basketball-ball',
      conditions: {
        beau: true,
        minTemp: 10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 40
      }
    },
    {
      name: 'Sieste',
      icon: 'fa-bed',
      conditions: {
        beau: false,
        minTemp: 30,
        maxTemp: 100,
        minWind: 50,
        maxWind: 1000
      }
    }
  ]
}
