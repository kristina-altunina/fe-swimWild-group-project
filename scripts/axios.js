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

export function getLocationByID(uid, day, station) {
    return instance.get(`locations/${uid}?day=${day ? day : 0}&station=${station ? station : 0}`)
    .then(({data}) => {
        return data
    })
	.catch(err => {
		console.log(err)
	})
}



export function postSwimSpot(token, body) {

		return instance.post('users/swim', body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			}
		})
		.then(res => {
			console.log(res, 'look here')
		})
		.catch(err => {
			console.log(err, 'err')
		})
}
  