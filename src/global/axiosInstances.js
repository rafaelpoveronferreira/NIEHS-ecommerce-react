import { SERVER } from "./constants";
import axios from 'axios'

export const authRequest = axios.create({
    baseURL: `${SERVER}auth`,
  });
