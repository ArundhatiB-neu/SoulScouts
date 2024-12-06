import './EmployeeWellnessForm.css';

import React, { useState , useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col, Form, Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import moment from 'moment-timezone';
const bostonTimezone = 'America/New_York';


const EmployeeWellnessForm = ({ onSubmit , existingDates }) => {
  
  const today = moment().tz(bostonTimezone).format('YYYY-MM-DD');
  const [currentDate, setCurrentDate] = useState(today);
  const [dailyWellnessData, setDailyWellnessData] = useState({
    date: today,
    analytics: {
      physicalWellness: {
        energyLevel: 'Good',
        sleepHours: '7-8',
      },
      mentalWellness: {
        stressLevel: 'Moderate',
        overwhelmedByWork: 'Sometimes',
      },
      workLifeBalance: {
        workBeyondOfficeHours: 'Sometimes',
        disconnectFromWork: 'Usually',
      },
    },
  });
console.log(today);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (existingDates.includes(today)) {
      setSubmitMessage('You have already submitted your wellness data for today. You can submit a new form tomorrow.');
      setDailyWellnessData((prevState) => ({
        ...prevState,
        analytics: {
          physicalWellness: {
            energyLevel: 'Good',
            sleepHours: '7-8',
          },
          mentalWellness: {
            stressLevel: 'Moderate',
            overwhelmedByWork: 'Sometimes',
          },
          workLifeBalance: {
            workBeyondOfficeHours: 'Sometimes',
            disconnectFromWork: 'Usually',
          },
        },
      }));
    }
  }, [existingDates, today]);

  const handlePhysicalWellnessChange = (field, value) => {
    setDailyWellnessData((prevState) => ({
      ...prevState,
      analytics: {
        ...prevState.analytics,
        physicalWellness: {
          ...prevState.analytics.physicalWellness,
          [field]: value, 
        },
      },
    }));
  };

  const handleMentalWellnessChange = (field, value) => {
    setDailyWellnessData((prevState) => ({
      ...prevState,
      analytics: {
        ...prevState.analytics,
        mentalWellness: {
          ...prevState.analytics.mentalWellness,
          [field]: value, 
        },
      },
    }));
  };

  const handleWorkLifeBalanceChange = (field, value) => {
    setDailyWellnessData((prevState) => ({
      ...prevState,
      analytics: {
        ...prevState.analytics,
        workLifeBalance: {
          ...prevState.analytics.workLifeBalance,
          [field]: value, 
        },
      },
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate !== today) {
      setSubmitMessage('You can only submit the form for today\'s date. The form will be autofilled with average values.');
      setCurrentDate(today);
      setDailyWellnessData((prevState) => ({
        ...prevState,
        date: today,
        analytics: {
          physicalWellness: {
            energyLevel: 'Good',
            sleepHours: '7-8',
          },
          mentalWellness: {
            stressLevel: 'Moderate',
            overwhelmedByWork: 'Sometimes',
          },
          workLifeBalance: {
            workBeyondOfficeHours: 'Sometimes',
            disconnectFromWork: 'Usually',
          },
        },
      }));
    } else {
      setCurrentDate(selectedDate);
      setDailyWellnessData((prevState) => ({
        ...prevState,
        date: selectedDate
      }));
    }
  };

  const getScoreFromPhysicalWellness = (physicalWellness) => {
    const { energyLevel, sleepHours } = physicalWellness;
    let score = 0;

    if (energyLevel === 'Excellent') score += 3;
    else if (energyLevel === 'Good') score += 2.5;
    else if (energyLevel === 'Moderate') score += 2;
    else score += 1;

    if (sleepHours === 'More than 8') score += 3;
    else if (sleepHours === '7-8') score += 2.5;
    else if (sleepHours === '6-7') score += 2;
    else score += 1;

    return score;
  };

  const getScoreFromMentalWellness = (mentalWellness) => {
    const { stressLevel, overwhelmedByWork } = mentalWellness;
    let score = 0;

    if (stressLevel === 'Low') score += 3;
    else if (stressLevel === 'Moderate') score += 2;
    else if (stressLevel === 'High') score += 1.5;
    else score += 1;

    if (overwhelmedByWork === 'Rarely') score += 3;
    else if (overwhelmedByWork === 'Sometimes') score += 2;
    else if (overwhelmedByWork === 'Often') score += 1.5;
    else score += 1;

    return score;
  };

  const getScoreFromWorkLifeBalance = (workLifeBalance) => {
    const { workBeyondOfficeHours, disconnectFromWork } = workLifeBalance;
    let score = 0;

    if (workBeyondOfficeHours === 'Rarely') score += 3;
    else if (workBeyondOfficeHours === 'Sometimes') score += 2;
    else if (workBeyondOfficeHours === 'Often') score += 1.5;
    else score += 1;

    if (disconnectFromWork === 'Very Effectively') score += 3;
    else if (disconnectFromWork === 'Usually') score += 2;
    else if (disconnectFromWork === 'Somewhat') score += 1.5;
    else score += 1;

    return score;
  };

  const handleSaveWellness = async () => {
    try {
      console.log("Form submission started");
      setIsSubmitting(true);
      setSubmitMessage('');
        
      const dateExists = existingDates.includes(currentDate);
      if (dateExists) {
        setSubmitMessage('An entry already exists for this date. Please select a different date.');
        return false;
      }

      const physicalScore = getScoreFromPhysicalWellness(dailyWellnessData.analytics.physicalWellness);
      const mentalScore = getScoreFromMentalWellness(dailyWellnessData.analytics.mentalWellness);
      const workLifeScore = getScoreFromWorkLifeBalance(dailyWellnessData.analytics.workLifeBalance);

      console.log("Scores calculated:", { physicalScore, mentalScore, workLifeScore });

      const newWellnessData = {
        date: currentDate,
        physical: physicalScore,
        mental: mentalScore,
        workLife: workLifeScore,
        total: physicalScore + mentalScore + workLifeScore,
        analytics: dailyWellnessData.analytics
      };

      console.log("Submitting new data:", newWellnessData);

      // Call the onSubmit prop with the new data
      await onSubmit(newWellnessData);

      console.log("Submission successful"); 


      setSubmitMessage('Wellness data saved successfully!');

      // Reset form to default values with tomorrow's date
      const tomorrow = moment().tz(bostonTimezone).add(1, 'day');
      const tomorrowStr = tomorrow.format('YYYY-MM-DD');

      
      // Reset form to default values
      setDailyWellnessData({
        date: tomorrowStr,
        analytics: {
          physicalWellness: {
            energyLevel: 'Good',
            sleepHours: '7-8',
          },
          mentalWellness: {
            stressLevel: 'Moderate',
            overwhelmedByWork: 'Sometimes',
          },
          workLifeBalance: {
            workBeyondOfficeHours: 'Sometimes',
            disconnectFromWork: 'Usually',
          },
        },
      });
      setCurrentDate(tomorrowStr);
      setSubmitMessage('Wellness data saved successfully!');
    } catch (error) {
      setSubmitMessage('Error saving wellness data. Please try again.');
      console.error('Error saving wellness data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h2" className="mb-4">Daily Wellness Check</CardTitle>
              {submitMessage && (
                <div className={`alert ${submitMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {submitMessage}
                </div>
              )}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="font-weight-bold">
                  Date
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="date"
                    value={currentDate}
                    onChange={handleDateChange}
                    disabled={existingDates.includes(today)}
                  />
                </Col>
              </Form.Group>
              
              <div class="section-divider"></div>

              {!existingDates.includes(today) && (
                <Form>
                <h3 className="mb-3 section-title">Physical Wellness</h3>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4} className="font-weight-bold">
                    How would you rate your overall energy levels throughout the workday?
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      value={dailyWellnessData.analytics.physicalWellness.energyLevel}
                      onChange={(e) => handlePhysicalWellnessChange('energyLevel', e.target.value)}
                      className="custom-select"
                    >
                      <option value="Low">Low</option>
                      <option value="Good">Good</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Excellent">Excellent</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4} className="font-weight-bold">
                    How many hours of sleep do you typically get per night?
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      value={dailyWellnessData.analytics.physicalWellness.sleepHours}
                      onChange={(e) => handlePhysicalWellnessChange('sleepHours', e.target.value)}
                      className="custom-select"
                    >
                      <option value="Less than 6">Less than 6</option>
                      <option value="6-7">6-7</option>
                      <option value="7-8">7-8</option>
                      <option value="More than 8">More than 8</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <div class="section-divider"></div>
                
                <h3 className="mb-3 section-title">Mental Wellness</h3>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4} className="font-weight-bold">
                    How would you rate your current work-related stress level?
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      value={dailyWellnessData.analytics.mentalWellness.stressLevel}
                      onChange={(e) => handleMentalWellnessChange('stressLevel', e.target.value)}
                      className="custom-select"
                    >
                      <option value="Very High">Very High</option>
                      <option value="High">High</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Low">Low</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4} className="font-weight-bold">
                    How often do you feel overwhelmed by work responsibilities?
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      value={dailyWellnessData.analytics.mentalWellness.overwhelmedByWork}
                      onChange={(e) => handleMentalWellnessChange('overwhelmedByWork', e.target.value)}
                      className="custom-select"
                    >
                      <option value="Very Often">Very Often</option>
                      <option value="Often">Often</option>
                      <option value="Sometimes">Sometimes</option>
                      <option value="Rarely">Rarely</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                
                <div class="section-divider"></div>

                <h3 className="mb-3 section-title">Work-Life Balance</h3>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4} className="font-weight-bold">
                    How often do you work beyond regular office hours?
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      value={dailyWellnessData.analytics.workLifeBalance.workBeyondOfficeHours}
                      onChange={(e) => handleWorkLifeBalanceChange('workBeyondOfficeHours', e.target.value)}
                      className="custom-select"
                    >
                      <option value="Very Often">Very Often</option>
                      <option value="Often">Often</option>
                      <option value="Sometimes">Sometimes</option>
                      <option value="Rarely">Rarely</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4} className="font-weight-bold">
                    How effectively can you disconnect from work during personal time?
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      value={dailyWellnessData.analytics.workLifeBalance.disconnectFromWork}
                      onChange={(e) => handleWorkLifeBalanceChange('disconnectFromWork', e.target.value)}
                      className="custom-select"
                    >
                      <option value="Not at all">Not at all</option>
                      <option value="Usually">Usually</option>
                      <option value="Somewhat">Somewhat</option>
                      <option value="Very Effectively">Very Effectively</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <div className="text-end">
                  <Button
                    variant="primary"
                    onClick={handleSaveWellness}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Daily Wellness'}
                  </Button>
                </div>
              </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeWellnessForm;