document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obter a palavra-chave do input
  const keyword = document.getElementById("keyword").value;

  // Limpar resultados anteriores
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    // Chamar o endpoint /api/scrape
    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const products = await response.json();

    // Verificar se houve erro
    if (response.status !== 200) {
      resultsDiv.innerHTML = `<p>Error: ${products.error}</p>`;
      return;
    }

    // Exibir os resultados
    let html = "";
    products.forEach((product) => {
      html += `
        <div class="product">
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title || "N/A"}</h3>
          <p>Rating: ${product.rating}</p>
          <p>Reviews: ${product.reviews}</p>
        </div>
      `;
    });

    resultsDiv.innerHTML = html;
  } catch (error) {
    resultsDiv.innerHTML = `<p>Error: Failed to fetch data.</p>`;
  }
});
