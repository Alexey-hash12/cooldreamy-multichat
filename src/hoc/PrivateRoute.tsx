import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}: {children?: ReactNode}) => {
    const {mainReducer: {token}} = useAppSelector(s => s)


    
    if(!token) {
        return <Navigate to={'/auth'}/>
    }
    
    return (
        <>{children}</>
    )
}

export default PrivateRoute;