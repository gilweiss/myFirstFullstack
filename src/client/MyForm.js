import React, { Component } from 'react';
import './app.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { AwesomeComponent } from './spnr';
import { FilterButtons } from './filterButtons';
import { GoogleLogin } from './googleLogin';
// import { updateStateLDR } from './spnr';  //was previously used for component communication
import logo from './res/logo.png';
import { RequestTable } from './requestTable';

import { CommentModal } from './commentsModal';


class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textbox: '',
      poolTable: '',
      mailbox: '',
      requestSent: 'true',
      userbox: '',
      loading: false,
      textboxToSend: '',
      tableData: '',
      loadReqTableTrigger: 'false',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTB = this.handleChangeTB.bind(this);
    this.handleChangeUB = this.handleChangeUB.bind(this);
    this.handleChangeMB = this.handleChangeMB.bind(this);
    this.setGoogleFields = this.setGoogleFields.bind(this);
    this.textBoxLoad = this.textBoxLoad.bind(this);
    this.textBoxLoaded = this.textBoxLoaded.bind(this);
  }


  handleChangeTB(event) {
    this.setState({ textbox: event.target.value });
  }

  handleChangeUB(event) {
    this.setState({ userbox: event.target.value });
  }

  handleChangeMB(event) {
    this.setState({ mailbox: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.submitMainForm();
    this.setState({ requestSent: "false" });

  }


  textBoxLoad = () => {

    this.setState({ loading: true });
    this.setState({ textboxToSend: this.state.textbox });
    this.setState({ textbox: "L O A D I N G . . . . . . " });
  }

  textBoxLoaded = (option) => {
  this.setState({ textbox: "request pool LOADED" + (option == "done" ? " with COMPLETED filter" : "") + (option == "todo" ? " with TODO filter" : "") });
    this.setState({ loading: false });


    setTimeout(() => {
      this.setState({
        textbox: (this.isTextBoxOccupied()
          ? "" : this.state.textboxToSend)
      });
    }, 1500);

  }

  isTextBoxOccupied = () => {
    return (this.state.textbox == "request pool LOADED" ||
      this.state.textbox == "L O A D I N G . . . . . . " ||
      this.state.textbox == "S E N D I N G . . . . . . " ||
      this.state.textbox == "" ||
      this.state.textbox == "request pool LOADED with COMPLETED filter" ||
      this.state.textbox == "request pool LOADED with TODO filter" ||
      this.state.textbox == "your request was successfully added to review pool :)");
  }

  //wait some time for loading DAWIN, then start real loading (should be complete by then though)
  submitMainForm = () => {
    if (this.isTextBoxOccupied() || this.state.loading == true) return;
    this.setState({ loading: true });
    this.setState({ textboxToSend: this.state.textbox });
    this.setState({ textbox: "S E N D I N G . . . . . . " });
    setTimeout(() => { this.sendTextbox(); }, 1500);
    setTimeout(this.waitForSub(true, 0, 3000, 200), 200);

  }



  //awaits until the loading process is complete to render the request table
  //TODO this may seem broken or modified from a previouse version, fix it!
  waitForSub = (isWaiting, time, maxTimeLim, interval) => {

    return () => {
      if (!isWaiting) {
        this.ReRenderReqTable();
        return;
      }
      if (maxTimeLim <= time) { return }
      time += interval;
      if (this.state.loading == false) {
        isWaiting = false;
      }

      setTimeout(this.waitForSub(isWaiting, time, maxTimeLim, interval), interval);

    }

  }


  sendTextbox() {

    console.log('sending')
    axios.post(
      '/api/sendTextbox',
      { data: this.state.textboxToSend, name: this.state.userbox, mail: this.state.mailbox }
    )
      .then((response) => {
        console.log(response.data.message);

        this.setState({ loading: false });
        this.setState({ textbox: response.data.message });
        this.setState({ userbox: "" });
        this.setState({ mailbox: "" });
        setTimeout(() => { this.setState({ textbox: "" }); }, 2000);

      }, (error) => {
        this.setState({ textbox: "" });

        this.setState({ loading: false });
        this.setState({ userbox: "" });
        this.setState({ mailbox: "" });
        console.log(error);
        alert("something went wrong, sorry");
      });
  }

  //string: user name, string: mail address
  setGoogleFields = (userName, mailAddress) => {
    this.setState({ userbox: userName });
    this.setState({ mailbox: mailAddress });
  }


  componentDidMount() {
  }


  ReRenderReqTable = () => {
    this.setState({ loadReqTableTrigger: (this.state.loadReqTableTrigger === true ? false : true)}); //changes trigger state
  }


  render() {
    return (
      <div>
        <img src={logo} class="right-float" alt="legacy logo" ></img>
        <div class="google-auth-button-div">
          <GoogleLogin fillBoxesFunction={this.setGoogleFields} />
        </div>

        <div align="center">

          <form onSubmit={this.handleSubmit} >


            <br />
            <h1>Ask for stuff</h1>


            <br />

            <textarea rows="6" cols="50" placeholder="Please be reasonable with your request" value={this.state.textbox} onChange={this.handleChangeTB} />

            <br />
            <label value=" "><b> Request owner: &nbsp;&nbsp; </b> </label>
            <input type="text" id="name" name="name" placeholder="your name" maxLength="8" value={this.state.userbox} onChange={this.handleChangeUB} />
            <br />
            <label value=" "><b> EMAIL to update about your request : &nbsp;&nbsp; </b> </label>
            <input type="text" id="mail" name="email" placeholder="@optional field" value={this.state.mailbox} onChange={this.handleChangeMB} />
            <br /><br />



            <Button type="submit" value="Submit" variant="danger">submit</Button> {' '}  <br /><br /><AwesomeComponent loading={this.state.loading} /><br />

          

          </form>
          <RequestTable reload={this.state.loadReqTableTrigger} load={this.textBoxLoad} loaded={this.textBoxLoaded} />
          <br /> <br /><br /> <br />
          <br /> <br />
        </div>
      </div>
    );
  }
}

export default MyForm;

