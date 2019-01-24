import Link from 'next/link'

const Footer = () => (
  <footer>
    <div className="section">
      <div className="container">
        <nav className="footer-nav">
          <ul className="columns is-centered">
            <li>
              <Link href="/about">
                <a className="column">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="column">About me</a>
              </Link>
            </li>
            <li>
              <a href="https://github.com/taroodr" className="column" target="_blank">Github</a>
            </li>
            <li>
              <Link href="/">
                <a className="column">免責事項</a>
              </Link>
            </li>
          </ul>
        </nav>
        <p className="copyright"><small>Copyright©Kotaro Nakamura. All Rights Reserved.</small></p>
      </div>
    </div>
    <style jsx>{`
      footer {
        background: #ededed;
      }

      .footer-nav {
        max-width: 768px;
        margin: 0 auto 2rem;
      }

      .copyright {
        text-align: center;
      }
  `}</style>
  </footer>
)

export default Footer