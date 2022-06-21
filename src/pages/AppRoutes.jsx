import { Container, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { videos as AppVideos } from "../static/videos";
import Cookie from "js-cookie";
// components
import Header from "../components/Header";
// material ui
import Hidden from "@material-ui/core/Hidden";
// pages
import Home from "./Home";
import VideoDetail from "./VideoDetail";
import axios from "axios";
import { routes } from "../static/routes";
import { useState } from "react";

const AppRoutes = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([...AppVideos]);

  useEffect(() => {
    const token = Cookie.get("access_token");
    axios.defaults.headers.common.Authorization = `${token}`;
    if (!token) {
      navigate(routes.login);
    }
  }, [navigate]);

  const handleSearch = (value) => {
    let results = AppVideos.filter((video) =>
      video.title.toLowerCase().includes(value.toLowerCase().trim())
    );
    setVideos(results);
    navigate(routes.home);
  };

  const handleClearSearch = () => setVideos(AppVideos);

  return (
    <>
      <Header handleSearch={handleSearch} onClear={handleClearSearch} />
      {/* search field for smaller screens */}
      <Hidden smUp>
        <Container maxWidth="xl">
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="Search Videos..."
            required
            fullWidth
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Container>
      </Hidden>
      <Routes>
        <Route path="/" element={<Home videos={videos} />} />
        <Route path="/video-detail/:id" element={<VideoDetail />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
