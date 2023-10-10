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
import { MODAL_MSGES } from 'src/common/const'
import SuccessModal from 'src/components/Modals/SuccessModal'
import { fetchPrograms, Tithes, searchTithes,insertTithes } from './action';

const INITIAL_VALUE = ''

function AddIncomeTithes() {

  // UseState programme Details

  const [dob, setDob] = useState(INITIAL_VALUE);
  const [programOptions, setProgramOptions] = useState([]);
  const [programName, setProgramName] = useState([]);


  // UseState Contact Information
  const [tithesOptions, setTithesOptions] = useState([]);
  const [tithesNumber, setTithesNumber] = useState([]);
  const [personName, setPersonName] = useState(INITIAL_VALUE)
  const [personMobile, setPersonMobile] = useState(INITIAL_VALUE)

  //UseState Payment Information
  const [paymentMethod, setPaymentMethod] = useState([])
  const [payment, setPayment] = useState(INITIAL_VALUE)
  const [note, setNote] = useState(INITIAL_VALUE)

  const [allData, setAllData] = useState(INITIAL_VALUE)



  const [alertMessage, setAlertMessage] = useState('Please Fill All Required Fields')
  const [successMsg, setSuccessMsg] = useState(false)
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    Tithes()
      .then(data => {
        // Handle the response data here
        if (data.length !== 0) {
          // Data is an array, so we can map it
          console.log("Data", data)
          const tithesOptions = data.map(item => ({
            label: item.attributes.Tithes_Id,
            value: item.attributes.Tithes_Id,
          }));

          // Update the programOptions state
          setTithesOptions(tithesOptions);


        } else {
          console.error("API Response is not an array:", data);
        }

        console.log("API Response:", data);
      })
      .catch(error => {
        // Handle errors here
        console.error("API Error:", error);
      });


  }, [Tithes]);


  const searchTithesName = () => {
    searchTithes(tithesNumber.value)
      .then(data => {
        // Handle the response data here
        if (data.length !== 0) {
          // Data is an array, so we can map it
          console.log("Data", data)

          let personName = data[0].attributes.Name;
          let personMobile = data[0].attributes.mobile || "No Contact Number";

          console.log("P", personName)

          setPersonName(personName);
          setPersonMobile(personMobile)


        } else {
          console.error("API Response is not an array:", data);
        }

        console.log("API Response:", data);
      })
      .catch(error => {
        // Handle errors here
        console.error("API Error:", error);
      });
  }


  const searchProgram = () => {
    if (dob instanceof Date) {
      const year = dob.getFullYear();
      const month = String(dob.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(dob.getDate()).padStart(2, '0');
      const formattedDob = `${year}-${month}-${day}`;

      // Make the API call using the fetchPrograms function from api.js
      fetchPrograms(formattedDob)
        .then(data => {
          // Handle the response data here
          if (Array.isArray(data) && data.length !== 0) {
            // Data is an array, so we can map it
            console.log("Data", data);
            const programOptions = data.map(item => ({
              label: item.attributes.Name,
              value: item.attributes.Name
            }));

            // Update the programOptions state
            setProgramOptions(programOptions);
          } else {
            console.error("API Response is not a valid array:", data);
          }

          console.log("API Response:", data);
        })
        .catch(error => {
          // Handle errors here
          console.error("API Error:", error);
        });
    } else {
      console.error("Invalid date format");
    }
  };






  const addVoter = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccessMsg(true)
    }, 1000)
  }

  const addInvoice = async () => {
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(dob.getDate()).padStart(2, '0');
    const formattedDob = `${year}-${month}-${day}`;
  
    const data = {
      Date: formattedDob,
      PaymentCategory: 'Tithes',
      Programme: programName.value,
      TithesNumber: tithesNumber.value,
      PersonName: personName,
      PersonMobile: personMobile,
      PaymentMethod: paymentMethod.value,
      Payment: payment,
      Note: note,
    };
  
    console.log(data);
  
    try {
      await insertTithes(data); // Wait for the insertTithes function to complete
      setAllData(data)
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg(true);
      }, 1000);
    } catch (error) {
      console.error('Error adding invoice:', error);
      // Handle error if the insertTithes function fails
    }
  };
  

  function resetValues() {

  }

  return (
    <CCard className="mb-4">
      <SuccessModal
        open={successMsg}
        onOpen={(value) => setSuccessMsg(value)}
        title={'Successful Operation'}
        description={MODAL_MSGES.Tithes.ADD_SUCCESS_MSG}
        rediretUrl={'/income/Pdf'}
        addAnother={() => resetValues()}
        data={allData}
      />
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>TITHES</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <h6>Add New Tithes</h6>
        </CRow>

        {/* programme Information */}

        <span style={{ color: 'grey', fontWeight: 'bold' }}>Programme Details</span>
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
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Check Programme
            </CFormLabel>
            <CButton
              disabled={loading}
              color="primary"
              style={{ width: '80%', height: "43%" }}
              onClick={searchProgram}
            >
              Submit
            </CButton>
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Programme Name
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={programOptions}
              onChange={(programOptions) => setProgramName(programOptions)}
            />

          </CCol>
        </CRow>

        {/* Tithes Person Information */}
        <span style={{ color: 'grey', fontWeight: 'bold' }}>Tithes Information</span>
        <hr style={{ borderTop: '2px solid #000' }} />
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Tithes Number
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={tithesOptions}
              onChange={(tithesOptions) => setTithesNumber(tithesOptions)}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Check Tithes Name
            </CFormLabel>
            <CButton
              disabled={loading}
              color="primary"
              style={{ width: '80%', height: "50%" }}
              onClick={searchTithesName}
            >
              Submit
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol md={7}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Person Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: Lakshan"
              value={personName}
              disabled
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Person Number
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: 07........"
              value={personMobile}
              disabled

            />
          </CCol>
        </CRow>

        {/* Tithes Payment Information */}

        <span style={{ color: 'grey', fontWeight: 'bold' }}>Payment Details</span>
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
            <CFormInput type="number" id="exampleFormControlInput1" placeholder="10000" value={payment}  onChange={(event) => setPayment(event.target.value)} />
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
      </CCardBody>
    </CCard>
  )
}

export default AddIncomeTithes