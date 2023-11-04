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
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import DatePicker from 'rsuite/DatePicker'
import 'rsuite/dist/rsuite.min.css'
import { insertExpenses, fetchExpenses} from './service/expenses.service';

const INITIAL_VALUE = ''

function HomeWidget() {


   // UseState programme Details

   const [dob, setDob] = useState("2023-08-16");
 
 
   // UseState Contact Information
   const [ExpencesOptions, setExpencesOptions] = useState([]);
   const [Expenses, setExpenses] = useState("")
 
   //UseState Payment Information
   const [paymentMethod, setPaymentMethod] = useState([])
   const [payment, setPayment] = useState(INITIAL_VALUE)
   const [note, setNote] = useState(INITIAL_VALUE)
 
   const [allData, setAllData] = useState(INITIAL_VALUE)
 
   const [successMsg, setSuccessMsg] = useState('');
   const [loading, setLoading] = useState(false);
 
   useEffect(() => {
    fetchExpenses()
      .then(data => {
        // Handle the response data here
        if (data.length !== 0) {
          // Data is an array, so we can map it
          console.log("Data", data)
          const ExpencesOptions = data.map(item => ({
            label: item.attributes.Category,
            value: item.attributes.Category,
          }));

          // Update the programOptions state
          setExpencesOptions(ExpencesOptions);


        } else {
          console.error("API Response is not an array:", data);
        }

        console.log("API Response:", data);
      })
      .catch(error => {
        // Handle errors here
        console.error("API Error:", error);
      });


  }, [fetchExpenses]);

  const addInvoice = async () => {
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(dob.getDate()).padStart(2, '0');
    const formattedDob = `${year}-${month}-${day}`;

    const data = {
      Date: formattedDob,
      ExpensesCategory: Expenses.value,
      PaymentMethod: paymentMethod.value,
      Payment: payment,
      Note: note,
    };
    try {
      setAllData(data)
      setLoading(true);
      const response = await insertExpenses(data);

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
          <h6>Add New Expenses</h6>
        </CRow>
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
        </CRow>
        <hr style={{ borderTop: '2px solid #000' }} />
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Expenses Category
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={ExpencesOptions}
              onChange={(ExpencesOptions) => setExpenses(ExpencesOptions)}
              required
            />
          </CCol>
        </CRow>
        <hr style={{ borderTop: '2px solid #000' }} />
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Peyment Method
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={[
                { label: 'Cash', value: 'Cash' },
                { label: 'Card', value: 'Card' },
                { label: 'Pastors Bank Account', value: 'Pastors Bank Account' },
                { label: 'Church Bank Account', value: 'Church Bank Account' },
              ]}
              onChange={setPaymentMethod}
            ></Select>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Payment (RS.)
            </CFormLabel>
            <CFormInput type="number" id="exampleFormControlInput1" placeholder="10000" value={payment} onChange={(event) => setPayment(event.target.value)} />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol md={6}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Note
            </CFormLabel>
            <CFormInput type="text" id="exampleFormControlInput1" placeholder="Note" value={note} onChange={(event) => setNote(event.target.value)} />
          </CCol>
        </CRow>


        {/* <CAlert color="warning" className="d-flex align-items-center mt-3">
          <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>{alertMessage}</div>
        </CAlert> */}
        <CRow
          className="mt-4"
          style={{ position: 'sticky', bottom: '1rem', alignSelf: 'flex-end' }}
        >
          <CCol md={2}>
            <CButton
              disabled={loading}
              color="primary"
              style={{ width: '100%' }}
              onClick={() => addInvoice()}
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

export default HomeWidget;
