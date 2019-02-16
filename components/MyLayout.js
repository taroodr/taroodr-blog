import Head from 'next/head'
import Router from "next/router";
import withGA from "next-ga";
import Header from './Header'
import Footer from './Footer'
import NProgress from 'nprogress'

const layoutStyle = {
}

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const Layout = (props) => (
  <div>
    <Head>
      <title>{props.title || 'Taroo Log || エンジニア×バンドマンのブログ'}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="首都圏でエンジニアxバンドマンとして活動している「KOTARO NAKAMURA」のブログ" />
      <meta name="og:site_name" content="Taroo Log || エンジニア×バンドマンのブログ" />
      <meta name="og:type" content="webpage" />
      <meta name="og:title" content="Taroo Log || エンジニア×バンドマンのブログ" />
      <meta name="og:description" content="首都圏でエンジニアxバンドマンとして活動している「KOTARO NAKAMURA」のブログ" />
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="/static/css/bulma.min.css" />
      <link rel="stylesheet" type="text/css" href="/static/css/default.css" media="screen" />
      <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Baloo+Paaji" rel="stylesheet" />
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

export default withGA("UA-115969381-3", Router)(Layout);
