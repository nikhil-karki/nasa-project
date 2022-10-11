const parse = require("csv-parser");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// node doesn't wait for streams to complete async behaviour challenge

fs.createReadStream("data/kepler_data.csv").pipe(
  parse({
    comment: "#",
    columns: true,
  })
    .on("data", (data) => {
      if (isHabitablePlanet(data)) {
        habitablePlanets.push(data);
      }
    })
    .on("error", (err) => {
      console.log("error", err);
    })
    .on("end", () => {
      console.log(
        habitablePlanets.map((planet) => {
          return planet["kepler_name"];
        })
      );
      console.log(`${habitablePlanets.length} habitable planets found!`);
    })
);

module.exports = { planets: habitablePlanets };
