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
    let teames = selectool(".name-link .name");
    let team1 =selectool(teames[0]).text();
    let team2=selectool(teames[1]).text();
    console.log(team1);
    console.log(team2);
    //innings
    let allbatesman =selectool(".table.batsman tbody");
    // console.log("batesman length" + allbatesman.length);
    console.log("PlayerName\t\t|runs\t|balls\t|fours\t|sixes\t|strike rate");
    let htmlstring="";
    for(let i=0;i<allbatesman.length;i++){
     
     htmlstring=htmlstring+selectool(allbatesman[i]).html();
     let allrows = selectool(allbatesman[i]).find("tr");
     for(let j=0;j<allrows.length;j++){
       let row =selectool(allrows[j]);
       let firstcolumn =row.find("td")[0];
       if(selectool(firstcolumn).hasClass("batsman-cell")){
       let playername = selectool(row.find("td")[0]).text();
       let runs =selectool(row.find("td")[2]).text();
       let balls=selectool(row.find("td")[3]).text();
       let fours =selectool(row.find("td")[5]).text();
       let sixes=selectool(row.find("td")[6]).text();
       let strike=selectool(row.find("td")[7]).text();
       console.log(playername+"\t\t"+runs+"\t"+balls+"\t"+fours+"\t"+sixes+"\t"+strike);
       }

     }
    }
    
}

module.exports={
    gifs:getinfo
}
