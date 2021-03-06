
import React, { Component } from 'react';
import { Container, Card, Form, Button, Icon, Image, Table, Sticky } from 'semantic-ui-react'
import MainBreadCrumb from "../../components/BreadCrumb/BreadCrumb.js";
import AccomplishmentModal from "../../components/Modal/AccomplishmentModal.js";
import UserModal from "../../components/Modal/UserModal.js";
import AddResourceNoteModal from "../../components/Modal/AddResourceNoteModal.js";
import AddJobNoteModal from "../../components/Modal/AddJobNoteModal.js";
import FooterDiv from "../../components/Footer/Footer.js";
import TechnologyDropDown from "../../components/TechnologyDropDown/TechnologyDropDown.js";
import API from "../../utils/API"
import PortfolioContainer from "../../components/Grid/PortfolioContainer.js";

class PortfolioPage extends Component {

  //===================================================
  //Initialize state

  state = {
    resources: [],
    jobs: [],
    accomplishments: [],
    technologySelected: "",
    isAuthenticated: window.sessionStorage.getItem("user")
  };

  componentDidMount() {
        let isLogged = window.sessionStorage.getItem("user");
        this.setState({
            isAuthenticated: isLogged
          });
          console.log("componentDidMount");
          console.log(this.state.isAuthenticated);
          console.log( isLogged);
   }

  //===================================================
  // Set technology selected

  setTechnologySelected = (data) => {
        this.setState({
            technologySelected: data
        });
  }

  //===================================================
  // Database Functions

  // getResources
  handleTechnologySelection = (event) => {
    event.preventDefault();
    var userId = window.sessionStorage.getItem("user_id");
    this.loadResources({id: this.state.technologySelected, userId: userId});
    this.loadJobs({id: this.state.technologySelected, userId: userId});
    this.loadAccomplishments({id: this.state.technologySelected, userId: userId});
  };

  // getResources
  loadResources = (query) => {
    API.getPortfolioResources(query)
      .then(res => {this.setState({ resources: res.data})})
      .catch(err => console.log(err));
  };

  // getJobs
  loadJobs = (query) => {
    API.getPortfolioJobs(query)
      .then(res => {this.setState({ jobs: res.data})})
      .catch(err => console.log(err));
  };

  addAccomplishment(data){
    // this.setState({ accomplishments: (this.state.accomplishments.push(data))});
    alert("Accomplishements added");
  }

  // getAccomplishments
  loadAccomplishments = (query) => {
    API.getPortfolioAccomplishments(query)
      .then(res => 
        { console.log("in get portfolioAccomplishments");
          this.setState({ accomplishments: res.data});
          console.log(this.state.accomplishments);
        })
      .catch(err => console.log(err));
  };

