import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProgramPage = React.lazy(() => import('./views/pages/main/Program/programPage'))
const AddEditProgram = React.lazy(() => import('./views/pages/main/Program/AddEditProgram'))
const AddIncome = React.lazy(() => import('./views/pages/main/Income/AddIncome'))
const AddIncomePdf = React.lazy(() => import('./views/pages/main/Income/CretePdf/AddIncomePdf'))
const AddIncomeTithes = React.lazy(() => import('./views/pages/main/Income/Tithes/AddIncomeTithes'))
const AddIncomeSeeders = React.lazy(() => import('./views/pages/main/Income/Seeders/AddIncomeSeeders'))
const AddIncomeOffers = React.lazy(() => import('./views/pages/main/Income/Offers/AddIncomeOffers'))
const AddIncomeUnknownTithes = React.lazy(() => import('./views/pages/main/Income/Unknown_Tithes/AddIncomeUnknownTithes'))
const AddIncomeUnknownSeed = React.lazy(() => import('./views/pages/main/Income/Unknown_Seed/AddIncomeUnknownSeed'))
const Tithes = React.lazy(() => import('./views/pages/addTithes/tithesPage'))
const AddEditTithes = React.lazy(() => import('./views/pages/addTithes/AddEditTithes'))
const ExpensesCategories = React.lazy(() => import('./views/expense/addExpensesCatagery/Home.widget'))
const AddEditExpenses = React.lazy(() => import('./views/expense/addExpensesCatagery/addCatagery.widget'))
const Expenses = React.lazy(() => import('./views/expense/addExpenses/Home.widget'))

const ReportIncome = React.lazy(() => import('./views/pages/main/report/report.income/components/report.component'))
const ReportExpenses = React.lazy(() => import('./views/pages/main/report/report.expenses/components/report.component'))











const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/program', name: 'Program Carousal', element: ProgramPage },
  { path: '/program', name: 'Program Carousal', element: ProgramPage },
  { path: '/program/:type/:add', name: 'Program AddEdit', element: AddEditProgram },
  { path: '/income', name: 'Income Configaration', element:AddIncome  },
  { path: '/income/tithes', name: 'Add Tithes', element:AddIncomeTithes  },
  { path: '/income/Pdf', name: 'Add Tithes', element:AddIncomePdf  },
  { path: '/income/seeder', name: 'Add Tithes', element:AddIncomeSeeders  },
  { path: '/income/Offering', name: 'Add Tithes', element:AddIncomeOffers  },
  { path: '/income/unknown/tithes', name: 'Add Tithes', element:AddIncomeUnknownTithes  },
  { path: '/income/unknown/seed', name: 'Add Tithes', element:AddIncomeUnknownSeed  },
  { path: '/report/income', name: 'Reports', element:ReportIncome  },
  { path: '/report/expenses', name: 'Reports', element:ReportExpenses  },
  { path: '/tithes', name: 'Tithes', element:Tithes  },
  { path: '/tithes/:type/:add', name: 'Tithes AddEdit', element: AddEditTithes },
  { path: '/expenses/categories', name: 'Expences Categories', element: ExpensesCategories },
  { path: '/expenses/categories/:type/:add', name: 'Expences Categories', element: AddEditExpenses },
  { path: '/expenses', name: 'Expences Categories', element:Expenses  },



  





]

export default routes
