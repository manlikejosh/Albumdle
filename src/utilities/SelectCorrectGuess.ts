import data from "/Users/josh/albumdle/src/components/data.json";
import schedule from "node-schedule";
const fs = require("fs");
import answerFile from "/Users/josh/albumdle/src/utilities/dailyAnswer.json";

schedule.scheduleJob("1 * * * * *", function () {
  let length = data.length;

  const correctAnswer = data[Math.floor(Math.random() * (length - 0) + 0)];

  fs.readFile(answerFile, (err: any) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Write the updated JSON back to the file
    fs.writeFile(answerFile, correctAnswer, (err: any) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }

      console.log("JSON file updated successfully.");
    });
  });
});
