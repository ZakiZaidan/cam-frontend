// CAM Cargo service data and constants

export const COMPANY = {
  name: "CAM Cargo",
  legalName: "PT. Cipta Astama Mandala",
  tagline: "Jasa Pengiriman Cepat & Aman Seluruh Indonesia",
  description:
    "PT. Cipta Astama Mandala (CAM Cargo Balikpapan) merupakan perusahaan yang bergerak di bidang layanan pengiriman dengan moda transportasi darat, laut, dan udara. Spesialis pengiriman dari wilayah Kalimantan dan seluruh Indonesia.",
  founded: 2023,
  whatsapp: "6281146602305",
  whatsappDisplay: "0811-4660-2305",
  email: "info@camcargo.co.id",
  address: "Balikpapan, Kalimantan Timur, Indonesia",
  mapUrl: "https://maps.app.goo.gl/LkmMApPBeytVKxDy9",
  social: {
    facebook: "https://www.facebook.com/cam.cargobalikpapan",
    instagram: "https://www.instagram.com/cam.cargobalikpapan/",
    tiktok: "https://www.tiktok.com/@cam.cargobalikpapan",
  },
  visi: "Menjadi ekspedisi yang memberikan solusi kepada client dan konsisten menjadikan service spirit dalam bekerja, serta menjadi mitra usaha yang bisa memenuhi kebutuhan klien dengan menjunjung tinggi sportifitas dan profesionalitas kerja.",
  misi: [
    "Memberikan kontribusi maksimal dan berimplikasi positif untuk klien",
    "Menjadi mitra yang bisa dipercaya karena keandalan dan integritas",
    "Berkontribusi dalam pembangunan bangsa dan negara",
  ],
};

