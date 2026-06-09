// ===== Product Catalog Data =====
export const products = [
  {
    id: 1,
    name: 'Kemeja Batik Premium',
    sku: 'BTK-001',
    stock: 45,
    price: 275000,
    image: '👔',
    lowStock: false,
  },
  {
    id: 2,
    name: 'Sepatu Sneakers Putih',
    sku: 'SNK-102',
    stock: 23,
    price: 450000,
    image: '👟',
    lowStock: false,
  },
  {
    id: 3,
    name: 'Tas Kulit Asli',
    sku: 'TAS-205',
    stock: 12,
    price: 650000,
    image: '👜',
    lowStock: true,
  },
  {
    id: 4,
    name: 'Kacamata Hitam UV',
    sku: 'KCM-089',
    stock: 67,
    price: 185000,
    image: '🕶️',
    lowStock: false,
  },
  {
    id: 5,
    name: 'Jam Tangan Analog',
    sku: 'JAM-401',
    stock: 18,
    price: 890000,
    image: '⌚',
    lowStock: true,
  },
  {
    id: 6,
    name: 'Dompet Pria Minimalis',
    sku: 'DMP-156',
    stock: 34,
    price: 125000,
    image: '👛',
    lowStock: false,
  },
  {
    id: 7,
    name: 'Ikat Pinggang Kulit',
    sku: 'IKT-078',
    stock: 56,
    price: 95000,
    image: '⚡',
    lowStock: false,
  },
  {
    id: 8,
    name: 'Kaos Polos Cotton',
    sku: 'KOS-234',
    stock: 120,
    price: 85000,
    image: '👕',
    lowStock: false,
  },
];

// ===== Order Management Data (Jasa Joki Website) =====
export const jokiOrders = [
  {
    id: 'JOKI-2024-001',
    date: '2024-06-01',
    clientName: 'Ahmad Fauzi',
    domainRequest: 'fauzi-store.cuan.in',
    category: 'Fashion & Pakaian',
    productCount: 15,
    totalPrice: 400000, // 250k + (15 * 10k)
    paymentStatus: 'Lunas',
    status: 'Selesai',
    liveUrl: 'https://fauzi-store.cuan.in',
  },
  {
    id: 'JOKI-2024-002',
    date: '2024-06-02',
    clientName: 'Siti Rahmawati',
    domainRequest: 'dapur-bunda.cuan.in',
    category: 'Kuliner & Makanan',
    productCount: 5,
    totalPrice: 300000,
    paymentStatus: 'Lunas',
    status: 'Belum Dikerjakan',
    liveUrl: null,
  },
  {
    id: 'JOKI-2024-003',
    date: '2024-06-02',
    clientName: 'Budi Hartono',
    domainRequest: 'budi-elektronik.cuan.in',
    category: 'Elektronik & Gadget',
    productCount: 20,
    totalPrice: 450000,
    paymentStatus: 'Lunas',
    status: 'Belum Dikerjakan',
    liveUrl: null,
  },
  {
    id: 'JOKI-2024-004',
    date: '2024-06-03',
    clientName: 'Rina Kusuma',
    domainRequest: 'rina-crafts.cuan.in',
    category: 'Kerajinan & Handmade',
    productCount: 8,
    totalPrice: 330000,
    paymentStatus: 'Lunas',
    status: 'Selesai',
    liveUrl: 'https://rina-crafts.cuan.in',
  },
  {
    id: 'JOKI-2024-005',
    date: '2024-06-04',
    clientName: 'Andi Wijaya',
    domainRequest: 'otomotif-jaya.cuan.in',
    category: 'Otomotif',
    productCount: 12,
    totalPrice: 370000,
    paymentStatus: 'Menunggu Pembayaran',
    status: 'Belum Dikerjakan',
    liveUrl: null,
  },
];

// ===== Dashboard Stats (Joki Admin) =====
export const dashboardStats = [
  {
    label: 'Total Pesanan Masuk',
    value: '45',
    change: '+5 bulan ini',
    changeType: 'positive',
    icon: 'shopping-cart',
  },
  {
    label: 'Pesanan Menunggu',
    value: '12',
    change: 'Perlu dikerjakan',
    changeType: 'neutral',
    icon: 'package',
  },
  {
    label: 'Website Selesai',
    value: '33',
    change: 'Sudah live',
    changeType: 'positive',
    icon: 'check-circle', // Need to add this icon in StatsCard if not exists
  },
  {
    label: 'Total Pendapatan Jasa',
    value: 'Rp14.850.000',
    change: '+15% dari bulan lalu',
    changeType: 'positive',
    icon: 'dollar',
  },
];

