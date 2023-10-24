const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/:date?", (req, res) => {
  const date_string = req.params.date;
  let date;
  let unix;
  let utc;

  if (!date_string) {
    // If date_string is empty, set it to the current date and time
    date = new Date();
  } else if (/^\d{5,}$/.test(date_string)) {
    // Check if date_string is a Unix timestamp in milliseconds
    date = new Date(parseInt(date_string));
  } else {
    // Assume date_string is a date in the format "YYYY-MM-DD"
    date = new Date(date_string);
  }

  if (!isNaN(date)) {
    // If the date is valid, set the unix and utc values
    unix = date.getTime();
    utc = date.toUTCString();
    res.json({ unix, utc });
  } else {
    // Trigger an error message when the input is not a valid date
    res.json({ error: "Invalid Date" });
  }
});