export const SERVICES = [
  {
    slug: "kirim-barang",
    title: "Kirim Barang",
    subtitle: "Reguler / Paket",
    description:
      "Kirim barang reguler/paket merupakan layanan kiriman barang wilayah Kalimantan dan seluruh Indonesia dengan rute yang terjadwal dan menggunakan moda transportasi darat, laut, dan udara.",
    icon: "Package",
    heroImage: "/layanan-images/kirim-barang-1-a00cc6d6-6938-4bf4-91e7-c0f0e965eb9d-768x1024.webp",
    gallery: [
      "/layanan-images/kirim-barang-1-a00cc6d6-6938-4bf4-91e7-c0f0e965eb9d-768x1024.webp",
      "/layanan-images/kirim-barang-2-e7a58cc7-dc11-4252-a53a-645251db6684-768x1024.webp",
      "/layanan-images/kirim-barang-3-1378eba4-56ef-49f1-9ee7-2c245494265a-768x1024.webp",
      "/layanan-images/kirim-barang-4-65c9300e-994f-4434-b6b8-3167eda3a05d-768x1024.webp",
      "/layanan-images/kirim-barang-5-b3584571-0e19-46f0-9d91-63657d588935-768x1024.webp",
    ],
    features: [
      { title: "Tepat Waktu", desc: "Waktu pengiriman yang lebih tepat karena pemberangkatan terjadwal setiap rutenya." },
      { title: "Packing Aman", desc: "Kami memberikan fasilitas packing barang yang aman (wrapping & packing kayu)." },
      { title: "Gratis Penjemputan", desc: "Gratis layanan penjemputan untuk barang dengan minimal berat 100kg." },
    ],
    extraContent: "Biaya layanan kiriman reguler di Cam Cargo memiliki harga kompetitif karena proses pengiriman digabung dengan barang lainnya namun waktu sampai tetap sesuai dengan waktu yang telah ditentukan, sebab rute pemberangkatan kami telah terjadwal untuk setiap wilayah.",
    waText: "kirim%20barang",
  },
  {
    slug: "kirim-motor",
    title: "Kirim Motor",
    subtitle: "Segala Jenis",
    description:
      "Jasa pengiriman motor antar wilayah dari Kalimantan ke seluruh Indonesia, maupun sebaliknya.",
    icon: "Bike",
    heroImage: "/layanan-images/kirim-motor-4-1-768x1024.webp",
    gallery: [
      "/layanan-images/kirim-motor-4-1-768x1024.webp",
      "/layanan-images/kirim-motor-5-2-768x1024.webp",
      "/layanan-images/kirim-motor-6-3-768x1024.webp",
      "/layanan-images/kirim-motor-7-4-768x1024.webp",
      "/layanan-images/kirim-motor-8-5-768x1024.webp",
    ],
    features: [
      { title: "Lebih Aman", desc: "Kami menjamin keamanan motor Anda dengan standar packing yang berkualitas." },
      { title: "Gratis Packing", desc: "Kami berikan gratis packing untuk pengiriman motor." },
      { title: "Gratis Penjemputan", desc: "Kami berikan layanan penjemputan gratis untuk mempermudah Anda." },
    ],
    extraContent: "Syarat pengiriman: lampirkan STNK asli dan fotocopy KTP Anda. Anda akan mendapatkan resi pengiriman serta invoice dari customer service kami. Motor akan kami packing dan dikirim sesuai dengan jadwal keberangkatan.",
    waText: "kirim%20motor",
  },
  {
    slug: "kirim-mobil",
    title: "Kirim Mobil",
    subtitle: "Segala Jenis",
    description:
      "Jasa pengiriman mobil antar wilayah dari Kalimantan ke seluruh Indonesia maupun sebaliknya.",
    icon: "Car",
    heroImage: "/layanan-images/kirim-mobil-5-1-1-768x1024.webp",
    gallery: [
      "/layanan-images/kirim-mobil-5-1-1-768x1024.webp",
      "/layanan-images/kirim-mobil-6-2-1-768x1024.webp",
      "/layanan-images/kirim-mobil-7-3-1-768x1024.webp",
      "/layanan-images/kirim-mobil-8-4-1-768x1024.webp",
      "/layanan-images/kirim-mobil-9-5-1-768x1024.webp",
    ],
    features: [
      { title: "2 Jenis Pengiriman", desc: "Anda bisa mengirim mobil melalui darat atau laut." },
      { title: "2 Jenis Layanan", desc: "Jasa pengiriman mobil menggunakan mobil towing dan layanan self-drive." },
      { title: "Gratis Pencucian", desc: "Mobil Anda akan kami cuci sebelum dikirim ke tujuan." },
      { title: "Gratis Penjemputan", desc: "Kami memberikan layanan penjemputan gratis untuk self-drive." },
    ],
    extraContent: "Lampirkan STNK asli dan fotocopy KTP. Tim kami akan mengecek kondisi dan kelengkapan mobil, mencatatnya di formulir checklist. Ketika mobil tiba di tujuan, kami akan cuci dan melakukan pengecekan kembali bersama penerima.",
    waText: "kirim%20mobil",
  },
  {
    slug: "kirim-alat-berat",
    title: "Kirim Alat Berat",
    subtitle: "Unit",
    description:
      "Kami memberikan layanan pengiriman alat berat dari Kalimantan ke seluruh Indonesia, maupun sebaliknya.",
    icon: "Truck",
    heroImage: "/layanan-images/kirim-alat-berat-3-1-2-768x1024.webp",
    gallery: [
      "/layanan-images/kirim-alat-berat-3-1-2-768x1024.webp",
      "/layanan-images/kirim-alat-berat-4-2-2-768x1024.webp",
      "/layanan-images/kirim-alat-berat-5-3-2-768x1024.webp",
      "/layanan-images/kirim-alat-berat-6-4-2-768x1024.webp",
      "/layanan-images/kirim-alat-berat-7-5-2-768x1024.webp",
    ],
    features: [
      { title: "Berpengalaman", desc: "Kami telah berpengalaman mengirimkan alat berat ke berbagai wilayah di Indonesia, khususnya Kalimantan." },
      { title: "Berbagai Jenis Alat Berat", desc: "Kami melayani pengiriman crane, dump truck, excavator, forklift, bulldozer, vibro, motor grader, dan lainnya." },
    ],
    extraContent: "Kami bisa mengirim berbagai jenis alat berat untuk menunjang pekerjaan Anda ke seluruh wilayah Indonesia dengan armada yang sesuai dan penanganan profesional.",
    waText: "kirim%20alat%20berat",
  },
  {
    slug: "kirim-barang-pindahan",
    title: "Kirim Barang Pindahan",
    subtitle: "Rumah & Kantor",
    description:
      "Kami menyediakan layanan kirim barang pindahan dari wilayah Kalimantan ke seluruh Indonesia, maupun sebaliknya. Baik itu layanan pindahan rumah, kantor, kost, apartemen, dan lainnya.",
    icon: "Home",
    heroImage: "/layanan-images/kirim-pindahan-7-b3584571-0e19-46f0-9d91-63657d588935-768x1024.webp",
    gallery: [
      "/layanan-images/kirim-pindahan-7-b3584571-0e19-46f0-9d91-63657d588935-768x1024.webp",
      "/layanan-images/kirim-pindahan-8-5254f916-b73c-4d09-b000-bc92662de61a-768x1024.webp",
      "/layanan-images/kirim-pindahan-9-Untitled-design2-768x1024.webp",
      "/layanan-images/kirim-pindahan-10-Untitled-design3-768x1024.webp",
      "/layanan-images/kirim-pindahan-11-Untitled-design1-768x1024.webp",
      "/layanan-images/kirim-pindahan-12-Untitled-design-768x1024.webp",
    ],
    features: [
      { title: "Beragam Layanan", desc: "Kami menyediakan berbagai jenis layanan untuk memenuhi kebutuhan yang berbeda-beda tiap klien." },
      { title: "Lebih Aman", desc: "Kami juga akan menjamin keamanan dan memberikan perhatian lebih untuk segala jenis barang." },
      { title: "Berpengalaman", desc: "Kami berpengalaman dalam pindahan berbagai jenis sektor." },
      { title: "Survey Gratis", desc: "Tim kami melakukan analisa barang, estimasi biaya, dan kebutuhan armada secara gratis." },
      { title: "Asuransi", desc: "Kami memberikan asuransi perlindungan terhadap kerugian atau kerusakan barang kiriman." },
    ],
    extraContent: "Cam Cargo akan memberikan perhatian khusus pada setiap barang yang akan dikirim. Untuk barang–barang yang rentan pecah, kami sangat mempertimbangkan keamanan barang dengan memberikan layanan packing terbaik sesuai standar kami.",
    waText: "kirim%20barang%20pindahan",
  },
  {
    slug: "kirim-barang-udara",
    title: "Kirim Barang via Udara",
    subtitle: "Express",
    description:
      "Estimasi layanan pengiriman dipastikan sampai lebih cepat dibandingkan jenis pengiriman lainnya. Layanan ini melibatkan moda transportasi udara seperti pesawat komersial dan kargo.",
    icon: "Plane",
    heroImage: "/layanan-images/kirim-udara-3-1-2-1-768x1024.webp",
    gallery: [
      "/layanan-images/kirim-udara-3-1-2-1-768x1024.webp",
      "/layanan-images/kirim-udara-4-2-2-1-768x1024.webp",
      "/layanan-images/kirim-udara-5-3-2-1-768x1024.webp",
      "/layanan-images/kirim-udara-6-4-2-1-768x1024.webp",
      "/layanan-images/kirim-udara-7-5-2-1-768x1024.webp",
    ],
    features: [
      { title: "Berpengalaman", desc: "Kami mempunyai tim yang berpengalaman di bidang pengiriman udara, baik kiriman reguler, project, maupun urgensi." },
      { title: "Pengiriman Daerah Pelosok", desc: "Kami memberikan fasilitas packing barang yang aman (wrapping & packing kayu)." },
      { title: "Layanan 24 Jam", desc: "Kami memberikan layanan 24 jam untuk pengiriman barang yang bersifat mendesak." },
    ],
    extraContent: "Tersedia 2 jenis layanan: (1) Pengiriman Reguler menggunakan pesawat komersial untuk seluruh Indonesia melalui rute penerbangan domestik. (2) Pengiriman Proyek menggunakan pesawat kargo untuk barang kiriman berukuran besar.",
    waText: "kirim%20barang%20melalui%20udara",
  },
  {
    slug: "kirim-barang-project",
    title: "Kirim Barang Project",
    subtitle: "Skala Besar",
    description:
      "Kami menyediakan layanan logistik untuk proyek berskala besar sehingga bisa menunjang pengerjaan proyek–proyek industri ke berbagai wilayah di Indonesia. Layanan ini mampu mengirim barang dengan dimensi besar dan berat.",
    icon: "Building2",
    heroImage: "/layanan-images/kirim-project-1-cbc192ba-35ac-4351-b67d-d9104817fa9a-768x576.webp",
    gallery: [
      "/layanan-images/kirim-project-1-cbc192ba-35ac-4351-b67d-d9104817fa9a-768x576.webp",
      "/layanan-images/kirim-project-2-5550ced9-b238-4452-b738-2815e3c6520b-768x576.webp",
      "/layanan-images/kirim-project-3-fb79bcd9-3a48-4d58-93ef-943048f8fa32-768x576.webp",
      "/layanan-images/kirim-project-4-ec98fff8-6a21-4de7-9b39-81775ed064b2-768x576.webp",
      "/layanan-images/kirim-project-5-15878cc6-bd81-483b-8271-dfd97a677b89-768x576.webp",
    ],
    features: [
      { title: "Berpengalaman", desc: "Kami telah berpengalaman dalam pengiriman project perusahaan swasta maupun pemerintahan." },
      { title: "Terencana", desc: "Kami selalu memperhatikan secara khusus untuk pengiriman barang project dengan membuat perencanaan awal agar proses pengiriman tepat dan minim kendala." },
      { title: "Analisis Detail", desc: "Analisa merupakan bagian paling penting yang tidak boleh dilewatkan saat pengerjaan pengiriman barang project." },
      { title: "Bertanggung Jawab", desc: "Kami bertanggung jawab dalam pengiriman barang project Anda." },
    ],
    extraContent: "Untuk mengirimkan barang project perlu analisa yang cukup matang karena setiap barang kiriman memiliki alur pengerjaan yang berbeda–beda. Perlu direncanakan dari awal terlebih dahulu agar pengerjaan proyek berhasil. Mulai dari survei barang kiriman, perizinan, pertimbangan resiko selama perjalanan, estimasi biaya pengiriman, jenis alat transportasi yang digunakan, survei rute perjalanan, proses pengemasan, dan lainnya.",
    waText: "kirim%20barang%20project",
  },
  {
    slug: "charter-kendaraan",
    title: "Charter Kendaraan",
    subtitle: "Sewa Armada",
    description:
      "Layanan ini kami sediakan untuk memenuhi kebutuhan Anda yang memerlukan kendaraan khusus tanpa digabung dengan kiriman reguler lainnya.",
    icon: "Container",
    heroImage: "/layanan-images/charter-kendaraan-1-1-3-768x576.webp",
    gallery: [
      "/layanan-images/charter-kendaraan-1-1-3-768x576.webp",
      "/layanan-images/charter-kendaraan-2-2-3-768x576.webp",
      "/layanan-images/charter-kendaraan-3-3-3-768x576.webp",
      "/layanan-images/charter-kendaraan-4-4-3-768x576.webp",
      "/layanan-images/charter-kendaraan-5-5-3-768x576.webp",
    ],
    features: [
      { title: "Tidak Digabung", desc: "Barang kiriman Anda tidak akan digabung dengan barang kiriman reguler lainnya walaupun jumlahnya sedikit." },
      { title: "Pengiriman Cepat", desc: "Waktu pengiriman lebih cepat karena tidak ada jadwal pemberangkatan khusus, keberangkatan disesuaikan dengan kebutuhan klien." },
      { title: "Tarif Murah", desc: "Biaya pengiriman lebih murah untuk barang yang berat dan berdimensi besar karena tidak dikenakan tarif per-kilo." },
      { title: "Pemilihan Jenis Kendaraan", desc: "Pemilihan jenis kendaraan disesuaikan dengan kebutuhan barang yang akan dikirim." },
    ],
    extraContent: "Berbagai pilihan armada tersedia untuk menyesuaikan kebutuhan barang Anda. Mulai dari pickup, engkel, colt diesel, fuso, hingga tronton. Keberangkatan fleksibel sesuai kebutuhan klien.",
    waText: "charter%20kendaraan%20barang",
  },
];

