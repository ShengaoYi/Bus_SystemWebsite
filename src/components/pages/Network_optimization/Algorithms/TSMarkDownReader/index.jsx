import React, { useState, useEffect, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import TS from './TS.md'
import '../github-markdown-css.css';


export default class TSMarkDownReader extends Component {
  state = {
    markdown: ''
  }

  componentWillMount() {
    fetch(TS)
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