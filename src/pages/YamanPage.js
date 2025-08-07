import React, { useState, useEffect } from 'react';
import { 
    createTheme, 
    ThemeProvider, 
    CssBaseline, 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Container, 
    Box, 
    Link, 
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    TextField,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack
} from '@mui/material';
import { 
    Mail, 
    CheckCircle, 
    Diamond, 
    Visibility, 
    LocationOn, 
    Phone, 
    Facebook, 
    Twitter, 
    Instagram, 
    LinkedIn,
    Menu as MenuIcon
} from '@mui/icons-material';

// --- TEMA VE STİLLER ---
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Mavi tonu
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: { fontWeight: 700, fontSize: '2.5rem', '@media (min-width:600px)': { fontSize: '3.5rem' } },
        h2: { fontWeight: 700, fontSize: '2rem', '@media (min-width:600px)': { fontSize: '3rem' } },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
    },
});

const sectionStyles = {
    py: { xs: 6, md: 10 },
    pt: { xs: 6, md: 10 },
};

// --- BİLEŞENLER ---

// Özel Logo Bileşeni (Header için)
const Logo = () => (
    <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Y'nin sol kolu - Bina */}
            <path d="M50 10 L50 90 L30 90 L30 50 Z" fill="#1976d2" />
            {/* Y'nin sağ kolu - Yol */}
            <path d="M50 10 C 80 20, 90 50, 70 90" stroke="#bbdefb" strokeWidth="12" fill="none" strokeLinecap="round" />
        </svg>
    </Box>
);

// Yeni Arka Plan Çizimleri Bileşeni
const BackgroundDrawings = () => (
    <Box
        sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            color: 'rgba(255, 255, 255, 0.08)', // Tüm çizimlerin rengi ve saydamlığı
        }}
    >
        {/* Sol Üst Köşe - Vinç Çizimi */}
        <Box sx={{ position: 'absolute', top: '5%', left: {xs: '2%', sm: '10%'}, width: {xs: '30%', sm:'15%'}, opacity: 0.8 }}>
             <svg viewBox="0 0 100 100">
                <path d="M20,90 L20,20 L70,20" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M70,20 L60,30" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M20,40 L30,40" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
        </Box>
        {/* Sağ Alt Köşe - Yol ve Araba Çizimi */}
        <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', width: {xs: '40%', sm:'30%'} }}>
            <svg viewBox="0 0 200 100">
                <path d="M0,80 C50,20 150,120 200,70" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M 140 83 L 145 83 L 150 78 L 160 78 L 165 83 L 170 83" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
        </Box>
         {/* Sağ Taraf - Bina Çizimi */}
        <Box sx={{ position: 'absolute', top: '30%', right: {xs: '5%', sm: '15%'}, width: {xs: '20%', sm:'12%'} }}>
            <svg viewBox="0 0 50 100">
                <rect x="10" y="20" width="30" height="80" stroke="currentColor" strokeWidth="3" fill="none" />
                 <rect x="18" y="30" width="14" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
                 <rect x="18" y="50" width="14" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
                 <rect x="18" y="70" width="14" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        </Box>
    </Box>
);


