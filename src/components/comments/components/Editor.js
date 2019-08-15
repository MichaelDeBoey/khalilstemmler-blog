
import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types'
import "../styles/Editor.sass"

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null;
  }

  componentDidMount() {
    this.attachQuillRefs()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  handleChange (html) {
    var limit = this.props.maxLength;
    var quill = this.quillRef;

    quill.on('text-change', function (delta, old, source) {
      if (quill.getLength() > limit) {
       quill.deleteText(limit, quill.getLength());
      }
    });

    this.props.handleChange(html);
  }

  render () {
    const { text } = this.props;
    return (
      <div className="editor">
        {typeof window !== 'undefined' ? (
          <ReactQuill 
            placeholder={this.props.placeholder}
            ref={(el) => { this.reactQuillRef = el }}
            value={text}
            onChange={this.handleChange} 
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image',
              'code-block'
            ]}
            modules={{
              // syntax: true,
              toolbar: ['bold', 'italic', 'underline', 'link', 'code-block', 'list']
            }}
          />
        ) : ''}
      </div>
    )
  }
}

export default Editor;

Editor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string
}