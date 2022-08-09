import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = props => {
    const { allowedRoles } = props;
    const userTypes = localStorage.getItem("userTypes");

    /**
     * If the current logged in usertype exists in the allowedRoles array,
     * let him move to the concerned page  -- C1
     *
     *
     */
    if (allowedRoles.includes(userTypes)) {
        return <Outlet />;
    }

    /**
     * If the current logged in usertype and the allowed role are different,
     *
     *
     * if user is not logged in, redirect to login page -- C2
     */
    if (!userTypes) {
        return <Navigate to='/login' replace />;
    }
    /*
     * if user is logged in, redirect to unAuthorized page  -- C3
     *
     */
    return <Navigate to='/unauthorised' replace />;
};

export default RequireAuth;
