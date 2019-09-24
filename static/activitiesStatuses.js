export default {
  activities: [
    {
      name: 'bowling',
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
      name: 'cinéma',
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
      name: 'football',
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
      name: 'sports nautique',
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
      name: 'randonnée',
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
      name: 'arcade',
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
      name: 'plage',
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
      name: 'basket',
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
      name: 'sieste',
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
