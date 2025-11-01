const form = document.getElementById('contactForm');
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    responseMsg.textContent = result.message;
    responseMsg.style.color = 'green';
    form.reset();
  } catch(err) {
    responseMsg.textContent = 'حدث خطأ، حاول مرة أخرى.';
    responseMsg.style.color = 'red';
  }
});