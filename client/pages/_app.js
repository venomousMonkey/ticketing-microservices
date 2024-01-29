// special component to be able to include external global css like bootstrap

import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../API/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

// we moved next specific initial props out of pages to the _app
// this properties will be common for all pages
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  // now we need to pass those properties to the page itself
  // in pageProps we are defining object with properties for specific component(page)
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  // data object includes currentUser
  return { pageProps, ...data };
};

export default AppComponent;
