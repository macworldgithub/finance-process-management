import axios from "axios";

const API_DOTNET_BASE_URL = "https://financedotnet.omnisuiteai.com/api";

export const apiClientDotNet = axios.create({
  baseURL: API_DOTNET_BASE_URL,
});

export { API_DOTNET_BASE_URL };
