import React, { useState, useEffect, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import LNS from './LNS.md'
import '../github-markdown-css.css';


export default class LNSMarkDownReader extends Component {
  state = {
    markdown: ''
  }

  componentWillMount() {
    fetch(LNS)
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
  }

  render() {


    const { markdown } = this.state;

    return (
      <div>

          <ReactMarkdown className="markdown-body" source={markdown} />


      </div>

    );
  }
}