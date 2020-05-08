import React from 'react';

import Layout from '../components/Layout';
import { Link } from 'gatsby';

const IndexPage = () => (
  <Layout fullMenu>
    <article id="main">
      <header>
        <h2>404 - Not Found</h2>
        <p>Oops! Something went wrong!</p>
        <Link to="/">Go back to the homepage</Link>
      </header>
    </article>
  </Layout>
);

export default IndexPage;
