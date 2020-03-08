import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
//import DataTable from './Components/Tables/DataTable'
import CardDoctor from './Components/Card/Card';
import Search from './Components/SearchBar/Search';


class App extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch('http://localhost:3000/crud')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

 
  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>zocdoc</h1>
          </Col>
        </Row>
        <Row style={{margin: "20px 0"}}>
          <Col>
            <Search />
          </Col>
        </Row>
        <Row>
          <Col sm="8">
            <CardDoctor items={this.state.items}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App