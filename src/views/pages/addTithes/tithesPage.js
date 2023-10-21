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
  CFormInput,
  CCol,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWindowRestore } from '@coreui/icons';
import { fetchTithes } from './action';

function TithesPage() {
  const navigate = useNavigate();
  const [tithes, setTithes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState(''); // Initial search query is empty
  const [searchClicked, setSearchClicked] = useState(false);

  const loadTithes = async (page, size) => {
    try {
      const data = await fetchTithes(page, size, searchQuery);
      setTithes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searchClicked || searchQuery === '') {
      loadTithes(currentPage, pageSize);
      setSearchClicked(false); // Reset the flag
    }
  }, [currentPage, pageSize, searchQuery, searchClicked]);

  const handlePageChange = (newPage) => {
    if (newPage === 'Previous' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (newPage === 'Next') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setSearchClicked(true);
  };

  useEffect(() => {
    // Load all data initially
    loadTithes(currentPage, pageSize);
  }, []); // Empty dependency array to run only once when the component is first mounted

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Tithes Details</h5>

        </CCardHeader>
        <CRow className="mb-4 p-3">
          <CCol md={6} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '10px' }}>
                <CFormInput
                  type="text"
                  placeholder="Search by Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

              </div>

              <CButton
                className="ml-2" // Add some left margin for spacing
                onClick={handleSearch}
                style={{ backgroundColor: "green", border: 'none' }}
              >
                Search
              </CButton>
            </div>
          </CCol>
          <CCol md={6} sm={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CButton onClick={() => navigate('/tithes/add/1')}>ADD NEW</CButton>
          </CCol>
        </CRow>


        <hr style={{ borderTop: '2px solid #000' }} />

        <CCardBody>
          <div className="table-responsive">
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
          <CPagination className="mt-2" aria-label="Page navigation example">
            <CPaginationItem onClick={() => handlePageChange('Previous')}>Previous</CPaginationItem>
            <CPaginationItem onClick={() => handlePageChange(1)}>1</CPaginationItem>
            <CPaginationItem onClick={() => handlePageChange(2)}>2</CPaginationItem>
            <CPaginationItem onClick={() => handlePageChange(3)}>3</CPaginationItem>
            <CPaginationItem onClick={() => handlePageChange('Next')}>Next</CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default TithesPage;
