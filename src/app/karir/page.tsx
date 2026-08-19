import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Users, 
  Send,
  Target,
  Briefcase,
  Rocket,
  Handshake,
  Coins,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Karir — CAM Cargo | Bergabung Bersama Kami",
  description:
    "Bergabunglah dengan tim CAM Cargo dan bangun karir di industri logistik & transportasi terkemuka di Kalimantan Timur.",
};

// ─── Icon mapping by job type ────────────────────────────────────────────────
const TYPE_ICONS: Record<string, React.ElementType> = {
  "Full-time": Target,
  "Part-time": Clock,
  "Freelance": Briefcase,
  "Kontrak":   Users,
  "Magang":    Rocket,
};
const getIcon = (type: string): React.ElementType =>
  TYPE_ICONS[type] ?? Briefcase;

// ─── Fetch from API ───────────────────────────────────────────────────────────
interface ApiPosition {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
  wa_text: string | null;
  requirements: string[];
  benefits: string[];
}

async function getPositions(): Promise<ApiPosition[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  try {
    const res = await fetch(`${apiUrl}/career`, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

const values = [
  {
    icon: Rocket,
    title: "Pertumbuhan Cepat",
    desc: "CAM Cargo sedang dalam fase ekspansi. Bergabung sekarang artinya Anda bisa tumbuh bersama perusahaan.",
  },
  {
    icon: Handshake,
    title: "Tim yang Solid",
    desc: "Lingkungan kerja yang suportif, kolaboratif, dan saling mendukung untuk mencapai target bersama.",
  },
  {
    icon: Coins,
    title: "Reward yang Kompetitif",
    desc: "Sistem kompensasi transparan dengan komisi yang menarik untuk menghargai kontribusi Anda.",
  },
  {
    icon: MapPin,
    title: "Fokus Kalimantan Timur",
    desc: "Spesialis logistik di IKN & Kaltim — pasar yang terus berkembang dengan peluang yang sangat besar.",
  },
];

export default async function KarirPage() {
  const positions = await getPositions();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-[#111827] border-b border-gray-100/10 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15 grayscale mix-blend-luminosity"
              style={{ backgroundImage: "url('/images/car-transport.png')" }}
            />
          </div>
          {/* Red accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />

          <div className="relative z-10 px-12 md:px-20 lg:px-32 xl:px-44 pb-20 pt-32 lg:pt-48 w-full max-w-[1500px] mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-medium tracking-[0.25em] text-red-500 uppercase mb-6">
                Bergabung Bersama Kami
              </span>
              <h1 className="text-white leading-[1.1] tracking-tight">
                <span className="block font-light text-5xl lg:text-7xl mb-3">
                  Karir di
                </span>
                <span className="block font-semibold text-5xl lg:text-7xl text-white">
                  CAM Cargo
                </span>
              </h1>
              <p className="mt-8 text-white/60 font-light text-lg max-w-xl leading-relaxed">
                Jadilah bagian dari tim yang membangun tulang punggung logistik
                Kalimantan Timur. Kami mencari individu bersemangat yang ingin
                tumbuh bersama.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <span className="w-10 h-[2px] bg-red-600" />
                <span className="text-sm tracking-[0.2em] text-white/50 uppercase font-medium">
                  {positions.length} Posisi Tersedia
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Why CAM Cargo */}
        <section className="bg-white px-12 md:px-20 lg:px-32 xl:px-44 py-20 max-w-[1500px] mx-auto">
          <h2 className="text-2xl font-light text-[#111827] mb-12">
            Mengapa Bergabung dengan CAM Cargo?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="group p-8 border border-gray-100 rounded-3xl hover:border-red-100 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 bg-white relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-12 h-12 bg-gray-50 text-gray-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center rounded-2xl mb-8 transition-all duration-300 relative z-10">
                  <v.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-[#111827] mb-3 relative z-10">{v.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed relative z-10">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 max-w-[1500px] mx-auto px-12 md:px-20 lg:px-32 xl:px-44" />

        {/* Positions */}
        <section className="bg-white px-12 md:px-20 lg:px-32 xl:px-44 py-20 max-w-[1500px] mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-light text-[#111827] mb-3">
              Posisi yang Tersedia
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Pilih peran yang sesuai dengan passion Anda dan bergabunglah dengan kami.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {positions.length === 0 ? (
              <div className="text-center py-16 text-gray-400 font-light">
                Belum ada posisi yang tersedia saat ini. Silakan cek kembali nanti.
              </div>
            ) : positions.map((pos) => {
              const Icon = getIcon(pos.type);
              return (
              <article
                key={pos.id}
                id={String(pos.id)}
                className="group border border-gray-100 rounded-3xl overflow-hidden hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-300 bg-white"
              >
                {/* Header */}
                <div className="bg-gray-50/50 px-8 py-8 flex flex-col md:flex-row md:items-center gap-6 border-b border-gray-100 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-2xl text-red-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#111827] mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {pos.title}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                        <Clock size={12} className="text-gray-400" />{pos.type}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                        <MapPin size={12} className="text-gray-400" />{pos.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/6281146602305?text=${encodeURIComponent(pos.wa_text ?? `Halo CAM Cargo, saya tertarik melamar posisi ${pos.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:ml-auto nics-pill mt-4 md:mt-0 group/btn"
                  >
                    <span className="nics-pill__text">
                      <span className="nics-pill__label flex items-center gap-2">
                        <Send size={14} className="opacity-70 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        Daftar Sekarang
                      </span>
                    </span>
                    <span className="nics-pill__badge"><ArrowRight size={16} /></span>
                  </a>
                </div>

                {/* Body */}
                <div className="px-8 py-10 grid md:grid-cols-12 gap-12">
                  <div className="md:col-span-12">
                    <p className="text-gray-600 font-light leading-relaxed text-[15px] max-w-4xl">{pos.description}</p>
                  </div>
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><Users size={14} /></div>
                      <h4 className="text-sm font-medium text-[#111827]">Kualifikasi</h4>
                    </div>
                    <ul className="space-y-4">
                      {pos.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600 font-light">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                          <span className="leading-relaxed">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-5 bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-green-500"><TrendingUp size={14} /></div>
                      <h4 className="text-sm font-medium text-[#111827]">Yang Anda Dapatkan</h4>
                    </div>
                    <ul className="space-y-4">
                      {pos.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600 font-light">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="bg-[#111827] px-12 md:px-20 lg:px-32 xl:px-44 py-24 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-600/10 to-transparent blur-3xl" />
          
          <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
            <div className="max-w-xl">
              <span className="inline-block text-xs font-medium tracking-[0.25em] text-red-500 uppercase mb-4">
                Kirim CV Spontan
              </span>
              <h2 className="text-3xl font-light text-white mb-4 leading-tight">
                Tidak ada posisi yang <br/><span className="font-medium">cocok untuk Anda?</span>
              </h2>
              <p className="text-white/60 font-light text-[15px] leading-relaxed">
                Kirim CV Anda tetap — kami selalu mencari talenta hebat dan akan menyimpannya untuk kebutuhan rekrutmen berikutnya.
              </p>
            </div>
            <a
              href="https://wa.me/6281146602305?text=Halo%20CAM%20Cargo%2C%20saya%20ingin%20mengirim%20CV%20spontan%20untuk%20dipertimbangkan%20di%20rekrutmen%20berikutnya."
              target="_blank"
              rel="noopener noreferrer"
              className="nics-pill group flex-shrink-0"
            >
              <span className="nics-pill__text">
                <span className="nics-pill__label flex items-center gap-2">
                  <Send size={14} className="opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Kirim CV via WhatsApp
                </span>
              </span>
              <span className="nics-pill__badge">
                <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
