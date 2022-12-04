const db = require("../config/db");

class Parking {
  //get all parking.
  async getParkings(datas) {
    
    if(Object.keys(datas).length === 0){
        let results = await db.query(`SELECT * FROM parking`).catch(console.log);
        return results.rows;
    }else{
        let query = "SELECT * FROM parking where";
        let queryFilter=""
        if(datas.type_transport != "all"){
            queryFilter = " type_transport='"+datas.type_transport+"'";
        }else{
            queryFilter = " type_transport !=''";
        }
        let frist_date=""
        if(datas.frist_date != ''){
            frist_date = new Date(datas.frist_date).toISOString().slice(0, 10)
        }
        let last_date =""
        if(datas.last_date != ''){
            last_date = new Date(datas.last_date).toISOString().slice(0, 10)
        }
        if(datas.frist_date != '' && datas.last_date != ''){
            queryFilter += " and start_date between '"+frist_date+"' and '"+last_date+"'";
        }else{
            if(frist_date != ''){
                queryFilter += " and start_date::text like'"+frist_date+"%'";
            }else if(last_date != ''){
                queryFilter += " and start_date::text like '"+last_date+"%'";
            }
        }

        if(datas.frist_price != '' && datas.last_price != ''){
            queryFilter += " and price between '"+datas.frist_price+"' and '"+datas.last_price+"'";
        }else{
            if(datas.frist_price != ''){
                queryFilter += " and price = '"+datas.frist_price+"'";
            }else if(datas.last_price != ''){
                queryFilter += " and price = '"+datas.last_price+"'";
            }
        }
        query = query+queryFilter
        let results = await db.query(query).catch(console.log);
        return results.rows;
    }
  }

  //create a parking.
  async createParking(datas) {
    let result = this.compareDate(datas.startdt,datas.enddt);
    let time = result.split("|")
    
    let price_day_mobil = 0;
    let price_day_motor = 0;

    let days= parseInt(time[0]);
    let hour= parseInt(time[1]);
    let minutes= parseInt(time[2]);
    let seconds= parseInt(time[3]);

    if(minutes >= 1){
        hour += 1
    }

    if(days >= 1){
        price_day_mobil = 80000;
        price_day_motor = 40000;
    }

    let price = 0
    if(datas.type_transport == "mobil"){
        price = 5000
        price = (days*price_day_mobil)+(hour*price)
    }
    if(datas.type_transport == "motor"){
        price = 2000
        price = (days*price_day_motor)+(hour*price)
    }
    let startdt = this.convertStringToDate(datas.startdt);
    let enddt = this.convertStringToDate(datas.enddt);
    await db
      .query("INSERT INTO parking (type_transport, start_date, end_date, price) VALUES ($1, $2, $3, $4)", [datas.type_transport,new Date(Date.parse(startdt)),new Date(Date.parse(enddt)),price])
      .catch(console.log);
    return;
  }

  compareDate(start_date, end_date) {
    start_date = new Date(this.convertStringToDate(start_date));
    end_date = new Date(this.convertStringToDate(end_date));
    let seconds = Math.floor((end_date - (start_date))/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);
    
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    return days+"|"+hours+"|"+minutes+"|"+seconds
  }

  convertStringToDate(datetimes){
    let splitString = datetimes.split(" ")
    let date = splitString[0]
    let time = splitString[1]
    let splitDate=date.split("-")
    let changeDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0]+" "+time
    return changeDate;
  }
}

module.exports = Parking;