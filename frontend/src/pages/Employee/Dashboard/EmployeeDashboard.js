import React , { useState , useEffect } from 'react';
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
    {
      date: "2024-12-05",
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
      date: "2024-12-06",
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
  ];

  // State to manage wellness data
  const [wellnessData, setWellnessData] = useState([]);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the logged In users data
  useEffect(() => {
    const fetchWellnessData = async () => {
      try {
        setIsLoading(true);
        // const response = await fetch(`/api/wellness/employee/${currentUser.id}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch wellness data');
        // }
        // const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWellnessData(initialWellnessData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching wellness data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWellnessData();
  }, [currentUser.id]);

  // Handle form submission
  // const handleWellnessSubmit = async (newData) => {
  //   try {
  //     const dateExists = wellnessData.some(entry => entry.date === newData.date);
  
  //     if (dateExists) {
  //       setSubmitMessage('An entry already exists for this date. Please select a different date.');
  //       return false;
  //     }

  //     // Add employee ID and department to the data
  //     const wellnessEntry = {
  //       ...newData,
  //       employeeId: currentUser.id,
  //       department: currentUser.department
  //     };
  
  //     // Send to API
  //     const response = await fetch('/api/wellness/submit', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(wellnessEntry),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit wellness data');
  //     }

  //     // Update local state
  //     setWellnessData(prevData => {
  //       const updatedData = [...prevData, wellnessEntry].sort((a, b) =>
  //         new Date(a.date) - new Date(b.date)
  //       );
  //       return updatedData;
  //     });
  
  //     setSubmitMessage('Wellness data saved successfully!');
  //     return true;
  //   } catch (error) {
  //     setSubmitMessage('Error saving wellness data. Please try again.');
  //     console.error('Error saving wellness data:', error);
  //     return false;
  //   }
  // };

  const handleWellnessSubmit = (newData) => {
    try {
      const dateExists = wellnessData.some(entry => entry.date === newData.date);
  
      if (dateExists) {
        setSubmitMessage('An entry already exists for this date. Please select a different date.');
        return false;
      }
  
      // Add employee ID and department to the data
      const wellnessEntry = {
        ...newData,
        employeeId: currentUser.id,
        department: currentUser.department,
      };
  
      // Update local state directly
      setWellnessData(prevData => {
        const updatedData = [...prevData, wellnessEntry].sort((a, b) =>
          new Date(a.date) - new Date(b.date)
        );
        return updatedData;
      });
  
      setSubmitMessage('Wellness data added successfully!');
      return true;
    } catch (error) {
      setSubmitMessage('Error adding wellness data. Please try again.');
      console.error('Error adding wellness data:', error);
      return false;
    }
  };

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <Navbar />
      <Container fluid>
      
      <div class="p-5">
      <Row className="mb-4 py-2">
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
      </div>
    </Container>
    </div>
    
  );
};


export default EmployeeDashboard