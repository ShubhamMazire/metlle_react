import React, { Component } from "react";
import API, { URL_PATH, assetBaseUrl} from "../../../Common/API";
import redux from "../../../Common/Redux";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import routes from "../../../routes";
class CreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      parentCategories: [],
      editorState: "",
      title: "",
      description: "",
      image: "",
      initialEditiorState: "",
    };
  }

  fetchParentCategories = async () => {
    const data = await API.get(URL_PATH.parentDropDownData);
    this.setState({ parentCategories: data });
  };

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
    // this.fetchParentCategories();
    // alert("123");
  }

  fetchData = async (id) => {
    const {data} = await API.get(URL_PATH.showBlog(id));

    const { status, message } = data;

    if (status == "error")
      return alert({
        title: "Error",
        text: message,
        icon: "error",
      });

    
    this.setState({
      loading: false,
      title: data.data.title,
      description: data.data.description,
      image: data.data.cover_image,
      initialEditiorState: data.data.content,

    });

    console.table(data.data);

  };
  saveData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("content", this.state.editorState);
    console.table(formData);
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const {data} = await API.put(
      URL_PATH.updateBlog(this.props.match.params.id),
      formData,
      {headers}
    );

    const { status, message } = data;

    if (status == "error")
      return alert({
        title: "Error",
        text: message,
        icon: "error",
      });
    this.props.history.push("/admin/blogs");
  };
  // onEditorStateChange = (state) => {
  //     console.log("onEditorStateChange" + JSON.stringify(state));
  //     this.setState({ editorState: state });
  // };
  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    this.setState({ editorState: content });
  };
  render() {
    const {  editorState } = this.state;

    const initialEditiorState = this.state.initialEditiorState;


    return (
      <div className="container ">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Update Blog</h1>
          {/* button add new */}
          <Link to={routes.admin.blogs.create} className="btn btn-primary m-1">
            View All
          </Link>
        </div>
        <form className="row" onSubmit={(e) => this.saveData(e)}>
          <div className="col-md-12">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="title"
                id="name"
                required

                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </div>
            <div className="form-group mt-2">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                id="description"
                required

                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </div>
            <div className="form-group mt-2">
              <label>Blog Cover image</label>
              <div
              
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}

              ><input
                type="file"
                className="form-control"
                name="image"
                id="image"
                
              />
              <img src={assetBaseUrl+this.state.image} alt="" 
              
              className="img-fluid w-5 m-l-2"

              style={{
                width: "100px",
                height: "100px",
              }}
              
              />
              </div>

            </div>

            {/* <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                        /> */}
          </div>
          <Editor
            onEditorChange={this.handleEditorChange}
            apiKey="h1ayfg01g0gbksjuunlte13eswebjohryglac9qbnjsbvxo2"
            // onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={initialEditiorState}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "charmap",
                "searchreplace",
                "visualblocks",
                "insertdatetime",
                "media",
                "table",
                "paste",
                "code",
                "help",
                "wordcount",
                "autolink",
                "lists",
                "link",
                // "image",
                "preview",
                "anchor",
                "fullscreen",
              ],
              toolbar:
                "undo redo  | blocks | formatselect | " +
                "bold italic backcolor forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat table fullscreen | link | lists table | searchreplace",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              // images_upload_url:
              //     "http://127.0.0.1:8000/api/v1/admin//file-uplaod",

              images_upload_handler: (blobInfo, progress) =>
                new Promise(async (resolve, reject) => {
                  var xhr, formData;

                  formData = new FormData();

                  formData.append(
                    "image",
                    blobInfo.blob(),
                    blobInfo.filename()
                  );

                  const headers = {
                    "Content-Type": "multipart/form-data",
                  };

                  const data = await API.post(
                    URL_PATH.fileUpload,
                    formData,
                    {headers}
                  );
                  console.table(data);
                  progress(100);
                  // alert(JSON.stringify(data));
                  // ).then((data) => {
                  resolve(data.location);
                  // });
                }),
            }}
          />
          <div className="form-group mt-2">
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default redux(CreateScreen);
