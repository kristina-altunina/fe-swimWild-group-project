import axios from "axios";

const instance = axios.create({
  baseURL: "https://spike-auth-server.onrender.com/",
});

export function getAllLocations(coords = [52, -2], limit = 8, page = 1) {
  return instance
    .get(`locations?lat=${coords[0]}&lon=${coords[1]}&limit=${limit}&p=${page}`)
    .then(({ data }) => {
      return data;
    });
}

export function getLocationByID(uid, day, station) {
  return instance
    .get(
      `locations/${uid}?day=${day ? day : 0}&station=${station ? station : 0}`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function postSwimSpot(token, body) {
  return instance
    .post("users/swim", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res, "look here");
    })
    .catch((err) => {
      console.log(err, "err");
    });
}

export function postSwimLocation(token, body) {
  return instance
    .post(`locations`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    });
}
