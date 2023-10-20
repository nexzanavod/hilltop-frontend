import React, { useEffect, useState } from 'react';
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
import { cilTrash } from '@coreui/icons';
import { fetchPrograms, deleteProgram } from './action';

function OrganizersPage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('Date');
  const [sortOrder, setSortOrder] = useState('DESC');

  const loadPrograms = async (page, size, field, order) => {
    try {
      const response = await fetchPrograms(page, size, field, order);
      setPrograms(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadPrograms(currentPage, pageSize, sortField, sortOrder);
  }, [currentPage, pageSize, sortField, sortOrder]);

  const handleDelete = async (programId) => {
    const confirmed = window.confirm('Are you sure you want to delete this program?');

    if (confirmed) {
      const deleteSuccess = await deleteProgram(programId);
      if (deleteSuccess) {
        setPrograms(programs.filter((program) => program.id !== programId));
      } else {
        // Handle errors or show an error message to the user
      }
    }
  };

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>Programs Management</h5>
          <CButton onClick={() => navigate('/program/add/1')}>ADD NEW</CButton>
        </CCardHeader>
        <CCardBody>
          <div className="table-responsive">
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
                        icon={cilTrash}
                        size="xl"
                        className="text-danger"
                        style={{ cursor: 'pointer', padding: '2px', paddingInline: '3px' }}
                        onClick={() => handleDelete(program.id)} // Handle delete on button click
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
          {/* Pagination */}
          <CPagination className="mt-2" aria-label="Page navigation example">
            <CPaginationItem
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </CPaginationItem>
            <CPaginationItem onClick={() => setCurrentPage(1)}>1</CPaginationItem>
            <CPaginationItem onClick={() => setCurrentPage(2)}>2</CPaginationItem>
            <CPaginationItem onClick={() => setCurrentPage(3)}>3</CPaginationItem>
            <CPaginationItem
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default OrganizersPage;
