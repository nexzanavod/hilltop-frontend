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
import { fetchTithes } from './action';

function TithesPage() {
  const navigate = useNavigate();
  const [tithes, setTithes] = useState([]);

  useEffect(() => {
    fetchTithes()
      .then((data) => {
        setTithes(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Tithes Details</h5>
          <CButton onClick={() => navigate('/tithes/add/1')}>ADD NEW</CButton>
        </CCardHeader>
        <CCardBody>
          <div className="table-responsive"> {/* Wrap the table in a responsive div */}
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Tithes ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name with Initial</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nearest Town</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tithes.map((tithes) => (
                  <CTableRow key={tithes.id}>
                    <CTableDataCell>{tithes.attributes.Tithes_Id}</CTableDataCell>
                    <CTableDataCell>{tithes.attributes.Name}</CTableDataCell>
                    <CTableDataCell>{tithes.attributes.Name_With_Initials}</CTableDataCell>
                    <CTableDataCell>{tithes.attributes.Mobile}</CTableDataCell>
                    <CTableDataCell>{tithes.attributes.Nearest_Town}</CTableDataCell>
                    <CTableDataCell>{tithes.attributes.Address}</CTableDataCell>
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

export default TithesPage;
