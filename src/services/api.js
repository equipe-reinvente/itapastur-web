import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://presently-enabled-monkey.ngrok-free.app/',
})

export default Api;