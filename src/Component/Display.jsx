import React, { Component } from 'react'

export class Display extends Component {
  dispalyTitle=()=> {
    let temp = localStorage.getItem('posts')
    let posts = JSON.parse(temp)
    let id = this.props.match.params.id
    return (
   
    <div>
        <div>{posts[id].title}</div> 
        <div>{posts[id].caption}</div>
        <button>add comment</button>
        </div>
    );
  }

  render() {
    return (
      <div>
         <div>{this.props.match.params.id}</div>
         {this.dispalyTitle()}
      </div>
    )
  }
}

export default Display
