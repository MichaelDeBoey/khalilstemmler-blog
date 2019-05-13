import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import timeIcon from '../../../../images/icons/time.svg'
import timeDarkMode from '../../../../images/icons/time-dark.svg'
import "../styles/ArticleMeta.sass"
import { createTwitterShareURL, createEditOnGitHubURL } from '../../../../utils/social';



const ArticleMeta = ({ date, readingTime, isUpdatedTime, editAndShare, url, slug }) => (
  <div className="date-posted">
    <img className="date-posted--light-mode" src={timeIcon}/>
    <img className="date-posted--dark-mode" src={timeDarkMode}/>
    <div>
      {isUpdatedTime ? 'Updated ' : ''}{moment(date).format('MMM Do, YYYY')} / {readingTime.text} 
      {editAndShare ? (
        <>
          {` / `}<a href={createTwitterShareURL(url)} target="_blank">Share</a>
          {` / `}<a href={createEditOnGitHubURL(slug)}>Edit on GitHub</a>
        </>
      ) : ''}
    </div>
  </div>
)

export default ArticleMeta;

ArticleMeta.propTypes = {
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired,
  isUpdatedTime: PropTypes.bool
}
