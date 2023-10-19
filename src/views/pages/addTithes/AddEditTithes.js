import { cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
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
} from '@coreui/react';
import React, { useState } from 'react';
import { addTithes } from './action';

const INITIAL_VALUE = '';

function AddEditTithes() {
  const [tithesId, setTithesId] = useState('');
  const [fullName, setFullName] = useState('');
  const [NamewithInitials, setNamewithInitials] = useState('');
  const [Mobile, setMobile] = useState(INITIAL_VALUE);
  const [NearestTown, setNearestTown] = useState(INITIAL_VALUE);
  const [Address, setAddress] = useState(INITIAL_VALUE);
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const resetValues = () => {
    setTithesId('');
    setFullName('');
    setNamewithInitials('');
    setMobile(INITIAL_VALUE);
    setNearestTown(INITIAL_VALUE);
    setAddress(INITIAL_VALUE);
  };

  const handleSubmit = async () => {
    const data = {
      TithesId: tithesId,
      FullName: fullName,
      NamewithInitials: NamewithInitials,
      Mobile: Mobile,
      NearestTown: NearestTown,
      Address: Address,
    };

    try {
      setLoading(true);
      const response = await addTithes(data);

      if (response.success) {
        setSuccessMsg('Success: Data added successfully.');
        resetValues();
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

  return (
    <CCard className="mb-4">
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>Tithes</h5>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <h6>Add New Tithes</h6>
        </CRow>

        <hr style={{ borderTop: '2px solid #000' }} />
        <CRow className="mb-4">
          <CCol md={3}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Tithes ID
            </CFormLabel>
            <CFormInput
              type="number"
              id="exampleFormControlInput1"
              placeholder="Ex: 012"
              value={tithesId}
              onChange={(event) => setTithesId(event.target.value)}
            />
          </CCol>

          <CCol md={8}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Full Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Tony Stark"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </CCol>
          <CRow>
            <CCol md={4}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">
                Name with Initials
              </CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                placeholder="T Stark"
                value={NamewithInitials}
                onChange={(event) => setNamewithInitials(event.target.value)}
              />
            </CCol>
          </CRow>
        </CRow>
        <hr style={{ borderTop: '2px solid #000' }} />
        <CRow className="mb-2">
          <CCol>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Mobile Number
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="076#######"
              value={Mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel className="col-form-label">
              Nearest Town
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="Nugegoda"
              value={NearestTown}
              onChange={(event) => setNearestTown(event.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol md={8}>
            <CFormLabel htmlFor="staticEmail" className="col-form-label">
              Address
            </CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="33,####"
              value={Address}
              onChange={(event) => setAddress(event.target.value)}
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
              onClick={handleSubmit}
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
  );
}

export default AddEditTithes;
