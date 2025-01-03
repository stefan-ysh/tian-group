'use client';
import React, { useState } from 'react';
import { Form, Input, Button } from '@nextui-org/react';

const ContactWrapper = () => {
  const [action, setAction] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setAction('Message sent successfully!');
    } else {
      setAction('Failed to send message.');
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4">
      <h1>Contact Us</h1>
      <Form
        className="flex flex-col gap-4"
        validationBehavior="native"
        onReset={() => setAction('Form reset')}
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid message"
          label="Message"
          labelPlacement="outside"
          name="message"
          placeholder="Enter your message"
          type="text"
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ContactWrapper;
