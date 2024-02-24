import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import API, { URL_PATH, assetBaseUrl } from "../../Common/API";
import redux from "../../Common/Redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  makeStyles,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HeaderComponent from "../../Components/HeaderComponentMLP";

import { Box, Button, CardActions } from "@mui/material";

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    // paddingBottom: "20px",
    // marginBottom: "20px",
    padding: "18px",
  },

  container: {
    // width: "100%",
    // height: "100%",
    // position: "relative",
  },

  img: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "100%",
    maxHeight: "200px",
    // width: "50%",
  },
};


const classes = {
  card: {
    display: "flex",
  },
  cardMedia: {
    width: 160,
  },
  cardContent: {
    flex: 1,
  },
};

class ListFranchiseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = async () => {
    const res = await API.get(URL_PATH.listBlog);
    const { status, data, message } = res.data;
    console.table(data);

    if (data && data.length > 0) {
      this.setState({ data });
    }
    // console.log(JSON.stringify(data));
  };

  deleteBlog = async (id) => {
    const result = await API(this, "delete", URL_PATH.deleteBlog(id), null);
    if (result) {
      this.getBlogs();
      window.Alert({
        title: "Success",
        type: "success",
        text: "Delete Blog Success",
      });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <HeaderComponent section="root" theme="light" />
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></div>
          <Grid container spacing={2}>
            {data.map((item, index) => {
              const {
                id,
                title,
                description,
                cover_image,
                content,
                post_cover_height = 310,
                post_category = "Appearance",
                post_category_text_color = "#e8d4eb",
                post_title_text_color = "#000",
                post_description_text_color = "#a1a1a1",
                cta_button_text = "READ MORE",
                cta_button_text_color = "white",
                cta_button_bg_color = "#89229b",
              } = item;
              return (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  align="center"
                  key={index}
                  sx={{
                    marginBottom: "25px",
                  }}
                >
                  <Card
                    style={styles.card}
                    sx={{
                      "&:hover": {
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                        // scale: "1.1",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{
                          height: "220px",
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          // style={styles.media}
                          sx={{
                            height: "220px",
                            transition: "all 0.8s ease 0s",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            "&:hover": {
                              // transform: "scale(1.2)",
                              // after scale rotate by 10 deg
                              transform: "rotate(5deg) scale(1.2)",
                           

                            },
                          }}
                          image={assetBaseUrl + cover_image}
                          title="Card Media"
                        />
                      </div>
                      <Box
                        sx={{
                          overflow: "hidden",
                          textAlign: "start",
                          padding: "15px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ marginBottom: "10px",
                          "&:hover": {
                            color: "#89229b",
                            textDecoration: "underline",
                          }
                         }}
                        >
                          {title}
                        </Typography>
                        <Typography>{item.description}</Typography>
                      </Box>
                    </Box>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.3s ease 0s",
                        width: "70%",
                        // margin: "auto",
                        "&:hover": {
                          // transform: "scale(1.2)",
                          // after scale rotate by 10 deg
                          width: "100%",
                        },
                        "&:focus": {
                          transform: "scale(1.2)",
                        },
                      }}
                    >
                      <Link
                        to={routes.blogs.show(id, title)}
                        style={{
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="contained"
                          endIcon={
                            <ArrowForwardIosIcon sx={{ height: "15px" }} />
                          }
                          sx={{
                            borderRadius: "5px",
                            height: "55px",
                            p: "5px 35px",
                            fontWeight: "bold",
                            marginBottom: "30px",
                            width: "100%",
                          }}
                        >
                          Read More
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </>
    );
  }
}

export default redux(ListFranchiseScreen);
