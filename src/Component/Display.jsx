import React, { Component } from 'react'

export class Display extends Component {
  state = {
    comment : '' ,
    comments : [] ,
    selectedCommentIndex : null,
  }


  componentDidMount() {
    let temp = localStorage.getItem('comments')
    let comments = JSON.parse(temp)
    this.setState({comments})
  }


  handleChangeComment = (e) => {
    let comment = e.target.value 
    this.setState({comment})
  }


  handleSaveComments = () => {
    let comments = [...this.state.comments]
    if (this.state.selectedCommentIndex===null) {
    comments.push(this.state.comment)
    this.setState({comments,comment : ''})
    } else { 
      comments[this.state.selectedCommentIndex] = this.state.comment
      this.setState({comments,comment : ''})
    }
    localStorage.setItem('comments',JSON.stringify(this.state.comments))
    }


  displayComments = () => {
    let comments = [...this.state.comments]
    return (
    comments.map((comment,index)=>(
      <div>
      <div>{comment}</div>
      <button onClick={()=>this.handleDeleteComment(index)}>Delete</button>
      <button onClick={()=>{this.setState({comment,selectedCommentIndex : index})}}>Edit</button>
      </div>
    ))
    );
  }


  handleDeleteComment = (index) => {
    let comments = [...this.state.comments]
    comments = comments.filter(comment=>comment!==comments[index])
    this.setState({comments})
  }


  dispalyTitle=()=> {
    let temp = localStorage.getItem('posts')
    let posts = JSON.parse(temp)
    let id = this.props.match.params.id
    return ( 
    <div>
        <div>{posts[id].title}</div> 
        <div>{posts[id].caption}</div>
        
        </div>
    );
  }


  render() {
    return (
      <div>
         <div>{this.props.match.params.id}</div>
         {this.dispalyTitle()}
         <textarea 
         value={this.state.comment} 
         cols="70" rows="4"
         onChange={(event)=>this.handleChangeComment(event)}></textarea>
        <button onClick={()=>this.handleSaveComments()}>comment</button>
        {this.displayComments()}
      </div>
    )
  }
}

export default Display
