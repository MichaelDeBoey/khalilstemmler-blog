import React from 'react'
import PropTypes from 'prop-types'
import "../styles/Article.sass"
import HTMLContent from '../../../shared/HTMLContent'
import DatePostedAndReadingTime from './DatePostedAndReadingTime'
import ReactDisqusComments from 'react-disqus-comments'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import AboutTheAuthor from './AboutTheAuthor'
import AuthorCredit from './AuthorCredit'
import Authors from '../constants/AuthorConstants'
import ArticleTags from './ArticleTags'
import ArticleDescription from './ArticleDescription'

class Article extends React.Component {
  constructor (props) {
    super(props);

    this.getUniquePageIdentifier = this.getUniquePageIdentifier.bind(this);
  }

  getUniquePageIdentifier() {
    return typeof window !== 'undefined' && window.location.href
      ? typeof window !== 'undefined' && window.location.href
      : 'https://khalilstemmler.com'
  }
  
  render () {
    console.log(this.props)
    const props = this.props;
    const { title, html, image, date, category, readingTime, tags, description } = props;
    return (
      <section className="article-container">
        <h1 className="article-title">{title}</h1>
        <DatePostedAndReadingTime date={date} readingTime={readingTime}/>
        <ArticleTags tags={tags}/>
        <ArticleDescription description={description}/>
        <AuthorCredit author={Authors.khalil}/>
        
        {/* <div className="article-meta-container">
          <DatePostedAndReadingTime date={date} readingTime={readingTime}/>
          <span className="article-meta--bullet-point">•</span>
          <p className="author-name">By Khalil Stemmler</p>
          <span className="article-meta--bullet-point">•</span>
          <div>in <Link to={`/articles/categories/${kebabCase(category)}`}>{category}</Link></div>
        </div> */}
        
        <br/>
        <img src={image}/>
        <HTMLContent content={html}/>

        <AboutTheAuthor/>

        <ReactDisqusComments
          shortname="khalilstemmler-com"
          identifier={this.getUniquePageIdentifier()}
          title={title}
          url={this.getUniquePageIdentifier()}
        />
      </section>
    )
  }
}

export default Article;

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  date: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  html: PropTypes.string
}

// import { kebabCase } from 'lodash'
// import Helmet from 'react-helmet'
// import { Link } from 'gatsby-link'
// import Content, { HTMLContent } from '../components/Content'
// import ReactDisqusComments from 'react-disqus-comments'
// import SEO from '../components/SEO'
// import MailChimpSignup from '../components/MailChimpSignup'

// import helpers from '../helpers'

// import styles from '../styles/Blog.module.css'

// function getUniquePageIdentifier() {
//   return typeof window !== 'undefined' && window.location.href
//     ? typeof window !== 'undefined' && window.location.href
//     : 'https://khalilstemmler.com'
// }

// export const BlogPostTemplate = ({
//   content,
//   contentComponent,
//   description,
//   tags,
//   title,
//   helmet,
//   date,
//   image,
//   category,
// }) => {
//   const PostContent = contentComponent || Content

//   return (
//     <section>
//       {helmet || ''}
//       <div className={styles.blogPostContainer}>
//         <div>
//           <div style={{ margin: '0 auto' }} className="column is-10">
//             <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
//               {title}
//             </h1>

//             <h4 className={styles.date}>
//               in{' '}
//               <Link
//                 className={styles.category}
//                 to={`/blog/categories/${kebabCase(category)}/`}
//               >
//                 {category}
//               </Link>
//             </h4>

//             <div>
//               <img src={image} />
//             </div>

//             <p className={styles.description}>{description}</p>

//             <PostContent className={'blog-post-content'} content={content} />
//             {tags && tags.length ? (
//               <div style={{ marginTop: `4rem` }}>
//                 <h4>Tags</h4>
//                 <ul className="taglist">
//                   {tags.map(tag => (
//                     <li key={tag + `tag`}>
//                       <Link to={`/blog/tags/${kebabCase(tag)}/`}>{tag}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : null}
//             <MailChimpSignup />
//             <ReactDisqusComments
//               shortname="khalilstemmler-com"
//               identifier={getUniquePageIdentifier()}
//               title={title}
//               url={getUniquePageIdentifier()}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// BlogPostTemplate.propTypes = {
//   content: PropTypes.string.isRequired,
//   contentComponent: PropTypes.func,
//   description: PropTypes.string,
//   title: PropTypes.string,
//   helmet: PropTypes.instanceOf(Helmet),
// }