export function addMonthToSwims(swims) {
  const lookup = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  return swims.map((swim) => {
    const dateParts = swim.date.split("-");
    const date = lookup[dateParts[1]] + " " + dateParts[0];
    const newSwim = { ...swim };
    newSwim.dateKey = date;
    return newSwim;
  });
}

export function swimsThisMonth(swims) {
  return swims.filter((swim) => {
    const nowMonth = new Date().getMonth();
    const nowYear = new Date().getFullYear();
    const swimMonth = new Date(swim.date).getMonth();
    const swimYear = new Date(swim.date).getFullYear();
    return nowMonth === swimMonth && nowYear === swimYear;
  }).length;
}

export function listLocations(swims) {
  const locations = [];
  for (const swim of swims) {
    if (!locations.includes(swim.location.name)) {
      locations.push(swim.location.name);
    }
  }
  return locations;
}

export function favouriteSwim(swims) {
  let maxStars = 0;
  let favouriteSwims = [];
  for (const swim of swims) {
    if (swim.stars === maxStars) {
      favouriteSwims.push(swim.location.name);
    } else if (swim.stars > maxStars) {
      favouriteSwims = [swim.location.name];
    }
  }
  if (favouriteSwims.length === 1) return favouriteSwims[0];
  favouriteSwims.sort((a, b) => {
    const aSwims = swims.filter((swim) => {
      return swim.location.name === a;
    }).length;
    const bSwims = swims.filter((swim) => {
      return swim.location.name === b;
    }).length;
    return a - b;
  });
  return favouriteSwims[0];
}

export function hottest(swims) {
  const hottest = { temp: null, name: 0, date: "" };
  for (const swim of swims) {
    if (+swim.recordTemp > hottest) {
      hottest.temp = +swim.recordTemp;
      hottest.name = swim.location.name;
      hottest.date = new Date(swim.date)
        .toDateString()
        .split(" ")
        .slice(1, 3)
        .join(" ");
    }
  }
  if (hottest.temp === null) return;
  return `${hottest.temp}°C, ${hottest.name}, ${hottest.date}`;
}

export function coldest(swims) {
  const coldest = { temp: null, name: 0, date: "" };
  for (const swim of swims) {
    if (+swim.recordTemp < coldest) {
      coldest.temp = +swim.recordTemp;
      coldest.name = swim.location.name;
      coldest.date = new Date(swim.date)
        .toDateString()
        .split(" ")
        .slice(1, 3)
        .join(" ");
    }
  }
  if (coldest.temp === null) return;
  return `${coldest.temp}°C, ${coldest.name}, ${coldest.date}`;
}

export function swimTheLakeDistrict(swims) {}
