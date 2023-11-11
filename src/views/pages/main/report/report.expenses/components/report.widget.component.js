import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsF,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilMoney, cilNoteAdd } from '@coreui/icons'

function ReportWidgetComponent(data) {
  console.log("payment", data.totalPayment)

  const totalPayment = data.totalPayment
  const dataItemCount = data.dataItemCount
  return (
    <CRow>
      <CCol xs={12} sm={6} lg={6}>
        <CWidgetStatsF
          className="mb-3"
          color="success"
          icon={<CIcon icon={cilMoney} height={40} />}
          padding={false}
          title="Total Payment"
          value={totalPayment} />
      </CCol>
      <CCol xs={12} sm={6} lg={6}>
        <CWidgetStatsF
          className="mb-3"
          color="warning"
          icon={<CIcon icon={cilNoteAdd} height={40} />}
          padding={false}
          title="No Of Data"
          value={dataItemCount} />
      </CCol>
    </CRow>
  )
}

export default ReportWidgetComponent;
