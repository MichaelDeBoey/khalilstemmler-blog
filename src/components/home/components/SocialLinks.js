import React from 'react'
import GitHubButton from 'react-github-btn'
import PropTypes from 'prop-types';
import get from 'lodash'
import "../styles/SocialLinks.sass"

class SocialLinks extends React.Component {
  render () {
    const { github, twitter } = this.props;
    const showTwitterDataCount = twitter.showDataCount === true ? "true" : "false";
    const showGitHubDataCount = github.showDataCount === true ? "true" : "false"

    return (
      <div className="social-links">
        <a
          href="https://twitter.com/stemmlerjs"
          className="twitter-follow-button"
          data-size="large"
          data-show-count={showTwitterDataCount}
        >
            Follow @stemmlerjs
        </a>
        <GitHubButton
          href="https://github.com/stemmlerjs"
          data-size="large"
          data-show-count={showGitHubDataCount}
          aria-label="Follow @stemmlerjs on GitHub"
        >
          Follow
        </GitHubButton>
      </div>
    )
  }
}

export default SocialLinks;

SocialLinks.propTypes = {
  github: PropTypes.shape({
    showDataCount: PropTypes.bool,
  }),
  twitter: PropTypes.shape({
    showDataCount: PropTypes.bool,
  }),
}
