import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import CryptoCard from "../components/CryptoCard";
import { useRecoilValue } from "recoil";
import { watchlistAtom } from "../recoil/atom/watchlistAtom";
import { coinsListAtom } from "../recoil/atom/coinsListAtom";

const Watchlist = () => {
  const watchlist = useRecoilValue(watchlistAtom);
  const coinsList = useRecoilValue(coinsListAtom);
  const filteredCoinsList = coinsList?.filter((coin) =>
    watchlist?.includes(coin?.id)
  );

  return (
    <>
      <Box>
        <InfiniteScroll
          dataLength={filteredCoinsList.length}
          loader={
            <Box sx={{ textAlign: "center", py: 2 }}>
              <CircularProgress color="primary" />
            </Box>
          }
        >
          {filteredCoinsList?.map((coin, idx) => (
            <Box key={coin.id} sx={{ mb: 2 }}>
              <CryptoCard coinData={coin} />
            </Box>
          ))}
        </InfiniteScroll>
      </Box>
    </>
  );
};
export default Watchlist;
