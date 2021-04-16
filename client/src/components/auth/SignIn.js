import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import "./../../App.css";

function SignIn({ setAuth }) {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");

	const history = useHistory();

    async function signIn(e) {
        e.preventDefault();

        try {
            // Quick input validation.
            // eslint-disable-next-line
            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                
                return toast.error("Please provide a valid email.", {autoClose: 3000});
                
            } else if (pwd === "" || (pwd).replace(/\s/g, "") === "") {
                return toast.error("Please provide your password.", {autoClose: 3000});
            }
            // Finsihed input validation.

            const body = { email, pwd };

            const signInResp = await fetch("http://localhost:5000/api/auth/sign-in", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseSignInResp = await signInResp.json();

            if (signInResp.status !== 200) {
                return toast.error( parseSignInResp.message );
            }

            // The user has successful signed in:
            localStorage.setItem("token", parseSignInResp.token);
            setAuth(true);
            toast.success( parseSignInResp.message, {autoClose: 3000} );
            
        } catch (error) {
            return toast.error( error.message );
        }
    }

	return (
		<div className="sign-in-container">
			<Link to="/">
				<img
					className="auth-page amazon-logo"
					src="/images/amazon-logo-black-text.png"
					alt="Amazon"
				/>
			</Link>

			<div className="sign-in-or-create-account-container">
				<div className="sign-in-input-container">
					<h1>Sign-In</h1>
					<form onSubmit={e => signIn(e)}>
						<h5>Email</h5>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<h5>Password</h5>
						<input
							type="password"
							required
							value={pwd}
							onChange={(e) => setPwd(e.target.value)}
						/>

                        <button className="sign-in-btn">Sign-In</button>
					</form>
				</div>

				<div className="new-to-amazon-info-container">
					<p className="new-to-amazon">New to Amazon?</p>
				</div>

				<button
					className="create-account-btn"
					onClick={(e) => history.push("/User/Create-Account")}
				>
					Create your Amazon account
				</button>
			</div>
		</div>
	);
}

export default SignIn;