// ===== Recent Orders (for Dashboard) =====
export const recentOrders = jokiOrders.slice(0, 5);
export const revenueChartData = [
  { name: 'Jan 1', value: 1200000 },
  { name: 'Jan 2', value: 1800000 },
  { name: 'Jan 3', value: 1400000 },
  { name: 'Jan 4', value: 2200000 },
  { name: 'Jan 5', value: 1900000 },
  { name: 'Jan 6', value: 2500000 },
  { name: 'Jan 7', value: 2100000 },
  { name: 'Jan 8', value: 2800000 },
  { name: 'Jan 9', value: 2400000 },
  { name: 'Jan 10', value: 3200000 },
  { name: 'Jan 11', value: 2900000 },
  { name: 'Jan 12', value: 3500000 },
  { name: 'Jan 13', value: 3100000 },
  { name: 'Jan 14', value: 2700000 },
  { name: 'Jan 15', value: 3800000 },
  { name: 'Jan 16', value: 3400000 },
  { name: 'Jan 17', value: 4100000 },
  { name: 'Jan 18', value: 3700000 },
  { name: 'Jan 19', value: 3300000 },
  { name: 'Jan 20', value: 4500000 },
  { name: 'Jan 21', value: 4200000 },
  { name: 'Jan 22', value: 3900000 },
  { name: 'Jan 23', value: 4800000 },
  { name: 'Jan 24', value: 4400000 },
  { name: 'Jan 25', value: 5100000 },
  { name: 'Jan 26', value: 4700000 },
  { name: 'Jan 27', value: 5500000 },
  { name: 'Jan 28', value: 5200000 },
  { name: 'Jan 29', value: 4900000 },
  { name: 'Jan 30', value: 5800000 },
];


// ===== Testimonials =====
export const testimonials = [
  {
    name: 'Siti Nur Haliza',
    role: 'Pemilik Butik Flair',
    text: 'Cuan.in sangat membantu saya membangun toko online butik saya. Dalam 2 hari, butik saya sudah online dan langsung mendapat pelanggan baru. Sangat recommended!',
    avatar: '👩',
  },
  {
    name: 'Rizki Santoso',
    role: 'Pemilik Makanan Organik',
    text: 'Saya tidak punya keahlian membuat website, tapi dengan Cuan.in semua jadi sangat mudah. Customer support-nya juga ramah dan responsif. Terima kasih Cuan.in!',
    avatar: '👨',
  },
  {
    name: 'Rina Kusuma',
    role: 'Ibu RT, Kue Tart',
    text: 'Awalnya saya hanya jualan lewat Instagram, sekarang sudah punya website sendiri berkat Cuan.in. Orderan meningkat dan saya bisa mengelola semuanya dari satu dashboard.',
    avatar: '👩‍🍳',
  },
];

// ===== Landing Page Features =====
export const features = [
  {
    icon: '💰',
    title: '0% Komisi Selamanya',
    description: 'Tidak ada biaya komisi. Semua keuntungan 100% milik Anda, selamanya.',
  },
  {
    icon: '🎨',
    title: 'Setup Template Instan',
    description: 'Pilih dari 50+ template profesional dan langsung mulai jualan dari 5 menit.',
  },
  {
    icon: '💳',
    title: 'Integrasi Pembayaran Mudah',
    description: 'Terima pembayaran dari semua metode: Bank transfer, e-wallet, kartu kredit, dan lainnya.',
  },
  {
    icon: '🚚',
    title: 'API Pengiriman Real Time',
    description: 'Terintegrasi dengan semua jasa pengiriman populer: JNE, J&T, SiCepat, dan lainnya.',
  },
  {
    icon: '📊',
    title: 'Laporan Data Pelanggan',
    description: 'Kenali pelanggan Anda lebih dalam dengan analisis perilaku pelanggan.',
  },
  {
    icon: '📈',
    title: 'Analitik Keuangan',
    description: 'Lacak pendapatan, pengeluaran, dan keuntungan Anda secara real-time.',
  },
  {
    icon: '📦',
    title: 'Upload Produk Instan',
    description: 'Upload ribuan produk sekaligus dalam hitungan detik melalui fitur bulk upload.',
  },
  {
    icon: '📱',
    title: 'Desain Responsif Mobile',
    description: 'Toko Anda tampil sempurna di semua perangkat – mobile, tablet, dan desktop.',
  },
];

