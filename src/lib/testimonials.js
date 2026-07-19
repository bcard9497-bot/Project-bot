// Dummy testimonials (demo data). Each has ID + EN quote so it switches with language.
// Avatar is rendered as initials with a color; role/company are fictional.

export const TESTIMONIALS = [
  {
    name: 'Rani Wijaya',
    role: { id: 'Content Writer', en: 'Content Writer' },
    company: 'KreatifMedia',
    color: 'from-pink-500 to-rose-500',
    rating: 5,
    quote: {
      id: 'Sahabat AI menghemat waktu saya berjam-jam setiap minggu. Draf artikel yang biasanya butuh 3 jam kini selesai dalam 20 menit. Bahasa Indonesianya natural banget!',
      en: 'Sahabat AI saves me hours every week. Article drafts that used to take 3 hours now take 20 minutes. The Indonesian output feels so natural!',
    },
  },
  {
    name: 'Budi Santoso',
    role: { id: 'Software Developer', en: 'Software Developer' },
    company: 'TeknoLab',
    color: 'from-blue-500 to-cyan-500',
    rating: 5,
    quote: {
      id: 'Fitur multi-model-nya juara. Saya bisa pakai kunci API sendiri dan pindah model sesuai kebutuhan. Debugging kode jadi jauh lebih cepat.',
      en: 'The multi-model feature is a winner. I can use my own API key and switch models as needed. Debugging code is way faster now.',
    },
  },
  {
    name: 'Sari Melati',
    role: { id: 'Mahasiswa', en: 'University Student' },
    company: 'Universitas Indonesia',
    color: 'from-violet-500 to-purple-500',
    rating: 5,
    quote: {
      id: 'Sangat membantu untuk belajar dan mengerjakan tugas. Penjelasannya mudah dipahami dan bisa tanya dalam Bahasa Indonesia. Paket gratisnya sudah cukup untuk saya!',
      en: 'Super helpful for studying and assignments. The explanations are easy to understand and I can ask in Indonesian. The free plan is enough for me!',
    },
  },
  {
    name: 'Andi Pratama',
    role: { id: 'Pemilik UMKM', en: 'Small Business Owner' },
    company: 'Kopi Nusantara',
    color: 'from-amber-500 to-orange-500',
    rating: 5,
    quote: {
      id: 'Saya pakai Sahabat AI untuk bikin caption Instagram dan balas chat pelanggan. Penjualan naik karena konten jadi lebih konsisten. Worth it banget paket Pro-nya.',
      en: 'I use Sahabat AI to write Instagram captions and reply to customer chats. Sales went up because content is more consistent. The Pro plan is totally worth it.',
    },
  },
  {
    name: 'Dewi Anggraini',
    role: { id: 'Digital Marketer', en: 'Digital Marketer' },
    company: 'GrowthHub',
    color: 'from-emerald-500 to-teal-500',
    rating: 5,
    quote: {
      id: 'Ide kampanye, copywriting iklan, sampai email marketing semua dibantu Sahabat AI. Produktivitas tim saya meningkat drastis sejak berlangganan.',
      en: 'Campaign ideas, ad copy, email marketing — Sahabat AI helps with all of it. My team\u2019s productivity jumped drastically after subscribing.',
    },
  },
  {
    name: 'Fajar Nugroho',
    role: { id: 'Guru', en: 'Teacher' },
    company: 'SMA Harapan Bangsa',
    color: 'from-indigo-500 to-blue-500',
    rating: 4,
    quote: {
      id: 'Membantu saya menyusun materi ajar dan soal latihan dengan cepat. Antarmukanya bersih dan mudah dipakai, bahkan untuk yang tidak terlalu teknis.',
      en: 'Helps me prepare teaching materials and practice questions quickly. The interface is clean and easy to use, even for non-technical people.',
    },
  },
  {
    name: 'Maya Kusuma',
    role: { id: 'Copywriter Freelance', en: 'Freelance Copywriter' },
    company: 'Self-employed',
    color: 'from-fuchsia-500 to-pink-500',
    rating: 5,
    quote: {
      id: 'Sebagai freelancer, kecepatan adalah segalanya. Sahabat AI bikin saya bisa handle lebih banyak klien tanpa kompromi kualitas. Recommended!',
      en: 'As a freelancer, speed is everything. Sahabat AI lets me handle more clients without compromising quality. Highly recommended!',
    },
  },
  {
    name: 'Rizky Hidayat',
    role: { id: 'Data Analyst', en: 'Data Analyst' },
    company: 'FinData Corp',
    color: 'from-cyan-500 to-sky-500',
    rating: 5,
    quote: {
      id: 'Saya sering minta bantuan menjelaskan query SQL dan bikin ringkasan laporan. Jawabannya akurat dan cepat. Fitur sesi terpisah bikin kerja saya rapi.',
      en: 'I often ask it to explain SQL queries and summarize reports. The answers are accurate and fast. Separate sessions keep my work organized.',
    },
  },
  {
    name: 'Putri Larasati',
    role: { id: 'Manajer Produk', en: 'Product Manager' },
    company: 'StartupID',
    color: 'from-rose-500 to-red-500',
    rating: 5,
    quote: {
      id: 'Dari brainstorming fitur sampai menulis dokumentasi, Sahabat AI jadi partner harian tim kami. Harga langganannya sangat masuk akal untuk startup.',
      en: 'From feature brainstorming to writing documentation, Sahabat AI is our team\u2019s daily partner. The subscription price is very reasonable for a startup.',
    },
  },
]

export const STATS = [
  { value: '10.000+', label: { id: 'Pengguna Aktif', en: 'Active Users' } },
  { value: '4,9/5', label: { id: 'Rating Rata-rata', en: 'Average Rating' } },
  { value: '1 Juta+', label: { id: 'Pesan Diproses', en: 'Messages Processed' } },
  { value: '99,9%', label: { id: 'Waktu Aktif', en: 'Uptime' } },
]
