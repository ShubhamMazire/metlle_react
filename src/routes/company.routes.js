import { Switch, Route, useRouteMatch } from "react-router-dom";


import AboutUs from "../screens/Company/AboutUs";


import routes from "../routes";



export default function gallery_image_routes() {
    return (
        <Switch>
            <Route
                exact
                path={routes.company.root}
                component={AboutUs}
            />
            {/* <Route exact path={"/"} component={ListGalleryScreen} /> */}
        </Switch>
    );
}