// Header Bileşeni
const Header = ({ activePage, handleNavigation }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { id: 'home', label: 'Ana Sayfa' },
        { id: 'construction', label: 'İnşaat' },
        { id: 'automotive', label: 'Otomotiv' },
        { id: 'projects', label: 'Projelerimiz' },
        { id: 'about', label: 'Hakkımızda' },
        { id: 'contact', label: 'İletişim' },
    ];

    const handleNavClick = (pageId) => {
        handleNavigation(pageId);
        if(mobileOpen) handleDrawerToggle();
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                YAMAN <Box component="span" sx={{ color: 'primary.main' }}>GRUP</Box>
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavClick(item.id)}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" color="default" elevation={2}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box 
                        component="a" 
                        href="#home"
                        onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            flexGrow: 1, 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                    >
                        <Logo />
                        <Typography 
                            variant="h5" 
                            sx={{ fontWeight: 'bold' }}
                        >
                            YAMAN <Box component="span" sx={{ color: 'primary.main' }}>GRUP</Box>
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {navItems.map((item) => (
                            <Button 
                                key={item.id} 
                                onClick={() => handleNavClick(item.id)}
                                sx={{ 
                                    fontWeight: activePage === item.id ? 'bold' : 'normal',
                                    color: activePage === item.id ? 'primary.main' : 'text.primary'
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Container>
             <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                anchor="right"
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

// Ana Sayfa Bileşeni
const HomePage = ({ handleNavigation }) => (
    <>
        <Box
            sx={{
                position: 'relative',
                height: '100vh', // Tam ekran yüksekliği
                backgroundColor: '#263238', // Koyu gri/mavi arka plan
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden',
            }}
        >
            <BackgroundDrawings />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
            
            <Container sx={{ zIndex: 1, py: 4 }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    Geleceği İnşa Ediyor, <br /> Hayalleri Taşıyoruz
                </Typography>
                <Typography variant="h6" component="p" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
                    Yaman İnşaat & Otomotiv olarak, kalite ve güvenden ödün vermeden iki farklı sektörde lider çözümler sunuyoruz.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    <Button variant="contained" size="large" onClick={() => handleNavigation('construction')}>İnşaat Projeleri</Button>
                    <Button variant="outlined" size="large" onClick={() => handleNavigation('automotive')} sx={{ color: 'white', borderColor: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>Otomotiv Hizmetleri</Button>
                </Stack>
            </Container>
        </Box>
        <Box sx={{ ...sectionStyles, bgcolor: 'background.paper' }}>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="h2" gutterBottom>İki Sektör, Tek Kalite Anlayışı</Typography>
                <Typography variant="body1" color="text.secondary">
                    Modern yaşam alanları tasarlarken, aynı zamanda güvenilir ve yenilikçi otomotiv çözümleriyle hayatınıza değer katıyoruz.
                </Typography>
            </Container>
        </Box>
    </>
);

const ServiceListItem = ({ icon, title, description }) => (
    <Grid container spacing={2} alignItems="flex-start">
        <Grid item><Box color="primary.main">{icon}</Box></Grid>
        <Grid item xs>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary">{description}</Typography>
        </Grid>
    </Grid>
);

// İnşaat Sayfası Bileşeni
const ConstructionPage = () => (
    <Container sx={sectionStyles}>
        <Typography variant="h2" align="center" gutterBottom>İnşaat</Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>Hayalinizdeki yapıları, sağlam temeller ve modern tasarımlarla hayata geçiriyoruz.</Typography>
        <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
                <Box component="img" src="https://placehold.co/600x400/60a5fa/ffffff?text=Modern+Mimari" alt="Modern Mimari" sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>Hizmetlerimiz</Typography>
                <Stack spacing={3}>
                    <ServiceListItem icon={<CheckCircle />} title="Konut Projeleri" description="Güvenli, konforlu ve estetik yaşam alanları inşa ediyoruz." />
                    <ServiceListItem icon={<CheckCircle />} title="Ticari Yapılar" description="İş dünyasının ihtiyaçlarına yönelik fonksiyonel ofisler ve mağazalar tasarlıyoruz." />
                    <ServiceListItem icon={<CheckCircle />} title="Kentsel Dönüşüm" description="Şehirlerimizi daha güvenli ve modern bir geleceğe taşıyoruz." />
                    <ServiceListItem icon={<CheckCircle />} title="Taahhüt ve Danışmanlık" description="Proje yönetimi ve danışmanlık hizmetlerimizle yanınızdayız." />
                </Stack>
            </Grid>
        </Grid>
    </Container>
);

// Otomotiv Sayfası Bileşeni
const AutomotivePage = () => (
    <Box sx={{ ...sectionStyles, bgcolor: 'background.paper' }}>
        <Container>
            <Typography variant="h2" align="center" gutterBottom>Otomotiv</Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>Geniş araç filomuz ve güvenilir hizmet anlayışımızla yolculuğunuzu keyfe dönüştürüyoruz.</Typography>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Typography variant="h4" gutterBottom>Hizmetlerimiz</Typography>
                    <Stack spacing={3}>
                        <ServiceListItem icon={<CheckCircle />} title="Sıfır ve İkinci El Araç Satışı" description="Her bütçeye uygun, ekspertiz garantili geniş araç yelpazesi." />
                        <ServiceListItem icon={<CheckCircle />} title="Servis ve Bakım" description="Uzman ekibimiz ve son teknoloji ekipmanlarımızla aracınız güvende." />
                        <ServiceListItem icon={<CheckCircle />} title="Filo Kiralama" description="Şirketler için esnek ve avantajlı uzun dönem araç kiralama çözümleri." />
                        <ServiceListItem icon={<CheckCircle />} title="Sigorta ve Finansman" description="Anlaşmalı kurumlarımızla en uygun sigorta ve kredi seçenekleri." />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <Box component="img" src="https://placehold.co/600x400/93c5fd/ffffff?text=Güvenilir+Araçlar" alt="Otomotiv" sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }} />
                </Grid>
            </Grid>
        </Container>
    </Box>
);

// Projeler Sayfası Bileşeni
const ProjectsPage = () => {
    const projects = [
        { img: 'https://placehold.co/600x400/38bdf8/ffffff?text=Yaman+Konakları', title: 'Yaman Konakları', desc: "İstanbul'un merkezinde, modern ve lüks bir yaşam projesi." },
        { img: 'https://placehold.co/600x400/38bdf8/ffffff?text=Ege+Villaları', title: 'Ege Villaları', desc: 'Doğa ile iç içe, huzurlu bir tatil ve yaşam alanı.' },
        { img: 'https://placehold.co/600x400/38bdf8/ffffff?text=Anadolu+İş+Merkezi', title: 'Anadolu İş Merkezi', desc: "Ankara'da prestijli ve modern bir ofis kompleksi." },
    ];
    return (
        <Container sx={sectionStyles}>
            <Typography variant="h2" align="center" gutterBottom>Tamamlanan Projelerimiz</Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>Kalite ve estetiği bir araya getirdiğimiz, gurur duyduğumuz çalışmalarımız.</Typography>
            <Grid container spacing={4}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia component="img" height="200" image={project.img} alt={project.title} />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">{project.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{project.desc}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

// Hakkımızda Sayfası Bileşeni
const AboutPage = () => (
    <Box sx={{ ...sectionStyles, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
            <Typography variant="h2" align="center" gutterBottom>Hakkımızda</Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>Yılların tecrübesiyle, güven inşa ediyoruz.</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'justify' }}>
                Yaman İnşaat & Otomotiv, 20 yılı aşkın süredir faaliyet gösterdiği sektörlerde kalite, güven ve müşteri memnuniyetini ilke edinmiş köklü bir kuruluştur. İnşaat sektöründe modern mimariyi, sağlam mühendislik altyapısıyla birleştirerek estetik ve fonksiyonel yaşam alanları yaratırken, otomotiv sektöründe ise geniş hizmet yelpazesi ve müşteri odaklı yaklaşımıyla fark yaratmaktadır.
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><Diamond sx={{ mr: 1, color: 'primary.main' }} />Misyonumuz</Typography>
                        <Typography variant="body2" color="text.secondary">Faaliyet gösterdiğimiz her alanda, en son teknolojiyi ve en iyi uygulamaları kullanarak, müşterilerimizin beklentilerini aşan, çevreye duyarlı, sürdürülebilir ve kaliteli projeler ve hizmetler sunmaktır.</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><Visibility sx={{ mr: 1, color: 'primary.main' }} />Vizyonumuz</Typography>
                        <Typography variant="body2" color="text.secondary">İnşaat ve otomotiv sektörlerinde, yenilikçi yaklaşımımız ve güvenilirliğimizle ulusal pazarda lider ve referans gösterilen bir marka olmaktır.</Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

// İletişim Sayfası Bileşeni
const ContactPage = () => (
    <Container sx={sectionStyles}>
        <Typography variant="h2" align="center" gutterBottom>Bize Ulaşın</Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>Soru, görüş ve projeleriniz için bizimle iletişime geçebilirsiniz.</Typography>
        <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Stack component="form" spacing={2}>
                        <TextField label="Adınız Soyadınız" variant="outlined" fullWidth />
                        <TextField label="E-posta Adresiniz" variant="outlined" fullWidth />
                        <TextField label="Mesajınız" variant="outlined" fullWidth multiline rows={4} />
                        <Button variant="contained" size="large">Mesajı Gönder</Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Typography variant="h5">İletişim Bilgilerimiz</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}><LocationOn sx={{ mr: 1, color: 'primary.main' }} /> Örnek Mah. Atatürk Cad. No:123, 34750 Ataşehir/İstanbul</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}><Phone sx={{ mr: 1, color: 'primary.main' }} /> +90 216 123 45 67</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}><Mail sx={{ mr: 1, color: 'primary.main' }} /> info@yamangrup.com.tr</Typography>
                        <Box sx={{ height: 250, width: '100%', mt: 2, borderRadius: 1, overflow: 'hidden' }}>
                        <iframe
                            title="Google Maps - Ataşehir, İstanbul"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.005888806584!2d29.1234567154101!3d40.9969444793019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8d9b9a7b7e5%3A0x8a9c4a8d4d4d4b3!2sAta%C5%9Fehir%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1678886543210!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
    
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    </Container>
);

// Footer Bileşeni
const Footer = ({ handleNavigation }) => (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h6" gutterBottom>Yaman İnşaat & Otomotiv</Typography>
                    <Typography variant="body2" color="grey.400">Geleceği inşa ediyor, hayalleri taşıyoruz. Kalite ve güvenin adresi.</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="h6" gutterBottom>Hızlı Erişim</Typography>
                    <Stack spacing={1}>
                        <Link href="#" onClick={(e) => {e.preventDefault(); handleNavigation('home');}} color="inherit" underline="hover">Ana Sayfa</Link>
                        <Link href="#" onClick={(e) => {e.preventDefault(); handleNavigation('construction');}} color="inherit" underline="hover">İnşaat</Link>
                        <Link href="#" onClick={(e) => {e.preventDefault(); handleNavigation('automotive');}} color="inherit" underline="hover">Otomotiv</Link>
                        <Link href="#" onClick={(e) => {e.preventDefault(); handleNavigation('projects');}} color="inherit" underline="hover">Projelerimiz</Link>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="h6" gutterBottom>Sosyal Medya</Typography>
                    <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                        <IconButton href="#" color="inherit"><Facebook /></IconButton>
                        <IconButton href="#" color="inherit"><Twitter /></IconButton>
                        <IconButton href="#" color="inherit"><Instagram /></IconButton>
                        <IconButton href="#" color="inherit"><LinkedIn /></IconButton>
                    </Stack>
                </Grid>
            </Grid>
            <Typography variant="body2" color="grey.500" align="center" sx={{ mt: 6, borderTop: 1, borderColor: 'grey.800', pt: 3 }}>
                &copy; {new Date().getFullYear()} Yaman İnşaat & Otomotiv San. ve Tic. Ltd. Şti. Tüm Hakları Saklıdır.
            </Typography>
        </Container>
    </Box>
);

// Ana Uygulama Bileşeni
export default function YamanPage() {
    const [activePage, setActivePage] = useState('home');

    // Sayfa kaydırıldığında aktif bölümü takip etmek için useEffect
    useEffect(() => {
        const sections = document.querySelectorAll('div[data-section-id]');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActivePage(entry.target.dataset.sectionId);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);


    const handlePageNavigation = (pageId) => {
        const section = document.querySelector(`[data-section-id="${pageId}"]`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header activePage={activePage} handleNavigation={handlePageNavigation} />
            <Box component="main">
                <div data-section-id="home"><HomePage handleNavigation={handlePageNavigation} /></div>
                <div data-section-id="construction"><ConstructionPage /></div>
                <div data-section-id="automotive"><AutomotivePage /></div>
                <div data-section-id="projects"><ProjectsPage /></div>
                <div data-section-id="about"><AboutPage /></div>
                <div data-section-id="contact"><ContactPage /></div>
            </Box>
            <Footer handleNavigation={handlePageNavigation} />
        </ThemeProvider>
    );
}
