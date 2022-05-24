// const fetch = require('node-fetch');
const axios = require("axios");

module.exports.positions = async (req, res) => {
  // req.query['description'];

  // try {
  //   axios("http://dev3.dansmultipro.co.id/api/recruitment/positions.json")
  //   .then(res => res.data);
  //   // .then(text => console.log(text));
  //   // const user = await User.login(username, password);
  //   // const token = createToken(user._id);
  //   // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  //   // res.status(200).json({ user: user._id });
  // } 
  // catch (err) {
  //   const errors = handleErrors(err);
  //   res.status(400).json({ errors });
  // }

  async function payload() {
    const url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
    let response = await axios.get(url);
    return response.data;
  }

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

  payload().then((data) => {
    // console.log(data);
    // console.log(req.query['description']);
    if(req.query['full_time']){
      data = searchFullTime(data, (req.query['full_time']==="true" ? "full":"part"));
    }
    if(req.query['location']){
      data = searchLocation(data, req.query['location']);
    }
    if(req.query['description']){
      data = searchDescription(data, req.query['description']);
    }
    res.status(200).json({data});
  }), reason => {
    console.error(reason); // Error!
  };
}