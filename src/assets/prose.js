import React from 'react'
import { Link } from 'gatsby'

export default {
  "main": {
    "description": (
      <span>
        Essential software development <span className="special-green">patterns</span> and <span className="special-green">principles</span> in 
        modern <span className="special-green">JavaScript</span>. 
        <br/>
        <br/>
        By a software developer / designer, musician 
        based out of southern ontario cities currently working as a JavaScript consultant.
      </span>
    ),
    "description-expanded": (
      <span>
        I co-founded <a href="https://univjobs.ca">Univjobs</a> in 2016 and learned a lot about making code scale. At some 
        point during <Link to="/about">my current work</Link> at <a href="https://www.dev6.com/">Aquent Dev6</a> as a consultant and 
        reading as many <Link to="/books">books</Link> on software as I could digest, I've come to realize that 
        there were a lot of pitfalls I could have avoided if I knew the patterns and principles to guide me. That's what this 
        site is about; things I think all professional software people should know about.
      </span>
    )
  },
  "currently": {
    "book": {
      "title": "Patterns of Enterprise Application Architecture",
      "author": "Martin Fowler"
    },
    "music": {
      "album": "Prayers on Fire",
      "artist": "The Birthday Party"
    }
  }
}