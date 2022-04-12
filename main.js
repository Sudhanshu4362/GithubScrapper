let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const getrepo = require("./repo");
const { gtr } = require("./repo");


request(url,cb);

function cb(err, res, body) {
  if (err) {
    console.log("error", err);
  } else {
    handleHtml(body);
  }
}

function handleHtml(code) {
  let selector = cheerio.load(code);
  let topicArray = selector(".no-underline.flex-grow-0");
  let topicNameArray = selector(".f3.lh-condensed.mb-0.mt-1.Link--primary");
  for (let i = 0; i < 3; i++) {
    let ithTopicLink = selector(topicArray[i]).attr("href");
    let topicDirName = selector(topicNameArray[i + 3]).text();
    let topic = ithTopicLink.split("/").pop();
    let fullTopicLink = "https://github.com" + ithTopicLink;
    gtr(fullTopicLink, topic);
  }
}