// === LOGIN ADMIN ===
const loginPage = document.getElementById("login-page");
const dashboard = document.getElementById("admin-dashboard");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginError = document.getElementById("login-error");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "dodon123") {
      localStorage.setItem("isLoggedIn", "true");
      loginPage.classList.add("hidden");
      dashboard.classList.remove("hidden");
      loadProducts();
      renderChart();
    } else {
      loginError.textContent = "Username atau password salah!";
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    location.reload();
  });
}

window.addEventListener("load", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    if (dashboard) {
      loginPage?.classList.add("hidden");
      dashboard.classList.remove("hidden");
      loadProducts();
      renderChart();
    }
  }
});

// === LOAD PRODUK KE HALAMAN UTAMA ===
const produkList = document.getElementById("produk-list");

async function loadProdukUtama() {
  if (!produkList) return;
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    produkList.innerHTML = "";
    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("produk-card");
      div.innerHTML = `
        <h3>${item.nama}</h3>
        <p>Kategori: ${item.kategori}</p>
        <p><b>Rp ${item.harga.toLocaleString()}</b></p>
        <button>Order Sekarang</button>
      `;
      produkList.appendChild(div);
    });
  } catch (err) {
    produkList.innerHTML = "<p>Gagal memuat produk.</p>";
  }
}
loadProdukUtama();

// === CRUD PRODUK (ADMIN) ===
const tableBody = document.querySelector("#produk-table tbody");
const addBtn = document.getElementById("add-product");

let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
  if (!tableBody) return;
  tableBody.innerHTML = "";
  products.forEach((p, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nama}</td>
      <td>Rp ${p.harga.toLocaleString()}</td>
      <td>${p.kategori}</td>
      <td>
        <button onclick="editProduct(${i})" class="btn-primary">Edit</button>
        <button onclick="deleteProduct(${i})" class="btn-danger">Hapus</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

if (addBtn) {
  addBtn.addEventListener("click", () => {
    const nama = document.getElementById("nama-produk").value.trim();
    const harga = parseInt(document.getElementById("harga-produk").value);
    const kategori = document.getElementById("kategori-produk").value.trim();

    if (!nama || !harga || !kategori) return alert("Isi semua data!");

    products.push({ nama, harga, kategori });
    saveProducts();
    loadProducts();

    document.getElementById("nama-produk").value = "";
    document.getElementById("harga-produk").value = "";
    document.getElementById("kategori-produk").value = "";
  });
}

function editProduct(i) {
  const p = products[i];
  const namaBaru = prompt("Edit nama produk:", p.nama);
  const hargaBaru = parseInt(prompt("Edit harga:", p.harga));
  const kategoriBaru = prompt("Edit kategori:", p.kategori);

  if (namaBaru && hargaBaru && kategoriBaru) {
    products[i] = { nama: namaBaru, harga: hargaBaru, kategori: kategoriBaru };
    saveProducts();
    loadProducts();
  }
}

function deleteProduct(i) {
  if (confirm("Hapus produk ini?")) {
    products.splice(i, 1);
    saveProducts();
    loadProducts();
  }
}

// === CHART PENJUALAN DUMMY ===
function renderChart() {
  const ctx = document.getElementById("salesChart");
  if (!ctx) return;
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["ML", "FF", "Genshin", "Valorant", "PUBG"],
      datasets: [
        {
          label: "Penjualan (Dummy)",
          data: [12, 19, 8, 15, 10],
          backgroundColor: [
            "#ff6fb2",
            "#6fffb0",
            "#ffb26f",
            "#a26fff",
            "#6fc9ff",
          ],
          borderRadius: 6,
        },
      ],
    },
  });
                            }
