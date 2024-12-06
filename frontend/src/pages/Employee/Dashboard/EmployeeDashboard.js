import React , { useState } from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import {Container , Row, Col} from 'react-bootstrap';
import EmployeeWellnessForm from '../../../Components/Employee-Wellness-Form/EmployeeWellnessForm';
import WellnessChart from '../../../Components/Wellness-Chart/WellnessChart';
import EmailToCoachForm from '../../../Components/Email-Coach/EmailToCoachForm';

const EmployeeDashboard = () => {
  // State to manage wellness data
  const currentUser = {
    id: 'EMP001',
    name: 'John Doe',
    department: 'Engineering',
    coachEmail: 'coach@example.com',
    userEmail: 'user@example.com',
  };

  const initialWellnessData = [
    {
      date: "2024-11-28",
      physical: 6,
      mental: 5.5,
      workLife: 5.5,
      total: 17,
      analytics: {
        physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
        mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
        workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
      }
    },
    {
      date: "2024-11-29",
      physical: 4.5,
      mental: 4,
      workLife: 4.5,
      total: 13,
      analytics: {
        physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
        mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
        workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" }
      }
    },
    {
      date: "2024-11-30",
      physical: 3.5,
      mental: 3,
      workLife: 3,
      total: 9.5,
      analytics: {
        physicalWellness: { energyLevel: "Low", sleepHours: "Less than 6" },
        mentalWellness: { stressLevel: "Very High", overwhelmedByWork: "Very Often" },
        workLifeBalance: { workBeyondOfficeHours: "Very Often", disconnectFromWork: "Not at all" }
      }
    },
    {
      date: "2024-12-01",
      physical: 5,
      mental: 4.5,
      workLife: 4,
      total: 13.5,
      analytics: {
        physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
        mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
        workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" }
      }
    },
    {
      date: "2024-12-02",
      physical: 5.5,
      mental: 5,
      workLife: 5.5,
      total: 16,
      analytics: {
        physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
        mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
        workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
      }
    },
    {
      date: "2024-12-03",
      physical: 3,
      mental: 4,
      workLife: 3.5,
      total: 10.5,
      analytics: {
        physicalWellness: { energyLevel: "Low", sleepHours: "Less than 6" },
        mentalWellness: { stressLevel: "High", overwhelmedByWork: "Often" },
        workLifeBalance: { workBeyondOfficeHours: "Often", disconnectFromWork: "Somewhat" }
      }
    },
    {
      date: "2024-12-04",
      physical: 4,
      mental: 3.5,
      workLife: 4,
      total: 11.5,
      analytics: {
        physicalWellness: { energyLevel: "Moderate", sleepHours: "6-7" },
        mentalWellness: { stressLevel: "High", overwhelmedByWork: "Often" },
        workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" }
      }
    },

  ];

  // State to manage wellness data
  const [wellnessData, setWellnessData] = useState(initialWellnessData);
  const [submitMessage, setSubmitMessage] = useState('');


  // Handle form submission
  const handleWellnessSubmit = async (newData) => {
  
    try {
      const dateExists = wellnessData.some(entry => entry.date === newData.date);
  
      if (dateExists) {
        setSubmitMessage('An entry already exists for this date. Please select a different date.');
        return false;
      }
  
      // Add new data to state
      setWellnessData(prevData => {
        const updatedData = [...prevData, newData].sort((a, b) =>
          new Date(a.date) - new Date(b.date)
        );
        console.log("Updated wellness data:", updatedData);
        return updatedData;
      });
  
      // Reset the form after a successful submission
      setSubmitMessage('Wellness data saved successfully!');
      return true;
    } catch (error) {
      setSubmitMessage('Error saving wellness data. Please try again.');
      console.error('Error saving wellness data:', error);
      return false;
    }
  };


  console.log('Wellness data dates:', wellnessData.map(d => d.date));
  
  return (
    <Container fluid className="p-4">
      <Navbar />
      <Row className="mb-4 py-5">
        <Col>
          <h1 className="text-2xl font-bold text-center">Employee Wellness Dashboard</h1>
        </Col>
      </Row>
  
      <Row className="my-4">
        <Col lg={6}>
          <EmployeeWellnessForm
            onSubmit={handleWellnessSubmit}
            existingDates={wellnessData.map((data) => data.date)}
            submitMessage={submitMessage}
          />
        </Col>
        <Col lg={6}>
          <Row className="mb-4">
            <Col>
              <EmailToCoachForm 
                coachEmail={currentUser.coachEmail}
                userEmail={currentUser.userEmail}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WellnessChart
                data={wellnessData}
                title="Your Wellness Trends"
                height={400}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};


export default EmployeeDashboard