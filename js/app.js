// ตรวจสอบการ Login
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const isValid = await checkLogin(username, password);
    
    if (isValid) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'home.html';
    } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
});

// ตรวจสอบสถานะการ Login เมื่อโหลดหน้า
window.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('home.html')) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'index.html';
        } else {
            loadTicketData();
        }
    }
});

// โหลดข้อมูลโพยหวย
async function loadTicketData(startDate = null, endDate = null) {
    const tickets = await fetchData('dataTickets');
    
    // กรองข้อมูลตามวันที่ (ถ้ามี)
    let filteredTickets = tickets;
    if (startDate && endDate) {
        filteredTickets = tickets.filter(ticket => {
            const ticketDate = new Date(ticket.date);
            return ticketDate >= new Date(startDate) && ticketDate <= new Date(endDate);
        });
    }
    
    // แสดงข้อมูลในตาราง
    const tableBody = document.querySelector('#ticketTable tbody');
    tableBody.innerHTML = '';
    
    filteredTickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket.date}</td>
            <td>${ticket.customerName}</td>
            <td>${ticket.lotteryNumber}</td>
            <td>${ticket.betType}</td>
            <td>${parseInt(ticket.amount).toLocaleString()} บาท</td>
        `;
        tableBody.appendChild(row);
    });
    
    // คำนวณสรุปข้อมูล
    calculateSummary(filteredTickets);
}

// คำนวณสรุปข้อมูล
function calculateSummary(tickets) {
    // ยอดซื้อทั้งหมด
    const totalAmount = tickets.reduce((sum, ticket) => sum + parseInt(ticket.amount), 0);
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString() + ' บาท';
    
    // จำนวนโพยทั้งหมด
    document.getElementById('totalTickets').textContent = tickets.length + ' ใบ';
    
    // ตัวเลขยอดนิยม
    if (tickets.length > 0) {
        const numberCounts = {};
        tickets.forEach(ticket => {
            numberCounts[ticket.lotteryNumber] = (numberCounts[ticket.lotteryNumber] || 0) + 1;
        });
        
        const popularNumber = Object.keys(numberCounts).reduce((a, b) => 
            numberCounts[a] > numberCounts[b] ? a : b
        );
        
        document.getElementById('popularNumber').textContent = popularNumber;
    }
}

// ฟิลเตอร์ตามวันที่
document.getElementById('filterBtn')?.addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        loadTicketData(startDate, endDate);
    } else {
        alert('กรุณาเลือกวันที่เริ่มต้นและสิ้นสุด');
    }
});

// แสดงข้อมูลวันนี้
document.getElementById('todayBtn')?.addEventListener('click', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
    document.getElementById('endDate').value = today;
    loadTicketData(today, today);
});

// บันทึกโพยหวยใหม่
document.getElementById('ticketForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const ticketData = {
        date: new Date().toISOString().split('T')[0],
        customerName: document.getElementById('customerName').value,
        lotteryNumber: document.getElementById('lotteryNumber').value,
        lotteryType: document.getElementById('lotteryType').value,
        betType: document.getElementById('betType').value,
        amount: document.getElementById('amount').value
    };
    
    const result = await saveData('dataTickets', ticketData);
    
    if (result.success) {
        alert('บันทึกโพยหวยเรียบร้อยแล้ว');
        document.getElementById('ticketForm').reset();
    } else {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
});