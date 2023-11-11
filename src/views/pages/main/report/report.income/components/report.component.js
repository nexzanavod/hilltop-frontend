import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
} from '@coreui/react';
import ReportTable from './report.table.component';
import DateRangePicker from "rsuite/DateRangePicker";
import { addDays } from 'date-fns';
import { predefinedRanges } from "../../datePickerOptions";
import moment from "moment";
import Select from 'react-select'
import { generateReports } from '../service/report.all.service';
import LoadingImage from '../../../../../../common/lodingImage'; // Import the LoadingImage component

function Report() {
  const today = new Date();
  const initialDateRange = [today, today];

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [programCategory, setProgramCategory] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = () => {
    if (!dateRange) {
      console.error('Date Range is null. Cannot generate the report.');
      return;
    }

    setLoading(true); // Set loading to true when generating the report.

    const startDate = moment(dateRange[0]).format("YYYY-MM-DD");
    const endDate = moment(dateRange[1]).format("YYYY-MM-DD");

    const data = {
      "startDate": startDate,
      "endDate": endDate,
      "programCategory": programCategory?.value
    };
    generateReports(data)
      .then((data) => {
        setReportData(data);
        setLoading(false); // Set loading back to false after the report is generated.
        setShowReport(true);
      })
      .catch((error) => {
        console.error('Error generating report:', error);
        setLoading(false); // Make sure to set loading to false even on error.
      });
  };

  return (
    <div>
      <CCard className="mb-4">
        <CCardBody>
          <CFormLabel>Date Range</CFormLabel>
          <DateRangePicker
            className="w-100"
            placeholder="Select Date Range"
            value={dateRange}
            onChange={(date) => setDateRange(date)}
            ranges={predefinedRanges}
          />
          <CFormLabel className="mt-2">Program Category</CFormLabel>
          <Select
            type="text"
            id="exampleFormControlInput1"
            size="sm"
            options={[
              { label: 'All', value: 'All' },
              { label: 'Tithes', value: 'Tithes' },
              { label: 'Offering', value: 'Offering' },
              { label: 'Seed', value: 'Seed' },
            ]}
            onChange={setProgramCategory}
          ></Select>
          <CButton className='mt-4' onClick={generateReport}>Get Report</CButton>
          {loading && <LoadingImage />} {/* Display loading image when loading is true. */}
        </CCardBody>
      </CCard>

      {showReport && <ReportTable reportData={reportData} />}
    </div>
  );
}

export default Report;
