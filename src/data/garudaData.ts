export interface AnatomyPart {
  id: string;
  name: string;
  count?: number;
  significance: string;
  detail: string;
  philosophicalMeaning: string;
  interactiveHint: string;
}

export interface SilaData {
  number: number;
  name: string;
  symbol: string;
  symbolName: string;
  background: string;
  bgHex: string;
  meaning: string;
  philosophicalDetail: string;
  examples: {
    home: string[];
    school: string[];
    community: string[];
  };
  colorTheme: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Anatomi' | 'Nilai Sila' | 'Sejarah' | 'Semboyan';
}

export interface SilaScenario {
  id: number;
  situation: string;
  context: string;
  correctSila: number;
  explanation: string;
}

export const ANATOMY_PARTS: Record<string, AnatomyPart> = {
  sayap: {
    id: 'sayap',
    name: 'Bulu Sayap (Kiri & Kanan)',
    count: 17,
    significance: 'Melambangkan Tanggal Kemerdekaan (17)',
    detail: 'Masing-masing sayap Burung Garuda memiliki tepat 17 helai bulu terbentang kokoh ke angkasa.',
    philosophicalMeaning: 'Menggambarkan tanggal 17 Agustus 1945, saat bangsa Indonesia memproklamasikan kemerdekaannya. Sayap yang membentang lebar melambangkan kekuatan, dinamisme, dan kesiapan bangsa untuk terbang tinggi menggapai kemajuan dunia.',
    interactiveHint: 'Klik sayap kiri atau kanan untuk melihat hitungan 17 helai bulu.'
  },
  ekor: {
    id: 'ekor',
    name: 'Bulu Ekor Utama',
    count: 8,
    significance: 'Melambangkan Bulan Kemerdekaan (8 / Agustus)',
    detail: 'Terdapat tepat 8 helai bulu pada ekor bagian bawah Burung Garuda.',
    philosophicalMeaning: 'Melambangkan bulan ke-8 (Agustus) dalam kalender masehi, bulan proklamasi kemerdekaan Republik Indonesia. Ekor berfungsi sebagai penyeimbang dan kemudi dalam terbang, melambangkan kestabilan dan arah tujuan bangsa.',
    interactiveHint: 'Klik ekor bawah untuk melihat 8 helai bulu penyeimbang.'
  },
  pangkalEkor: {
    id: 'pangkalEkor',
    name: 'Bulu Pangkal Ekor (Bawah Perisai)',
    count: 19,
    significance: 'Melambangkan Angka Pertama Tahun Kemerdekaan (19)',
    detail: 'Terdapat 19 helai bulu di pangkal ekor, persis berada di bawah perisai jantung.',
    philosophicalMeaning: 'Menyusun dua digit pertama tahun 1945. Keberadaannya menopang perisai kebangsaan, mencerminkan fondasi sejarah perjuangan panjang bangsa Indonesia.',
    interactiveHint: 'Klik area pangkal ekor di bawah perisai untuk melihat 19 helai bulu.'
  },
  leher: {
    id: 'leher',
    name: 'Bulu Leher',
    count: 45,
    significance: 'Melambangkan Dua Digit Akhir Tahun Kemerdekaan (45)',
    detail: 'Terdapat tepat 45 helai bulu halus yang melingkari dan menghiasi leher Garuda.',
    philosophicalMeaning: 'Melambangkan angka 45 dari tahun 1945. Jika digabungkan: 17 (Sayap) - 8 (Ekor) - 19 (Pangkal Ekor) - 45 (Leher) menjadi tanggal keramat 17 Agustus 1945.',
    interactiveHint: 'Klik area leher garuda untuk menghitung 45 bulu kemerdekaan.'
  },
  perisai: {
    id: 'perisai',
    name: 'Perisai Jantung (Tameng Pancasila)',
    significance: 'Simbol Perlindungan, Pertahanan, & Jiwa Pancasila',
    detail: 'Berbentuk menyerupai jantung yang digantung di leher garuda dengan rantai emas.',
    philosophicalMeaning: 'Perisai dikenal sejak peradaban nusantara kuno sebagai senjata pertahanan dalam pertempuran. Perisai ini melambangkan pertahanan dan perjuangan bangsa Indonesia dalam membela kebenaran serta kedaulatan tanah air.',
    interactiveHint: 'Klik bagian perisai untuk mengeksplorasi 5 sila dan garis khatulistiwa.'
  },
  khatulistiwa: {
    id: 'khatulistiwa',
    name: 'Garis Hitam Tebal Khatulistiwa',
    significance: 'Simbol Garis Khatulistiwa Nusantara',
    detail: 'Garis hitam horizontal tegas di tengah perisai yang membelah ruang sila.',
    philosophicalMeaning: 'Melukiskan garis khatulistiwa (ekuator) yang melintasi kepulauan Indonesia dari timur ke barat. Menegaskan letak geografis Indonesia sebagai negara kepulauan zamrud khatulistiwa beriklim tropis yang subur dan damai.',
    interactiveHint: 'Klik garis hitam melintang di tengah perisai.'
  },
  pita: {
    id: 'pita',
    name: 'Cakar & Pita Bhinneka Tunggal Ika',
    significance: 'Semboyan Kebangsaan Pemersatu Bangsa',
    detail: 'Pita putih dicengkeram erat oleh kedua cakar kokoh Garuda, bertuliskan "Bhinneka Tunggal Ika".',
    philosophicalMeaning: 'Kutipan dari Kitab Sutasoma karya Mpu Tantular di era Kerajaan Majapahit abad ke-14. Maknanya: "Berbeda-beda tetapi tetap satu jua". Mengikat ratusan suku, bahasa, adat, dan agama dalam satu ikatan persaudaraan Indonesia.',
    interactiveHint: 'Klik pita putih bertuliskan Bhinneka Tunggal Ika.'
  },
  kepala: {
    id: 'kepala',
    name: 'Kepala Menoleh ke Kanan',
    significance: 'Simbol Kebajikan & Optimisme Masa Depan',
    detail: 'Kepala burung Garuda menatap tegas ke sebelah kanan (dari sudut pandang burung) dengan jambul gagah.',
    philosophicalMeaning: 'Dalam tradisi dan filsafat nusantara serta universal, kanan melambangkan kebajikan, kemuliaan, keberkahan, serta jalan kebenaran. Menatap optimis ke masa depan bangsa yang adil dan beradab.',
    interactiveHint: 'Klik kepala Garuda yang gagah bermahkota jambul.'
  },
  emas: {
    id: 'emas',
    name: 'Warna Keemasan Garuda',
    significance: 'Simbol Keagungan & Kejayaan Martabat Bangsa',
    detail: 'Seluruh bulu dan tubuh Garuda disepuh warna kuning emas mulia.',
    philosophicalMeaning: 'Warna emas melambangkan kemuliaan, kejayaan, kebesaran, dan cita-cita luhur bangsa untuk menjadi bangsa yang berdaulat, mandiri, dan berkepribadian luhur.',
    interactiveHint: 'Klik latar tubuh keemasan Garuda.'
  }
};

