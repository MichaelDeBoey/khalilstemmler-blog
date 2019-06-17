import React from 'react'
import Layout from "../components/shared/layout"
import { Link } from 'gatsby'

const hasText = (text, textToFind) => {
  return text.indexOf(textToFind) !== -1;
}

class BestContent extends React.Component {
  constructor (props) {
    super(props);

    this.getTitleAndSubtext = this.getTitleAndSubtext.bind(this);
  }

  getTitleAndSubtext = () => {
    const { search } = this.props.location;
    let fromSOLID = hasText(search, 'solid-book-subscription');
    let fromDDDCourse = hasText(search, 'ddd-course');
    let fromNCS = hasText(search, 'ncs')

    let title = "";
    let subtext = "";

    if (fromSOLID) {
      title = "Done. Thanks for showing interest!"
      subtext = "You'll get a download link via email when the book launches."
    }

    if (fromDDDCourse) {
      title = "Thanks for showing interest!"
      subtext = "I'll let you know when we go live :)"
    }

    if (fromNCS) {
      title = "Cool! The book is on it's way to your email."
      subtext = "Make sure to check your spam, it might have gone in there."
    }

    return { title, subtext }
  }

  componentWillMount () {

  }

  render () {
    const { title, subtext } = this.getTitleAndSubtext();

    return (
      <Layout 
        title="Best content"
        seo={{ title: "Best content", keywords: [] }}
        rawMode={false}
        component={<div></div>}>

          <h1>{title}</h1>
          <h2>{subtext}</h2>

          <hr/>

          <p>Here's some of the best content from the blog over the past little while.</p>

          <p>
            <Link to="/articles/solid-principles/solid-typescript/">SOLID Principles: The Software Developer's Framework to Robust & Maintainable Code [with Examples]</Link> - 🔥🔥🔥🔥(whoaaaa) 50K reads
          </p>

          <p>
            <Link to="/articles/when-to-use-typescript-guide/">When To Use TypeScript - A Detailed Guide Through Common Scenarios</Link> - 🔥🔥🔥30K reads
          </p>

          <p>
            <Link to="/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/">Clean & Consistent Express.js Controllers | Enterprise Node.js + TypeScript</Link> - 🔥🔥20K reads
          </p>

          <p>
            <Link to="/articles/domain-driven-design-intro/">An Introduction to Domain-Driven Design - DDD w/ TypeScript</Link> - 🔥14K reads
          </p>
      </Layout>
    );
  }
}

export default BestContent;