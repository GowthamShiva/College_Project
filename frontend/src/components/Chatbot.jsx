import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

const theme = {
  background: '#fff', // White background
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#000', // Black header background
  headerFontColor: '#fff', // White header font color
  headerFontSize: '15px',
  botBubbleColor: '#000', // Black bot bubble
  botFontColor: '#fff', // White bot font color
  userBubbleColor: '#fff', // White user bubble
  userFontColor: '#000', // Black user font color
};

const ToggleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; // Black button background
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: ${props => props.isOpen ? '400px' : '0'};
  right: ${props => props.isOpen ? '0' : '0'};
  z-index: 1001;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #fff; // White button background on hover
    color: #000; // Black text on hover
    transform: scale(1.1);
  }

  span {
    font-size: 24px;
  }
`;

const steps = [
  {
    id: '1',
    message: 'Welcome to Freelance Fiesta! How can I help you today?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'signUp', label: 'Sign Up', trigger: 'signUp' },
      { value: 'signIn', label: 'Sign In', trigger: 'signIn' },
      { value: 'browseGigs', label: 'Browse Gigs', trigger: 'browseGigs' },
      { value: 'contactSupport', label: 'Contact Support', trigger: 'contactSupport' },
      { value: 'aboutUs', label: 'About Us', trigger: 'aboutUs' },
      { value: 'faq', label: 'FAQ', trigger: 'faq' },
    ],
  },
  {
    id: 'signUp',
    message: 'To sign up, click on the Register link at the top of the page.',
    end: true,
  },
  {
    id: 'signIn',
    message: 'To sign in, click on the Login link at the top of the page.',
    end: true,
  },
  {
    id: 'browseGigs',
    message: 'You can browse available gigs by clicking on the Gigs link in the navigation bar.',
    end: true,
  },
  {
    id: 'contactSupport',
    message: 'For support, please email us at support@freelancefiesta.com.',
    end: true,
  },
  {
    id: 'aboutUs',
    message: 'We are Freelance Fiesta, a platform dedicated to connecting businesses with talented freelancers. We strive to make freelancing accessible and efficient for everyone.',
    end: true,
  },
  {
    id: 'faq',
    message: 'Here are some frequently asked questions:',
    trigger: 'faqOptions',
  },
  {
    id: 'faqOptions',
    options: [
      { value: 'payment', label: 'Payment Issues', trigger: 'payment' },
      { value: 'project', label: 'Project Disputes', trigger: 'project' },
      { value: 'account', label: 'Account Management', trigger: 'account' },
      { value: 'other', label: 'Other Questions', trigger: 'other' },
    ],
  },
  {
    id: 'payment',
    message: 'If you have issues with payments, please visit our Payments Help Center or contact support for assistance.',
    end: true,
  },
  {
    id: 'project',
    message: 'For project disputes, you can use our Resolution Center to file a complaint or contact our support team for help.',
    end: true,
  },
  {
    id: 'account',
    message: 'For account management issues, you can update your profile settings or contact support if you need further assistance.',
    end: true,
  },
  {
    id: 'other',
    message: 'For other questions, feel free to reach out to our support team or check our Help Center for more information.',
    end: true,
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      width: isOpen ? '300px' : '60px',
      height: isOpen ? '400px' : '60px',
      transition: 'all 0.3s ease',
    }}>
      <ToggleButton isOpen={isOpen} onClick={toggleChatbot}>
        <span>{isOpen ? '−' : '+'}</span>
      </ToggleButton>
      {isOpen && (
        <ThemeProvider theme={theme}>
          <ChatBot steps={steps} />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Chatbot;
