export default {
  activities: [
    {
      name: 'bowling',
      icon: '<i class="fas fa-bowling-ball"></i>',
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
      icon: '<i class="fas fa-film"></i>',
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
      icon: '<i class="fas fa-futbol"></i>',
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
      icon: '<i class="fas fa-ship"></i>',
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
      icon: '<i class="fas fa-hiking"></i>',
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
      icon: '<i class="fas fa-gamepad"></i>',
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
      icon: '<i class="fas fa-water"></i>',
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
      icon: '<i class="fas fa-basketball-ball"></i>',
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
      icon: '<i class="fas fa-bed"></i>',
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
