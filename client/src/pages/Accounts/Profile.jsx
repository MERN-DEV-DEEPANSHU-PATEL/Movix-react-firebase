import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase-config";
import "./style.scss";
import { Context } from "../../store/Context";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);

  const [isMember, setIsMember] = useState(false);
  const [pType, setPType] = useState(false);
  const [display, setDisplay] = useState({ class: "", message: "" });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const toggleMember = () => {
    setIsMember(!isMember);
  };

  const setupUser = async (User) => {
    try {
      if (isMember) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          User.email,
          User.password
        );
        setUser(user);
        setDisplay({ class: "alert-success", message: "login Successful..." });
      } else {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          User.email,
          User.password
        );
        user.displayName = User.fullName;
        await setUser(user);
        await updateProfile(user, {
          displayName: User.fullName,
        });
        setDisplay({
          class: "alert-success",
          message: "Sign Up Successful...",
        });
      }
    } catch (error) {
      setDisplay({
        class: "alert-danger",
        message: error.message,
      });
    }
    setTimeout(() => {
      setDisplay({
        class: "",
        message: "",
      });
    }, 3000);
  };

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  const logout = async () => {
    await signOut(auth);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !emailRef?.current?.value ||
      !passwordRef?.current?.value ||
      (!isMember && !nameRef?.current?.value)
    ) {
      setDisplay({
        class: "alert-danger",
        message: `Please Provide all values`,
      });
    } else {
      const currentUser = {
        fullName: nameRef?.current?.value,
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      };
      setupUser(currentUser);
    }
  };
  const memoizedDisplayMessage = useMemo(
    () => (
      <span className={`alert-profile ${display.class}`}>
        {display.message}
      </span>
    ),
    [display.class, display.message]
  );

  if (auth.currentUser === null) {
    return (
      <div className="login-box">
        <h2>{isMember ? "Login" : "Register"}</h2>
        <form className="login-container" onSubmit={onSubmit}>
          {!isMember && (
            <div className="user-box">
              <input type="text" ref={nameRef} required />
              <label>Full Name</label>
            </div>
          )}
          <div className="user-box">
            <input type="text" required ref={emailRef} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              id="checkbox"
              type={pType ? "text" : "password"}
              required
              ref={passwordRef}
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="checkbox"
              name="pType"
              id="pType"
              onChange={(e) => setPType(e.target.checked)}
            />
            <label htmlFor="pType">
              {pType ? "Show Password" : "Hide Password"}
            </label>
          </div>
          {memoizedDisplayMessage}
          <button type="submit">
            submit
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <p className="toggle">
            {!isMember ? "Not a member yet?" : "Already a member ?"}
            <a onClick={toggleMember}>{isMember ? "Register" : "Login"}</a>
          </p>
        </form>
      </div>
    );
  } else {
    return (
      <div className="login-success">
        <h2 className="user-name">Hello {user?.displayName} !!!!!!</h2>
        <h3 className="info-text">Go to your wishlist from here 👇👇👇👇👇</h3>
        <span className="btn">
          <button
            className="btn-nav btn-1"
            onClick={() => navigate("/profile/wishlist")}
          >
            Go To WishList
          </button>
          <button className="btn-nav btn-2" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="btn-nav btn-3" onClick={logout}>
            Logout
          </button>
        </span>
      </div>
    );
  }
};

export default Profile;
