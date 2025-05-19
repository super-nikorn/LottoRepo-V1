// ในไฟล์ google-sheets.js
const scriptURL = 'https://script.google.com/macros/s/AKfycbwTS5eOS2SrjGF56jRg3RB_CIylJqhXkPITFXSMYrzWHQkD0aOdlxl73F6gDWReH_peWg/exec';

async function saveData(sheetName, data) {
  try {
    // ใช้เทคนิค JSONP แทน fetch
    return new Promise((resolve) => {
      const callbackName = `jsonp_${Date.now()}`;
      window[callbackName] = (response) => {
        resolve(response);
        delete window[callbackName];
      };
      
      const script = document.createElement('script');
      script.src = `${scriptURL}?sheet=${encodeURIComponent(sheetName)}&data=${encodeURIComponent(JSON.stringify(data))}&callback=${callbackName}`;
      document.body.appendChild(script);
    });
  } catch (error) {
    console.error('Error:', error);
    return { success: false };
  }
}