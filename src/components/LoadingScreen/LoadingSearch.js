import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./loading-files.json";
export default function LoadingSearch() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={100} />;
}
