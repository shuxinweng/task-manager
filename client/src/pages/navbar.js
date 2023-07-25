import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-task">Create Task</Link>
            {!cookies.access_token ? (
                <Link to="auth">Login/Register</Link>
            ) : (
                <>
                <Link to="/daily-tasks">Daily Tasks</Link>
                <Link to="/completed-tasks">Completed Tasks</Link>
                <button onClick={logout}> Logout </button> 
                </>
            )}
        </div>
    );
};