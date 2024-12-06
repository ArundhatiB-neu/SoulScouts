import React, { useState, useMemo , useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import WellnessChart from '../../../Components/Wellness-Chart/WellnessChart';
import Navbar from '../../../Components/Navbar/Navbar';

const HRDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchAggregatedData = async () => {
  //     try {
  //       const response = await fetch('/API Call');
  //       const data = await response.json();
  //       setRawData(data);
  //     } catch (error) {
  //       console.error('Error fetching aggregated data:', error);
  //     }
  //   };
  
  //   fetchAggregatedData();
  // }, []);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      try {
        setIsLoading(true);
        const dummyData = [
          {
            date: "2024-11-28",
            department: "Engineering",
            physical: 5.8,
            mental: 5.2,
            workLife: 5.4,
            total: 16.4,
            employeeId: "emp001",
            analytics: {
              physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
              mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
              workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
            }
          },
          {
            date: "2024-11-28",
            department: "Marketing",
            physical: 5.5,
            mental: 5.4,
            workLife: 5.6,
            total: 16.5,
            employeeId: "emp002",
            analytics: {
              physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
              mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
              workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" }
            }
          },
          {
            date: "2024-11-29",
            department: "Engineering",
            physical: 5.6,
            mental: 5.0,
            workLife: 5.2,
            total: 15.8,
            employeeId: "emp001",
            analytics: {
              physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
              mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
              workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" }
            }
          },
          {
            date: "2024-11-29",
            department: "Sales",
            physical: 5.7,
            mental: 5.2,
            workLife: 5.4,
            total: 16.3,
            employeeId: "emp003",
            analytics: {
              physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
              mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
              workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
            }
          },
          {
            date: "2024-11-30",
            department: "Engineering",
            physical: 5.9,
            mental: 5.3,
            workLife: 5.5,
            total: 16.7,
            employeeId: "emp001",
            analytics: {
              physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
              mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
              workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
            }
          },
          {
            date: "2024-11-30",
            department: "Marketing",
            physical: 5.4,
            mental: 5.1,
            workLife: 5.3,
            total: 15.8,
            employeeId: "emp002",
            analytics: {
              physicalWellness: { energyLevel: "Good", sleepHours: "7-8" },
              mentalWellness: { stressLevel: "Moderate", overwhelmedByWork: "Sometimes" },
              workLifeBalance: { workBeyondOfficeHours: "Sometimes", disconnectFromWork: "Usually" }
            }
          },
          {
            date: "2024-12-01",
            department: "Sales",
            physical: 5.8,
            mental: 5.3,
            workLife: 5.5,
            total: 16.6,
            employeeId: "emp003",
            analytics: {
              physicalWellness: { energyLevel: "Excellent", sleepHours: "More than 8" },
              mentalWellness: { stressLevel: "Low", overwhelmedByWork: "Rarely" },
              workLifeBalance: { workBeyondOfficeHours: "Rarely", disconnectFromWork: "Very Effectively" }
            }
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setRawData(dummyData);
      } catch (error) {
        console.error('Error fetching aggregated data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAggregatedData();
  }, []);

  // Need Raw data of employees in this format.
  // {
  //   date: "2024-11-28",
  //   department: "Engineering",
  //   physical: 5.8,
  //   mental: 5.2,
  //   workLife: 5.4,
  //   total: 16.4,
  //   employeeId: "emp001",
  //   analytics: {
  //     physicalWellness: { 
  //       energyLevel: "Excellent", 
  //       sleepHours: "More than 8" 
  //     },
  //     mentalWellness: { 
  //       stressLevel: "Low", 
  //       overwhelmedByWork: "Rarely" 
  //     },
  //     workLifeBalance: { 
  //       workBeyondOfficeHours: "Rarely", 
  //       disconnectFromWork: "Very Effectively" 
  //     }
  //   }
  // },

   // Calculate chart data based on selected department
   const chartData = useMemo(() => {
    if (!rawData.length) return [];

    if (selectedDepartment === 'all') {
      // Group by date for all departments
      const dateGroups = rawData.reduce((acc, entry) => {
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

      // Calculate averages for each date
      return Object.values(dateGroups).map(group => ({
        date: group.date,
        physical: group.physical.reduce((a, b) => a + b, 0) / group.count,
        mental: group.mental.reduce((a, b) => a + b, 0) / group.count,
        workLife: group.workLife.reduce((a, b) => a + b, 0) / group.count,
        total: group.total.reduce((a, b) => a + b, 0) / group.count
      })).sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Filter by selected department
    return rawData
      .filter(entry => entry.department === selectedDepartment)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [rawData, selectedDepartment]);

  // Calculate department summaries
  const departmentSummaries = useMemo(() => {
    if (!rawData.length) return [];

    const summaries = rawData.reduce((acc, entry) => {
      if (!acc[entry.department]) {
        acc[entry.department] = {
          physical: [],
          mental: [],
          workLife: [],
          total: [],
          count: 0
        };
      }
      
      acc[entry.department].physical.push(entry.physical);
      acc[entry.department].mental.push(entry.mental);
      acc[entry.department].workLife.push(entry.workLife);
      acc[entry.department].total.push(entry.total);
      acc[entry.department].count++;
      
      return acc;
    }, {});

    return Object.entries(summaries).map(([dept, values]) => ({
      department: dept,
      physical: values.physical.reduce((a, b) => a + b, 0) / values.count,
      mental: values.mental.reduce((a, b) => a + b, 0) / values.count,
      workLife: values.workLife.reduce((a, b) => a + b, 0) / values.count,
      total: values.total.reduce((a, b) => a + b, 0) / values.count,
      employeeCount: values.count
    }));
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
       <div class="p-5">
       <Row className="mb-4">
          <Col>
            <h1 className="text-2xl font-bold text-center">Department Wellness Overview</h1>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <WellnessChart
              data={chartData}
              title={`${selectedDepartment === 'all' ? 'All Departments' : selectedDepartment} Wellness Trends`}
              height={400}
              showPhysical={true}
              showMental={true}
              showWorkLife={true}
              showTotal={true}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          {departmentSummaries.map((dept) => (
            <Col md={4} key={dept.department} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-lg font-semibold mb-3">
                    {dept.department}
                  </Card.Title>
                  <div className="text-sm">
                    <div className="mb-2">
                      Physical Wellness: {dept.physical.toFixed(1)}/7
                    </div>
                    <div className="mb-2">
                      Mental Wellness: {dept.mental.toFixed(1)}/7
                    </div>
                    <div className="mb-2">
                      Work-Life Balance: {dept.workLife.toFixed(1)}/7
                    </div>
                    <div className="font-semibold">
                      Overall: {dept.total.toFixed(1)}/20
                    </div>
                    <div className="mt-2 text-blue-600">
                      Employees: {dept.employeeCount}
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

export default HRDashboard;