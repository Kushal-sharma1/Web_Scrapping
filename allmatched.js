
const cheerio = require("cheerio");
const request = require("request");
const {gifs} =require("./scorecard");
function matched(url){
request(url,cb);
}

function cb( err, res , body){
 if(err){
     console.log("error "+err);
 }else{
     collectmatch(body);
 }
    
}

function collectmatch(body){

    let selectool = cheerio.load(body);
    let scorecardele = selectool('a[data-hover="Scorecard"]');
    for(let i=0;i<scorecardele.length;i++){
    let relativelink =selectool(scorecardele[i]).attr("href");
    let drivelink="https://www.espncricinfo.com"+relativelink;
     gifs(drivelink);
    }
}

module.exports={
    matched:matched
}