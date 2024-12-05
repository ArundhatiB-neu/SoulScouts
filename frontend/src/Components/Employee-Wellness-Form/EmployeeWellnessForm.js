import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col, Form, Button, Card, CardBody, CardTitle } from 'react-bootstrap';

const EmployeeWellnessForm = () => {

  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [dailyWellnessData, setDailyWellnessData] = useState({
    date: new Date().toISOString().split("T")[0],
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

  const [errors, setErrors] = useState({});


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
    setCurrentDate(e.target.value);
  };

  // const calculateTotalWellness = () => {
  //   const physical = getScoreFromPhysicalWellness();
  //   const mental = getScoreFromMentalWellness();
  //   const workLife = getScoreFromWorkLifeBalance();
  //   return Math.round((physical + mental + workLife) / 3);
  // };

  const getScoreFromPhysicalWellness = (physicalWellness) => {
    const { energyLevel, sleepHours } = physicalWellness;
    let score = 0;

    if (energyLevel === 'Excellent') score += 3;
    else if (energyLevel === 'Moderate') score += 2;
    else score += 1;

    if (sleepHours === 'More than 8') score += 3;
    else if (sleepHours === '6-7') score += 2;
    else score += 1;
    console.log("Physical Score:", score);
    return score;
  };
  
  const getScoreFromMentalWellness = (mentalWellness) => {
    const { stressLevel, overwhelmedByWork } = mentalWellness;
    let score = 0;

    if (stressLevel === 'Low') score += 3;
    else if (stressLevel === 'Moderate') score += 2;
    else score += 1;

    if (overwhelmedByWork === 'Rarely') score += 3;
    else if (overwhelmedByWork === 'Sometimes') score += 2;
    else score += 1;
    console.log("Mental Score:", score);
    return score;
  };
  
  const getScoreFromWorkLifeBalance = (workLifeBalance) => {
    const { workBeyondOfficeHours, disconnectFromWork } = workLifeBalance;
    let score = 0;

    if (workBeyondOfficeHours === 'Rarely') score += 3;
    else if (workBeyondOfficeHours === 'Sometimes') score += 2;
    else score += 1;
  
    if (disconnectFromWork === 'Very Effectively') score += 3;
    else if (disconnectFromWork === 'Usually') score += 2;
    else score += 1;
    console.log("WorkLife Score:", score);
    return score;
  };
  
  const dummyDailyWellnessData = [
    {
      date: "2024-12-01",
      analytics: {
        physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
        mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
        workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" },
      },
    },
    {
      date: "2024-12-02",
      analytics: {
        physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
        mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
        workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" },
      },
    },
    {
      date: "2024-12-03",
      analytics: {
        physicalWellness: { energyLevel: "Low", sleepHours: "Less than 6" },
        mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
        workLifeBalance: { workBeyondOfficeHours: "Often", disconnectFromWork: "Sometimes" },
      },
    },
    {
      date: "2024-12-04",
      analytics: {
        physicalWellness: { energyLevel: "Moderate", sleepHours: "6-7" },
        mentalWellness: { stressLevel: "Very High", overwhelmedByWork: "Very Often" },
        workLifeBalance: { workBeyondOfficeHours: "Very Often", disconnectFromWork: "Not at all" },
      },
    },
    {
      date: "2024-12-05",
      analytics: {
        physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
        mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
        workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" },
      },
    },
    {
      date: "2024-12-06",
      analytics: {
        physicalWellness: { energyLevel: "Good", sleepHours: "6-7" },
        mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
        workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" },
      },
    },
    {
      date: "2024-12-07",
      analytics: {
        physicalWellness: { energyLevel: "Low", sleepHours: "Less than 6" },
        mentalWellness: { stressLevel: "Very High", overwhelmedByWork: "Very Often" },
        workLifeBalance: { workBeyondOfficeHours: "Very Often", disconnectFromWork: "Not at all" },
      },
    },
    {
      date: "2024-12-08",
      analytics: {
        physicalWellness: { energyLevel: "Moderate", sleepHours: "7-8" },
        mentalWellness: { stressLevel: "High", overwhelmedByWork: "Often" },
        workLifeBalance: { workBeyondOfficeHours: "Often", disconnectFromWork: "Somewhat" },
      },
    },
  ];
  

  const transformDataForChart = (data) => {
    return data.map((entry) => {
      const physicalScore = getScoreFromPhysicalWellness(entry.analytics.physicalWellness);
      const mentalScore = getScoreFromMentalWellness(entry.analytics.mentalWellness);
      const workLifeScore = getScoreFromWorkLifeBalance(entry.analytics.workLifeBalance);

      return {
        date: entry.date,
        physical: physicalScore,
        mental: mentalScore,
        workLife: workLifeScore,
        total: physicalScore + mentalScore + workLifeScore, 

        
      };
      
    });
  };
  

  const chartData = transformDataForChart(dummyDailyWellnessData);
  console.log(chartData);
  // const handleSaveWellness = () => {
  //   setDailyWellnessData([
  //     ...dailyWellnessData,
  //     {
  //       date: currentDate,
  //       physical: getScoreFromPhysicalWellness(),
  //       mental: getScoreFromMentalWellness(),
  //       workLife: getScoreFromWorkLifeBalance(),
  //       total: calculateTotalWellness(),
  //     },
  //   ]);
  // };

  // console.log(dailyWellnessData);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h2" className="mb-4">Daily Wellness Check</CardTitle>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="font-weight-bold">
                  Date
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="date"
                    value={currentDate}
                    onChange={handleDateChange}
                  />
                </Col>
              </Form.Group>

              <Form>
                <h3 className="mb-3">Physical Wellness</h3>
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

                <h3 className="mb-3">Mental Wellness</h3>
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

                <h3 className="mb-3">Work-Life Balance</h3>
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
                    // onClick={handleSaveWellness}
                  >
                    Save Daily Wellness
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h2" className="mb-4">Wellness Trends</CardTitle>
              <div className="h-80" style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="physical" stroke="#8884d8" strokeWidth={2}/>
                  <Line type="monotone" dataKey="mental" stroke="#82ca9d" strokeWidth={2}/>
                  <Line type="monotone" dataKey="workLife" stroke="#ffc658" strokeWidth={2}/>
                  <Line type="monotone" dataKey="total" stroke="#ff7300" strokeWidth={2}/>
                </LineChart>
              </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeWellnessForm;