import {environment} from "../../environments/environment";

const {url} = environment;

export const urls = {
  user: `${url}/users`,
  auth: `${url}/auth`,
}
