const db = require("../config/db");

class Parking {
  //get all parking.
  async getParkings(datas) {
    if(datas === '' && datas === null){
        let results = await db.query(`SELECT * FROM parking`).catch(console.log);
        return results.rows;
    }else{
        if(datas.type_transport != "all"){
            let results = await db.query(`SELECT * FROM parking where type_transport = $1`,[datas.type_transport]).catch(console.log);
            return results.rows;
        }
        let results = await db.query(`SELECT * FROM parking`).catch(console.log);
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

    if(minutes > 1){
        hour += 1
    }

    if(days > 1){
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
    await db
      .query("INSERT INTO parking (type_transport, start_date, end_date, price) VALUES ($1, $2, $3, $4)", [datas.type_transport,datas.startdt,datas.enddt,price])
      .catch(console.log);
    return;
  }

  compareDate(start_date, end_date) {
    start_date = new Date(start_date);
    end_date = new Date(end_date);
    let seconds = Math.floor((end_date - (start_date))/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);
    
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    return days+"|"+hours+"|"+minutes+"|"+seconds
  }
}

module.exports = Parking;