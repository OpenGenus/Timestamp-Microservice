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
    // Attempt to parse the date
    date = new Date(date_string);
    
    // Check if the parsed date corresponds to the input
    const inputDate = date_string.split('-').map(Number); // Split the input date string
    const parsedYear = date.getFullYear();
    const parsedMonth = date.getMonth() + 1; // JavaScript months are 0-based

    if (
      inputDate[0] !== parsedYear ||
      inputDate[1] !== parsedMonth ||
      inputDate[2] !== date.getDate()
    ) {
      // The parsed date does not match the input, so it's invalid
      res.json({ error: "Invalid Date" });
      return;
    }
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
