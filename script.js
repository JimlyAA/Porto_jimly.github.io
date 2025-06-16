document.addEventListener('DOMContentLoaded', () => {
    // Memilih elemen-elemen DOM yang dibutuhkan
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu ul li a');
    
    // Targetkan semua elemen yang memiliki kelas .section-content untuk animasi
    const sectionsToAnimate = document.querySelectorAll('.section-content');
    
    // Targetkan semua project-card untuk animasi individual
    const projectCardsToAnimate = document.querySelectorAll('.project-card');

    // --- Fungsionalitas Hamburger Menu ---
    hamburger.addEventListener('click', () => {
        // Mengaktifkan/menonaktifkan kelas 'active' pada hamburger dan menu
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Menutup menu saat link navigasi diklik (penting untuk mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Hanya tutup menu jika hamburger aktif (berarti di tampilan mobile)
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active'); // Matikan hamburger (kembali ke 3 garis)
                navMenu.classList.remove('active');   // Sembunyikan menu
            }
        });
    });

    // --- Smooth Scrolling untuk Navigasi ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah perilaku default (loncat langsung)

            // Scroll ke elemen target dengan efek mulus
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Animasi Fade-in saat Scroll (Intersection Observer) ---
    const observerOptions = {
        root: null, // Mengamati viewport sebagai root
        threshold: 0.1, // Ketika 10% dari elemen terlihat, pemicu animasi
        rootMargin: "0px" // Tidak ada margin tambahan pada root
    };

    // Observer untuk sections (About, Education, dll.)
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opsional: berhenti mengamati setelah animasi pertama agar tidak berulang
                // observer.unobserve(entry.target);
            } else {
                // Opsional: hapus kelas 'visible' saat elemen keluar dari viewport
                // untuk memungkinkan animasi berulang saat di-scroll lagi
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Amati setiap section-content
    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });

    // Observer terpisah untuk project-card agar bisa ada stagger effect jika diinginkan
    // Untuk stagger effect, kita akan sedikit modifikasi observerOptions
    const projectCardObserverOptions = {
        root: null,
        threshold: 0.2, // Mulai animasi lebih awal untuk kartu
        rootMargin: "0px"
    };

    const projectCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Menambahkan kelas visible dan potensi delay untuk stagger effect
                entry.target.classList.add('visible');
                // Menghentikan pengamatan setelah terlihat
                observer.unobserve(entry.target); 
            }
        });
    }, projectCardObserverOptions);

    // Amati setiap project-card
    projectCardsToAnimate.forEach(card => {
        projectCardObserver.observe(card);
    });
});