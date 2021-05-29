// document.cookie = 'name=wsj;domain=127.0.0.1:4000'
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date + '; path=/';

document.cookie="name=value; domain=cookieDomain";
fetch('http://localhost:4000/cookie', {
  method: 'GET',
  credentials: 'include',
  mode: 'cors',
  headers: new Headers({
    name: 'aaa'
  })
}).then(res => {
  console.log(res)
  console.log(res.headers.get('name'))
  return res.text()
}).then(res => {
  console.log(res)
})

function clickFetch() {
  // $.ajax({
  //   url: "http://localhost:4000/getData",
  //   xhrFields: {
  //     withCredentials: true
  //   },
  //   crossDomain: true,
  //   success: function (data) {
  //     console.log(data)
  //   },
  //   error: function (err) {
  //     console.log(err)
  //   }
  // })
  // $.ajax({
  //   method: 'POST',
  //   url: "http://localhost:4000/postData",
  //   xhrFields: {
  //     withCredentials: true
  //   },
  //   crossDomain: true,
  //   success: function (data) {
  //     console.log(data)
  //   },
  //   error: function (err) {
  //     console.log(err)
  //   }
  // })
  fetch('http://localhost:4000/getData', {
  method: 'GET',
  credentials: 'include',
  mode: 'cors',
  headers: new Headers({
    name: 'aaa'
  })
}).then(res => {
  console.log(res)
  console.log(res.headers.get('name'))
  return res.text()
}).then(res => {
  console.log(res)
})
  fetch('http://localhost:4000/postData', {
  method: 'POST',
  credentials: 'include',
  mode: 'cors',
  headers: new Headers({
    name: 'aaa'
  })
}).then(res => {
  console.log(res)
  console.log(res.headers.get('name'))
  return res.text()
}).then(res => {
  console.log(res)
})
console.log('axios')
// axios.post('http://localhost:4000/postData', {
//   withCredentials: true,
// })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
}