import axios from "axios";

const API_BASE_URL = "https://finance.omnisuiteai.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export { API_BASE_URL };
