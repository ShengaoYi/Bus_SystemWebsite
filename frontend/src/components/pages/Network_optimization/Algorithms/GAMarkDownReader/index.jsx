import React, { useState, useEffect, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import GA from './GA.md'
import '../github-markdown-css.css';


export default class GAMarkDownReader extends Component {
  state = {
    markdown: ''
  }

  componentWillMount() {
    fetch(GA)
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