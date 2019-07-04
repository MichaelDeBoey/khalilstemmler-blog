import React from 'react'
import '../styles/BlogsContainer.sass'
import BlogCard from './BlogCard';

const BlogsContainer = ({ titleText, subTitleComponent, blogs }) => (
  <div className="blogs-container">
    <h2 className="light-header">{titleText}</h2>
    { subTitleComponent ? subTitleComponent : ''}
    <br/>
    { blogs.map((blog, i) => (
      <BlogCard key={i} {...blog} />
    ))}
  </div>
)

export default BlogsContainer;