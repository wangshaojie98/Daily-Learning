document.cookie = 'name=wsj'
fetch('http://localhost:4000/getData', {
  method: 'PUT',
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