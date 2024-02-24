import React, { Component } from "react";
import API, { URL_PATH } from "../../../Common/API";
import redux from "../../../Common/Redux";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "@tinymce/tinymce-react";
class CreateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            parentCategories: [],
            editorState: "",
        };
    }

    fetchParentCategories = async () => {
        const data = await API.get(URL_PATH.parentDropDownData);
        this.setState({ parentCategories: data });
    };

    componentDidMount() {
        // this.fetchData(this.props.match.params.id);
        // this.fetchParentCategories();
        // alert("123");
    }
    saveData = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("content", this.state.editorState);
        console.table(formData);
        const headers = {
            "Content-Type": "multipart/form-data",
        };

        const { status, message, data } = await API.post(
            URL_PATH.createBlog,
            formData,
            {headers}
        );
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
        const { parentCategories, editorState } = this.state;
        return (
            <div className="container ">
                <h1>Write Blog</h1>
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
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                id="description"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Blog Cover image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                id="image"
                                required
                            />
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
                        initialValue="<p>Write Your Blog Here.</p>"
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
                                        headers
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
                            Submit Post
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default redux(CreateScreen);
