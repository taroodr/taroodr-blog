import Layout from '../components/MyLayout.js'

const Notice = (props) => (
  <Layout pathname={props.pathname} title='taroo log'>
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="content column is-10 is-offset-1">
            <h1 className="title">当ブログのご利用について（免責事項）</h1>
            <p>taroo log（以下、「当サイト」とします。）における免責事項は、下記の通りです。</p>
            <p>当サイトのコンテンツや情報において、可能な限り正確な情報を掲載するよう努めています。しかし、誤情報が入り込んだり、情報が古くなったりすることもあります。必ずしも正確性を保証するものではありません。</p>
            <p>また、当ブログで掲載している情報につきましては、一切の予告なく内容を変更する可能性があります。あらかじめご了承ください。</p>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
    `}</style>
  </Layout>
)

Notice.getInitialProps = async function (context) {
  return {
    pathname: context.pathname
  }
}

export default Notice
