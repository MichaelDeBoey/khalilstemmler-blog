import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Banner from "./Banner"
import Navigation from './Navigation'
import LayoutCol from "./LayoutColumn";
import Footer from './Footer';

import "../styles/layout.css"
import "../styles/layout.sass"
import "../../../../assets/styles/prism.css"
// require('prismjs/themes/prism-okaidia.css')

const hasContent = (title, component) => {
  if (!title && !component) return false;
  return true;
}

// TODO: The SEO component should really live in this component and be configurable
// via the props to Layout.

class Layout extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      darkModeEnabled: false
    }

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode = () => {
    const enabled = this.state.darkModeEnabled;

    if (enabled) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }

    this.setState({
      darkModeEnabled: !this.state.darkModeEnabled
    });

  }

  render () {
    const { children, title, component } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <> 
          {/* TODO: Add an SEO component */}
            <Banner siteTitle={data.site.siteMetadata.title} />
            <div className="dark-mode-toggle" onClick={this.toggleDarkMode}>☼</div>
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 1200,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: '4em',
              }}
            >
              <main 
                className="main"
                style={{
                  display: 'flex'
                }}>
                  <Navigation/>
                  <LayoutCol 
                    checkContent={true}
                    hasContent={hasContent(title, component)} index={0}>
                    {title ? <h2>{title}</h2> : ''}
                    {component ? component : ''}
                  </LayoutCol>
                  <LayoutCol index={1}>
                    {children}
                  </LayoutCol>
                </main>
            </div>
            <Footer/>
          </>
        )}
      />
    )
  }
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.any,
  title: PropTypes.string
}

export default Layout
