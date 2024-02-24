//write Dispatch functions here
import { connect } from "react-redux";

//set redux state variables as prop
function mapStateToProps(state) {
    return {
        isAuth: state.isAuth,
        userData: state.userData,
        loading: state.loading,
        guestUserModelId: state.guestUserModelId,
        betaShow:state.betaShow,
        footerShow: state.footerShow,
    };
}

//action functions to update redux state value
function mapDispatchToProps(dispatch) {
    return {
        setAuth: (value) => dispatch({ type: "SET_AUTH", value }),
        setUser: (value) => dispatch({ type: "SET_USER", value }),
        setLoading: (value) => dispatch({ type: "setLoading", value }),
        setGuestUserModelId: (value) => dispatch({ type: "setGuestUserModelId", value }),
        vanishGuestUserModelId: () => dispatch({ type: "clearGuestUserModelId", value: [] }),
        setBetaShow: (value) => dispatch({ type: "setBetaShow", value }),
        setFooterShow: (value) => dispatch({ type: "setFooterShow", value }),
    };
}

export default (screen) => connect(mapStateToProps, mapDispatchToProps)(screen);
