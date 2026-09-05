// تشغيل الأيقونات والعناصر بعد التحميل
window.addEventListener("DOMContentLoaded", function() {
  if (window.lucide) {
    lucide.createIcons();
  }
  createFloatingElements();
});

// خلفية القلوب والأشكال المتحركة
function createFloatingElements() {
  const container = document.getElementById("floatingBg");
  if (!container) return;

  const icons = ["❤️", "🦋", "🧸", "🌸", "💖", "✨"];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "floating-item";
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 95 + "vw";
    
    const size = Math.random() * 14 + 20;
    el.style.fontSize = size + "px";
    
    const duration = Math.random() * 8 + 10;
    const delay = Math.random() * 12;
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
    
    container.appendChild(el);
  }
}

// قائمة بيانات الموديلات الافتراضية
const defaultCategoryData = {
  satin: {
    title: "طقم ستان حريري 🌸",
    desc: "تشكيلة حريرية فاخرة وناعمة تمنحكِ الراحة والأناقة التامة في أوقات استرخائكِ.",
    models: [
      { name: "طقم ستان 1", price: 4200, image: "images/satin 1.jpg" },
      { name: "طقم ستان 2", price: 4600, image: "images/satin 2.jpg" },
      { name: "طقم ستان 3", price: 3800, image: "images/satin 3.jpg" },
      { name: "طقم ستان 4", price: 4900, image: "images/satin 4.jpg" }
    ]
  },
  shorts: {
    title: "طقم شورت خفيف ✨",
    desc: "أطقم شورت قطنية خفيفة ومريحة مصممة للأوقات المنزلية اليومية.",
    models: [
      { name: "طقم شورت 1", price: 3500, image: "images/cotton_short 1.jpg" },
      { name: "طقم شورت 2", price: 3200, image: "images/cotton_short 2.jpg" },
      { name: "طقم شورت 3", price: 3600, image: "images/cotton_short 3.jpg" },
      { name: "طقم شورت 4", price: 3400, image: "images/cotton_short 4.jpg" }
    ]
  },
  cotton: {
    title: "بيجامة قطن ناعمة 🌿",
    desc: "بيجامات قطنية أصلية 100% عالية الجودة توفر لكِ أقصى درجات الانتعاش والراحة.",
    models: [
      { name: "بيجامة قطن 1", price: 3800, image: "images/coton 1.jpg" },
      { name: "بيجامة قطن 2", price: 3600, image: "images/coton 2.jpg" },
      { name: "بيجامة قطن 3", price: 3900, image: "images/coton 3.jpg" },
      { name: "بيجامة قطن 4", price: 3700, image: "images/coton 4.jpg" }
    ]
  },
  robes: {
    title: "روب نوم راقي 👘",
    desc: "أرواب نوم بأقمشة خفيفة وأنيقة مع أحزمة متناسقة لتكمل إطلالتكِ المسائية.",
    models: [
      { name: "روب نوم 1", price: 4500, image: "images/robe 1.jpg" },
      { name: "روب نوم 2", price: 3900, image: "images/robe 2.jpg" },
      { name: "روب نوم 3", price: 4800, image: "images/robe 3.jpg" },
      { name: "روب نوم 4", price: 5200, image: "images/robe 4.jpg" }
    ]
  },
  bridal: {
    title: "طقم عروس ملكي 👑",
    desc: "تشكيلة حصرية مصممة خصيصاً لجهاز العرائس بأفخم الأقمشة والتطريزات.",
    models: [
      { name: "طقم عروس 1", price: 5000, image: "images/bridel1.jpg" },
      { name: "طقم عروس 2", price: 4000, image: "images/bridel2.jpg" },
      { name: "طقم عروس 3", price: 5000, image: "images/bridel3.jpg" },
      { name: "طقم عروس 4", price: 7000, image: "images/bridel4.jpg" }
    ]
  }
};

// جلب البيانات مع مراعاة التعديلات المحفوظة من لوحة الإدارة
function getActiveCategoryData() {
  const customData = localStorage.getItem("cozyGlowCategoryData");
  return customData ? JSON.parse(customData) : defaultCategoryData;
}

// أسعار المنتجات الأساسية
const productPrices = {
  "طقم ستان حريري": 4200,
  "طقم شورت": 3500,
  "بيجامة قطن": 3800,
  "روب نوم": 4500,
  "طقم عروس": 8900
};

// إدارة سلة المشتريات
let cart = [];

function toggleCartModal() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar && overlay) {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}
function addToCart(productName) {
  const price = productPrices[productName] || 3500;
  const existingItem = cart.find(function(item) { return item.name === productName; });

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ name: productName, price: price, qty: 1 });
  }

  updateCartUI();
  toggleCartModal();
}

