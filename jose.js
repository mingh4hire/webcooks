const { JWK, JWE } = require('jose')
const privateKey = JWK.asKey('De125690M!34jMadsf39085!!!!jfdsjaa')
const jwe = 'ZpNFtcz0ZqTnsqVo7_QX6NQ4CDkCuC8cRv3x0IKn_Nc'
const jwt = JWE.decrypt(jwe, privateKey)
const payload = Buffer.from(jwt.toString().split('.')[1], 'base64')
const data = JSON.parse(payload)
console.log(data)