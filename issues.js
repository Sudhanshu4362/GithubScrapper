const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path")
const pdfkit = require("pdfkit");

function getIssues(url, topic,repoName) {
    request(url, cb);
    function cb(err, res, body) {
        if (err) {
            console.log("error", err);
        } else {
            getIssuespage(body);
        }
    }
    function getIssuespage(html) {
        let selecTool = cheerio.load(html);
        let issuesArr = selecTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr = [];
        for(i = 0; i<issuesArr.length;i++){
            let link = selecTool(issuesArr[i]).attr("href")
            console.log(link);
            arr.push(link);
        }
        let folderpath = path.join(__dirname,topic);
        dirCreator(folderpath);
        let filePath = path.join(folderpath,repoName + ".pdf");
        let text = JSON.stringify(arr);
        let pdfdoc = new pdfkit();
        pdfdoc.pipe(fs.createWriteStream(filePath));
        pdfdoc.text(text);
        pdfdoc.end();
    } 

}

module.exports = getIssues;
function dirCreator(folderpath) {
     if(fs.existsSync(folderpath) == false){
         fs.mkdirSync(folderpath)
     }
}