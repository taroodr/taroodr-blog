import Layout from '../components/MyLayout.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
// https://github.com/FortAwesome/react-fontawesome

const About = (props) => (
  <Layout pathname={props.pathname} title='taroo log'>
    <div className="container has-text-centered">
      <div className="section">
        <div><img className="profile" src="/static/images/profile.jpg" /></div>
        <h1 className="title">Kotaro Nakamura</h1>
        <p>フロントエンドエンジニア & ドラマー</p>
      </div>
      <section className="section">
        <h2 className="skill-title title is-1">SKILL</h2>
        <div className="columns">
          <div className="columns column section is-10 is-offset-1">
            <div className="card column">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <section>
                      <h3 className="title is-4 has-text-centered">Frontend</h3>
                      <ul className="skill-list has-text-centered">
                        <li>
                          html5, css3
                        </li>
                        <li>
                          <span className="fav-skill">
                            <span className="fav-skill__icon"><FontAwesomeIcon color="red" icon={faHeart} /></span>
                            javascript
                          </span>
                        </li>
                        <li>jQuery</li>
                        <li>
                          <span className="fav-skill">
                            <span className="fav-skill__icon"><FontAwesomeIcon color="red" icon={faHeart} /></span>
                            vue.js
                          </span>
                        </li>
                        <li>react</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="card column">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <section>
                      <h3 className="title is-4 has-text-centered">Backend</h3>
                      <ul className="skill-list has-text-centered">
                        <li>
                          <span className="fav-skill">
                            <span className="fav-skill__icon"><FontAwesomeIcon color="red" icon={faHeart} /></span>
                            node.js
                          </span>
                        </li>
                        <li>Express.js</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="card column">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <section>
                      <h3 className="title is-4 has-text-centered">Design</h3>
                      <ul className="skill-list has-text-centered">
                        <li>photoshop</li>
                        <li>illustrator</li>
                        <li>adobe xd</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="card column">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <section>
                      <h3 className="title is-4 has-text-centered">Others</h3>
                      <ul className="skill-list has-text-centered">
                        <li>git</li>
                        <li>electron</li>
                        <li>slack</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <h2 className="skill-title title is-1">WORKS</h2>
        <div className="columns">
          <div className="columns column section is-10 is-offset-1">
            <a href="https://r-w-d.com/" className="card column">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="/static/images/rwd.png" alt="Placeholder image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <section>
                      <h3 className="title is-4 has-text-centered">バンドのwebsite</h3>
                      <p className="has-text-centered">フロントエンドはnuxt.js<br />CMSはheadless cmsのflamelinkを使用</p>
                    </section>
                  </div>
                </div>
              </div>
            </a>
            <a href="https://easypay-dd04a.firebaseapp.com/" className="card column">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src="/static/images/cashica.png" alt="Placeholder image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <section>
                      <h3 className="title is-4 has-text-centered">Cashica</h3>
                      <p className="has-text-centered">貸し借りを可視化するサービス<br />フロントエンドはnuxt.js<br />バックエンドはfirebase</p>
                    </section>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
    <style jsx>{`
      .title {
        color: #00adcc;
      }

      .skill-title {
        position: relative;
      }

      .skill-title::after {
        content: '';
        display: block;
        width: 50px;
        height:2px;
        background: #00adcc;
        position: absolute;
        bottom: -.5rem;
        left: 50%;
        transform : translateX(-50%);
        
      }
      .profile {
        border-radius: 50%;
        width: 200px;
      }

      .skill-list li {
        font-size: 1.2rem;
        position: relative;
      }

      .fav-skill {
        position: relative;
      }

      .fav-skill__icon {
        position: absolute;
        left: -2rem;
      }

      .columns {
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .card {
        flex-basis: 48%;
        justify-content: space-between;
        flex-wrap: nowrap;
        flex-grow: 0;
        margin-bottom: 2rem;
        padding: 0;
      }

      @media screen and (max-width: 768px) {
        .card {
          margin-bottom: 1rem;
        }
      }

    `}</style>
  </Layout>
)

About.getInitialProps = async function (context) {
  return {
    pathname: context.pathname
  }
}


export default About