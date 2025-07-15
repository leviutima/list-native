import axios from "axios";
import Constants from "expo-constants"

const { API_URL } = Constants.expoConfig?.extra || {}

export const api = axios.create({
    baseURL: "http://192.168.15.3:3000",
    withCredentials: true,
})