// ===== Pricing Features =====
export const pricingFeatures = [
  '0% Komisi Transaksi',
  'Produk Tanpa Batas',
  'Template & Tema Profesional',
  'Payment Gateway Midtrans Terintegrasi',
  'Integrasi Ongkir Realtime (JNE, SiCepat, J&T)',
  'Manajemen Pesanan & Inventori Pintar',
  'Sistem Manajemen Pelanggan',
  'Dashboard Analitik Keuangan',
  'Kalkulasi Ongkir Otomatis',
  'Sertifikat SSL & Keamanan',
  'Dukungan Pelanggan 24/7',
  'Ekspor Data CSV/Excel',
];

// ===== Brand Setup Presets =====
export const brandPresets = [
  {
    name: 'Makanan Segar',
    description: 'Sempurna untuk bisnis organik & makanan',
    colors: ['#10B981', '#059669'],
  },
  {
    name: 'Fashion Elegan',
    description: 'Gaya mewah untuk brand fashion',
    colors: ['#1F2937', '#D97706'],
  },
  {
    name: 'Kerajinan Alami',
    description: 'Warna hangat untuk produk handmade',
    colors: ['#92400E', '#F59E0B', '#D97706'],
  },
  {
    name: 'Toko Teknologi',
    description: 'Tampilan modern untuk elektronik',
    colors: ['#3B82F6', '#2563EB'],
  },
  {
    name: 'Brand Kecantikan',
    description: 'Pink elegan untuk kosmetik',
    colors: ['#EC4899', '#F472B6'],
  },
  {
    name: 'Mainan Anak',
    description: 'Warna ceria dan menyenangkan',
    colors: ['#F59E0B', '#10B981', '#EF4444'],
  },
];

// ===== Sidebar Menu Items (Admin Cuan.in) =====
export const sidebarMenuItems = [
  { label: 'Ringkasan Dashboard', path: '/dashboard', icon: 'layout-dashboard' },
  { label: 'Pesanan Joki Website', path: '/orders', icon: 'clipboard-list' },
];

// ===== Helper: Format Rupiah =====
export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number).replace('IDR', 'Rp').trim();
};

// ===== Customer Database Data =====
export const customers = [
  { id: 1, name: 'Ahmad Fauzi', email: 'ahmad.fauzi@gmail.com', phone: '08123456789', totalOrders: 12, totalSpent: 3450000, lastOrder: '2024-06-01', tag: 'VIP', avatar: '👨' },
  { id: 2, name: 'Siti Rahmawati', email: 'siti.rahma@gmail.com', phone: '08567891234', totalOrders: 8, totalSpent: 2120000, lastOrder: '2024-06-01', tag: 'VIP', avatar: '👩' },
  { id: 3, name: 'Budi Hartono', email: 'budi.h@yahoo.com', phone: '08219876543', totalOrders: 5, totalSpent: 1650000, lastOrder: '2024-06-02', tag: 'Regular', avatar: '👨' },
  { id: 4, name: 'Rina Kusuma', email: 'rina.k@gmail.com', phone: '08778901234', totalOrders: 3, totalSpent: 825000, lastOrder: '2024-06-02', tag: 'Regular', avatar: '👩' },
  { id: 5, name: 'Andi Wijaya', email: 'andi.w@outlook.com', phone: '08113344556', totalOrders: 1, totalSpent: 890000, lastOrder: '2024-06-02', tag: 'Baru', avatar: '👨' },
  { id: 6, name: 'Dewi Lestari', email: 'dewi.les@gmail.com', phone: '08334455667', totalOrders: 15, totalSpent: 4780000, lastOrder: '2024-06-03', tag: 'VIP', avatar: '👩' },
  { id: 7, name: 'Hendra Gunawan', email: 'hendra.g@gmail.com', phone: '08556677889', totalOrders: 2, totalSpent: 1300000, lastOrder: '2024-06-03', tag: 'Baru', avatar: '👨' },
  { id: 8, name: 'Maya Sari', email: 'maya.sari@gmail.com', phone: '08990011223', totalOrders: 7, totalSpent: 2450000, lastOrder: '2024-06-03', tag: 'Regular', avatar: '👩' },
  { id: 9, name: 'Rudi Santoso', email: 'rudi.s@hotmail.com', phone: '08445566778', totalOrders: 4, totalSpent: 1125000, lastOrder: '2024-06-03', tag: 'Regular', avatar: '👨' },
  { id: 10, name: 'Fitri Handayani', email: 'fitri.h@gmail.com', phone: '08667788990', totalOrders: 1, totalSpent: 780000, lastOrder: '2024-06-03', tag: 'Baru', avatar: '👩' },
];

