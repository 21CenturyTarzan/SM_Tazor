import React from "react";
import "./background.scss";
import ComingSoon from "../../../../assets/images/DEMO.png";

function Background() {
  return (
    <div className="landing-background">
      <div className="landing-background-blobs-top">
        <img alt="" src={ComingSoon} width="100%" />
      </div>
    </div>
  );
}

export default Background;
