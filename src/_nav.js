import React from 'react'
import CIcon from '@coreui/icons-react'
import {

  cilStar,
  cilBook,
  cilDrop,
  cilNewspaper,
  cilFilterPhoto
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Programs',
    to: '/program',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Income',
    to: ' ',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Tithes',
        to: '/income/tithes',
      },
       {
        component: CNavItem,
        name: 'Add Seeds',
        to: '/income/seeder',
      },
      {
        component: CNavItem,
        name: 'Add Offering',
        to: '/income/Offering',
      },
      {
        component: CNavItem,
        name: 'Add Unknown Tithes',
        to: '/income/unknown/tithes',
      },
      {
        component: CNavItem,
        name: 'Add Unknown Seed',
        to: '/income/unknown/seed',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Tithes Details',
    to: '/tithes',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Expenses',
    to: ' ',
    icon: <CIcon icon={cilFilterPhoto} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Expenses Categories',
        to: '/expenses/categories',
      },
      {
        component: CNavItem,
        name: 'Expenses',
        to: '/expenses',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Report',
    to: ' ',
    icon:  <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Income Report',
        to: '/report/income',
      },
      {
        component: CNavItem,
        name: 'Expenses Report',
        to: '/report/expenses',
      },
    ],
  },

  
 
]

export default _nav