export const customerStats = [
  { label: 'Total Pelanggan', value: '156', change: '+18% dari bulan lalu', changeType: 'positive', icon: 'users' },
  { label: 'Pelanggan Baru', value: '24', change: 'bulan ini', changeType: 'positive', icon: 'user-plus' },
  { label: 'Pelanggan Aktif', value: '89', change: '57% dari total', changeType: 'neutral', icon: 'user-check' },
  { label: 'Rata-rata Belanja', value: 'Rp245.000', change: '+8% dari bulan lalu', changeType: 'positive', icon: 'wallet' },
];

// ===== Financial Analytics Data =====
export const financeStats = [
  { label: 'Pendapatan Bersih', value: 'Rp12.850.000', change: '+28% dari bulan lalu', changeType: 'positive', icon: 'trending-up' },
  { label: 'Laba Kotor', value: 'Rp8.920.000', change: '+19% dari bulan lalu', changeType: 'positive', icon: 'dollar' },
  { label: 'Margin Laba', value: '44%', change: '+3% dari bulan lalu', changeType: 'positive', icon: 'percent' },
  { label: 'Total Transaksi', value: '342', change: '+15% dari bulan lalu', changeType: 'positive', icon: 'receipt' },
];

export const revenueVsExpenseData = [
  { name: 'Jan', pendapatan: 8500000, pengeluaran: 4200000 },
  { name: 'Feb', pendapatan: 9200000, pengeluaran: 4500000 },
  { name: 'Mar', pendapatan: 10800000, pengeluaran: 5100000 },
  { name: 'Apr', pendapatan: 11500000, pengeluaran: 4800000 },
  { name: 'Mei', pendapatan: 12200000, pengeluaran: 5300000 },
  { name: 'Jun', pendapatan: 15420000, pengeluaran: 5800000 },
];

export const salesByCategoryData = [
  { name: 'Fashion', value: 5200000 },
  { name: 'Aksesoris', value: 3800000 },
  { name: 'Elektronik', value: 2900000 },
  { name: 'Kuliner', value: 1800000 },
  { name: 'Lainnya', value: 1720000 },
];

export const financialSummary = {
  pendapatanKotor: 15420000,
  hpp: 6500000,
  labaKotor: 8920000,
  biayaOperasional: 2570000,
  labaBersih: 6350000,
  komisiMarketplace: 0,
};

export const financialTransactions = [
  { id: 'TRX-001', date: '2024-06-03', description: 'Penjualan Kemeja Batik (x3)', amount: 825000, type: 'income' },
  { id: 'TRX-002', date: '2024-06-03', description: 'Penjualan Sepatu Sneakers', amount: 450000, type: 'income' },
  { id: 'TRX-003', date: '2024-06-03', description: 'Biaya Server & Hosting', amount: -25000, type: 'expense' },
  { id: 'TRX-004', date: '2024-06-02', description: 'Penjualan Tas Kulit Asli', amount: 650000, type: 'income' },
  { id: 'TRX-005', date: '2024-06-02', description: 'Penjualan Jam Tangan (x2)', amount: 1780000, type: 'income' },
  { id: 'TRX-006', date: '2024-06-02', description: 'Pembelian Bahan Baku', amount: -1200000, type: 'expense' },
  { id: 'TRX-007', date: '2024-06-01', description: 'Penjualan Kacamata Hitam (x5)', amount: 925000, type: 'income' },
  { id: 'TRX-008', date: '2024-06-01', description: 'Biaya Packaging', amount: -350000, type: 'expense' },
];

// ===== Onboarding Category Options =====
export const businessCategories = [
  'Kuliner & Makanan',
  'Fashion & Pakaian',
  'Kerajinan & Handmade',
  'Elektronik & Gadget',
  'Kecantikan & Skincare',
  'Kesehatan & Herbal',
  'Mainan & Hobi',
  'Pertanian & Perkebunan',
  'Otomotif',
  'Lainnya',
];
