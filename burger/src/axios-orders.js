import axious from 'axios'

const instance = axious.create({
    baseURL: 'https://react-my-burger-bb3fd.firebaseio.com/'
})

export default instance