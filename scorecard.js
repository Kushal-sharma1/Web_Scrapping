const cheerio = require("cheerio");
const request = require("request");
function getinfo(url){
request(url,cb);
}

function cb( err, res , body){
 if(err){
     console.log("error "+err);
 }else{
     collectscoreinfo(body);
 }
    
}

function collectscoreinfo(body){

    let selectool = cheerio.load(body);
    let scoreinfo = selectool('.match-header-info.match-info-MATCH');
    let scoreinfoarr = scoreinfo.text().split(",");
    //date
    console.log(scoreinfoarr[2]);
    //venue
    console.log(scoreinfoarr[1]);
    // result
    let result =selectool(".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text");
    console.log(result.text());
    //team name
}

module.exports={
    gifs:getinfo
}