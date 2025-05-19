const scriptURL = 'https://script.google.com/macros/s/AKfycbxFw1a2PQ3MKV24Zwvfv2glGL8neVtvmdGZBJjMTeG6J9gxW9An2yyUQ3B3I7AXamOa2w/exec';

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