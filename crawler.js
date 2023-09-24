// const axios = require("axios");
// const cheerio = require("cheerio");

// const stripHtml = (content) => {
//   return content.trim().replace(/<\/?[^>]+>/gi, "");
// };

// async function sync_content(externalUrl) {
//   let url = "https://www.fleetmon.com/maritime-news/";
//   if (externalUrl && externalUrl.length) {
//     url = externalUrl;
//   }

//   let posts = [];

//   try {
//     // console.log(`Crawling.. ${url}`);
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     $(".uk-grid-medium").each(async function (i, elem) {
//       // console.log(Syncing.. Checking : https://www.fleetmon.com${$(elem).find('h2 > a').attr('href')});

//       // const promiseMap =

//       let title = $(elem).find(".news-headline > h2").text();
//       let thumbnail = `https://${$(elem)
//         .find(".uk-cover-container")
//         .find("[uk-img]")
//         .attr("data-src")}`;
//       let description = $(elem).find("p").text();
//       let link = `https://www.fleetmon.com${$(elem)
//         .find("h2 > a")
//         .attr("href")}`;
//       console.log("link is ...", link);
//       if ($(elem).find("h2 > a").attr("href") != undefined) {
//         const contentResponse = await axios.get(link.trim());
//         const contenttdata$ = cheerio.load(contentResponse.data);

//         const content = contenttdata$("#content")
//           .text()
//           .replace(/<[^>]*>?/gm, "")
//           .trim();
//         let meta = {
//           created_at: "",
//           category: "",
//           author: "",
//         };

//         if (
//           title &&
//           thumbnail &&
//           description &&
//           meta.created_at &&
//           meta.category &&
//           meta.author
//         ) {
//           posts.push({
//             title: stripHtml(title),
//             link: link.trim(),
//             thumbnail: thumbnail.trim(),
//             content: content,
//             description: stripHtml(description),
//             meta: meta,
//           });
//         }
//       }
//     });

//     // return posts;
//   } catch (error) {
//     console.error(error);
//   }
// }
// sync_content();
// // module.exports = { sync_content };

const axios = require("axios");
const cheerio = require("cheerio");

const stripHtml = (content) => {
  return content.trim().replace(/<\/?[^>]+>/gi, "");
};

async function sync_content(externalUrl) {
  let url = "https://www.fleetmon.com/maritime-news/";
  if (externalUrl && externalUrl.length) {
    url = externalUrl;
  }

  let posts = [];

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const promises = [];

    $(".uk-grid-medium").each(function (i, elem) {
      const link = `https://www.fleetmon.com${$(elem)
        .find("h2 > a")
        .attr("href")}`;

      if ($(elem).find("h2 > a").attr("href") != undefined) {
        const promise = (async () => {
          const contentResponse = await axios.get(link.trim());
          const contenttdata$ = cheerio.load(contentResponse.data);

          const title = stripHtml($(elem).find(".news-headline > h2").text());
          const thumbnail = `https://${$(elem)
            .find(".uk-cover-container")
            .find("[uk-img]")
            .attr("data-src")}`;
          const description = stripHtml($(elem).find("p").text());
          const content = contenttdata$("#content")
            .text()
            .replace(/<[^>]*>?/gm, "")
            .trim();
          const meta = {
            created_at: "",
            category: "",
            author: "",
          };

          posts.push({
            title,
            link: link.trim(),
            thumbnail: thumbnail.trim(),
            content,
            description,
            meta,
          });
        })();
        promises.push(promise);
      }
    });

    await Promise.all(promises);

    return posts;
  } catch (error) {
    console.error(error);
    return posts;
  }
}

// Call the function and handle the returned posts
sync_content()
  .then((posts) => {
    console.log(posts);
    // Do something with the posts array here
  })
  .catch((error) => {
    console.error(error);
  });