function changeQty(index, change) {
  if (!cart[index]) return;
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById("cartItemsContainer");
  const badge = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotalPrice");

  const totalQty = cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
  const totalPrice = cart.reduce(function(sum, item) { return sum + (item.price * item.qty); }, 0);

  if (badge) badge.textContent = totalQty;
  if (totalEl) totalEl.textContent = totalPrice.toLocaleString() + " دج";

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-msg">السلة فارغة حالياً 🌸</p>';
    return;
  }

  container.innerHTML = "";
  cart.forEach(function(item, index) {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = 
      '<div class="cart-item-info">' +
        '<h4>' + item.name + '</h4>' +
        '<p>' + (item.price * item.qty).toLocaleString() + ' دج</p>' +
      '</div>' +
      '<div class="cart-item-controls">' +
        '<button class="qty-btn" onclick="changeQty(' + index + ', -1)">-</button>' +
        '<span class="qty-text">' + item.qty + '</span>' +
        '<button class="qty-btn" onclick="changeQty(' + index + ', 1)">+</button>' +
        '<button class="delete-item-btn" onclick="removeFromCart(' + index + ')">🗑️</button>' +
      '</div>';
    container.appendChild(itemEl);
  });
}

function checkoutFromCart() {
  if (cart.length === 0) {
    alert("السلة فارغة! اختاري بعض المنتجات أولاً 🌸");
    return;
  }

  toggleCartModal();
  const orderSummary = cart.map(function(item) { return item.name + " (" + item.qty + ")"; }).join(" + ");
  const input = document.querySelector("#orderForm input:nth-of-type(4)");
  if (input) {
    input.value = orderSummary;
  }

  const orderSec = document.getElementById("order");
  if (orderSec) {
    orderSec.scrollIntoView({ behavior: "smooth" });
  }
}

// نافذة المعاينة
let currentSelectedCategory = "";

function openPreviewModal(catKey) {
  const categoryData = getActiveCategoryData();
  const data = categoryData[catKey];
  if (!data) return;

  currentSelectedCategory = data.title;
  const titleEl = document.getElementById("modalTitle");
  const descEl = document.getElementById("modalDesc");
  const thumbsContainer = document.getElementById("modalThumbs");

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;

  if (thumbsContainer) {
    thumbsContainer.innerHTML = "";
    data.models.forEach(function(item) {
      const thumb = document.createElement("div");
      thumb.className = "thumb-item";
      thumb.innerHTML = 
        '<img src="' + item.image + '" alt="' + item.name + '">' +
        '<h5>' + item.name + '</h5>' +
        '<p>' + item.price.toLocaleString() + ' دج</p>';
      thumbsContainer.appendChild(thumb);
    });
  }

  const modal = document.getElementById("previewModal");
  if (modal) modal.classList.add("active");
}

function closePreviewModal() {
  const modal = document.getElementById("previewModal");
  if (modal) modal.classList.remove("active");
}

function orderSelectedCategory() {
  closePreviewModal();
  const input = document.querySelector("#orderForm input:nth-of-type(4)");
  if (input && currentSelectedCategory) {
    input.value = currentSelectedCategory;
  }
  const orderSec = document.getElementById("order");
  if (orderSec) {
    orderSec.scrollIntoView({ behavior: "smooth" });
  }
}
// فلترة المنتجات
function filterCategory(category, button) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function(btn) { btn.classList.remove("active"); });
  if (button) button.classList.add("active");

  const products = document.querySelectorAll(".product-card");
  products.forEach(function(product) {
    const productCategory = product.getAttribute("data-category");
    if (category === "all" || productCategory === category) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
}

// استلام الطلب وتخزينه للوحة التحكم
// استمارة الطلب وإرسالها مباشرة إلى واتساب
window.addEventListener("DOMContentLoaded", function() {
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const inputs = this.querySelectorAll("input, select");
      const name = inputs[0] ? inputs[0].value.trim() : "";
      const phone = inputs[1] ? inputs[1].value.trim() : "";
      const state = inputs[2] ? inputs[2].value.trim() : "";
      const product = inputs[3] ? inputs[3].value.trim() : (cart.map(function(i) { return i.name + " (" + i.qty + ")"; }).join(" + ") || "طلب عام");

      // رقم هاتفكِ للواتساب (بصيغة دولية بدون 0 أو +)
      // مثال: إذا كان رقمك 0655123456 يصبح: 213655123456
      const myWhatsAppNumber = "213699193770";

      // تجهيز نص الرسالة بتنسيق مرتب
      const message = 
        "🛍️ *طلب جديد من متجر Cozy Glow*\n\n" +
        "👤 *الاسم:* " + name + "\n" +
        "📞 *رقم الهاتف:* " + phone + "\n" +
        "📍 *الولاية / العنوان:* " + state + "\n" +
        "👗 *المنتج المطلوب:* " + product + "\n\n" +
        "✨ يرجى تأكيد استلام الطلب وتفاصيل التوصيل.";

      // حفظ الطلب محلياً أيضاً في لوحة التحكم
      const newOrder = {
        name: name,
        phone: phone,
        state: state,
        product: product,
        date: new Date().toLocaleDateString('ar-DZ') + " " + new Date().toLocaleTimeString('ar-DZ', {hour: '2-digit', minute:'2-digit'}),
        status: "pending"
      };
      const existingOrders = JSON.parse(localStorage.getItem("cozyGlowOrders") || "[]");
      existingOrders.unshift(newOrder);
      localStorage.setItem("cozyGlowOrders", JSON.stringify(existingOrders));

      // فتح واتساب مباشرة بالرسالة
      const whatsappURL = "https://wa.me/" + myWhatsAppNumber + "?text=" + encodeURIComponent(message);
      window.open(whatsappURL, "_blank");

      // تصفير الحقول والسلة
      this.reset();
      cart = [];
      updateCartUI();
    });
  }
});