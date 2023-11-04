import React, { useEffect, useState } from 'react'
import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react'
import DatePicker from 'rsuite/DatePicker'
import 'rsuite/dist/rsuite.min.css'
import { AddExpensesCategory } from './service/expenses.service';

const INITIAL_VALUE = ''



function AddCatagery() {

    const [dob, setDob] = useState(INITIAL_VALUE);
    const [CategoryName, setCategoryName] = useState([]);

    const [successMsg, setSuccessMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const addCategory = async () => {
        const year = dob.getFullYear();
        const month = String(dob.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(dob.getDate()).padStart(2, '0');
        const formattedDob = `${year}-${month}-${day}`;
    
        const data = {
          Date: formattedDob,
          CategoryName: CategoryName,
        };
    
        try {
         
          setLoading(true);
          const response = await AddExpensesCategory(data);
    
          if (response.success) {
            setSuccessMsg('Success: Data added successfully.');
            window.location.reload();
          } else {
            setSuccessMsg('Error: Unable to add data.');
          }
    
          setLoading(false);
        } catch (error) {
          setSuccessMsg('Error: An error occurred.');
          console.error('Error adding tithes:', error);
          setLoading(false);
        }
      };



  return <div>
    <CCard className="mb-4">
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>Expenses</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <h6>Add New Expenses Categories</h6>
        </CRow>

        {/* programme Information */}

        <hr style={{ borderTop: '2px solid #000' }} />
        <CRow className="mb-4">
          <CCol md={3}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Date
            </CFormLabel>
            <DatePicker
              size="md"
              placeholder="Select..."
              style={{ width: 400, display: 'block', marginBottom: 10 }}
              onChange={(date) => setDob(date)}
            />

          </CCol>

          <CCol md={8}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
            Category Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: Monday Program"
              value={CategoryName}
              onChange={(CategoryName) => setCategoryName(CategoryName.target.value)}
            />

          </CCol>
        </CRow>
        <CRow
          className="mt-4"
          style={{ position: 'sticky', bottom: '1rem', alignSelf: 'flex-end' }}
        >
          <CCol md={2}>
            <CButton
              disabled={loading}
              color="primary"
              style={{ width: '100%' }}
              onClick={() => addCategory()}
            >
              Submit
            </CButton>
          </CCol>
          <CCol md={1}>
            <CSpinner hidden={!loading} color="primary" />
          </CCol>
        </CRow>
        {successMsg && (
          <CAlert
            color={successMsg.includes('Error') ? 'danger' : 'success'}
            className="d-flex align-items-center mt-3"
          >
            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
            <div>{successMsg}</div>
          </CAlert>
        )}
      </CCardBody>
    </CCard>
  </div>;
}

export default AddCatagery;
