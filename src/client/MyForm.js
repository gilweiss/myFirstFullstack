import React, { Component } from 'react';
import './app.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

class MyForm extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
      textbox: ''
     };
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
   }

   testButton = () =>{
     
      alert("test");
   }
 
   handleChange(event) {
     this.setState({textbox: event.target.value});
   }
 
   handleSubmit(event) {
     //alert('request submitted: ' + this.state.textbox);
     event.preventDefault();
     this.sendTextbox();
    
     
   }
 
   

   sendTextbox(){
     
    console.log('sending')
      axios.post(
        '/api/sendTextbox',
       {data : this.state.textbox}
       )
    .then((response) => {
      console.log(response.data.message);
      alert(response.data.message);
    }, (error) => {
      console.log(error);
      alert("something went wrong, sorry");
    });
    }



        //here is some ugly code until i get the serenity to learn how to do it properly:


         getReqPool = async () => {

          var answer = await this.getReqPool2();
          var returnString = "";
          for(var i = 0; i < answer.results.length; i++){
            returnString += answer.results[i].id +") ";
            returnString += answer.results[i].request +"\n\n";
            //console.log(answer.results[i]); // Object with id and time

        }

           alert(returnString);
         }

         getReqPool2 = () => {

      console.log('asking server for stored requests')
      return new Promise (function(resolve, reject){
        axios.get('/api/db')
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      }, (error) => {
        console.log(error);
      });
      });
    }


     
    


    //bad func
  //   getReqPool = () =>{
     
  //     alert (this.getStoredRequests());
  //  }


  // getStoredRequestsPromise(){ //testing split callback
     
  //     console.log('asking server for stored requests')
  //       axios.get('/api/db')
  //       }

  //       getReqPool(){ //testing split callback - other half
     
  //         this.getStoredRequestsPromise().then((response) => {
  //               console.log(response.data);
  //             }, (error) => {
  //               console.log(error);
  //             });
  //             }
      




   //here is some ugly code until i get the serenity to learn how to do it properly: fublicate

  //  getStoredRequestsPromise(){ //testing split callback
     
  //   console.log('asking server for stored requests')
  //     axios.get('/api/db')
  //   }

  //   getReqPool = () =>{ //testing split callback - other half
 
  //     this.getStoredRequestsPromise().then((response) => {
  //     alert(response.data);
  //   }, (error) => {
  //     console.log(error);
  //   });
  //}



/////////////////////END OF REALLY UGLY



//backup:
    // getStoredRequests(){
     
    //   console.log('asking server for stored requests')
    //     axios.get('/api/db')
    //   .then((response) => {
    //     console.log(response.data);
    //   }, (error) => {
    //     console.log(error);
    //   });
    //   }

      

     
  
     






   render() {
     return (
       <div align="center">
       <form onSubmit={this.handleSubmit} >
         
           <h1>Ask for stuff</h1>
           <br/>
           <textarea rows="6" cols="50" placeholder="Please be reasonable with your request" value={this.state.textbox} onChange={this.handleChange}/>
         
         <br/><br/>
         <Button type="submit" value="Submit" variant="danger">submit</Button> {' '}
         <Button variant="info" onClick={this.getReqPool} >request pool</Button>
       </form>
       <br/> <br/>
       
       
             <p id="hidden button, you can also copy paste the suffix"  hidden  onClick={() =>this.getStoredRequests()} >/api/getRequests</p>
       </div>
     );
   }
 }
 
 export default MyForm;













// export default class App extends Component {
 
//   constructor() {
//     super()
//     this.state = {
//       username: `BITCH`,
//       page: 0
//     }
//   }

//   async setUsername() {
//       const response = await fetch('/api/getUsername');
//       const userData = await response.json();
//       setTimeout(() => {
//         this.setState({username: userData.username, page: 1});
//       }, 2000)
//   }

//   componentDidMount() {
//     this.setUsername();
//     // const usernamePromise = fetch('/api/getUsername');
//     // usernamePromise.then((response) => response.json()).then((data) => console.log(data));

//     // const getPersonPromise = new Promise((resolve, reject) => {
//     //   setTimeout(() => {
//     //     const myObject = { name: "sgil", surname: "weiss" }
//     //     if (myObject.name === 'gil') {
//     //       reject()
//     //     }
//     //     else {
//     //       resolve(myObject)
//     //     }
//     //   }, 2000);
//     // });
//     // getPersonPromise.then((person) => console.log(person)).catch(() => console.log('rejected!'));
//   }

//   render() {
//       return this.state.page === 1 ? (
//       <div>
//     <h1>Hello {this.state.username}!</h1>
//       < img src = { Hardon } alt = "mordehai" width = "500" />
//       </div >
//     ) : (<div>
//       <h1>
//         LOADING
//       </h1>
//     </div>);
//   }

  
// }