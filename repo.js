const request = require("request");
const cheerio = require("cheerio");
const getIssues = require("./issues");


function getrepo(url, topic) {
    request(url, cb);
    function cb(err, res, body) {
        if (err) {
            console.log("error", err);
        } else {
            getrepolink(body);
            // console.log(body);
        }
    }

    function getrepolink(html) {
        let selecTool = cheerio.load(html);
        let headingsArr = selecTool(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for (let i = 0; i < 8; i++) {
            let twoAnchor = selecTool(headingsArr[i]).find("a");
            let link = selecTool(twoAnchor[1]).attr("href");
            // console.log(link);
            let fullTopicLink = `https://github.com${link}/issues`;
            // console.log(fullTopicLink);
            let repoName = link.split("/").pop();
            getIssues(fullTopicLink,topic,repoName);
        }
        console.log(("```````````````````````"));
    }
}

module.exports = {
    gtr: getrepo
}