  // resources table
  resourcesTable = () => (
    <Table celled className="ui unstackable table"  style={{width: "80%", align: "center", marginLeft: "15%", marginTop: "10px" }}>
        <Table.Header>
            <Table.Row> 
              <Table.HeaderCell colSpan='3'>
                  <h2 style={{padding: "0px", marginTop: "0px", marginBottom: "0px"}}> Resources</h2>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell width={6}>Resources</Table.HeaderCell>
                <Table.HeaderCell width={5}>Description</Table.HeaderCell>
                <Table.HeaderCell width={5}>Actions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    <Table.Body>
    {this.state.resources.length ? (
        this.state.resources.map(resource => (
              <Table.Row key={resource._id}>
                <Table.Cell>
                    <a href={resource.url}  target="_blank">{resource.url} </a>
                </Table.Cell>
                <Table.Cell>
                    {resource.description}
                </Table.Cell>
                <Table.Cell>
                  <Button 
                    className="blue compact"
                    id={resource._id}
                    onClick={this.handleRemovePortfolio}>Delete</Button>
                    <AddResourceNoteModal id={resource._id} />
                    <UserModal />
                </Table.Cell>
              </Table.Row>
        ))) : ( <Table.Row />)}
     </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3" />
      </Table.Row>
    </Table.Footer>
  </Table>
  );

// jobs table
jobsTable = () => (
<Table celled className="ui unstackable table"  style={{width: "80%", align: "center", marginLeft: "15%", marginTop: "10px" }}>
    <Table.Header>
          <Table.Row> 
            <Table.HeaderCell colSpan='3'>
                  <h2 style={{padding: "0px", marginTop: "0px", marginBottom: "0px"}}> Jobs</h2>
            </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
            <Table.HeaderCell width={6}>Job</Table.HeaderCell>
            <Table.HeaderCell width={5}>Description</Table.HeaderCell>
              <Table.HeaderCell width={5}>Actions</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
  <Table.Body>
      {this.state.jobs.length ? (
          this.state.jobs.map(job => (
              <Table.Row key={job._id}>
                    <Table.Cell>
                    <a href={job.link}  target="_blank" >{job.link} </a>
                    </Table.Cell>
                    <Table.Cell>
                          {job.description}
                    </Table.Cell>
                    <Table.Cell>
                        <Button 
                            className="blue compact"
                            id={job._id}
                            onClick={this.handleRemovePortfolio}>Delete
                        </Button>
                        <AddJobNoteModal id={job._id} />
                        <UserModal />
                    </Table.Cell>
              </Table.Row>))) : (<Table.Row />)}
 </Table.Body>
<Table.Footer>
  <Table.Row>
    <Table.HeaderCell colSpan="3" />
  </Table.Row>
</Table.Footer>
</Table>
);

// accomplishments table
accomplishmentsTable = () => (
  <Table celled style={{ width: "80%", align: "center", marginLeft: "15%", marginTop: "18px" }}>
    <Table.Header>
        <Table.Row> 
            <Table.HeaderCell colSpan='3'>
                <h2 style={{padding: "0px", marginTop: "0px", marginBottom: "0px"}}>Accomplishments</h2>
            </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
            <Table.HeaderCell width={6}>Projects</Table.HeaderCell>
            <Table.HeaderCell width={5}>Description</Table.HeaderCell>
            <Table.HeaderCell width={5}>Actions</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
    <Table.Body>
      {this.state.accomplishments.length ? (
        this.state.accomplishments.map(accomplishment => (
              <Table.Row key={accomplishment._id}>
                <Table.Cell>
                    <a href={accomplishment.url}  target="_blank" >{accomplishment.url} </a>
                </Table.Cell>
                <Table.Cell>
                    {accomplishment.description}
                </Table.Cell>
                <Table.Cell>
                  <Button 
                    className="blue compact"
                    id={accomplishment._id}
                    onClick={this.handleRemoveAccomplishment}>Delete</Button>
                    <AddResourceNoteModal id={accomplishment._id} />
                    <UserModal />
                </Table.Cell>
              </Table.Row>
        ))) : (<Table.Row />)}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

// User card
userCard = () => (
    <Card style={{width: "175px", float: "left", marginLeft: "30px", marginRight: "45px" }} >
      <Image style={{ width: '175px', height: "160px" }} src='https://static1.squarespace.com/static/57645625f5e231759e260acf/t/58fa2266f5e231a86437fce0/1492787823235/Richard' />
      <Card.Content>
        <Card.Header>
          Richard H.
          </Card.Header>
        <Card.Meta>
          <span className='date'>
            Joined in 2018
            </span>
        </Card.Meta>
        <Card.Description>
          Entrepreneur
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          22 Friends
          </a>
      </Card.Content>
    </Card>
  )

  //===================================================
  // Render Portfolio component
  render() {
    return (
      <div>
        {/* <PortfolioContainer /> */}
      <Sticky style={{width: "100%",   position: "absolute", zIndex: "1000"}}>
        <Container className="ui fluid inverted vertical masthead left aligned segment massive" >
        <MainBreadCrumb notLoggedIn={!(this.state.isAuthenticated)}/>
        </Container>
      </Sticky>
      <Container style={{bottomBorder: "2px"}} className="ui fluid vertical left aligned segment massive" >
      <Form style={{marginTop: "70px", marginLeft: "30px"}}>
        <TechnologyDropDown setTechnologySelected={(data) => this.setTechnologySelected(data)}/>
        <Button 
            style = {{marginLeft: "20px", marginTop: "10px"}} 
            className = "large blue" 
            type='submit'
            disabled={!(this.state.technologySelected)}
            onClick={this.handleTechnologySelection}>
            Search
        </Button>
        <AccomplishmentModal loadAccomplishments={data => this.addAccomplishment(data)} />
      </Form> 
      </Container>
        <h2 style={{marginLeft: "70px", padding: "0px", marginTop: "10px", marginBottom: "5px" }}>Portfolio</h2>
        <this.userCard style={{float: "left"}} />
        <this.accomplishmentsTable />
        <this.jobsTable />
        <this.resourcesTable />
        <FooterDiv/>
      </div>
    );
  }
}

export default PortfolioPage;
