import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { pageAtom } from "../recoil/atom/pageAtom";

const CryptoCard = (props) => {
  const { coinData } = props;
  const navigate = useNavigate();
  const setPageToShow = useSetRecoilState(pageAtom);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //   backgroundColor: "#0B1B2A",
          color: "white",
          borderRadius: 2,
          padding: 2,
          width: "100%",
          //   maxWidth: 800,
          //   margin: "10px 5px",
          bgcolor: "rgba(0, 0, 0, 0.3)",
          "&:hover": {
            background: "linear-gradient(to right, #b92b27, #1565c0)",
            // color: "white", // optional: text color change on hover
            scale: 1.03,
            borderRadius: 2,
            cursor: "pointer",
          },
        }}
      >
        <CardActionArea
          onClick={() => {
            navigate("/coin", { state: { id: coinData.id } });
            setPageToShow(coinData.id);
          }}
        >
          <CardContent>
            {/* Left section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={coinData?.image}
                alt="Bitcoin"
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {coinData?.name}
                </Typography>
                <Typography>
                  Current Price :{" "}
                  <strong>{`$${coinData?.current_price}`}</strong> (USD)
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "lightgreen",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowUpwardIcon fontSize="small" />{" "}
                    {`$${coinData?.high_24h}`}
                  </Typography>
                  <Typography
                    sx={{
                      color: "salmon",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowDownwardIcon fontSize="small" />{" "}
                    {`$${coinData?.low_24h}`}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", ml: 1 }}>
                    (24h High-Low)
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right section - chart placeholder */}
            {/* <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              sx={{
                width: 200,
                height: 60,
                objectFit: "contain",
              }}
            >
              <Sparklines data={sparkline_in_7d?.price} width={120} height={20}>
                
                <SparklinesCurve color="#e5e5e5" />
              </Sparklines>
            </Box> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default CryptoCard;
