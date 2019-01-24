import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const layoutStyle = {
}

const Layout = (props) => (
  <div>
    <Head>
      <title>{props.title || 'taroo log'}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="/static/css/bulma.min.css" />
      <link rel="stylesheet" type="text/css" href="/static/css/default.css" media="screen" />
    </Head>
    <div style={layoutStyle}>
      <div>
        <Header pathname={props.pathname} />
        {props.children}
        <Footer />
      </div>
    </div>
  </div>
)

export default Layout

  