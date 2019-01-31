import Layout from '../components/MyLayout.js'
import Highlight from 'react-highlight'
import fetch from 'isomorphic-unfetch'
import formatDate from "../util/parseDate.js"

const Post = (props) => (
  <Layout title={props.title.rendered + ' | taroo log'}>
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <h1 className="title">{props.title.rendered}</h1>
              <p className="post__date has-text-right">{formatDate(props.date)}</p>
              <Highlight innerHTML={true} className='markdown-body'>
                {props.content.rendered}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      @media screen and (max-width: 768px) {
        .column {
          padding: 0;
        }
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
  const res = await fetch(`//api.taroodr.com/wp-json/wp/v2/posts/${id}`)
  const data = await res.json()

  return data
}


export default Post