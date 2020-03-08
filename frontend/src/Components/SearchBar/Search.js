import React from 'react';
import { Form, FormGroup, Button, Input } from 'reactstrap';

const Example = (props) => {
  return (
    <Form>
      <FormGroup check inline>
        
          <Input type="text" placeholder="doctor name, specialtie .." bsSize="lg" /> 
        
      </FormGroup>
      <FormGroup check inline>
       
        <Input type="text" placeholder="zip code or city" bsSize="lg" /> 
        
      </FormGroup>
      <FormGroup check inline>
       
        <Input type="date" placeholder="lg" bsSize="lg" />  
        
      </FormGroup>
      <FormGroup check inline>
       
      <Button><span class="glyphicon glyphicon-search"></span>Search</Button>
       
     </FormGroup>
    </Form>
  );
}

export default Example;