import { Switch, Route, useRouteMatch } from "react-router-dom";
import {
    ListBlogScreen,
    CreateBlogScreen,
    ShowBlogScreen,
    UpdateBlogScreen,
    DeleteBlogScreen,
} from "../screens/Admin/Blog";
import routes from "../routes";
export default function gallery_image_routes() {
    return (
        <Switch>
            <Route
                path={routes.admin.blogs.create}
                component={CreateBlogScreen}
            />
            
            <Route
                path={routes.admin.blogs.update(":id")}
                component={UpdateBlogScreen}
            />
            <Route
                path={routes.admin.blogs.show(":id")}
                component={ShowBlogScreen}
            />
            <Route
                exact
                path={routes.admin.blogs.root}
                component={ListBlogScreen}
            />
            {/* <Route exact path={"/"} component={ListGalleryScreen} /> */}
        </Switch>
    );
}
