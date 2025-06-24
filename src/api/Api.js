import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

const getCoin = (id) => {
  return axios
    .get(
      `${API_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`
    )
    .then((response) => {
      return response.data;
    });
};

const getWatchlist = (ids) => {
  return axios
    .get(
      `${API_URL}/coins/markets?vs_currency=USD&ids=${ids}&order=market_cap_desc&per_page=5&page=1&sparkline=true&locale=en`
    )
    .then((response) => {
      return response.data;
    });
};

const getCoinlist = () => {
  return axios.get(`${API_URL}/coins/markets?vs_currency=USD&sparkline=true`).then((response) => {
    return response.data;
  });
};

export default { getCoin, getWatchlist, getCoinlist };
