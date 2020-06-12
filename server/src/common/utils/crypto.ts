import crypto = require('crypto')

const secret = 'ASD!$!%Ffdssfdfdsdf6321341423^^fsdf'
export const md5 = password => {
  const hash = crypto.createHash('md5')
  hash.update(secret + password)
  const md5Password = hash.digest('hex')
  return md5Password;
}

const md52 = password => {
  return md5(md5(secret + password))
}
export default md52