export const FEATURES = [
  {
    title: "Jaringan Luas",
    description: "Didukung jaringan luas, pengiriman kami menjangkau seluruh Indonesia.",
    icon: "Globe",
  },
  {
    title: "Layanan Fleksibel",
    description: "Layanan yang bisa disesuaikan dengan kebutuhan Anda.",
    icon: "Settings",
  },
  {
    title: "Pengemasan Aman",
    description: "Pengemasan profesional menjaga barang tetap utuh sampai tujuan.",
    icon: "ShieldCheck",
  },
  {
    title: "Harga Kompetitif",
    description: "Harga terjangkau tanpa mengorbankan kualitas layanan.",
    icon: "BadgeDollarSign",
  },
  {
    title: "Layanan Responsif",
    description: "Respons cepat dan tepat setiap saat untuk kepuasan Anda.",
    icon: "Headphones",
  },
  {
    title: "Keamanan Tinggi",
    description: "Mengutamakan keamanan tinggi untuk setiap jenis pengiriman.",
    icon: "Lock",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ahmad R.",
    role: "Pelanggan Setia",
    text: "Langganan kirim barang pakai Cam Cargo. Cepat, murah, dan adminnya ramah.",
    rating: 5,
  },
  {
    name: "Siti M.",
    role: "Pengusaha Online",
    text: "Kirim barang dari Jakarta ke Medan cuma butuh 3 hari! Packing rapi dan aman.",
    rating: 5,
  },
  {
    name: "Budi S.",
    role: "Pelanggan",
    text: "Pelayanan CS-nya luar biasa, selalu sigap bantu tracking barang. Recommended banget!",
    rating: 5,
  },
  {
    name: "Dewi L.",
    role: "Corporate Client",
    text: "Saya pernah kirim barang besar dan berat, Cam Cargo tetap bisa tangani dengan baik. Profesional dan on time.",
    rating: 5,
  },
  {
    name: "Rini A.",
    role: "Pelanggan",
    text: "Suka banget pakai Cam Cargo, bisa jemput barang ke rumah, jadi nggak perlu repot ke drop point.",
    rating: 5,
  },
  {
    name: "Hendra P.",
    role: "Pelanggan Rutin",
    text: "Tarifnya kompetitif, cocok buat pengiriman rutin dalam jumlah banyak. Cam Cargo solusi logistik terbaik!",
    rating: 5,
  },
];

export const STATS = [
  { value: 5000, suffix: "+", label: "Pengiriman Sukses" },
  { value: 150, suffix: "+", label: "Kota Terlayani" },
  { value: 99, suffix: "%", label: "Kepuasan Pelanggan" },
  { value: 24, suffix: "/7", label: "Customer Support" },
];

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Fasilitas", href: "/fasilitas" },
  {
    label: "Layanan",
    href: "/layanan",
    children: SERVICES.map((s) => ({
      label: s.title,
      href: `/layanan/${s.slug}`,
    })),
  },
  { label: "Kemitraan", href: "/kemitraan-bisnis" },
  { label: "Tracking", href: "/tracking" },
  { label: "Cek Harga", href: "/cek-harga" },
  { label: "Kontak", href: "/kontak" },
];


export const TRACKING_STATUSES = [
  { key: "picked_up", label: "Dijemput", icon: "PackageCheck" },
  { key: "in_warehouse", label: "Di Gudang", icon: "Warehouse" },
  { key: "in_transit", label: "Dalam Perjalanan", icon: "Truck" },
  { key: "out_for_delivery", label: "Sedang Diantar", icon: "MapPin" },
  { key: "delivered", label: "Terkirim", icon: "CheckCircle" },
] as const;
