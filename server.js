const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request')

const app = express()
app.set('view engine','ejs')
app.use(bodyparser.urlencoded( { extended:false } ))
app.use(bodyparser.json())
const PORT = '5000' || process.env.PORT

let rating;
let obj = {
  "status":"OK",
  "result":[
    {
      "name":"yadu"
    },
    {
      "name":"jaya"
    }
  ]
}

console.log(obj.result[0].name);

app.get('/',(req,res)=>{
  res.render('index',{rating:rating})
})

app.post('/',async (req,res)=>{
  let username = req.body.username
  console.log(username);
  await request(`https://codeforces.com/api/user.rating?handle=${username}`, function (error, response, data) {
  if(error) console.error('error:', error);

  // console.log('data:', data); // Print the HTML for the Google homepage.
  let d = JSON.parse(data)
  console.log('rating : ' , d.result[d.result.length-1].newRating);
  rating = d.result[d.result.length-1].newRating
});
  res.redirect('/')
})

app.listen(PORT,(err)=>{
  if(err) console.log('error');
  else {
    console.log(`listening at ${PORT}`);
  }
})
