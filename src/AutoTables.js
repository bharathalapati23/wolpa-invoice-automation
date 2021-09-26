const AutoTableTenantInvoice = ({ doc, chargesList, tenantInfoArr, totalFees }) => {
    doc.autoTable({ html: '#my-table', })
    doc.autoTable({
        theme: 'grid',
        tableWidth: 155,
        styles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.3, fontSize: 12 },
        columnStyles: { 0: { cellWidth: 8 }, 1: { cellWidth: 100 }, 2: { cellWidth: 35 }, },
        body: chargesList,
        startY: 83 + (tenantInfoArr.length * 30) + 10,
        margin: 30,
        footStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], cellWidth: 'auto' },
        foot: [[' ', 'Total', 'INR ' + totalFees]],
    })
}

const AutoTableTenantInfoOwnerInvoice = ({ doc, table1List }) => {
    doc.autoTable({ html: '#my-table', })
    doc.autoTable({
        theme: 'grid',
        tableWidth: 100,
        styles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.3, },
        body: table1List,
        startY: 77,
        margin: 30,
    })
}

const AutoTableQuotationOwnerInvoice = ({ doc, charges, yCoord }) => {
    doc.autoTable({ html: '#my-table2', })
    doc.autoTable({
        theme: 'grid',
        styles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.3, },
        columnStyles: { 2: { cellWidth: 27 }, },
        body: charges,
        startY: yCoord + 164,
        margin: 30,
    })
}

const AutoTableDraftTermsInvoice = ({ doc, itemsTableList }) => {
    doc.autoTable({ html: '#my-table5', })
    doc.autoTable({
        theme: 'plain',
        head: [['S.NO', 'Items', 'oty']],
        styles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.3, },
        body: itemsTableList,
        startY: 80,
        margin: 30,
    })
}

const exportedObject = {
    AutoTableTenantInvoice,
    AutoTableTenantInfoOwnerInvoice,
    AutoTableQuotationOwnerInvoice,
    AutoTableDraftTermsInvoice
}
export default exportedObject