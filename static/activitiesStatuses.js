export default {
  activities: [
    {
      name: 'Bowling',
      icon: 'fa-bowling-ball',
      conditions: {
        clear: false,
        minTemp: -50,
        maxTemp: 30,
        minWind: 0,
        maxWind: 100,
        airQualityMin: 5
      }
    },
    {
      name: 'Cinéma',
      icon: 'fa-film',
      conditions: {
        clear: false,
        minTemp: -50,
        maxTemp: 30,
        minWind: 0,
        maxWind: 100,
        airQualityMin: 5
      }
    },
    {
      name: 'Football',
      icon: 'fa-futbol',
      conditions: {
        clear: true,
        minTemp: 10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 40,
        airQualityMin: 5
      }
    },

    {
      name: 'Sports nautique',
      icon: 'fa-ship',
      conditions: {
        clear: true,
        minTemp: 10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 60,
        airQualityMin: 5
      }
    },
    {
      name: 'Randonnée',
      icon: 'fa-hiking',
      conditions: {
        clear: true,
        minTemp: -10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 80,
        airQualityMin: 6.6
      }
    },
    {
      name: 'Arcade',
      icon: 'fa-gamepad',
      conditions: {
        clear: false,
        minTemp: -50,
        maxTemp: 10,
        minWind: 0,
        maxWind: 100,
        airQualityMin: 3.3
      }
    },
    {
      name: 'Plage',
      icon: 'fa-water',
      conditions: {
        clear: true,
        minTemp: 20,
        maxTemp: 50,
        minWind: 0,
        maxWind: 40,
        airQualityMin: 5
      }
    },
    {
      name: 'Basket',
      icon: 'fa-basketball-ball',
      conditions: {
        clear: true,
        minTemp: 10,
        maxTemp: 30,
        minWind: 0,
        maxWind: 40,
        airQualityMin: 5
      }
    },
    {
      name: 'Sieste',
      icon: 'fa-bed',
      conditions: {
        clear: false,
        minTemp: 30,
        maxTemp: 100,
        minWind: 80,
        maxWind: 1000,
        airQualityMin: 0
      }
    },
    {
      name: 'Sieste',
      icon: 'fa-bed',
      conditions: {
        clear: false,
        minTemp: -30,
        maxTemp: 10,
        minWind: -1,
        maxWind: 0,
        airQualityMin: 0
      },
    },
    {
      name: 'Running',
      icon: 'fa-running',
      conditions: {
        clear: true,
        minTemp: -10,
        maxTemp: 25,
        minWind: 0,
        maxWind: 80,
        airQualityMin: 5

      },
    }
  ]
}
