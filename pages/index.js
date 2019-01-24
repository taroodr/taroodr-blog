import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import formatDate from "../util/parseDate.js"

const Index = (props) => {
  return (
    <Layout title="taroo log" pathname={props.pathname}>
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              {props.posts.map((post) => (
                <div key={post.id} className="post">
                  <Link as={`/p/${post.id}`} href={`/post?id=${post.id}`}>
                    <article>
                      <h2 className="post__title">{post.title.rendered}</h2>
                      <p className="post__text excerpt">{post.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')}</p>
                      <span className="post__date">{formatDate(post.date)}</span>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
      <style jsx>{`
        a:hover {
          opacity: 0.6;
        }

        .post {
          padding: 2rem 2rem;
          transition: .2s;
          cursor: pointer;
        }

        .post:hover {
          box-shadow:0px 0px 6px 3px #f0f0f0;
        }

        .post__title {
          font-size: 1.2rem;
          line-height: 1.2;
          margin-bottom: .5rem;
          font-weight: bold;
        }

        .post__text {
          font-size: .9rem;
          line-height: 1.2;
          margin-bottom: .7rem;
        }

        .post__date {
          font-size: .8rem;
          line-height: 1.2;
          color: #999;
        }

        .excerpt {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      `}</style>
    </Layout>
  )
}

Index.getInitialProps = async function (context) {
  const res = await fetch('//api.taroodr.com/wp-json/wp/v2/posts')
  const data = await res.json()
  return {
    posts: data,
    pathname: context.pathname
  }
}

export default Index