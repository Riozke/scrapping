import axios from "axios";
import Site from "@models/Site";
import { API_URL } from "@utils/config";

export default class SiteService {
  static all(config?): Promise<Site[]> {
    return axios
      .get(`${API_URL}/sites`, config)
      .then(response => response.data);
  }
}
