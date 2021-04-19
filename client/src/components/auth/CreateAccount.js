import React, { useState } from "react";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { toast } from "react-toastify";

// Components:
import ScrollToTop from "./../ScrollToTop";

import "./../../App.css";

function CreateAccount({ setAuth }) {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");

    async function register(e) {
        e.preventDefault();

        try {
            // Making sure the input fields are not empty or filled with empty spaces.
            if (userName === "" || (userName).replace(/\s/g, "") === "" || 
                pwd === "" || (pwd).replace(/\s/g, "") === "" ||
                confirmPwd === "" || (confirmPwd).replace(/\s/g, "") === "") {

                return toast.error("Please fill out all required input fields. (Empty spaces are not valid.)", 
                                    {autoClose: 4000});

                // eslint-disable-next-line
            } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                return toast.error("Please provide a valid email.", {autoClose: 3000});
                
            } else if (pwd !== confirmPwd) {
                return toast.error("Passwords must match.", {autoClose: 3000});
                
            } else if (pwd.length < 6) {
                return toast.error("Your password must be at least six characters long.", 
                                    {autoClose: 4000});

            }
            // Finished input validation.


            const body = { userName, email, pwd };

            // Registeration reponse:
            const regResponse = await fetch("http://localhost:5000/api/auth/create-account", {
                method: "POST",
                headers: {"Content-type": "application/json"},
				body: JSON.stringify(body),
				credentials: 'include'
            });

            const parseRegResponse = await regResponse.json();

            if (regResponse.status !== 200) {
                return toast.error( parseRegResponse.message );
            }

            // Successful registeration:
            await setAuth(true);
            toast.success( parseRegResponse.message, {autoClose: 3000} );
            
        } catch (error) {
			return toast.error( error.message );
        }
    }



	return (
		<div className="create-account-container">
			<ScrollToTop />

			<Link to="/">
				<img
					className="auth-page amazon-logo"
					src="/images/amazon-logo-black-text.png"
					alt="Amazon"
				/>
			</Link>

			<div className="create-account-input-container">
				<h1>Create account</h1>

				<form onSubmit={e => register(e)}>
					<h5>Your name</h5>
					<input
						type="text"
						required
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						autoFocus
					/>

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
						placeholder=" At least 6 characters"
						value={pwd}
						onChange={(e) => setPwd(e.target.value)}
					/>

					<div className="pwd-length-info-block">
						<InfoOutlinedIcon />
						<p>Passwords must be at least 6 characters.</p>
					</div>

					<h5>Re-enter password</h5>
					<input
						type="password"
						required
						value={confirmPwd}
						onChange={(e) => setConfirmPwd(e.target.value)}
					/>

					<button>Create your Amazon account</button>
				</form>

				<div className="create-account-redirect-container">
					Already have an account?
					<Link to="/User/Sign-In" className="create-account-sign-in-link">
						<p>
							Sign-In <ArrowRightIcon />{" "}
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CreateAccount;