export const SILA_LIST: SilaData[] = [
  {
    number: 1,
    name: 'Ketuhanan Yang Maha Esa',
    symbol: 'bintang',
    symbolName: 'Bintang Emas Bersudut Lima',
    background: 'Perisai Latar Hitam Pekat',
    bgHex: '#18181B',
    meaning: 'Cahaya spiritual yang dipancarkan Tuhan YME kepada setiap insan manusia.',
    philosophicalDetail: 'Bintang dengan lima sudut melambangkan cahaya kerohanian bagi lima agama besar yang diakui dan seluruh keyakinan rakyat Indonesia. Latar warna hitam melambangkan warna alam atau warna asli ciptaan Tuhan yang abadi.',
    examples: {
      home: [
        'Berdoa bersama keluarga sebelum makan dan sebelum tidur.',
        'Menghormati orang tua yang sedang menunaikan ibadah.',
        'Membiasakan diri bersyukur atas rezeki dan kesehatan.'
      ],
      school: [
        'Tidak membeda-bedakan teman berdasarkan agama dan keyakinannya.',
        'Menghormati teman yang sedang berpuasa atau beribadah di sekolah.',
        'Mengikuti kegiatan doa bersama di kelas dengan khidmat.'
      ],
      community: [
        'Menjaga ketenangan dan kerukunan di sekitar tempat ibadah warga.',
        'Membantu tetangga yang merayakan hari besar keagamaan tanpa memaksakan keyakinan.',
        'Menolak segala bentuk ujaran kebencian berbasis SARA.'
      ]
    },
    colorTheme: 'amber'
  },
  {
    number: 2,
    name: 'Kemanusiaan yang Adil dan Beradab',
    symbol: 'rantai',
    symbolName: 'Rantai Baja Emas (Gelang Persegi & Bulat)',
    background: 'Perisai Latar Merah Berani',
    bgHex: '#DC2626',
    meaning: 'Hubungan persaudaraan antar manusia yang saling membutuhkan dan bersatu kokoh.',
    philosophicalDetail: 'Rantai terdiri dari mata rantai berbentuk segi empat (melambangkan laki-laki) dan mata rantai berbentuk lingkaran (melambangkan perempuan) yang saling terhubung erat tanpa putus. Ini melambangkan kesetaraan gender dan solidaritas sesama manusia.',
    examples: {
      home: [
        'Menyayangi adik dan kakak serta bertutur kata sopan kepada orang tua.',
        'Membantu orang tua merawat anggota keluarga yang sedang sakit.',
        'Tidak bertindak semena-mena kepada siapapun di rumah.'
      ],
      school: [
        'Menolong teman yang terjatuh atau tertimpa musibah.',
        'Tidak melakukan perundungan (bullying) baik perkataan maupun fisik.',
        'Mengembangkan sikap tenggang rasa dan tepa salira.'
      ],
      community: [
        'Menyalurkan bantuan kemanusiaan bagi korban bencana alam.',
        'Menjenguk tetangga yang sakit atau membutuhkan bantuan moral.',
        'Memperlakukan semua orang dengan adil dan sopan tanpa memandang status sosial.'
      ]
    },
    colorTheme: 'rose'
  },
  {
    number: 3,
    name: 'Persatuan Indonesia',
    symbol: 'pohon',
    symbolName: 'Pohon Beringin Rindang',
    background: 'Perisai Latar Putih Suci',
    bgHex: '#F8FAFC',
    meaning: 'Peneduh bagi seluruh rakyat dan keberagaman akar budaya Indonesia.',
    philosophicalDetail: 'Pohon beringin adalah pohon besar berdaun lebat yang mampu menaungi banyak orang di bawahnya, menggambarkan negara Republik Indonesia yang melindungi segenap tumpah darah. Sulur-sulur dan akar tunjang yang kokoh mencerminkan latar belakang suku, bahasa, dan budaya nusantara yang beraneka ragam namun tetap bersatu dalam satu batang negara kesatuan.',
    examples: {
      home: [
        'Menjaga kerukunan keluarga dan menghindari pertengkaran antarsaudara.',
        'Mengutamakan kepentingan kebersamaan keluarga di atas ego pribadi.',
        'Mengenalkan tradisi dan bahasa daerah leluhur dengan bangga.'
      ],
      school: [
        'Melaksanakan upacara bendera hari Senin dengan tertib dan disiplin.',
        'Bekerja sama dalam piket kelas atau tugas kelompok tanpa memilih-milih kawan.',
        'Menghargai keberagaman bahasa dan adat teman sekelas dari berbagai daerah.'
      ],
      community: [
        'Ikut serta aktif dalam kerja bakti (gotong royong) membersihkan lingkungan RT/RW.',
        'Mencintai dan bangga membeli produk-produk buatan dalam negeri (UMKM lokal).',
        'Menjaga keutuhan dan keamanan lingkungan tempat tinggal bersama.'
      ]
    },
    colorTheme: 'emerald'
  },
  {
    number: 4,
    name: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
    symbol: 'banteng',
    symbolName: 'Kepala Banteng Tangguh',
    background: 'Perisai Latar Merah Perjuangan',
    bgHex: '#DC2626',
    meaning: 'Musyawarah mufakat untuk mengambil keputusan bersama demi kebaikan bersama.',
    philosophicalDetail: 'Banteng merupakan hewan mamalia sosial nusantara yang senang berkumpul dan hidup berkelompok. Ini mencerminkan budaya musyawarah Indonesia di mana orang-orang berkumpul bersama mendiskusikan masalah untuk mencapai kata mufakat dengan kepala dingin.',
    examples: {
      home: [
        'Bermusyawarah menentukan tujuan liburan keluarga bersama anak dan orang tua.',
        'Menyelesaikan perbedaan pendapat di rumah dengan diskusi damai.',
        'Menghormati keputusan bersama yang telah disepakati di rumah.'
      ],
      school: [
        'Melakukan pemilihan ketua kelas secara musyawarah atau voting adil.',
        'Menghargai pendapat teman dalam diskusi kelompok walau berbeda pandangan.',
        'Menerima hasil keputusan musyawarah kelas dengan lapang dada dan ikhlas.'
      ],
      community: [
        'Menghadiri rapat musyawarah warga pemilihan ketua RW/RT.',
        'Mengutamakan mufakat dalam pembagian jadwal ronda malam siskamling.',
        'Tidak memaksakan kehendak sepihak dalam rapat warga.'
      ]
    },
    colorTheme: 'red'
  },
  {
    number: 5,
    name: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
    symbol: 'padiKapas',
    symbolName: 'Padi dan Kapas Kesejahteraan',
    background: 'Perisai Latar Putih Bersih',
    bgHex: '#F8FAFC',
    meaning: 'Kebutuhan dasar sandang dan pangan untuk kemakmuran merata.',
    philosophicalDetail: 'Padi melambangkan ketersediaan makanan pokok (pangan), sedangkan kapas melambangkan bahan baku pakaian (sandang). Keduanya merupakan simbol kebutuhan hidup paling mendasar manusia. Sila ke-5 menegaskan bahwa keadilan sosial terwujud bila seluruh rakyat mendapatkan hak hidup layak tanpa ada kesenjangan yang menindas.',
    examples: {
      home: [
        'Membiasakan hidup hemat dan gemar menabung di celengan/bank.',
        'Membagi makanan atau mainan secara adil bersama adik dan kakak.',
        'Menghargai jerih payah orang tua yang bekerja keras mencari nafkah.'
      ],
      school: [
        'Menghargai hasil karya dan prestasi yang diraih teman sekelas.',
        'Melaksanakan kewajiban piket kelas dengan adil tanpa melimpahkan pada orang lain.',
        'Tidak bersikap boros atau pamer barang mewah di lingkungan sekolah.'
      ],
      community: [
        'Menghormati hak-hak fasilitas umum pengguna jalan dan pejalan kaki.',
        'Membantu meringankan beban warga yang kurang mampu secara tulus.',
        'Menjaga keseimbangan antara hak pribadi dan kewajiban kepada masyarakat.'
      ]
    },
    colorTheme: 'yellow'
  }
];

