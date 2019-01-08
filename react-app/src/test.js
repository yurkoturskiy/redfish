var q = {
  somekey: 'somevalue',
  opt: 'someee',
}
var w = {}
Object.entries(q).forEach(
  ([key, value]) => w[key] = value
)
console.log(w)