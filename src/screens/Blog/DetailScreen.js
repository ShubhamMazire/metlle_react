import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import Parser from "html-react-parser";
import API, { URL_PATH, assetBaseUrl } from "../../Common/API";
import HeaderComponent from "../../Components/HeaderComponentMLP";
import Text from "../../Components/Text";
import { Link } from "react-router-dom";
import routes from "../../routes";
// passed id and title from route params extract and call api to get blog data

class ReadBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      content: "",
    };
  }

  componentDidMount() {
    this.getBlogs();
    // get id and title from url

    const { id, title } = this.props.match.params;

    this.setState(
      {
        blog: {
          id: id,
          title: title,
        },
      },
      () => {
        this.getBlogDetail();
      }
    );
  }

  getBlogs = async () => {
    const res = await API.get(URL_PATH.listBlog);
    const { status, data, message } = res.data;
    console.table(data);

    if (data && data.length > 0) {
      // remove current blog from list
      const filteredData = data.filter((item) => {
        return item.id !== this.state.blog.id;
      });

      this.setState({ data: filteredData });
    }
    // console.log(JSON.stringify(data));
  };

  getBlogDetail = async () => {
    const { id } = this.state.blog;
    const url = URL_PATH.showBlog(id);

    const result = await API.get(url);
    const { title, description, cover_image, content } = result.data.data;
    // console.log(result.data);
    this.setState({ title, description, cover_image, content });
  };

  render() {
    const { content = "" } = this.state;

    return (
      <>
        <HeaderComponent section="root" theme="light" />
        <Box className="container">
          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            <Grid item xs={12} md={8}>
              <Box className="shaddow">
                <img
                  src={assetBaseUrl + this.state.cover_image}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: "70vh",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />

                <Box
                  sx={{
                    backgroundColor: "#535CE8FF",
                    padding: "20px",
                  }}
                >
                  <Text h3 bold color="white">
                    {this.state.blog.title}
                  </Text>
                </Box>

                <div style={{ marginTop: "50px" }} className="container">
                  <div className="container">{Parser(content)}</div>
                </div>
              </Box>
            </Grid>

            {/* recent blogs */}

            <Grid item xs={12} md={4}>
              <Box className="shaddow">
                <Box sx={{ padding: "20px" }}>
                  <Text h4 bold>
                    Recent Blogs
                  </Text>
                </Box>

                {this.state.data && this.state.data.length > 0 ? (
                  this.state.data.map((item, index) => {
                    return (
                      <Link to={routes.blogs.show(item.id,item.title)} style={{
                        textDecoration: "none",}}>
                        <Box
                          key={index}
                          sx={{
                            padding: "20px",
                            borderBottom: "1px solid #ccc",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Text
                                h7
                            medium
                            style={{
                              
                              color: "black",
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            p
                            style={{
                              
                              color: "black",
                            }}
                          >
                            {item.description}
                          </Text>
                        </Box>
                      </Link>
                    );
                  })
                ) : (
                  <Text p>No Blogs Found</Text>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default ReadBlog;
