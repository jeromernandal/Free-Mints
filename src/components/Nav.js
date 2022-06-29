const Nav = () => {
  return (
    <header className="header">
      <h1 className="header-logo">Your Logo</h1>
      <nav>
        <ul>
          <li>
            <a href="https://www.opensea.io" target={"_blank"} rel="noreferrer">
              <img
                src="./images/opensea.svg"
                width={45}
                height={45}
                alt="opensea-icon"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.etherscan.io"
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src="./images/etherscan.svg"
                width={45}
                height={45}
                alt="twitter-icon"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src="./images/twitter.svg"
                width={45}
                height={45}
                alt="twitter-icon"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
