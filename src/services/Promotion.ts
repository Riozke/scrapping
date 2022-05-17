import axios from "axios";
import Promotion from "@models/Promotion";
import { API_URL } from "@utils/config";

export default class PromotionService {
  static all(config?): Promise<Promotion[]> {
    return axios
      .get(`${API_URL}/promotions`, config)
      .then(response => response.data);
  }
}
