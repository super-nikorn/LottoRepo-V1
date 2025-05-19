const scriptURL = 'https://script.google.com/macros/s/AKfycbxFw1a2PQ3MKV24Zwvfv2glGL8neVtvmdGZBJjMTeG6J9gxW9An2yyUQ3B3I7AXamOa2w/exec';

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
    return { success: false, error: error.message };
  }
}