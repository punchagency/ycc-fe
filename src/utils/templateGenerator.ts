import * as XLSX from 'xlsx';

const sampleData = [
    { name: 'Web Development', description: 'Custom website development', price: '500', categoryName: 'Technology', isQuotable: 'false' },
    { name: 'Graphic Design', description: 'Logo and branding design', price: '200', categoryName: 'Design', isQuotable: 'true' }
];

export const downloadCSVTemplate = () => {
    const headers = ['name', 'description', 'price', 'categoryName', 'isQuotable'];
    const csvContent = [
        headers.join(','),
        ...sampleData.map(row => headers.map(h => row[h as keyof typeof row]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services_template.csv';
    a.click();
    URL.revokeObjectURL(url);
};

export const downloadXLSXTemplate = () => {
    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Services');
    XLSX.writeFile(wb, 'services_template.xlsx');
};
