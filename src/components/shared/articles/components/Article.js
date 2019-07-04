import React from 'react'
import PropTypes from 'prop-types'
import "../styles/Article.sass"
import HTMLContent from '../../../shared/HTMLContent'
import { ArticleMeta } from '../../date-posted'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import AboutTheAuthor from './AboutTheAuthor'
import AuthorCredit from './AuthorCredit'
import Authors from '../constants/AuthorConstants'
import { Tags } from '../../tags'
import ArticleDescription from './ArticleDescription'
import SimilarArticles from './SimilarArticles'
import { SubscribeForm } from '../../../subscribe';
import ArticleCategory from './ArticleCategory'
import { ShareButtons } from '../../share-buttons';
import ArticleAnchors from './ArticleAnchors';
import { getCategoryIconAndBanner } from '../../../../utils/blog';

class Article extends React.Component {
  constructor (props) {
    super(props);
    this.getUniquePageIdentifier = this.getUniquePageIdentifier.bind(this);
    this.state = {
      anchors: []
    }
  }

  componentWillUnmount () {
    if (typeof window !== 'undefined') {
      try {
        document.querySelector('.article-anchors').remove()
      } catch (err) {
        console.log(err);
      }
    }
  }

  getUniquePageIdentifier() {
    return typeof window !== 'undefined' && window.location.href
      ? typeof window !== 'undefined' && window.location.href
      : 'https://khalilstemmler.com'
  }

  getAnchors () {
    let anchors = [];
    if (typeof window !== 'undefined') {
      const nodeList = document.querySelectorAll('a[name]');
      if (nodeList.length !== 0) {
        nodeList.forEach((node) => {
          anchors.push(node);
        })
      }
    }
    return anchors;
  }

  hasAnchors () {
    return !!this.getAnchors() && this.getAnchors().length !== 0;
  }

  mountAnchors () {
    setTimeout(() => {
      if (this.hasAnchors()) {
        try {
          document.querySelector('.article-anchors').style.opacity = "1";
        } catch (err) {
          console.log('Couldnt show article anchors', err)
        }
        this.setState({ 
          ...this.state, 
          anchors: this.getAnchors() 
        })
      }
    }, 3000)
  }

  componentDidMount () {
    this.mountAnchors();
  }

  isBlogPost () {
    return this.props.templateKey === "blog-post";
  }

  getImage () {
    if (this.isBlogPost()) {
      const iconAndBanner = getCategoryIconAndBanner(this.props.category)
      return iconAndBanner.banner;
    } else {
      return this.props.image;
    }
  }
  
  render () {
    const props = this.props;
    const { title, html, date, category, readingTime, tags, description, slug, anchormessage } = props;
    const fullUrl = `https://khalilstemmler.com${slug}`;
    const anchors = this.hasAnchors() ? this.getAnchors() : [];
    const image = this.getImage();
    
    return (
      <section className="article-container">
        <h1 className="article-title">{title}</h1>
        <ArticleAnchors message={anchormessage} anchors={anchors}/>
        <ArticleCategory category={category}/>
        <ArticleMeta 
          date={date} 
          readingTime={readingTime}
          editAndShare={true}
          title={title}
          url={fullUrl}
          slug={slug}
        />
        <Tags 
          tags={tags}/>
        <ArticleDescription 
          description={description}/>
        <AuthorCredit 
          author={Authors.khalil}/>
        
        <br/>
        <img src={image}/>
        <HTMLContent content={html}/>

        <h3>Discussion</h3>
        <p>Thoughts? Share the article if you think it'll be useful to someone + join the discussion about this post on Twitter! </p>
        <ShareButtons
          url={fullUrl}
          title={title}
        />
        <br/>

        <h3>Stay in touch!</h3>
        <SubscribeForm/>
        <br/>
        <br/>
        <AboutTheAuthor {...Authors.khalil}/>
        <div>View more in <Link to={`/articles/categories/${kebabCase(category)}`}>{category}</Link></div>
        
        <br/>
        {/* <ReactDisqusComments
          shortname="khalilstemmler-com"
          identifier={this.getUniquePageIdentifier()}
          title={title}
          url={this.getUniquePageIdentifier()}
        /> */}
        <a href="/resources/solid-nodejs-architecture">
          <img src="/img/resources/solid-book/insert-3.png"/>
        </a>
        <hr/>
        <h2>You may also enjoy...</h2>
        <p>A few more related articles</p>
        <SimilarArticles category={category} tags={tags} currentArticleSlug={slug}/>
        
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