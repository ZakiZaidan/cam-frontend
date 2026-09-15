// data/indonesia-cities.ts — Daftar provinsi dan kab/kota seluruh Indonesia
// Kelurahan khusus Kalimantan Timur diambil dari API (/cities/structured)

export interface IndonesiaProvince {
  name: string;
  cities: string[];
}

export const INDONESIA_PROVINCES: IndonesiaProvince[] = [
  {
    name: "Aceh",
    cities: ["Banda Aceh","Sabang","Lhokseumawe","Langsa","Subulussalam","Kab Aceh Besar","Kab Aceh Utara","Kab Aceh Timur","Kab Aceh Tamiang","Kab Bireuen","Kab Pidie","Kab Pidie Jaya","Kab Aceh Jaya","Kab Aceh Barat","Kab Nagan Raya","Kab Aceh Barat Daya","Kab Aceh Selatan","Kab Aceh Singkil","Kab Gayo Lues","Kab Aceh Tengah","Kab Bener Meriah","Kab Aceh Tenggara","Kab Simeulue"],
  },
  {
    name: "Sumatera Utara",
    cities: ["Medan","Pematangsiantar","Binjai","Tebing Tinggi","Sibolga","Tanjungbalai","Padangsidimpuan","Gunungsitoli","Kab Deli Serdang","Kab Langkat","Kab Karo","Kab Simalungun","Kab Asahan","Kab Labuhanbatu","Kab Labuhanbatu Utara","Kab Labuhanbatu Selatan","Kab Tapanuli Utara","Kab Tapanuli Selatan","Kab Tapanuli Tengah","Kab Mandailing Natal","Kab Humbang Hasundutan","Kab Toba","Kab Samosir","Kab Pak Pak Bharat","Kab Dairi","Kab Nias","Kab Nias Utara","Kab Nias Selatan","Kab Nias Barat","Kab Padang Lawas","Kab Padang Lawas Utara","Kab Batu Bara","Kab Serdang Bedagai"],
  },
  {
    name: "Sumatera Barat",
    cities: ["Padang","Bukittinggi","Payakumbuh","Padang Panjang","Pariaman","Sawahlunto","Solok","Kab Agam","Kab Tanah Datar","Kab Padang Pariaman","Kab Solok","Kab Solok Selatan","Kab Sijunjung","Kab Dharmasraya","Kab Pesisir Selatan","Kab Lima Puluh Koto","Kab Pasaman","Kab Pasaman Barat","Kab Kepulauan Mentawai"],
  },
  {
    name: "Riau",
    cities: ["Pekanbaru","Dumai","Kab Kampar","Kab Pelalawan","Kab Siak","Kab Indragiri Hulu","Kab Indragiri Hilir","Kab Rokan Hulu","Kab Rokan Hilir","Kab Kuantan Singingi","Kab Kepulauan Meranti","Kab Bengkalis"],
  },
  {
    name: "Kepulauan Riau",
    cities: ["Batam","Tanjungpinang","Kab Bintan","Kab Karimun","Kab Lingga","Kab Natuna","Kab Kepulauan Anambas"],
  },
  {
    name: "Jambi",
    cities: ["Jambi","Sungai Penuh","Kab Batanghari","Kab Muaro Jambi","Kab Tanjung Jabung Barat","Kab Tanjung Jabung Timur","Kab Bungo","Kab Tebo","Kab Sarolangun","Kab Merangin","Kab Kerinci"],
  },
  {
    name: "Sumatera Selatan",
    cities: ["Palembang","Prabumulih","Pagar Alam","Lubuklinggau","Kab Ogan Komering Ulu","Kab Ogan Komering Ilir","Kab Muara Enim","Kab Lahat","Kab Musi Banyuasin","Kab Musi Rawas","Kab Musi Rawas Utara","Kab Banyuasin","Kab Ogan Komering Ulu Timur","Kab Ogan Komering Ulu Selatan","Kab Ogan Ilir","Kab Empat Lawang","Kab Penukal Abab Lematang Ilir"],
  },
  {
    name: "Bengkulu",
    cities: ["Bengkulu","Kab Bengkulu Selatan","Kab Bengkulu Tengah","Kab Bengkulu Utara","Kab Kaur","Kab Kepahiang","Kab Lebong","Kab Mukomuko","Kab Rejang Lebong","Kab Seluma"],
  },
  {
    name: "Lampung",
    cities: ["Bandar Lampung","Metro","Kab Lampung Barat","Kab Lampung Selatan","Kab Lampung Tengah","Kab Lampung Timur","Kab Lampung Utara","Kab Mesuji","Kab Pesawaran","Kab Pesisir Barat","Kab Pringsewu","Kab Tanggamus","Kab Tulang Bawang","Kab Tulang Bawang Barat","Kab Way Kanan"],
  },
  {
    name: "Kepulauan Bangka Belitung",
    cities: ["Pangkalpinang","Kab Bangka","Kab Bangka Barat","Kab Bangka Selatan","Kab Bangka Tengah","Kab Belitung","Kab Belitung Timur"],
  },
  {
    name: "DKI Jakarta",
    // "JAKARTA" & "Jakarta (periok)" sesuai format origin_city di DB
    cities: ["Jakarta Pusat","Jakarta Utara","Jakarta Barat","Jakarta Selatan","Jakarta Timur","JAKARTA","Jakarta (periok)","Kepulauan Seribu"],
  },
  {
    name: "Jawa Barat",
    cities: ["Bandung","Bogor","Bekasi","Depok","Cimahi","Sukabumi","Tasikmalaya","Banjar","Cirebon","Kab Bandung","Kab Bandung Barat","Kab Bekasi","Kab Bogor","Kab Ciamis","Kab Cianjur","Kab Cirebon","Kab Garut","Kab Indramayu","Kab Karawang","Kab Kuningan","Kab Majalengka","Kab Pangandaran","Kab Purwakarta","Kab Subang","Kab Sukabumi","Kab Sumedang","Kab Tasikmalaya"],
  },
  {
    name: "Banten",
    cities: ["Serang","Tangerang","Cilegon","Tangerang Selatan","Kab Serang","Kab Tangerang","Kab Pandeglang","Kab Lebak"],
  },
  {
    name: "DI Yogyakarta",
    cities: ["Yogyakarta","Kab Bantul","Kab Sleman","Kab Gunung Kidul","Kab Kulon Progo"],
  },
  {
    name: "Jawa Tengah",
    cities: ["Semarang","Solo","Salatiga","Magelang","Pekalongan","Tegal","Kab Banjarnegara","Kab Banyumas","Kab Batang","Kab Blora","Kab Boyolali","Kab Brebes","Kab Cilacap","Kab Demak","Kab Grobogan","Kab Jepara","Kab Karanganyar","Kab Kebumen","Kab Kendal","Kab Klaten","Kab Kudus","Kab Magelang","Kab Pati","Kab Pekalongan","Kab Pemalang","Kab Purbalingga","Kab Purworejo","Kab Rembang","Kab Semarang","Kab Sragen","Kab Sukoharjo","Kab Tegal","Kab Temanggung","Kab Wonogiri","Kab Wonosobo"],
  },
  {
    name: "Jawa Timur",
    // "Surabaya (Perak)" sesuai format origin_city di DB
    cities: ["Surabaya","Surabaya (Perak)","Malang","Kediri","Blitar","Mojokerto","Probolinggo","Pasuruan","Madiun","Batu","Kab Bangkalan","Kab Banyuwangi","Kab Blitar","Kab Bojonegoro","Kab Bondowoso","Kab Gresik","Kab Jember","Kab Jombang","Kab Kediri","Kab Lamongan","Kab Lumajang","Kab Madiun","Kab Magetan","Kab Malang","Kab Mojokerto","Kab Nganjuk","Kab Ngawi","Kab Pacitan","Kab Pamekasan","Kab Pasuruan","Kab Ponorogo","Kab Probolinggo","Kab Sampang","Kab Sidoarjo","Kab Situbondo","Kab Sumenep","Kab Trenggalek","Kab Tuban","Kab Tulungagung"],
  },
  {
    name: "Bali",
    cities: ["Denpasar","Kab Badung","Kab Bangli","Kab Buleleng","Kab Gianyar","Kab Jembrana","Kab Karangasem","Kab Klungkung","Kab Tabanan"],
  },
  {
    name: "Nusa Tenggara Barat",
    cities: ["Mataram","Bima","Kab Bima","Kab Dompu","Kab Lombok Barat","Kab Lombok Tengah","Kab Lombok Timur","Kab Lombok Utara","Kab Sumbawa","Kab Sumbawa Barat"],
  },
  {
    name: "Nusa Tenggara Timur",
    cities: ["Kupang","Kab Alor","Kab Belu","Kab Ende","Kab Flores Timur","Kab Kupang","Kab Lembata","Kab Malaka","Kab Manggarai","Kab Manggarai Barat","Kab Manggarai Timur","Kab Nagekeo","Kab Ngada","Kab Rote Ndao","Kab Sabu Raijua","Kab Sikka","Kab Sumba Barat","Kab Sumba Barat Daya","Kab Sumba Tengah","Kab Sumba Timur","Kab Timor Tengah Selatan","Kab Timor Tengah Utara"],
  },
  {
    name: "Kalimantan Barat",
    cities: ["Pontianak","Singkawang","Kab Bengkayang","Kab Kapuas Hulu","Kab Kayong Utara","Kab Ketapang","Kab Kubu Raya","Kab Landak","Kab Mempawah","Kab Melawi","Kab Sambas","Kab Sanggau","Kab Sekadau","Kab Sintang"],
  },
  {
    name: "Kalimantan Tengah",
    cities: ["Palangka Raya","Kab Barito Selatan","Kab Barito Timur","Kab Barito Utara","Kab Gunung Mas","Kab Kapuas","Kab Katingan","Kab Kotawaringin Barat","Kab Kotawaringin Timur","Kab Lamandau","Kab Murung Raya","Kab Pulang Pisau","Kab Seruyan","Kab Sukamara"],
  },
  {
    name: "Kalimantan Selatan",
    cities: ["Banjarmasin","Banjarbaru","Kab Balangan","Kab Banjar","Kab Barito Kuala","Kab Hulu Sungai Selatan","Kab Hulu Sungai Tengah","Kab Hulu Sungai Utara","Kab Kotabaru","Kab Tabalong","Kab Tanah Bumbu","Kab Tanah Laut","Kab Tapin"],
  },
  {
    name: "Kalimantan Timur",
    // Urutan: Kota → Kab yang punya kelurahan di DB → kota langsung dari DB (tanpa prefix)
    cities: [
      "Kota Samarinda",       // kelurahan dari API
      "Kota Balikpapan",      // kelurahan dari API
      "Kota Bontang",
      "Kab Kutai Kartanegara",// kelurahan dari API
      "Kab Paser",            // kelurahan dari API
      "Kab Penajam Paser Utara", // kelurahan dari API
      "Kab Kutai Timur",
      "Kab Kutai Barat",
      "Kab Mahakam Ulu",
      // Kota langsung (sesuai format DB) — tarif sudah ada
      "IKN",
      "Tenggarong",
      "Sangata",
      "Berau",
      "Melak",
      "Kaliorang",
      "Tepian Langsat",
      "Teluk Pandan",
    ],
  },
  {
    name: "Kalimantan Utara",
    cities: ["Tarakan","Kab Bulungan","Kab Malinau","Kab Nunukan","Kab Tana Tidung"],
  },
  {
    name: "Sulawesi Utara",
    cities: ["Manado","Bitung","Tomohon","Kotamobagu","Kab Bolaang Mongondow","Kab Bolaang Mongondow Selatan","Kab Bolaang Mongondow Timur","Kab Bolaang Mongondow Utara","Kab Kepulauan Sangihe","Kab Kepulauan Siau Tagulandang Biaro","Kab Kepulauan Talaud","Kab Minahasa","Kab Minahasa Selatan","Kab Minahasa Tenggara","Kab Minahasa Utara"],
  },
  {
    name: "Gorontalo",
    cities: ["Gorontalo","Kab Bone Bolango","Kab Gorontalo","Kab Gorontalo Utara","Kab Boalemo","Kab Pohuwato"],
  },
  {
    name: "Sulawesi Tengah",
    cities: ["Palu","Kab Banggai","Kab Banggai Kepulauan","Kab Banggai Laut","Kab Buol","Kab Donggala","Kab Morowali","Kab Morowali Utara","Kab Parigi Moutong","Kab Poso","Kab Sigi","Kab Tojo Una-Una","Kab Tolitoli"],
  },
  {
    name: "Sulawesi Barat",
    cities: ["Mamuju","Kab Majene","Kab Mamasa","Kab Mamuju Tengah","Kab Pasangkayu","Kab Polewali Mandar"],
  },
  {
    name: "Sulawesi Selatan",
    cities: ["Makassar","Parepare","Palopo","Kab Bantaeng","Kab Barru","Kab Bone","Kab Bulukumba","Kab Enrekang","Kab Gowa","Kab Jeneponto","Kab Kepulauan Selayar","Kab Luwu","Kab Luwu Timur","Kab Luwu Utara","Kab Maros","Kab Pangkajene dan Kepulauan","Kab Pinrang","Kab Sidenreng Rappang","Kab Sinjai","Kab Soppeng","Kab Takalar","Kab Tana Toraja","Kab Toraja Utara","Kab Wajo"],
  },
  {
    name: "Sulawesi Tenggara",
    cities: ["Kendari","Bau-Bau","Kab Bombana","Kab Buton","Kab Buton Selatan","Kab Buton Tengah","Kab Buton Utara","Kab Kolaka","Kab Kolaka Timur","Kab Kolaka Utara","Kab Konawe","Kab Konawe Kepulauan","Kab Konawe Selatan","Kab Konawe Utara","Kab Muna","Kab Muna Barat","Kab Wakatobi"],
  },
  {
    name: "Maluku",
    cities: ["Ambon","Tual","Kab Buru","Kab Buru Selatan","Kab Kepulauan Aru","Kab Maluku Barat Daya","Kab Maluku Tengah","Kab Maluku Tenggara","Kab Seram Bagian Barat","Kab Seram Bagian Timur"],
  },
  {
    name: "Maluku Utara",
    cities: ["Ternate","Tidore Kepulauan","Kab Halmahera Barat","Kab Halmahera Tengah","Kab Halmahera Timur","Kab Halmahera Selatan","Kab Halmahera Utara","Kab Kepulauan Sula","Kab Pulau Morotai","Kab Pulau Taliabu"],
  },
  {
    name: "Papua Barat",
    cities: ["Manokwari","Kab Fakfak","Kab Kaimana","Kab Manokwari Selatan","Kab Maybrat","Kab Pegunungan Arfak","Kota Sorong","Kab Raja Ampat","Kab Sorong","Kab Sorong Selatan","Kab Tambrauw","Kab Teluk Bintuni","Kab Teluk Wondama"],
  },
  {
    name: "Papua Barat Daya",
    cities: ["Sorong","Kab Maybrat","Kab Raja Ampat","Kab Sorong Selatan","Kab Tambrauw"],
  },
  {
    name: "Papua",
    cities: ["Jayapura","Kab Asmat","Kab Biak Numfor","Kab Boven Digoel","Kab Jayapura","Kab Jayawijaya","Kab Keerom","Kab Kepulauan Yapen","Kab Mamberamo Raya","Kab Mappi","Kab Merauke","Kab Nabire","Kab Sarmi","Kab Supiori","Kab Waropen"],
  },
  {
    name: "Papua Selatan",
    cities: ["Merauke","Kab Asmat","Kab Boven Digoel","Kab Mappi"],
  },
  {
    name: "Papua Tengah",
    cities: ["Nabire","Kab Deiyai","Kab Dogiyai","Kab Intan Jaya","Kab Mimika","Kab Paniai","Kab Puncak","Kab Puncak Jaya"],
  },
  {
    name: "Papua Pegunungan",
    cities: ["Wamena","Kab Jayawijaya","Kab Lanny Jaya","Kab Mamberamo Tengah","Kab Nduga","Kab Pegunungan Bintang","Kab Tolikara","Kab Yahukimo","Kab Yalimo"],
  },
];

// Kalimantan Timur punya data kelurahan dari API
export const KALTIM_PROVINCE_NAME = "Kalimantan Timur";
