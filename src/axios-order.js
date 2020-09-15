import axios from 'axios'
const instance = axios.create({
    baseURL:'https://burger-builder-2-a6e60.firebaseio.com/'
})

export default instance