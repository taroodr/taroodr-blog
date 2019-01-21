import Layout from '../components/MyLayout.js'
import Highlight from 'react-highlight'
import fetch from 'isomorphic-unfetch'
import formatDate from "../util/parseDate.js"

const Post = (props) => (
  <Layout title={props.title.rendered + ' | たろろぐ'}>
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="post">
              <h1 className="title">{props.title.rendered}</h1>
              <p className="post__date has-text-right">{formatDate(props.date)}</p>
              <Highlight innerHTML={true} className='markdown-body content'>
                {props.content.rendered}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .post {
        padding: 2rem 2rem;
      }
      .post__date {
        font-size: .8rem;
        line-height: 1.2;
        color: #999;
      }
    `}</style>
  </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.taroodr.com/wp-json/wp/v2/posts/${id}`)
  const data = await res.json()

  console.log(data)

  return data
}


export default Post