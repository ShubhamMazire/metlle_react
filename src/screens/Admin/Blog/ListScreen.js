import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../../../routes";
import API, { URL_PATH } from "../../../Common/API";
import redux from "../../../Common/Redux";
class ListFranchiseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = async () => {
    const {data} = await API.get(URL_PATH.listBlog);


    const { status, message } = data;

    if (status == "error")
      return alert({
        title: "Error",
        text: message,
        icon: "error",
      });

    console.table(data.data);
    this.setState({ data:data.data });
  };

  deleteBlog = async (id) => {
    const {data} = await API.delete(URL_PATH.deleteBlog(id));

    if (data.status=="success") {
      this.getBlogs();
      alert({
        title: "Success",
        type: "success",
        text: "Delete Blog Success",
      });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Blogs</h1>
          {/* button add new */}
          <Link to={routes.admin.blogs.create} className="btn btn-primary m-1">
            Add new
          </Link>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>

              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.updated_at}</td>
                <td>
                  {/* <Link className="btn btn-primary m-1">
                                        Show
                                    </Link> */}
                  <Link
                    className="btn btn-primary m-1"
                    to={routes.admin.blogs.update(blog.id)}
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={() =>{

                      // native alert

                      if (window.confirm("Are you sure you want to delete this Home screen Tile?")) {
                        this.deleteBlog(blog.id);
                      }



                      // window.Alert(
                      //   {
                      //     title: "delete",
                      //     text: "are you sure you want to delete this Home screen Tile",
                      //     showCancelButton: true,
                      //   },
                      //   () => {
                      //     this.deleteBlog(blog.id);
                      //   }
                      // )
                    }
                    }
                    className="btn btn-danger m-1"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default redux(ListFranchiseScreen);
