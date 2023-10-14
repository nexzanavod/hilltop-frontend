import React from 'react';
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
  CButton
} from '@coreui/react';
import ReportWidget from "./report.widget.component";
import { CSVLink } from 'react-csv';

function ReportTable({ reportData }) {
  const totalPayment = reportData.data.reduce((total, reportItem) => {
    return total + reportItem.attributes.Payment;
  }, 0);

  const showAddUnknownColumn = reportData.data.some((item) => item.attributes.Add_Unknown);

  const dataItemCount = reportData.data.length;

  function prepareCSVData(reportData) {
    // Initialize the CSV data with a header row
    const csvData = [
      [
        'Program Date',
        'Payment Category',
        'Program Name',
        'Tithes Number',
        'Tithes Name',
        'Payment Method',
        'Payment',
      ],
    ];

    // Add the data rows
    reportData.data.forEach((reportItem) => {
      const rowData = [
        reportItem.attributes.Programe_Date,
        reportItem.attributes.Payment_Category,
        reportItem.attributes.Program_Name,
        reportItem.attributes.Tithes_Number,
        reportItem.attributes.Tithes_Name,
        reportItem.attributes.Peyment_Method,
        reportItem.attributes.Payment,
      ];
      csvData.push(rowData);
    });

    return csvData;
  }

  return (
    <div>
      <ReportWidget
        totalPayment={totalPayment}
        dataItemCount={dataItemCount}
      />
      <CCard>
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Report Data</h5>
          <CSVLink
            data={prepareCSVData(reportData)}
            filename="report.csv"
            className="btn btn-primary"
            target="_blank"
          >
            Download CSV
          </CSVLink>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Program Date</CTableHeaderCell>
                <CTableHeaderCell>Payment Category</CTableHeaderCell>
                <CTableHeaderCell>Program Name</CTableHeaderCell>
                <CTableHeaderCell>Tithes Number</CTableHeaderCell>
                <CTableHeaderCell>Tithes Name</CTableHeaderCell>
                <CTableHeaderCell>Payment Method</CTableHeaderCell>
                <CTableHeaderCell>Payment</CTableHeaderCell>
                {showAddUnknownColumn && <CTableHeaderCell>Add Unknown</CTableHeaderCell>}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {reportData.data.map((reportItem) => (
                <CTableRow key={reportItem.id}>
                  <CTableDataCell>{reportItem.attributes.Programe_Date}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Payment_Category}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Program_Name}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Tithes_Number}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Tithes_Name}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Peyment_Method}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Payment}</CTableDataCell>
                  {showAddUnknownColumn && (
                    <CTableDataCell>
                      {reportItem.attributes.Add_Unknown ? "Yes" : "No"}
                    </CTableDataCell>
                  )}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default ReportTable;
