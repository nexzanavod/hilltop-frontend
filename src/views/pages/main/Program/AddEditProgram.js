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
import { AddPrograms } from './action';

const INITIAL_VALUE = ''

function AddIncomeSeeders() {

  // UseState programme Details

  const [dob, setDob] = useState(INITIAL_VALUE);
  const [programName, setProgramName] = useState([]);
  const [programDay, setProgramDay] = useState([])
  const [mCount, setMCount] = useState(0)
  const [wCount, setWCount] = useState(0)
  const [cCount, setCCount] = useState(0)

  

  const [allData, setAllData] = useState(INITIAL_VALUE)



  const [alertMessage, setAlertMessage] = useState('Please Fill All Required Fields')
  const [successMsg, setSuccessMsg] = useState(false)
  const [loading, setLoading] = useState(false)



 






  const addVoter = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccessMsg(true)
    }, 1000)
  }

  const addPrograms = async () => {
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(dob.getDate()).padStart(2, '0');
    const formattedDob = `${year}-${month}-${day}`;
  
    const data = {
      Date: formattedDob,
      Programme: programName,
      ProgramDay: programDay.value,
      MenCount: mCount,
      WomenCount: wCount,
      ChildrenCount: cCount,
    };
  
    console.log(data);
  
    try {
      await AddPrograms(data); // Wait for the insertTithes function to complete
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
        <h5>Program</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <h6>Add New Program</h6>
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
              Programme Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Ex: Monday Program"
              value={programName} 
              onChange={(programName) => setProgramName(programName.target.value)}
            />

          </CCol>
          <CRow>
          <CCol md={4}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Program Day
            </CFormLabel>
            <Select
              type="text"
              id="exampleFormControlInput1"
              size="sm"
              options={[
                { label: 'Sunday', value: 'Sunday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Friday', value: 'Friday' },
                { label: 'Saturday', value: 'Saturday' },
                { label: 'Special Service', value: 'Special Service' }
              ]}
              onChange={setProgramDay}
            ></Select>
          </CCol>
          </CRow>
        </CRow>
        <hr style={{ borderTop: '2px solid #000' }} />
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Men Count
            </CFormLabel>
            <CFormInput type="number" id="exampleFormControlInput1" placeholder="100" value={mCount}  onChange={(event) => setMCount(event.target.value)} />    
          </CCol>
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
            Women Count
            </CFormLabel>
            <CFormInput type="number" id="exampleFormControlInput1" placeholder="100" value={wCount}  onChange={(event) => setWCount(event.target.value)} />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol md={6}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
            Children Count
            </CFormLabel>
            <CFormInput type="number" id="exampleFormControlInput1" placeholder="100" value={cCount} onChange={(event) => setCCount(event.target.value)} />
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
              onClick={() => addPrograms()}
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

export default AddIncomeSeeders