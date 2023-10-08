import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import NotFound from "./4O4-not-found.svg";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
const NotFoundPage = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 4000);
  return (
    <ContentWrapper>
      <div className="notFoundBox">
        <Img src={NotFound} alt={"not Found Image"} className="notFound" />
        <h2>Page doesn't exits</h2>
        <h3>You Will be Redirected to Home Page.....</h3>
      </div>
    </ContentWrapper>
  );
};

export default NotFoundPage;
