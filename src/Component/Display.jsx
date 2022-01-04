import React, { Component } from 'react'

export class Display extends Component {
  state = {
    comment : '' ,
    comments :  [] ,
    selectedCommentIndex : null,
  }


  handleChangeComment = (e) => {
    let comment = e.target.value 
    this.setState({comment})
  }


  handleSaveComments = () => {
    if (!this.state.selectedCommentIndex) {
    let comments = [...this.state.comments]
    comments.push(this.state.comment)
    this.setState({comments,comment : null})
    } else this.editComments()
  }


  displayComments = () => {
    let comments = [...this.state.comments]
    return (
    comments.map((comment,index)=>(
      <div>
      <div>{comment}</div>
      <button>Delete</button>
      <button onClick={()=>{this.handleSaveComments(index)
      this.setState({comment,selectedCommentIndex : index})}}>Edit</button>
      </div>
    ))
    );
  }


  editComments = () => {
    let comments = [...this.state.comments]
    comments[this.state.selectedCommentIndex] = this.state.comment
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
