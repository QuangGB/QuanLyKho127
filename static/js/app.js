// Autocomplete đơn giản gọi API /api/product-names?q=...
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.product-autocomplete');
  inputs.forEach(input => {
    let datalist = document.createElement('datalist');
    const listId = 'dl-' + Math.random().toString(36).slice(2);
    datalist.id = listId;
    document.body.appendChild(datalist);
    input.setAttribute('list', listId);

    let lastQuery = '';
    input.addEventListener('input', async () => {
      const q = input.value.trim();
      if (q === lastQuery) return;
      lastQuery = q;
      try {
        const url = '/api/product-names?q=' + encodeURIComponent(q);
        const res = await fetch(url);
        const names = await res.json();
        datalist.innerHTML = names.map(n => `<option value="${n}">`).join('');
      } catch (e) {
        // ignore
      }
    });
  });
});
