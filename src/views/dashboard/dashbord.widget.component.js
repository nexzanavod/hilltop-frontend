import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from './service/dashbord.service';
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CWidgetStatsB
} from '@coreui/react';
import { addCommas } from "number-add-commas";
import { fetchPayments,fetchProgram } from './service/dashbord.service'; 

function DashbordWidgetComponent() {
    const [totalPayment, setTotalPayment] = useState(0);
    const [programData, setProgramData] = useState(0);


    useEffect(() => {
        fetchPayments()
            .then(paymentsData => {
                const payments = paymentsData.reduce((total, reportItem) => {
                    return total + reportItem.attributes.Payment;
                }, 0);

                const money = addCommas(payments, "INT");
                setTotalPayment(money);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
            fetchProgram()
            .then(programData => {
                setProgramData(programData.length);
            })
            .catch(error => {
                console.error("Error fetching program data:", error);
            });
    }, []); 

    return (
        <div>
            <CRow>
            <CCol xs="12" sm="6">
                    <CWidgetStatsB
                        className="mb-3"
                        color="info"
                        inverse
                        text="Total Payment"
                        title="Total Payment"
                        value={`${totalPayment}`}
                    />
                </CCol>
                <CCol xs="12" sm="6">
                    <CWidgetStatsB
                        className="mb-3"
                        color="success"
                        inverse
                        text="Total Programs"
                        title="Total Programs"
                        value={`${programData}`}
                    />
                </CCol>
            </CRow>
        </div>
    );
}

export default DashbordWidgetComponent;
