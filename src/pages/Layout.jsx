import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Stack, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Watchlist from "./Watchlist";
import {  Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { coinsListAtom } from "../recoil/atom/coinsListAtom";
import Api from "../api/Api";
import { pageAtom } from "../recoil/atom/pageAtom";
import Coin from "./Coin";

const Layout = () => {
  const [value, setValue] = useState("1");
  const [pageToShow, setPageToShow] = useRecoilState(pageAtom);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setPageToShow("watchlist");
    navigate("/")
  };
  const [coinsList, setCoinsList] = useRecoilState(coinsListAtom);

  useEffect(() => {
    (async function () {
      if (coinsList.length === 0) {
        let data = await Api.getCoinlist();
        if (data) {
          setCoinsList(data);
        }
      }
    })();
  }, [coinsList, setCoinsList]);

  return (
    <>
      <Paper
        elevation={0}
        square
        sx={{
          //   width: "100vw",
          //   height: "100vh",
          height: "100%",
          width: "100%",
          minHeight: "100vh",
          bgcolor: "#132940",
          //   bgcolor: "black",

          color: "white",
          display: "flex",
          //   alignItems: "center", // vertical alignment
          justifyContent: "center", // horizontal alignment
        }}
      >
        <Stack spacing={2} sx={{ marginTop: "50px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {"CRYPTO APP"}
            </Typography>
          </Box>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="Layout Tabs"
                //   sx={{ color: "white" }}
                textColor="error"
              >
                <Tab label="Top Coins" value={"1"} />

                <Tab label="Watchlist" value={"2"} />
              </TabList>
            </Box>
            {/* <Box
            sx={{
              border: "2px solid ", // blue border
              borderRadius: "8px", // optional rounded corners
              padding: 2,
              width: "350px",
              // textAlign: "center",
            }}
          ></Box> */}
            <TabPanel value={"1"}>
              {/* <Home /> */}
              <Box
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  position: "relative",
                  width: "60vw",
                  flex: 1,
                  padding: 2,
                }}
              >
                <Outlet />
              </Box>
            </TabPanel>
            <TabPanel value={"2"}>
              <Box
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  position: "relative",
                  width: "60vw",
                  flex: 1,
                  padding: 2,
                }}
              >
                {pageToShow === "watchlist" ? <Watchlist /> : <Coin />}
              </Box>
            </TabPanel>
          </TabContext>
        </Stack>
      </Paper>
    </>
  );
};
export default Layout;
