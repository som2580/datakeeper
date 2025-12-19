const scriptURL = 'https://script.google.com/macros/s/AKfycbwEVp9SxlKStWdQ8S9Zyu1UiKyyOlOPyJ-vk-rwh4AuNMy6WnpbWzo6OazrZemWyP2Jmw/exec';


function showAlert(message, type) {
const alertBox = document.getElementById('alert');
alertBox.innerText = message;
alertBox.className = 'alert ' + type;
alertBox.style.display = 'block';


setTimeout(() => {
alertBox.style.display = 'none';
}, 3000);
}


function saveData() {
const data = {
date: document.getElementById('date').value,
detail: document.getElementById('detail').value,
type: document.getElementById('type').value,
amount: document.getElementById('amount').value
};


if (!data.date || !data.amount) {
showAlert('กรุณากรอกวันที่และจำนวนเงิน', 'error');
return;
}


fetch(scriptURL, {
method: 'POST',
body: JSON.stringify(data)
})
.then(res => res.json())
.then(result => {
if (result.status === 'success') {
showAlert('บันทึกข้อมูลสำเร็จ ✅', 'success');
document.getElementById('amount').value = '';
document.getElementById('detail').value = '';
} else {
showAlert(result.message || 'เกิดข้อผิดพลาด', 'error');
}
})
.catch(() => {
showAlert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์', 'error');
});
}