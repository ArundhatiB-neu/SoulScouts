export const ROLES = {
    ADMIN: 'admin',
    HR: 'hr',
    EMPLOYEE: 'employee',
    COACH: 'coach'
  };
  
  export const publicRoutes = [
    { path: '/', component: 'Home' },
    { path: '/login', component: 'Login' },
    { path: '/signup', component: 'Signup' }
  ];
  
  export const protectedRoutes = [
    {
      path: '/hr-dashboard',
      component: 'HRDashboard',
      allowedRoles: [ROLES.HR]
    },
    {
      path: '/employee-dashboard',
      component: 'EmployeeDashboard',
      allowedRoles: [ROLES.EMPLOYEE]
    },
    {
      path: '/coach-dashboard',
      component: 'CoachDashboard',
      allowedRoles: [ROLES.COACH]
    },
    {
      path: '/company-management',
      component: 'CompanyManagement',
      allowedRoles: [ROLES.ADMIN]
    },
    {
      path: '/coach-management',
      component: 'CoachManagement',
      allowedRoles: [ROLES.ADMIN]
    },
    {
      path: '/employee-management',
      component: 'EmployeeManagement',
      allowedRoles: [ROLES.HR]
    },
    {
      path: '/journal',
      component: 'Journal',
      allowedRoles: [ROLES.EMPLOYEE]
    },
    {
      path: '/settings',
      component: 'Settings',
      allowedRoles: [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE, ROLES.COACH]
    },
    {
      path: '/library',
      component: 'ResourceLibrary',
      allowedRoles: [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE, ROLES.COACH]
    }
  ];