import React from "react"
import ContentLoader from "react-content-loader"

const TextLoader = () => (
  <ContentLoader
    speed={1}
    width={400}
    height={260}
    viewBox="0 0 400 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
      <rect x="1" y="56" rx="3" ry="3" width="410" height="9" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="9" />
      <rect x="0" y="88" rx="3" ry="3" width="410" height="9" />
      <rect x="1" y="124" rx="3" ry="3" width="410" height="9" />
      <rect x="0" y="140" rx="3" ry="3" width="380" height="9" />
      <rect x="0" y="159" rx="3" ry="3" width="410" height="9" />
  </ContentLoader>
)

export default TextLoader