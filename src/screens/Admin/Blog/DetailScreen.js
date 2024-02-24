import React, { Component } from "react";
import API, { URL_PATH } from "../../../Common/API";
import redux from "../../../Common/Redux";
class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }
    componentDidMount() {
        this.fetchData(this.props.match.params.id);
    }
    fetchData = async (id) => {
        const data = await API.get(URL_PATH.showFranchise(id));
        const {
            name,
            email,
            phone,
            address,
            city,
            state,
            zip,
            country,
            latitude,
            longitude,
            timezone,
            currency,
            language,
            status,
            status_string,
            logo,
            owner,
            owner_email,
            owner_phone,
            owner_address,
            owner_city,
            owner_state,
            owner_zip,
            owner_country,
            owner_latitude,
            owner_longitude,
            owner_timezone,
        } = data;
        this.setState({
            name,
            email,
            phone,
            address,
            city,
            state,
            zip,
            country,
            latitude,
            longitude,
            timezone,
            currency,
            language,
            status,
            status_string,
            logo,
            owner,
            owner_email,
            owner_phone,
            owner_address,
            owner_city,
            owner_state,
            owner_zip,
            owner_country,
            owner_latitude,
            owner_longitude,
            owner_timezone,
            loading: false,
        });
    };
    render() {
        const {
            name,
            email,
            phone,
            address,
            city,
            state,
            zip,
            country,
            latitude,
            longitude,
            timezone,
            currency,
            language,
            status,
            status_string,
            logo,
            owner,
            owner_email,
            owner_phone,
            owner_address,
            owner_city,
            owner_state,
            owner_zip,
            owner_country,
            owner_latitude,
            owner_longitude,
            owner_timezone,
            loading,
        } = this.state;
        return (
            <div className="container">
                <h1>Category Detail 147</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                className="form-control"
                                value={city}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Zip</label>
                            <input
                                type="text"
                                className="form-control"
                                value={zip}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                className="form-control"
                                value={country}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Latitude</label>
                            <input
                                type="text"
                                className="form-control"
                                value={latitude}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Longitude</label>
                            <input
                                type="text"
                                className="form-control"
                                value={longitude}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Timezone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={timezone}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Currency</label>
                            <input
                                type="text"
                                className="form-control"
                                value={currency}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Language</label>

                            <input
                                type="text"
                                className="form-control"
                                value={language}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <input
                                type="text"
                                className="form-control"
                                value={status_string}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Logo</label>
                            <input
                                type="text"
                                className="form-control"
                                value={logo}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Owner</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_email}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_phone}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_address}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner City</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_city}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner State</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_state}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Zip</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_zip}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Country</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_country}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Latitude</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_latitude}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Longitude</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_longitude}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner Timezone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={owner_timezone}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default redux(DetailScreen);
