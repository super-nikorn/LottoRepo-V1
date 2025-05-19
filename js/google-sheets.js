// ตั้งค่า Google Sheets API
const scriptURL = 'https://script.google.com/macros/s/AKfycbwTS5eOS2SrjGF56jRg3RB_CIylJqhXkPITFXSMYrzWHQkD0aOdlxl73F6gDWReH_peWg/exec';

// ฟังก์ชันสำหรับดึงข้อมูลจาก Google Sheets
async function fetchData(sheetName) {
    try {
        const response = await fetch(`${scriptURL}?sheet=${sheetName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// ฟังก์ชันสำหรับบันทึกข้อมูลไปยัง Google Sheets
async function saveData(sheetName, data) {
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sheet: sheetName,
                data: data
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving data:', error);
        return { success: false };
    }
}

// ฟังก์ชันสำหรับตรวจสอบการ Login
async function checkLogin(username, password) {
    const users = await fetchData('dataLogin');
    return users.some(u => u.User === username && u.Password === password);
}