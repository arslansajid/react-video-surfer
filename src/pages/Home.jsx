//components
import Card from "../components/Card";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4, 0),
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Home = ({ videos }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={2}>
          {videos.map((item) => {
            return (
              <Grid
                key={item.id}
                onClick={() => navigate(`/video-detail/${item?.id}`)}
                className={classes.cardContainer}
                item
                lg={3}
                md={4}
                sm={6}
                xs={12}
              >
                <Card item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
