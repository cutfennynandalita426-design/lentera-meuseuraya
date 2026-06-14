export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Saat bencana banjir bandang melanda Sumatra dan terjadi blackout (mati lampu total) di suatu daerah, solusi energi terbaik jangka panjang yang paling aman dan ramah lingkungan untuk posko pengungsian adalah dengan memanfaatkan energi matahari (panel surya).",
    answers: ["BENAR", "SALAH"],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "Di wilayah tempat tinggal Doni sedang mengalami blackout berkepanjangan akibat bencana banjir. Karena takut kegelapan, Doni ikut-ikutan panic buying dengan memborong habis lilin di toko grosir dan mengantre bensin berjam-jam. Apakah tindakan yang dilakukan Doni itu tepat?",
    answers: ["BENAR", "SALAH"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Toko kelontong di desa terendam banjir dan warga panik berebut membeli baterai sekali pakai untuk senter. Alternatif teknologi energi terbarukan yang bisa dibagikan ke warga agar mereka tidak perlu panic buying baterai adalah senter bertenaga dinamo engkol atau tenaga surya mini.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "Saat listrik PLN padam total akibat banjir Sumatra, warga menyerbu toko untuk membeli lilin dan genset berbahan bakar minyak. Tindakan berbelanja berlebihan karena rasa panik ini disebut dengan istilah Panic Buying.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "Setelah banjir Sumatra surut, cuaca berubah menjadi sangat panas dan terik. Budi berpendapat bahwa semakin panas suhu udara di sekitar posko, maka panel surya akan menghasilkan listrik berkali-kali lipat lebih banyak.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "Menggabungkan beberapa panel surya kecil milik warga yang selamat menjadi satu jaringan lokal bersama (Mini-Grid) terbukti mampu mempercepat pemulihan energi desa dari dampak pemadaman total PLN.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "Panel surya darurat dipasang di atas atap posko pengungsian yang tinggi bebas dari banjir. Namun, sebagian permukaannya tertutup bayangan pohon besar (shading). Produksi listrik panel tersebut akan tetap keluar 100% maksimal karena matahari sangat terik.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 1,
  },
  {
    id: 8,
    question: "Menggunakan lampu jenis LED hemat daya di posko pengungsian Sumatra jauh lebih cerdas daripada memakai lampu pijar hias berdaya besar, karena bisa menghemat cadangan baterai surya untuk bertahan sepanjang malam.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 0,
  },
  {
    id: 9,
    question: "Berdasarkan prinsip efisiensi energi terbarukan, menggunakan energi dari panel surya di siang hari secara langsung untuk menyalakan pompa air tandon jauh lebih hemat baterai daripada menyalakan pompanya di malam hari.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 0,
  },
  {
    id: 10,
    question: "Energi matahari yang diubah oleh panel surya menjadi listrik adalah salah satu contoh energi terbarukan. Keuntungan utama menggunakan energi ini di lokasi bencana banjir Sumatra yang terisolasi adalah karena sumber energinya (matahari) tersedia gratis di alam dan sistemnya bisa berdiri sendiri tanpa bergantung pada kabel PLN yang putus.",
    answers: ["BENAR", "SALAH"],
    correctIndex: 0,
  },
];

export const TOTAL_QUESTIONS = 10;
export const POINTS_PER_CORRECT = 10;
export const MAX_SCORE = 100;
