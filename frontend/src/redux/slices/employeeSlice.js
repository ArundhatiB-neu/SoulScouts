import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [
      {
        id: "emp001",
        fullName: "Sarah Johnson",
        email: "sarah.j@techcorp.com",
        company: "TechCorp",
        domain: "Engineering",
        emergencyContact: {
          fullName: "Michael Johnson",
          email: "michael.j@gmail.com",
          phone: "+1-555-0123"
        },
        coachId: "coach001",
        coachName: "David Miller"
      },
      {
        id: "emp002",
        fullName: "James Wilson",
        email: "james.w@techcorp.com",
        company: "TechCorp",
        domain: "Sales",
        emergencyContact: {
          fullName: "Emma Wilson",
          email: "emma.w@gmail.com",
          phone: "+1-555-0124"
        },
        coachId: "coach002",
        coachName: "Jennifer Chen"
      },
      {
        id: "emp003",
        fullName: "Maria Garcia",
        email: "maria.g@innovatech.com",
        company: "InnovaTech",
        domain: "Marketing",
        emergencyContact: {
          fullName: "Carlos Garcia",
          email: "carlos.g@gmail.com",
          phone: "+1-555-0125"
        },
        coachId: null,
        coachName: null
      },
      {
        id: "emp004",
        fullName: "Alex Thompson",
        email: "alex.t@techcorp.com",
        company: "TechCorp",
        domain: "Engineering",
        emergencyContact: {
          fullName: "Lisa Thompson",
          email: "lisa.t@gmail.com",
          phone: "+1-555-0126"
        },
        coachId: "coach001",
        coachName: "David Miller"
      },
      {
        id: "emp005",
        fullName: "Rachel Kim",
        email: "rachel.k@innovatech.com",
        company: "InnovaTech",
        domain: "Sales",
        emergencyContact: {
          fullName: "Daniel Kim",
          email: "daniel.k@gmail.com",
          phone: "+1-555-0127"
        },
        coachId: "coach003",
        coachName: "Michael Brown"
      }
    ],
    loading: false,
    error: null
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.list.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter(e => e.id !== action.payload);
    },
    setEmployees: (state, action) => {
      state.list = action.payload;
    },
    assignCoach: (state, action) => {
      const { employeeId, coachId, coachName } = action.payload;
      const employee = state.list.find(e => e.id === employeeId);
      if (employee) {
        employee.coachId = coachId;
        employee.coachName = coachName;
      }
    }
  }
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployees,
  assignCoach
} = employeeSlice.actions;

export default employeeSlice.reducer;