export const SCENARIOS: SilaScenario[] = [
  {
    id: 1,
    situation: 'Dina mempersilakan Siti untuk melaksanakan salat Asar terlebih dahulu sebelum mereka melanjutkan belajar kelompok bersama.',
    context: 'Toleransi Antarumat Beragama',
    correctSila: 1,
    explanation: 'Sila 1 (Bintang Emas) menekankan sikap saling menghormati dan memberi kebebasan beribadah sesuai keyakinan masing-masing.'
  },
  {
    id: 2,
    situation: 'Seluruh siswa kelas 5 mengumpulkan sumbangan sukarela untuk membantu biaya pengobatan salah satu teman mereka yang tertimpa musibah.',
    context: 'Kepedulian & Kemanusiaan',
    correctSila: 2,
    explanation: 'Sila 2 (Rantai Emas) mengajarkan nilai kemanusiaan yang adil dan beradab, berjiwa tolong-menolong sesama manusia tanpa pamrih.'
  },
  {
    id: 3,
    situation: 'Warga desa dari berbagai suku Sunda, Jawa, dan Batak bergotong-royong memperbaiki jembatan desa yang rusak karena luapan air sungai.',
    context: 'Persatuan & Gotong Royong',
    correctSila: 3,
    explanation: 'Sila 3 (Pohon Beringin) mengutamakan persatuan dan kesatuan bangsa di atas perbedaan latar belakang suku atau golongan.'
  },
  {
    id: 4,
    situation: 'Ketua kelas bersama seluruh murid berdiskusi secara terbuka dan santun untuk menentukan jadwal piket dan tema dekorasi kelas.',
    context: 'Musyawarah Mufakat',
    correctSila: 4,
    explanation: 'Sila 4 (Kepala Banteng) mengamanatkan pengambilan keputusan melalui musyawarah untuk mencapai mufakat secara bijaksana.'
  },
  {
    id: 5,
    situation: 'Budi selalu menyisihkan uang sakunya untuk ditabung dan membagi waktu bermain serta belajar secara berimbang dan bertanggung jawab.',
    context: 'Keadilan Sosial & Hidup Hemat',
    correctSila: 5,
    explanation: 'Sila 5 (Padi dan Kapas) menganjurkan sikap hemat, tidak bergaya hidup mewah berlebihan, dan berlaku adil terhadap diri sendiri maupun orang lain.'
  },
  {
    id: 6,
    situation: 'Keluarga Pak Anto menyempatkan waktu berdoa bersama dan bersyukur atas rezeki hari ini sebelum menyantap makan malam.',
    context: 'Rasa Syukur kepada Tuhan',
    correctSila: 1,
    explanation: 'Sila 1 (Ketuhanan Yang Maha Esa) mendasari ketaatan beribadah dan rasa syukur manusia kepada Sang Pencipta.'
  },
  {
    id: 7,
    situation: 'Rian membela temannya yang diejek oleh anak lain dan menegur anak tersebut dengan sopan agar tidak melakukan perundungan.',
    context: 'Menjunjung Nilai Kemanusiaan',
    correctSila: 2,
    explanation: 'Sila 2 (Kemanusiaan yang Adil dan Beradab) menolak keras segala bentuk perundungan (bullying) dan menjunjung martabat manusia.'
  },
  {
    id: 8,
    situation: 'Sekolah menyelenggarakan festival busana tradisional nusantara dan seluruh siswa dengan bangga mengenakan pakaian adat daerah.',
    context: 'Cinta Budaya Tanah Air',
    correctSila: 3,
    explanation: 'Sila 3 (Persatuan Indonesia) menumbuhkan rasa bangga dan cinta terhadap kekayaan budaya tanah air Indonesia.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Berapakah jumlah helai bulu pada masing-masing sayap Burung Garuda Pancasila?',
    options: ['8 helai', '17 helai', '19 helai', '45 helai'],
    correctIndex: 1,
    explanation: 'Sayap Burung Garuda memiliki masing-masing 17 helai bulu yang melambangkan tanggal kemerdekaan Republik Indonesia (17 Agustus).',
    category: 'Anatomi'
  },
  {
    id: 2,
    question: 'Bulu ekor Burung Garuda berjumlah 8 helai. Angka ini melambangkan apa?',
    options: ['Tanggal proklamasi', 'Bulan kemerdekaan (Agustus)', 'Jumlah pulau besar Indonesia', 'Tahun 1945'],
    correctIndex: 1,
    explanation: 'Jumlah 8 helai bulu pada ekor melambangkan bulan Agustus, yaitu bulan ke-8 saat proklamasi kemerdekaan Indonesia dibacakan.',
    category: 'Anatomi'
  },
  {
    id: 3,
    question: 'Jumlah bulu leher Burung Garuda Pancasila berjumlah 45 helai yang melambangkan...',
    options: ['Tahun kemerdekaan 1945', 'Usia presiden pertama', '45 provinsi di Indonesia', '45 sila dalam butir Pancasila'],
    correctIndex: 0,
    explanation: 'Bulu leher berjumlah 45 helai melambangkan dua angka terakhir tahun kemerdekaan 1945.',
    category: 'Anatomi'
  },
  {
    id: 4,
    question: 'Semboyan "Bhinneka Tunggal Ika" yang dicengkeram kaki Garuda diambil dari kitab...',
    options: ['Kitab Negarakertagama karya Mpu Prapanca', 'Kitab Sutasoma karya Mpu Tantular', 'Kitab Bharatayuddha karya Mpu Sedah', 'Kitab Ramayana karya Walmiki'],
    correctIndex: 1,
    explanation: 'Semboyan "Bhinneka Tunggal Ika" berasal dari Kitab Sutasoma karangan Mpu Tantular pada masa Kerajaan Majapahit abad ke-14.',
    category: 'Semboyan'
  },
  {
    id: 5,
    question: 'Lambang Sila Pertama "Ketuhanan Yang Maha Esa" digambarkan dengan simbol...',
    options: ['Kepala Banteng', 'Rantai Emas', 'Bintang Emas bersudut lima', 'Pohon Beringin'],
    correctIndex: 2,
    explanation: 'Sila pertama dilambangkan dengan Bintang Emas berlatar hitam pekat di tengah perisai jantung Garuda.',
    category: 'Nilai Sila'
  },
  {
    id: 6,
    question: 'Mata rantai pada lambang Sila Kedua terdiri dari gelang berbentuk segi empat dan lingkaran. Gelang segi empat melambangkan...',
    options: ['Perempuan', 'Laki-laki', 'Anak-anak', 'Para pahlawan'],
    correctIndex: 1,
    explanation: 'Gelang persegi empat melambangkan laki-laki, sedangkan gelang lingkaran melambangkan perempuan. Keduanya saling mengait mencerminkan persatuan umat manusia.',
    category: 'Nilai Sila'
  },
  {
    id: 7,
    question: 'Garis hitam tebal mendatar yang melintang di tengah-tengah perisai Garuda melambangkan...',
    options: ['Garis khatulistiwa yang melintasi kepulauan Indonesia', 'Batas wilayah daratan dan lautan', 'Jalan raya trans nusantara', 'Sungai terpanjang di Kalimantan'],
    correctIndex: 0,
    explanation: 'Garis hitam tebal melambangkan garis khatulistiwa (ekuator) yang melintasi bentangan nusantara dari barat ke timur.',
    category: 'Anatomi'
  },
  {
    id: 8,
    question: 'Padi dan Kapas sebagai lambang Sila Kelima melambangkan kebutuhan pokok manusia, yaitu...',
    options: ['Pendidikan dan kesehatan', 'Pangan (makanan) dan Sandang (pakaian)', 'Rumah dan transportasi', 'Keamanan dan kebebasan'],
    correctIndex: 1,
    explanation: 'Padi melambangkan ketersediaan pangan dan kapas melambangkan sandang, sebagai syarat mutlak kemakmuran dan keadilan sosial yang merata.',
    category: 'Nilai Sila'
  },
  {
    id: 9,
    question: 'Siapakah tokoh nasional yang merancang bentuk awal lambang negara Garuda Pancasila?',
    options: ['Mohammad Hatta', 'Sultan Hamid II', 'Ki Hadjar Dewantara', 'Achmad Soebardjo'],
    correctIndex: 1,
    explanation: 'Sultan Hamid II dari Pontianak adalah tokoh perancang rancangan awal lambang negara yang kemudian disempurnakan oleh Presiden Soekarno.',
    category: 'Sejarah'
  },
  {
    id: 10,
    question: 'Mengapa kepala Burung Garuda Pancasila menoleh ke arah kanan?',
    options: ['Karena sayap kanan lebih berat', 'Mengikuti arah terbitnya matahari', 'Melambangkan kebaikan, kebajikan, dan optimisme jalan kebenaran', 'Sebagai tanda bahwa musuh ada di sebelah kiri'],
    correctIndex: 2,
    explanation: 'Dalam tradisi dan filsafat universal nusantara, arah kanan melambangkan kebajikan, kemuliaan, serta jalan kebenaran dan optimisme masa depan.',
    category: 'Anatomi'
  }
];

