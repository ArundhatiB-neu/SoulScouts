import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const EmailToCoachForm = ({ coachEmail, userEmail }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Construct the email URL with the pre-filled message
    const emailSubject = 'Message for your coach';
    const emailBody = encodeURIComponent(message);
    const emailUrl = `mailto:${coachEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Open the email client with the pre-filled information
    window.location.href = emailUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h3">Write to Your Coach</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="textarea"
              id="message"
              value={message}
              onChange={handleMessageChange}
              rows={5}
              placeholder="Enter your message to your wellness coach!"
            />
          </FormGroup>
          <Button color="primary" onClick={handleSendMessage}>
            Send Message
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default EmailToCoachForm;