// const fetch = require('node-fetch');
const axios = require("axios");

module.exports.positions = async (req, res) => {
  // Load data dari payload terlebih dahulu
  async function payload() {
    const url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
    let response = await axios.get(url);
    return response.data;
  }

  //Fungsi Utama Filter Deskripsi
  function searchDescription(data, query) {
    query = query.toLowerCase();

    return data.filter(function(obj) {
      return Object.keys(obj)
                   .some(function(k) { 
                      // console.log(obj[k].toLowerCase());
                      if(obj[k] != null){
                        return obj[k].toLowerCase().indexOf(query) !== -1; 
                      }
                  });
    });
  }

  //Fungsi Utama Filter Lokasi
  function searchLocation(data, query) {
    query = query.toLowerCase();

    return data.filter(function(obj) {
      // console.log(obj.location);
      return Object.keys(obj.location)
                   .some(function() { 
                      // console.log(obj.location.toLowerCase());
                      if(obj.location != null){
                        return obj.location.toLowerCase().indexOf(query) !== -1; 
                      }
                  });
    });
  }

  //Fungsi Utama Filter Fulltime
  function searchFullTime(data, query) {
    query = query.toLowerCase();

    return data.filter(function(obj) {
      return Object.keys(obj.type)
                   .some(function() { 
                      if(obj.type != null){
                        return obj.type.toLowerCase().indexOf(query) !== -1; 
                      }
                  });
    });
  }

  //Jumlah item pada sebuah page setelah pagination
  const jumlah_item_pagination = 3;

  //Fungsi Utama Pagination
  function pagination(data, page) {
    return data.slice((page*jumlah_item_pagination)-jumlah_item_pagination,page*jumlah_item_pagination);
  }

  payload().then((data) => {
    //Filter full time terlebih dahulu
    if(req.query['full_time']){
      data = searchFullTime(data, (req.query['full_time']==="true" ? "full":"part"));
    }
    //Filter flokasi
    if(req.query['location']){
      data = searchLocation(data, req.query['location']);
    }
    //Filter Deskripsi
    if(req.query['description']){
      data = searchDescription(data, req.query['description']);
    }
    if(req.query['page']){
      data = pagination(data, parseInt(req.query['page']));
    }
    res.status(200).json({data});
  }), reason => {
    console.error(reason); // Error!
  };
}