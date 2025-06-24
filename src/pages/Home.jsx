import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import CryptoCard from "../components/CryptoCard";
import { useRecoilValue } from "recoil";
import { coinsListAtom } from "../recoil/atom/coinsListAtom";

const Home = () => {
  const coindata = useRecoilValue(coinsListAtom);

  return (
    <>
      {/* <Container maxWidth="md"> */}
      <Box>
        <InfiniteScroll
          dataLength={coindata.length}
          //   next={fetchCoins}
          //   hasMore={hasMore}
          //   hasMore={true}
          loader={
            <Box sx={{ textAlign: "center", py: 2 }}>
              <CircularProgress color="primary" />
            </Box>
          }
          endMessage={
            <Box sx={{ textAlign: "center", py: 2, color: "gray" }}>
              You’ve seen it all!
            </Box>
          }
        >
          {coindata?.map((coin) => (
            <Box key={coin.id} sx={{ mb: 2 }}>
              <CryptoCard coinData={coin} />
            </Box>
          ))}
        </InfiniteScroll>
      </Box>
      {/* </Container> */}
    </>
  );
};
export default Home;
