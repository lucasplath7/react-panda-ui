console.log('API URL: ', process.env.REACT_APP_API_URL)
module.exports = {
    //apiURL: 'http://localhost:5000/api',
    apiURL: process.env.REACT_APP_API_URL,
}