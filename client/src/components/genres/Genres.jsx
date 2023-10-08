import React, { useContext } from "react";
import { Context } from "../../store/Context";
import "./style.scss";

const Genres = ({ data }) => {
  const { genres } = useContext(Context);

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
