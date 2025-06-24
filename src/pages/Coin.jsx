import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../api/Api";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { watchlistAtom } from "../recoil/atom/watchlistAtom";
import { Sparklines, SparklinesCurve } from "react-sparklines";
import { pageAtom } from "../recoil/atom/pageAtom";

const Coin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageToShow, setPageToShow] = useRecoilState(pageAtom);
  const coinId = location.state?.id ?? pageToShow;
  const [coinData, setCoinData] = useState({});
  const [watchlist, setWatchlist] = useRecoilState(watchlistAtom);
  const [isCoinInWatchlist, setIsCoinInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const priceChange = {
    "24h": -1.7,
    "7d": -4.39,
    "14d": -4.69,
    "30d": -6.19,
    "1y": 56.42,
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      let data = await Api.getCoin(coinId);
      if (data) {
        setCoinData(data);
        setIsCoinInWatchlist(watchlist?.includes(data?.id));
        setIsLoading(false);
      }
    })();
  }, [coinId, watchlist]);
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          <Box
          // sx={{
          //   border: "1px solid rgba(255, 255, 255, 0.2)",
          //   position: "relative",
          //   width: "60vw",
          //   flex: 1,
          // }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" gutterBottom>
                Coin Details
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Button
                  onClick={() => {
                    navigate(-1);
                    setPageToShow("watchlist");
                  }}
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  sx={{ mb: 2, backgroundColor: "#112", color: "white" }}
                >
                  Back
                </Button>
              </Box>
            </Box>

            {/* Header row */}
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 2,
                // background: "#0F2A3E",
                background: "#112233",
              }}
            >
              <Box
              // sx={{
              //   height: 100,
              //   background: "#112233",
              //   borderRadius: 2,
              //   overflow: "hidden",
              // }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    backgroundColor: "#111",
                    color: "white",
                    display: "inline-block",
                    p: "2px 8px",
                    borderRadius: 1,
                  }}
                >
                  Rank #{coinData?.market_cap_rank}
                </Typography>
                <Typography variant="h5" fontWeight="bold" mt={1} color="white">
                  {coinData?.name} ({coinData?.symbol?.toUpperCase()})
                </Typography>
                <Typography variant="h4" fontWeight="bold" mt={1} color="white">
                  $ {coinData?.market_data?.current_price?.usd}{" "}
                  <span style={{ fontSize: "1rem" }}>(USD)</span>
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Avatar
                  src={coinData?.image?.large}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            </Paper>

            {/* Sparkline */}
            <Box sx={{ mt: 3, mb: 2 }}>
              {/* Replace this with your chart component */}
              <Box>
                <Sparklines
                  data={coinData?.market_data?.sparkline_7d?.price}
                  width={120}
                  height={20}
                >
                  <SparklinesCurve color="#e5e5e5" />
                </Sparklines>
              </Box>
            </Box>

            {/* Supply Info */}
            <Box sx={{ mt: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 300 }} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>
                        Circulating Supply
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="right">
                        {19882365}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>
                        Total Supply
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="right">
                        {19882384}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Max Supply</TableCell>
                      <TableCell sx={{ color: "white" }} align="right">
                        {21000000}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Price Change Table */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Price Change in %
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ background: "#122", borderRadius: 2 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(priceChange).map((key) => (
                        <TableCell sx={{ color: "white" }} key={key}>
                          {key}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {Object.values(priceChange).map((value, i) => (
                        <TableCell
                          key={i}
                          sx={{ color: value < 0 ? "salmon" : "lightgreen" }}
                        >
                          {value}%
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Watchlist Button */}
            <Box mt={4}>
              {isCoinInWatchlist ? (
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      backgroundColor: "#ffffff22",
                      borderColor: "white",
                    },
                  }}
                  onClick={() => {
                    const newList = watchlist?.filter(
                      (item) => item !== coinData?.id
                    );
                    setWatchlist(newList);
                    setIsCoinInWatchlist(false);
                  }}
                >
                  - Remove From Watchlist
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      backgroundColor: "#ffffff22",
                      borderColor: "white",
                    },
                  }}
                  onClick={() => {
                    setWatchlist((watchlist) => [...watchlist, coinData?.id]);
                    setIsCoinInWatchlist(false);
                  }}
                >
                  ➕ Add to Watchlist
                </Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default Coin;
