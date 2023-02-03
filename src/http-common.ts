import axios from 'axios';

export default axios.create({
    baseURL: "http://18.192.182.140/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN"
    }
})