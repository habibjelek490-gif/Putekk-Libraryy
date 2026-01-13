// State Data Keranjang
let cart = [];

// Fungsi Menambah ke Keranjang
function addToCart(title, price) {
    // Cek apakah buku sudah ada di keranjang
    const existingItem = cart.find(item => item.title === title);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    
    renderCart();
    alert(title + " berhasil ditambahkan!");
}

// Fungsi Menghapus Item
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Fungsi Update Tampilan Keranjang
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Update Badge Jumlah Keranjang
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Bersihkan kontainer
    cartItemsContainer.innerHTML = "";
    
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center text-gray-400 mt-10">Keranjang masih kosong</p>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
                    <div>
                        <h4 class="font-bold text-sm">${item.title}</h4>
                        <p class="text-xs text-gray-500">Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
                    </div>
                    <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }
    
    cartTotal.innerText = `Rp ${total.toLocaleString()}`;
}

// Fungsi Buka/Tutup Modal
function openCart() {
    document.getElementById('cart-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Stop scroll halaman belakang
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Menutup modal jika klik di luar area modal
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        closeCart();
    }
}