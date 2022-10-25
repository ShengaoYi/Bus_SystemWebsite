import React, { useState, useEffect, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import ANT from './ANT.md'
import '../github-markdown-css.css';


export default class ANTMarkDownReader extends Component {
  state = {
    markdown: ''
  }

  componentWillMount() {
    fetch(ANT)
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
  }

  render() {


    const { markdown } = this.state;

    return (
      <div >

          <ReactMarkdown className="markdown-body" source={markdown} />

      </div>

    );
  }
}