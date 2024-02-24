import { Switch, Route, useRouteMatch } from "react-router-dom";
import {
    ListBlogScreen,
    ShowBlogScreen,
} from "../screens/Blog";
import routes from "../routes";



export default function gallery_image_routes() {
    return (
        <Switch>
{/* <Route path="/en/blog/:id/:title" component={ReadBlog} /> */}
            <Route
                path={routes.blogs.show(":id",":title")}
                component={ShowBlogScreen}
            />
            <Route
                exact
                path={routes.blogs.root}
                component={ListBlogScreen}
            />
            {/* <Route exact path={"/"} component={ListGalleryScreen} /> */}
        </Switch>
    );
}
