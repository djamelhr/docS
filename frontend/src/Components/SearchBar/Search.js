import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Input,
} from "reactstrap";
import CardDoctor from "../Card/Card";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", items: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
    this.getItems();
  }

  getItems() {
    fetch(`http://localhost:3000/api/doctors/`)
      .then((response) => response.json())
      .then((items) => {
        console.log(items);
        this.setState({ items });
      });
  }

  componentDidMount() {
    this.getItems();
  }
  render() {
    return (
      <Container>
        <Row style={{ margin: "20px 0" }}>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup check inline>
                <Input
                  type="text"
                  placeholder="doctor name, specialtie .."
                  bsSize="lg"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup check inline>
                <Input type="text" placeholder="zip code or city" bsSize="lg" />
              </FormGroup>
              <FormGroup check inline>
                <Input type="date" placeholder="lg" bsSize="lg" />
              </FormGroup>
              <FormGroup check inline>
                <Button>
                  <span></span>Search
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm="8">
            <CardDoctor items={this.state.items} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
