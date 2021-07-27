import './Login.css';
import { useState } from 'react';
import userServices from '../../services/userServices';
import { useHistory } from 'react-router';

function LoginPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        try {
            const user = await userServices.login(email, password);
            if (user) {
                history.push('/body');
            } else {
                alert('Invalid Credential');
            }
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login">
            <form className="login_form">
                <h3>Login</h3>
                <div className="login_group">
                    <label>Email</label>
                    <input
                        className="login_input"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="login_group">
                    <label>Password</label>
                    <input
                        className="login_input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleSignIn} className="login_button">
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
