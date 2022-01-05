import React, { Component } from 'react'

export class Display extends Component {
  state = {
    comment : '' ,
    selectedCommentIndex : null,
  }


  componentDidMount() {
    let temp = localStorage.getItem('posts')
    let posts = JSON.parse(temp)
    this.setState({posts})
  }


  handleChangeComment = (e) => {
    let comment = e.target.value 
    this.setState({comment})
  }


  handleSaveComments = () => {
    let posts = {...this.state.posts}
    let id = this.props.match.params.id
    let temp = [...posts[id].comments]
    if (this.state.selectedCommentIndex===null) {
    temp.push(this.state.comment)
    posts[id].comments = temp
    this.setState({posts,comment : ''},()=>{
      localStorage.setItem('posts',JSON.stringify(this.state.posts))
    })
    } else { 
      posts[id].comments[this.state.selectedCommentIndex] = this.state.comment
      this.setState({posts,comment : ''},()=>{
        localStorage.setItem('posts',JSON.stringify(this.state.posts))
      })
    }
    
    }


  displayComments = () => {
    let posts = {...this.state.posts}
    let id = this.props.match.params.id
    let temp = posts[id]?.comments||[]
    return (
    temp.map((comment,index)=>(
      <div>
      <div>{comment}</div>
      <button onClick={()=>this.handleDeleteComment(index)}>Delete</button>
      <button onClick={()=>{this.setState({comment,selectedCommentIndex : index})}}>Edit</button>
      </div>
    ))
    );
  }


  handleDeleteComment = (index) => {
    let posts = {...this.state.posts}
    let id = this.props.match.params.id
    let temp = [...posts[id].comments]
    temp = temp.filter(comment=>comment!==temp[index])
    posts[id].comments = temp
    this.setState({posts},()=>{
      localStorage.setItem('posts',JSON.stringify(this.state.posts))
    })
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
