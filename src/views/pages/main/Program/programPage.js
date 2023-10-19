import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWindowRestore } from '@coreui/icons';
import { fetchPrograms } from './action';

function OrganizersPage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms()
      .then((data) => {
        setPrograms(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Programs Management</h5>
          <CButton onClick={() => navigate('/program/add/1')}>ADD NEW</CButton>
        </CCardHeader>
        <CCardBody>
          <div className="table-responsive"> {/* Wrap the table in a responsive div */}
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Program Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Day</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Men Count</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Women Count</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Children Count</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {programs.map((program) => (
                  <CTableRow key={program.id}>
                    <CTableDataCell>{program.id}</CTableDataCell>
                    <CTableDataCell>{program.attributes.Name}</CTableDataCell>
                    <CTableDataCell width={150}> {program.attributes.Date}</CTableDataCell>
                    <CTableDataCell width={150}>{program.attributes.Day} </CTableDataCell>
                    <CTableDataCell width={150}> {program.attributes.Men_Count}</CTableDataCell>
                    <CTableDataCell width={150}> {program.attributes.Women_Count}</CTableDataCell>
                    <CTableDataCell width={150}> {program.attributes.Children_Count}</CTableDataCell>
                    <CTableDataCell>
                      <CIcon
                        icon={cilWindowRestore}
                        size="xl"
                        className="text-info"
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '3px' }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
          {/* Pagination */}
          <CPagination className="mt-2" aria-label="Page navigation example">
            <CPaginationItem>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default OrganizersPage;
