import React from 'react';
import {Modal} from 'react-bootstrap';
import shortid from 'shortid';
import './Create.css'
import axios from 'axios';


class View extends React.Component {
    state = {
        showModal : false,
        title : '',
        caption : '' ,
        image : '' ,
        posts : {} ,
    }

    trial = () => {
      axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
    }


    componentDidMount() {
     
      let temp = localStorage.getItem('posts')
      let posts = JSON.parse(temp)
      this.setState({posts})
    }


    handleChangeName = (e) => {
      let title = {...this.state.title}
      title = e.target.value ;
      this.setState({title})  
    }


    handleChangeCaption = (e) => {
      let caption = {...this.state.caption}
      caption = e.target.value ;
      this.setState({caption})  
    }


    handleImage = (e) => {
      let image = {...this.state.image}
      image = e.target.value ;
      this.setState({image})  
    }


    handleSave = () => {
     
        let id = shortid.generate()
        let temp = [...id]
        temp.push(id)
        let data = {...this.state.posts,
          [id] : {
            title : this.state.title ,
            image : this.state.image ,
            id ,
            caption: this.state.caption,
            comments : [],
          }}
          this.setState({posts : data ,showModal: false,id : temp},()=>{
            localStorage.setItem('posts',JSON.stringify(this.state.posts))

          })
      
    }


    displayPost = (id) => {
     this.props.history.push({
       pathname:`/posts/${id}`
     })
    }


    handleDelete = id => {
      let posts = {...this.state.posts}  
        delete posts[id]
        this.setState({posts},()=>{
          localStorage.setItem('posts',JSON.stringify(this.state.posts))
        })
    }


    renderTitle = () => {
      return(
        Object.values(this.state.posts||{}).map((post,index)=>(
        <div>
          <div className='Title'
           onClick={()=>this.displayPost(post.id)}>{post.title}</div>
          <button className='deletePost' onClick={()=>this.handleDelete(post.id)}>Delete</button>
          </div>
        ))
      )
    }


    renderModal = () => {
    return (
        <Modal
        show={this.state.showModal}
        onHide={()=>this.setState({showModal: false})}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Post details</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          Enter post name :
         <input type="text" value={this.state.title} onChange={(event)=>this.handleChangeName(event)} />
         <br/>
         <br/>

         Add image url :
         <input type='text' value={this.state.image} onChange={(event)=>this.handleImage(event)} />
         <br/>
         <br/>

         Enter caption :
         <textarea value={this.state.caption} onChange={(event)=>this.handleChangeCaption(event)}></textarea>
         <br/>
         <br/>

         <button onClick={()=>{this.handleSave()}}>save</button>


        </Modal.Body>
        
        <Modal.Footer>
        </Modal.Footer>
      </Modal>        
    );        
    }


    render() { 
        return <div className='home'>
            {this.renderModal()}
            {this.renderTitle()}
            <button className='addpost'
            onClick={()=>this.setState({showModal: true})}>Add Post</button>
            <button onClick={()=>this.trial()}>api</button>
        </div>;
    }
}
 
export default View;