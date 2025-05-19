const scriptURL = 'https://script.google.com/macros/s/AKfycbyRv-ihZdsstyvkiUIkeUp5ABw-_8yJkibyks6rQtVVvRPDgGKq3vO0Mkho7kBMS3lRbA/exec';

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