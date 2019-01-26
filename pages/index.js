import React from 'react'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import formatDate from "../util/parseDate.js"

export default class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps(context) {
    const urls = ['//api.taroodr.com/wp-json/wp/v2/posts', '//api.taroodr.com/wp-json/wp/v2/tags'];
    const results = await Promise.all(urls.map(url => this.get(url)))
    const data = await Promise.all(results.map(result => result.json()));
    return {
      posts: data[0],
      tags: data[1],
      pathname: context.pathname
    }
  }

  static get(url) {
    return fetch(url);
  }

  render() {
    let tags = {};
    this.props.tags.forEach(tag => {
      tags[tag.id] = tag;
    });

    return (
      <Layout title="taroo log" pathname={this.props.pathname}>
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                {this.props.posts.map((post) => (
                  <div key={post.id} className="post">
                    <Link as={`/p/${post.id}`} href={`/post?id=${post.id}`}>
                      <article>
                        <h2 className="post__title">{post.title.rendered}</h2>
                        <p className="post__text excerpt">{post.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')}</p>
                        <span className="post__date">{formatDate(post.date)}</span>
                        <div className="tags"></div>
                        {post.tags.map(tag => <span className="post__tag" key={tag} >{tags[tag].name}</span>)}
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

        @media screen and (max-width: 768px) {
          .post {
            padding: 0rem;
            margin-bottom: 4rem;
          }

          .columns {
            padding-top: 1rem;
          }

          .column {
            padding: 0;
          }
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

        .tags {
          display: inline-block;
          padding-left: 1rem;
        }

        .post__tag {
          display: inline-block;
          margin: 5px 5px 5px 0;
          padding: 2px 8px;
          border-radius: 15px;
          background: #f4f4f4;
          color: #666;
          font-size: 12px !important;
          font-weight: bold;
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
}


// https://api.taroodr.com/wp-json/wp/v2/posts?tags=3