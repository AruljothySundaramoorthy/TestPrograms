const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.fleetmon.com/maritime-news/";

axios
  .get(url)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;

      const $ = cheerio.load(html);

      const content = $("#content")
        .text()
        .replace(/<[^>]*>?/gm, "")
        .trim();

      console.log(content);
    } else {
      console.error("Failed to retrieve the webpage.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
