const cheerio = require("cheerio");
const request = require("request");
const xlsx =require("xlsx");
const fs =require("fs");
const path =require("path");

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
    let date= scoreinfoarr[2];
    //venue
    console.log(scoreinfoarr[1]);
    let venue =scoreinfoarr[1];
    // result
    let result =selectool(".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text");
    console.log(result.text());
    let win=result.text();
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
      if(i==0){
      playerInformation(date,venue,team1,team2,win,playername,runs,balls,fours,sixes,strike);
      }else{
        playerInformation(date,venue,team2,team1,win,playername,runs,balls,fours,sixes,strike);   
      }

       }

     }
    }
    
}
function playerInformation(date,venue,team1,team2,final,playername,runs,balls,fours,sixes,strike){
let teampath = path.join(__dirname,"IPL",team1);
if(!fs.existsSync(teampath)){
    fs.mkdirSync(teampath);
}
let playerpath =path.join(teampath,playername+".xlsx");
let content=excelReader(playerpath,playername);
let playerobj={
    date,venue,team1,team2,final,playername,runs,balls,fours,sixes,strike
};
content.push(playerobj);
excelWriter(playerpath,content,playername);

}

function excelReader(playerPath, playername) {
    if (!fs.existsSync(playerPath)) {
      return [];
    }
    let workbook= xlsx.readFile(playerPath);
    let playerSheet = workbook.Sheets[playername];
    let data =xlsx.utils.sheet_to_json(playerSheet);
    return data;
}
  
  function excelWriter(playerPath, jsObject, sheetName) {
    //Creates a new workbook
    let newWorkBook = xlsx.utils.book_new();
    //Converts an array of JS objects to a worksheet.
    let newWorkSheet = xlsx.utils.json_to_sheet(jsObject);
    //it appends a worksheet to a workbook
    xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, sheetName);
    // Attempts to write or download workbook data to file
    xlsx.writeFile(newWorkBook, playerPath);
  }


module.exports={
    gifs:getinfo
}
