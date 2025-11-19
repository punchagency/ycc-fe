import React from "react";
import { useReduxAuth } from "@/hooks/useReduxAuth";
import { Loading } from "@/components/ui/Loading";


const Logout: React.FC = () => {
    const { logout } = useReduxAuth();

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    }
    React.useEffect(() => {
        handleLogout();
    }, []);
    return (
        <Loading />
    )
}

export default Logout