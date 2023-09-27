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
  const hottest = { temp: null, name: null, date: null };
  for (const swim of swims) {
    if (+swim.recordTemp > hottest.temp) {
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
  return `${hottest.temp}°C, ${hottest.date}, ${hottest.name}`;
}

export function coldest(swims) {
  const coldest = { temp: 100, name: null, date: null };
  for (const swim of swims) {
    if (swim.recordTemp === null) continue;
    if (+swim.recordTemp < coldest.temp) {
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
  return `${coldest.temp}°C, ${coldest.date}, ${coldest.name}`;
}

export function totalDistance(swims) {
  let totalKm = 0;
  for (const swim of swims) {
    if (swim.km !== null) totalKm += +swim.km;
  }
  return `${totalKm}km`;
}

export function totalMinutes(swims) {
  let totalMins = 0;
  for (const swim of swims) {
    if (swim.mins !== null) totalMins += +swim.mins;
  }
  const hours = Math.floor(totalMins / 60);
  if (hours) return `${hours}h ${totalMins % 60}m`;
  return totalMins.toString() + "mins";
}

export function totalLocations(swims) {
  const locations = new Set();
  for (const swim of swims) {
    locations.add(swim.location.name);
  }
  return locations.size;
}

export function swimTheLakes(swims) {
  const challenge = [
    "Coniston Water, Cumbria",
    "Rydal, Lake District",
    "Grasmere Lake, Lake District",
    "Black Moss Pot, Keswick",
    "Tongue Pot, Eskdale",
    "Wast Water, Lake District",
    "Styhead Tarn, Borrowdale",
    "Ullswater, Lake District",
    "Watendlath Tarn, Keswick",
    "Buttermere Pools, Lake District",
    "Derwentwater, Lake District",
    "Crummock Water, Lake District",
    "Loweswater, Cumbria",
    "Bassenthwaite Lake, Cumbria",
  ];
  const locations = new Set();
  for (const swim of swims) {
    locations.add(swim.location.name);
  }
  let count = 0;
  locations.forEach((location) => {
    if (challenge.includes(location)) {
      count++;
    }
  });
  return Math.ceil((count / 14) * 100).toString() + "%";
}
