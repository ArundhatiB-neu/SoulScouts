import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import WellnessChart from '../../../Components/Wellness-Chart/WellnessChart';
import Navbar from '../../../Components/Navbar/Navbar';

const CoachDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [rawData, setRawData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        setIsLoading(true);
        // Mock data - replace with actual API call
        const dummyData = [
          {
            employeeId: "emp001",
            employeeName: "John Doe",
            department: "Engineering",
            data: [
              {
                date: "2024-11-28",
                physical: 5.0,
                mental: 4.2,
                workLife: 5.4,
                total: 14.6,
                analytics: {
                  physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
                  mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
                  workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
                }
              },
              {
                date: "2024-11-29",
                physical: 5.8,
                mental: 5.2,
                workLife: 5.4,
                total: 16.4,
                analytics: {
                  physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
                  mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
                  workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
                }
              },
              {
                date: "2024-11-30",
                physical: 5.8,
                mental: 5.2,
                workLife: 5.4,
                total: 16.4,
                analytics: {
                  physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
                  mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
                  workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
                }
              },
            ]
          },
          {
            employeeId: "emp002",
            employeeName: "Jane Smith",
            department: "Marketing",
            data: [
              {
                date: "2024-11-27",
                physical: 5.5,
                mental: 5.4,
                workLife: 5.6,
                total: 16.5,
                analytics: {
                  physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
                  mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
                  workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" }
                }
              },
              {
                date: "2024-11-28",
                physical: 5.0,
                mental: 4.2,
                workLife: 5.4,
                total: 14.6,
                analytics: {
                  physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
                  mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
                  workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
                }
              },
              {
                date: "2024-11-29",
                physical: 5.8,
                mental: 5.2,
                workLife: 5.4,
                total: 16.4,
                analytics: {
                  physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
                  mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
                  workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
                }
              },
              {
                date: "2024-11-30",
                physical: 5.8,
                mental: 5.2,
                workLife: 5.4,
                total: 16.4,
                analytics: {
                  physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
                  mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
                  workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
                }
              },
              // Add more dates for Jane Smith
            ]
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setRawData(dummyData);
        setEmployees(dummyData.map(emp => ({
          id: emp.employeeId,
          name: emp.employeeName,
          department: emp.department
        })));
      } catch (error) {
        console.error('Error fetching coach data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoachData();
  }, []);

  // Calculate chart data based on selected employee
  const chartData = useMemo(() => {
    if (!rawData.length) return [];

    if (selectedEmployee === 'all') {
      // Aggregate data for all employees by date
      const allData = rawData.flatMap(emp => emp.data);
      const dateGroups = allData.reduce((acc, entry) => {
        if (!acc[entry.date]) {
          acc[entry.date] = {
            date: entry.date,
            physical: [],
            mental: [],
            workLife: [],
            total: [],
            count: 0
          };
        }
        
        acc[entry.date].physical.push(entry.physical);
        acc[entry.date].mental.push(entry.mental);
        acc[entry.date].workLife.push(entry.workLife);
        acc[entry.date].total.push(entry.total);
        acc[entry.date].count++;
        
        return acc;
      }, {});

      return Object.values(dateGroups)
        .map(group => ({
          date: group.date,
          physical: group.physical.reduce((a, b) => a + b, 0) / group.count,
          mental: group.mental.reduce((a, b) => a + b, 0) / group.count,
          workLife: group.workLife.reduce((a, b) => a + b, 0) / group.count,
          total: group.total.reduce((a, b) => a + b, 0) / group.count
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Return data for selected employee
    const employeeData = rawData.find(emp => emp.employeeId === selectedEmployee);
    return employeeData ? employeeData.data.sort((a, b) => new Date(a.date) - new Date(b.date)) : [];
  }, [rawData, selectedEmployee]);

  // Calculate employee summaries
  const employeeSummaries = useMemo(() => {
    return rawData.map(employee => {
      const latestData = employee.data[employee.data.length - 1];
      return {
        id: employee.employeeId,
        name: employee.employeeName,
        department: employee.department,
        physical: latestData.physical,
        mental: latestData.mental,
        workLife: latestData.workLife,
        total: latestData.total,
        analytics: latestData.analytics
      };
    });
  }, [rawData]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <Container fluid className="p-4">
          <div>Loading wellness data...</div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Container fluid className="p-4">
          <div className="text-red-500">Error loading wellness data: {error}</div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className="p-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-2xl font-bold text-center">Employee Wellness Overview</h1>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Select Employee</Form.Label>
                <Form.Select 
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="all">All Employees</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.department}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <WellnessChart
                data={chartData}
                title={`${selectedEmployee === 'all' ? 'All Employees' : 'Employee'} Wellness Trends`}
                height={400}
                showPhysical={true}
                showMental={true}
                showWorkLife={true}
                showTotal={true}
              />
            </Col>
          </Row>

          <Row className="mt-4">
            {employeeSummaries.map((employee) => (
              <Col md={4} key={employee.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-lg font-semibold mb-3">
                      {employee.name}
                    </Card.Title>
                    <div className="text-sm mb-2">
                      Department: {employee.department}
                    </div>
                    <div className="text-sm">
                      <div className="mb-2">
                        Physical Wellness: {employee.physical.toFixed(1)}/7
                      </div>
                      <div className="mb-2">
                        Mental Wellness: {employee.mental.toFixed(1)}/7
                      </div>
                      <div className="mb-2">
                        Work-Life Balance: {employee.workLife.toFixed(1)}/7
                      </div>
                      <div className="font-semibold">
                        Overall: {employee.total.toFixed(1)}/20
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default CoachDashboard;