import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="88" cy="88" r="88" />
    <rect x="0" y="193" rx="0" ry="0" width="170" height="19" />
    <rect x="0" y="221" rx="0" ry="0" width="169" height="48" />
    <rect x="0" y="278" rx="0" ry="0" width="72" height="21" />
    <rect x="102" y="278" rx="0" ry="0" width="72" height="18" />
  </ContentLoader>
);

export default Skeleton;
