const fs = require("fs");
const path = require("path");
const snakecaseKeys = require("snakecase-keys");

fs.readFile(
  path.join(__dirname, "./src/data/cards-raw.json"),
  { encoding: "utf-8" },
  function(err, data) {
    if (err) {
      return console.log(err);
    }

    const parsedData = JSON.parse(data);
    console.log(parsedData.length);

    const newData = parsedData
      .filter(
        card =>
          card.type === "MINION" ||
          card.type === "SPELL" ||
          card.type === "WEAPON"
      )
      .map(snakecaseKeys);
    console.log(newData.length);

    fs.writeFile(
      path.join(__dirname, "./src/data/cards-cleansed.json"),
      JSON.stringify(newData),
      function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      }
    );
  }
);
