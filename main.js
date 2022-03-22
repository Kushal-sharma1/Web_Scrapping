let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const cheerio = require("cheerio");
const request = require("request");
const matcher =require("./allmatched");

request(url,cb);

function cb( err, res , body){
 if(err){
     console.log("error "+err);
 }else{
     handleHtml(body);
 }
    
}

function handleHtml(body){

    let selectool = cheerio.load(body);
    let anchor = selectool('a[data-hover="View All Results"]');
    // console.log(anchor.html());
    let relativelink =anchor.attr("href");
    // console.log(relativelink);   
    let drivelink="https://www.espncricinfo.com"+relativelink;
    console.log(drivelink); 
    matcher.matched(drivelink);  
}