export const HISTORY_TIMELINE = [
  {
    year: '10 Januari 1950',
    title: 'Pembentukan Panitia Lencana Negara',
    desc: 'Pemerintah Republik Indonesia Serikat (RIS) membentuk Panitia Lencana Negara yang diketuai Ki Hajar Dewantara dan dikoordinir Sultan Hamid II untuk menyeleksi usulan rancangan lambang negara.'
  },
  {
    year: '8 Februari 1950',
    title: 'Rancangan Sultan Hamid II Terpilih',
    desc: 'Rancangan lambang negara berupa figur burung Rajawali-Garuda karya Sultan Hamid II terpilih untuk diajukan ke Presiden Soekarno dan kabinet RIS.'
  },
  {
    year: '11 Februari 1950',
    title: 'Diresmikan dalam Sidang Kabinet RIS',
    desc: 'Lambang negara Garuda Pancasila secara resmi diperkenalkan pertama kali kepada publik di Hotel Des Indes, Jakarta, dalam Sidang Kabinet RIS.'
  },
  {
    year: '20 Maret 1950',
    title: 'Penyempurnaan Akhir oleh Presiden Soekarno',
    desc: 'Bung Karno memberi masukan penting: menambahkan jambul pada kepala Garuda (agar tidak mirip Bald Eagle lambang Amerika Serikat) dan mengubah cakar memegang pita dari posisi belakang menjadi mencengkeram ke depan. Pelukis istana D. Dirk Ruhl Jr. melukis versi definitif.'
  },
  {
    year: '17 Oktober 1951',
    title: 'Pengesahan PP No. 66 Tahun 1951',
    desc: 'Garuda Pancasila secara hukum disahkan sebagai Lambang Negara Republik Indonesia yang sah dan diatur dalam Peraturan Pemerintah No. 66 Tahun 1951.'
  }
];

