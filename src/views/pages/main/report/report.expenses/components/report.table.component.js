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
        'Expenses Date',
        'Expenses Category',
        'Payment Method',
        'Branch',
        'Payment',
      ],
    ];

    // Add the data rows
    reportData.data.forEach((reportItem) => {
      const rowData = [
        reportItem.attributes.Date,
        reportItem.attributes.ExpensesCategory,
        reportItem.attributes.PaymentMethod,
        reportItem.attributes.Branch,
        reportItem.attributes.Payment,
        reportItem.attributes.Note,

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
                <CTableHeaderCell>Expenses Date</CTableHeaderCell>
                <CTableHeaderCell>Expenses Category</CTableHeaderCell>
                <CTableHeaderCell>Payment Method</CTableHeaderCell>
                <CTableHeaderCell>Branch</CTableHeaderCell>
                <CTableHeaderCell>Payment</CTableHeaderCell>
                <CTableHeaderCell>Note</CTableHeaderCell>
                {showAddUnknownColumn && <CTableHeaderCell>Add Unknown</CTableHeaderCell>}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {reportData.data.map((reportItem) => (
                <CTableRow key={reportItem.id}>
                  <CTableDataCell>{reportItem.attributes.Date}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.ExpensesCategory}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.PaymentMethod}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Branch}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Payment}</CTableDataCell>
                  <CTableDataCell>{reportItem.attributes.Note}</CTableDataCell>

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
