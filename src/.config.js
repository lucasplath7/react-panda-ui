const apiURL = process.env.REACT_APP_API_URL || 'https://www.react-panda.com:5001/api'

console.log('API URL: ', apiURL)

module.exports = {
    //apiURL: 'http://localhost:5000/api',
    apiURL: apiURL,
}