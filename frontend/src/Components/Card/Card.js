import React, { Component } from 'react'
import {
  Card,CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody
} from 'reactstrap';

class CardDoctor extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if(confirmDelete){
          fetch('http://localhost:3000/crud/', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id
          })
        })
          .then(response => response.json())
          .then(item => {
            this.props.deleteItemFromState(id)
          })
          .catch(err => console.log(err))
        }
    
      }

      render() {
        const items = this.props.items.map(item => {
            return (
                <Card>
                
                <CardBody>
                  <CardTitle>{item.first} + {item.last}</CardTitle>
                  <CardSubtitle>{item.location}</CardSubtitle>
                  <CardText>{item.specialtie}</CardText>       
                </CardBody>
              </Card>
              )
            })
  return (
    <div>
      {items}
    </div>
  )
}
}

export default CardDoctor ;