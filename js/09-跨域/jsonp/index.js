jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})

function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    window[callback] = function (data) {
      resolve(data)
    }
    params = {...params, callback }
    let arrParams = []
    Object.keys(params).forEach(key => {
      arrParams.push(`${key}=${params[key]}`)
    })

    let script = document.createElement('script')
    script.src = `${url}?${arrParams.join('&')}`
    document.body.appendChild(script)
  })
}