import React from 'react';

import { Link } from 'gatsby';
import Layout from '../components/Layout';

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
