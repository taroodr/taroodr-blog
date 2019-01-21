import Link from 'next/link'

const linkStyle = {
}

const Header = () => (
  <div className="header">
    <div className="hero">
      <Link href="/">
        <h1 className="hero__title">
          <span>taro</span>
          <span>log</span>
        </h1>
      </Link>
      {/* https://codepen.io/RobinTreur/pen/QKjgPX */}
      <p className="hero__description">エンジニア×バンドマンのブログ</p>
      <nav className="nav">
        <Link href="/about">
          <a className="nav__link">About me</a>
        </Link>
        <a href="https://github.com/taroodr" className="nav__link" target="_blank">Github</a>
        <Link href="/">
          <a className="nav__link">免責事項</a>
        </Link>
      </nav>
    </div>
    <style jsx>{`
      .header {
        background-color: #00adcc;
      }
      .hero {
        max-width: 48rem;
        margin: 0 auto;
        padding: 1rem 0;
        text-align: center;
        color: #fff;
      }
      .hero__title {
        font-family: 'Baloo Paaji', cursive;
        font-size: 2rem;
        line-height: 2rem;
        margin-bottom: 0.5rem;
      }

      .hero__title:hover {
        cursor: pointer;
      }

      .hero__title span{
        width: 100%;
        float: left;
        color: $tertiary-color;
        -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
        clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
        transform: translateY(-50px);
        opacity: 0;
        animation-name: titleAnimation;
        animation-timing-function:ease;
        animation-duration: .5s;
      }

      h1 span{
        animation-delay: 0.6s;
        -webkit-animation-fill-mode: forwards;
      }

      h1 span:first-child{
        animation-delay: 0.7s;
      }

      h1 span:last-child{
        color: $secondary-color;
        animation-delay: 0.5s;
      }

      @keyframes titleAnimation {
        0% {
          transform: translateY(-50px);
          opacity: 0;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      }
      100% {
          transform: translateY(0);
          opacity: 1;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      }
      
    }

      .nav__link {
        margin: .25rem;
        padding: .25rem;
        display: inline-block;
        color: #fff;
      }

      a::after {
        background-color: #fff;
      }

  `}</style>
  </div>
)

export default Header
