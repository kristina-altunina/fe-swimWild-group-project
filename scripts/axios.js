import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://spike-auth-server.onrender.com/'
})

export function getAllLocations() {
    return instance.get('locations')
    .then(({data}) => {
        return data
    })
}

export function getLocationByID(uid) { //endpoint from backend not created yet
    return instance.get(`locations/${uid}`)
    .then(({data}) => {
        return data
    })
}

export function test() {

    const userData = {
        "_id": {
          "$oid": "650830dcc6e566c71d559fc3"
        },
        "name": "Rydal, Lake District",
        "type": "lake",
        "loc": {
          "type": "Point",
          "coordinates": [
            54.447268,
            -2.995986
          ]
        },
        "createdAt": {
          "$date": "2023-09-18T11:13:32.961Z"
        },
        "updatedAt": {
          "$date": "2023-09-18T11:13:32.961Z"
        },
        "__v": 0
      }
    
      const swim = {
        uid: "QyqF2JQjSEY6TOqDvdaSAd99WyA2",
        name: "The Test",
        nickname: "test123",
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mad_scientist_transparent_background.svg/1200px-Mad_scientist_transparent_background.svg.png",
        date: "2023-09-02T11:00:00+0000",
        location: {
          name: "Rydal, Lake District",
          id: null,
        },
        notes:
          "A great swim! To the dog's grave on the main island and back. Water not too cold.",
        stars: 5,
        recordTemp: null,
        feelTemp: "average",
        mins: 45,
        km: 1,
        outOfDepth: true,
        sizeKey: "large",
        shore: "muddy",
        bankAngle: "medium",
        clarity: "average",
        imgUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Cumbria_2007_035.jpg",
        ],
      };
    
      const apiData = {
        tempCelsius: '15.8',
        nearestAab: { name: 'Morecambe North', distance: 0.43 },
        waveData: {
          maxWave: '2.66m',
          maxWavePeriod: '6.75s',
          weekForecast: {
            dates: ['1', '2', '3', '4'],
            wave_height_max: ['1-whm', '2-whm', '3-whm', '4-whm'],
            wave_direction_dominant: ['1-wdd', '2-wdd', '3-wdd', '4-wdd'],
            wave_period_max: ['1-wpm', '2-wpm', '3-wpm', '4-wpm'],
            wind_wave_height_max: ['1-wwhm', '2-wwhm', '3-wwhm', '4-wwhm'],
            wind_wave_direction_dominant: ['1-wwdd', '2-wwdd', '3-wwdd', '4-wwdd'],
            wind_wave_period_max: ['1-wwpm', '2-wwpm', '3-wwpm', '4-wwpm'],
            wind_wave_peak_period_max: ['1-wwppm', '2-wwppm', '3-wwppm', '4-wwppm'],
            swell_wave_height_max: ['1-swhm', '2-swhm', '3-swhm', '4-swhm'],
            swell_wave_direction_dominant: ['1-swdm', '2-swdm', '3-swdm', '4-swdm'],
            swell_wave_period_max: ['1-swpm', '2-swpm', '3-swpm', '4-swpm'],
            swell_wave_peak_period_max: ['1-swppm', '2-swppm', '3-swppm', '4-swppm']
          }
        }
      }

      const outputForSea = {
        userData,
        apiData,
        swims: [ swim ]
      }
    

    return outputForSea
}


  