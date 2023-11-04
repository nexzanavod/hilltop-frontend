import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { fetchExpenses,deleteCategories } from './service/expenses.service';

function Homewidget() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);


  useEffect(() => {
    fetchExpenses()
      .then((response) => {
        setExpenses(response); // Assuming your API response has a data property containing the list of expenses
      })
      .catch((error) => {
        console.error('Error fetching expenses: ', error);
      });
  }, []);


  const handleDelete = async (Expenseid) => {
    const confirmed = window.confirm('Are you sure you want to delete this program?');

    if (confirmed) {
      const deleteSuccess = await deleteCategories(Expenseid);
      if (deleteSuccess) {
        setExpenses(expenses.filter((expenses) => expenses.id !== Expenseid));
      } else {
        // Handle errors or show an error message to the user
      }
    }
  };


  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Expenses Categories</h5>
          <CButton onClick={() => navigate('/expenses/categories/add/1')}>ADD NEW</CButton>
        </CCardHeader>
        <CCardBody>
          <div className="table-responsive">
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell >Category Name</CTableHeaderCell>
                  <CTableHeaderCell >Date</CTableHeaderCell>
                  <CTableHeaderCell >Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {expenses.map((expense, index) => (
                  <CTableRow key={expense.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{expense.attributes.Category}</CTableDataCell>
                    <CTableDataCell width={150}>{expense.attributes.Category_Date}</CTableDataCell>
                    <CTableDataCell>
                      <CIcon
                        icon={cilTrash}
                        size="xl"
                        className="text-danger"
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '3px' }}
                        onClick={() => handleDelete(expense.id)} // Handle delete on button click
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Homewidget;
