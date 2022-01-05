import React from 'react';
import {Modal} from 'react-bootstrap';
import shortid from 'shortid';


class View extends React.Component {
    state = {
        showModal : false,
        title : '',
        caption : '' ,
        id : [] ,
        posts : {} ,
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


    handleSave = () => {
     
        let id = shortid.generate()
        let temp = [...id]
        temp.push(id)
        let data = {...this.state.posts,
          [id] : {
            title : this.state.title ,
            image : '' ,
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


    renderTitle = () => {
      return(
        Object.values(this.state.posts||{}).map((post)=>(
          <div onClick={()=>this.displayPost(post.id)}>{post.title}</div>
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

         Add image :
         <input type='text'/>
         <button>Browse</button>
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
        return <div>
            {this.renderModal()}
            <button className='btn-primary'
            onClick={()=>this.setState({showModal: true})}>add</button>
            {this.renderTitle()}
        </div>;
    }
}
 
export default View;