export const LAGU_GARUDA = {
  title: 'Garuda Pancasila',
  creator: 'Sudharnoto (1956)',
  tempo: 'Marcia / Mars (Tegas dan Bersemangat)',
  lyrics: [
    { text: 'Garuda Pancasila', note: 'Sol-do-mi-do-sol-do' },
    { text: 'Akulah pendukungmu', note: 'Mi-fa-sol-fa-mi-re' },
    { text: 'Patriot proklamasi', note: 'Fa-mi-re-do-si-do' },
    { text: 'Sedia berkorban untukmu', note: 'Re-mi-fa-sol-la-sol' },
    { text: 'Pancasila dasar negara', note: 'Do-do-re-mi-fa-sol' },
    { text: 'Rakyat adil makmur sentosa', note: 'Fa-mi-re-do-re-mi-re' },
    { text: 'Pribadi bangsaku', note: 'Sol-la-si-do-re-do' },
    { text: 'Ayo maju maju, ayo maju maju, ayo maju maju!', note: 'Do-re-mi-fa-sol-la-si-do' }
  ],
  meaning: 'Lagu mars perjuangan yang menumbuhkan tekad kesetiaan dan kesiapan setiap warga negara untuk membela dan mengamalkan nilai-nilai luhur Pancasila demi kemakmuran seluruh rakyat Indonesia.'
};
