import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useDocumentTitle from '../hooks/useDocumentTitle';
import PageHeader from '../components/common/PageHeader';
import FeatureCard from '../components/common/FeatureCard';

export default function AboutPage() {
    useDocumentTitle('Tentang Kami');
    const programKerja = [
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Workshop & Seminar',
            desc: 'Pelatihan skill teknis dan soft skill untuk mahasiswa'
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0V9.499a2.25 2.25 0 00-2.25-2.25H11.75a2.25 2.25 0 00-2.25 2.25v5.876m5.004 0H9.5m2.25-12.25a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                </svg>
            ),
            title: 'Kompetisi',
            desc: 'Mengikuti dan menyelenggarakan kompetisi IT'
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.216 50.603 50.603 0 00-2.658.812m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            ),
            title: 'Mentoring',
            desc: 'Program pendampingan akademik dan non-akademik'
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
            title: 'Networking',
            desc: 'Membangun koneksi dengan industri dan alumni'
        },
    ];

    const ketuaList = [
        {
            nama: "Muhammad Rikza Nashrulloh",
            periode: "2014 / 2015",
            image: "/images/kahim12.jpg",
        },
        {
            nama: "Cecep Saepuloh",
            periode: "2015 / 2016",
            image: "/images/kahim13.jpg",
        },
        {
            nama: "Cecep Ilham Mudina",
            periode: "2016 / 2017",
            image: "/images/kahim14.jpg",
        },
        {
            nama: "M. Safik Aghna",
            periode: "2017 / 2018",
            image: "/images/kahim15.jpg",
        },
        {
            nama: "Fahmi Fadillah Septiana",
            periode: "2018 / 2019",
            image: "/images/kahim16.jpg",
        },
        {
            nama: "Aditia Agnan Fadillah",
            periode: "2019 / 2020",
            image: "/images/kahim17.jpg",
        },
        {
            nama: "Hari Ilham Nur Akbar",
            periode: "2020 / 2021",
            image: "/images/kahim18.jpg",
        },
        {
            nama: "Luthfi Abdurrahman Nashier",
            periode: "2021 / 2022",
            image: "/images/kahim19.jpg",
        },
        {
            nama: "Ramdan Rahmah Hidayat",
            periode: "2022 / 2023",
            image: "/images/kahim20.jpg",
        },
        {
            nama: "Muhammad Arif Syamsudin",
            periode: "2023 / 2024",
            image: "/images/kahim21.jpg",
        },
        {
            nama: "Gea Davids Khalik",
            periode: "2024 / 2025",
            image: "/images/kahim22.jpg",
        },
        {
            nama: "Sigit Firman Hakim",
            periode: "2025 / 2026",
            image: "/images/kahim23.jpg",
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Tentang HIMATIF ITG"
                description="Mengenal lebih dekat Himpunan Mahasiswa Teknik Informatika Institut Teknologi Garut."
                backgroundImage="/images/about-hero-bg.jpg"
            />

            {/* About Content */}
            <section className="py-16 bg-neutral-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-xl h-full">
                            <div className="bg-neutral-900/80 backdrop-blur-xl rounded-xl overflow-hidden h-full flex items-center justify-center p-8">
                                <img
                                    src="/images/logo-himatif.png"
                                    alt="Logo HIMATIF"
                                    className="w-full max-w-[280px] object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Sejarah Singkat</h2>
                            <p className="text-neutral-400 mb-4 leading-relaxed">
                                HIMATIF adalah organisasi mahasiswa di civitas akademika Institut Teknologi Garut yang bertempat di Kampus Institut Teknologi Garut, berasal dari HIMIF STTG yang disempurnakan menjadi HIMATIF STTG pada 17 September 2012 dan bertransformasi menjadi HIMATIF ITG pada 10 September 2021 hingga sekarang.
                            </p>
                            <p className="text-neutral-400 mb-4 leading-relaxed">
                                HIMATIF ITG (Himpunan Mahasiswa Teknik Informatika Institut Teknologi Garut) adalah organisasi yang menjadi wadah pengembangan, kreativitas, dan kolaborasi mahasiswa Teknik Informatika dalam mewujudkan insan teknologi yang berintegritas dan berdaya saing.
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
                                HIMATIF ITG (Himpunan Mahasiswa Teknik Informatika Institut Teknologi Garut) merupakan organisasi kemahasiswaan yang bernaung di bawah civitas akademika Institut Teknologi Garut. Organisasi ini menjadi wadah bagi mahasiswa Teknik Informatika untuk mengembangkan potensi diri, memperluas wawasan, serta berkontribusi dalam bidang akademik maupun non-akademik. Melalui HIMATIF, mahasiswa diharapkan dapat membangun solidaritas, meningkatkan kemampuan profesional, dan berperan aktif dalam kemajuan teknologi serta kehidupan kampus.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ketua Himpunan */}
            <section className="py-16 bg-neutral-950">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Deretan Ketua Himpunan
                    </h2>
                    <div className="px-4 md:px-12">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={24}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="pb-12"
                        >
                            {ketuaList.map((ketua, index) => (
                                <SwiperSlide key={index}>
                                    <div className="group relative w-full h-[350px] overflow-hidden rounded-xl mx-auto transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20">
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={ketua.image}
                                                alt={ketua.nama}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-8 text-left">
                                            <div className="transform transition-transform duration-300 tranneutral-y-2 group-hover:tranneutral-y-0">
                                                <p className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20 backdrop-blur-sm">
                                                    Periode {ketua.periode}
                                                </p>
                                                <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-orange-400 transition-colors">
                                                    {ketua.nama}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="py-16 bg-neutral-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-xl">
                            <div className="bg-neutral-900/80 backdrop-blur-xl p-8 rounded-xl h-full">
                                <h3 className="text-2xl font-bold text-white mb-4">Tujuan Kami</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Menampung seluruh elemen mahasiswa Program Studi Teknik Informatika Institut Teknologi Garut menuju kehidupan kampus kritis yang mengedepankan musyawarah mufakat, bertanggung jawab, dinamis, dan harmonis.
                                </p>
                            </div>
                        </div>
                        <div className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl">
                            <div className="bg-neutral-900/80 backdrop-blur-xl p-8 rounded-xl h-full">
                                <h3 className="text-2xl font-bold text-white mb-4">Fungsi Kami</h3>
                                <ul className="text-neutral-400 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-500">•</span>
                                        Prasarana pemberdayaan dan pengembangan keilmuan mahasiswa Teknik Informatika Institut Teknologi Garut.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-500">•</span>
                                        Menjalin hubungan dengan Organisasi Sosial/Kemasyarakatan, Profesi/Fungsional, dan Perhimpunan untuk mengembangkan organisasi di dalam maupun di luar lingkungan Institut Teknologi Garut dan yang sejalan dengan HIMATIF.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-500">•</span>
                                        Prasarana untuk menyalurkan aspirasi dan partisipasi mahasiswa Program Studi Teknik Informatika Institut Teknologi Garut.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-500">•</span>
                                        Sarana komunikasi dan pemersatu mahasiswa Program Studi Teknik Informatika Institut Teknologi Garut.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Kerja */}
            <section className="py-16 bg-neutral-950">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Program Kerja Unggulan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programKerja.map((program, index) => (
                            <FeatureCard
                                key={index}
                                icon={program.icon}
                                title={program.title}
                                description={program.desc}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-neutral-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Tertarik Bergabung?
                    </h2>
                    <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                        Jadilah bagian dari keluarga besar HIMATIF ITG dan kembangkan potensimu bersama kami.
                    </p>
                    <Link
                        to="/join"
                        className="inline-block bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            </section>
        </div>
    );
}
