import React , { useState , useMemo  } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody, CardTitle , Form , Row, Col } from 'react-bootstrap';

const WellnessChart = ({ 
  data, 
  title = "Wellness Trends",
  height = 400,
  showPhysical = true,
  showMental = true,
  showWorkLife = true,
  showTotal = true,
  physicalColor = "#8884d8",
  mentalColor = "#82ca9d",
  workLifeColor = "#ffc658",
  totalColor = "#ff7300"
}) => {
  const [viewMode, setViewMode] = useState('daily');
  const [selectedMetric, setSelectedMetric] = useState('all');

   // Function to get last 7 days of data
  const getLastSevenDays = (data) => {
    const sortedData = [...data].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const lastSevenEntries = sortedData.slice(0, 7);
    
    return lastSevenEntries
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(entry => ({
        ...entry,
        // Keep the original date string but format it for display
        date: entry.date.split('-')[1] + '/' + entry.date.split('-')[2] // This will show as MM/DD
      }));
  };


   // Function to aggregate data by week
   const aggregateByWeek = (data) => {
    const weeklyData = data.reduce((acc, entry) => {
      const date = new Date(entry.date);
      // Get the week start date (Sunday)
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];

      if (!acc[weekKey]) {
        acc[weekKey] = {
          date: weekKey,
          physical: 0,
          mental: 0,
          workLife: 0,
          total: 0,
          count: 0
        };
      }

      acc[weekKey].physical += entry.physical;
      acc[weekKey].mental += entry.mental;
      acc[weekKey].workLife += entry.workLife;
      acc[weekKey].total += entry.total;
      acc[weekKey].count += 1;

      return acc;
    }, {});

    // Calculate averages and format dates
    return Object.values(weeklyData).map(week => ({
      date: formatWeekLabel(week.date),
      physical: +(week.physical / week.count).toFixed(2),
      mental: +(week.mental / week.count).toFixed(2),
      workLife: +(week.workLife / week.count).toFixed(2),
      total: +(week.total / week.count).toFixed(2)
    }));
  };

  // Function to format week labels
  const formatWeekLabel = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  // Format daily dates
  // const formatDailyData = (data) => {
  //   return data.map(entry => ({
  //     ...entry,
  //     date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  //   }));
  // };

  // Memoize the chart data based on view mode
  const chartData = useMemo(() => {
    return viewMode === 'daily' ? getLastSevenDays(data) : aggregateByWeek(data);
  }, [data, viewMode]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="mb-1"><strong>{label}</strong></p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
              {entry.name}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Determine which lines to show based on selectedMetric
  const shouldShowLine = (metricName) => {
    if (selectedMetric === 'all') {
      return metricName !== 'total'; // Don't show total in 'all' view
    }
    return metricName === selectedMetric;
  };

  return (
    <Card>
      <CardBody>
        <div className="mb-4">
          <Row className="align-items-center">
            <Col>
              <CardTitle tag="h2">{title}</CardTitle>
            </Col>
            <Col xs="auto">
              <Form.Select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="me-2"
                style={{ width: 'auto' }}
              >
                <option value="all">All Metrics</option>
                <option value="physical">Physical Wellness</option>
                <option value="mental">Mental Wellness</option>
                <option value="workLife">Work-Life Balance</option>
                <option value="total">Total Wellness</option>
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Form.Select 
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="daily">Last 7 Days</option>
                <option value="weekly">Weekly View</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
        <div style={{ width: '100%', height: `${height}px` }}>
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date"
                interval="preserveStartEnd"
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 'auto']}
                tickCount={7}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {shouldShowLine('physical') && (
                <Line 
                  type="monotone" 
                  dataKey="physical" 
                  stroke={physicalColor} 
                  strokeWidth={2}
                  name="Physical Wellness"
                  dot={{ r: 4 }}
                />
              )}
              {shouldShowLine('mental') && (
                <Line 
                  type="monotone" 
                  dataKey="mental" 
                  stroke={mentalColor} 
                  strokeWidth={2}
                  name="Mental Wellness"
                  dot={{ r: 4 }}
                />
              )}
              {shouldShowLine('workLife') && (
                <Line 
                  type="monotone" 
                  dataKey="workLife" 
                  stroke={workLifeColor} 
                  strokeWidth={2}
                  name="Work-Life Balance"
                  dot={{ r: 4 }}
                />
              )}
              {shouldShowLine('total') && (
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke={totalColor} 
                  strokeWidth={2}
                  name="Total Wellness"
                  dot={{ r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
  // return (
  //   <Card>
  //     <CardBody>
  //       <div className="d-flex justify-content-between align-items-center mb-4">
  //         <CardTitle tag="h2">{title}</CardTitle>
  //         <Form.Select 
  //           value={viewMode}
  //           onChange={(e) => setViewMode(e.target.value)}
  //           style={{ width: 'auto' }}
  //         >
  //           <option value="daily">Last 7 Days</option>
  //           <option value="weekly">Weekly View</option>
  //         </Form.Select>
  //       </div>
  //       <div style={{ width: '100%', height: `${height}px` }}>
  //         <ResponsiveContainer width="100%" height={height}>
  //           <LineChart data={chartData}>
  //             <XAxis 
  //               dataKey="date"
  //               interval="preserveStartEnd"
  //               angle={-15}
  //               textAnchor="end"
  //               height={60}
  //             />
  //             <YAxis />
  //             <CartesianGrid strokeDasharray="3 3" />
  //             <Tooltip />
  //             <Legend />
  //             {showPhysical && (
  //               <Line 
  //                 type="monotone" 
  //                 dataKey="physical" 
  //                 stroke={physicalColor} 
  //                 strokeWidth={2}
  //                 name="Physical Wellness"
  //               />
  //             )}
  //             {showMental && (
  //               <Line 
  //                 type="monotone" 
  //                 dataKey="mental" 
  //                 stroke={mentalColor} 
  //                 strokeWidth={2}
  //                 name="Mental Wellness"
  //               />
  //             )}
  //             {showWorkLife && (
  //               <Line 
  //                 type="monotone" 
  //                 dataKey="workLife" 
  //                 stroke={workLifeColor} 
  //                 strokeWidth={2}
  //                 name="Work-Life Balance"
  //               />
  //             )}
  //             {showTotal && (
  //               <Line 
  //                 type="monotone" 
  //                 dataKey="total" 
  //                 stroke={totalColor} 
  //                 strokeWidth={2}
  //                 name="Total Wellness"
  //               />
  //             )}
  //           </LineChart>
  //         </ResponsiveContainer>
  //       </div>
  //     </CardBody>
  //   </Card>
  // );
};

export default WellnessChart;