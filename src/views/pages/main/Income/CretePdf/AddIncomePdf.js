import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useLocation } from 'react-router-dom';
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
  CImage
} from '@coreui/react';
import Wallpaper from '../../../../../assets/images/react.jpg'

function AddIncomePdf() {
  const { state } = useLocation();

  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current} // Use componentRef.current instead of this.componentRef
      />
      <div ref={componentRef}>
        <CCard className="mb-4">
          <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h5>TITHES</h5>
          </CCardHeader>
          <CImage align="center" rounded src={Wallpaper} width={200} height={200} />
        </CCard>
      </div>
    </div>
  );
}

export default AddIncomePdf;
