var b = '0'
var a = '123'


if (a.indexOf('1') === 0) {	
	b = '1'
}
switch(a) {
	case '123':
		b = '123'
		break
	case '1':
		b = 's1'
		break
	case '2':
		b = 's2'
		break
	case '3':
		b = 's3'
		break
	default:
		b = 's0'
}
console.log(b)