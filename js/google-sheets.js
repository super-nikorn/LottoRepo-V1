const scriptURL = 'https://script.google.com/macros/s/AKfycbwTS5eOS2SrjGF56jRg3RB_CIylJqhXkPITFXSMYrzWHQkD0aOdlxl73F6gDWReH_peWg/exec';

async function saveData(sheetName, data) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // เพิ่มบรรทัดนี้
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheet: sheetName,
        data: data
      })
    });
    
    // เนื่องจากใช้ no-cors เราจะไม่สามารถอ่าน response ได้
    // ให้ถือว่าสำเร็จถ้าไม่เกิด error
    return { success: true };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false };
  }
}