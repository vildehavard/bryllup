/* ========================================
  1. ELEMENTENE PÅ NETTSIDEN
   ======================================== */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-innhold");
const intro = document.querySelector(".intro");
const title = heroContent.querySelector("h1");
const date = document.querySelector(".dato");
const nav = document.querySelector("nav");
const rsvpLink = document.querySelector(".hero-rsvp");
const botanicalTop = document.querySelector(".botanical-top");
const botanicalBottom = document.querySelector(".botanical-bottom");


/* ========================================
  2. SCROLL-INNSTILLINGER
   ======================================== */

const stopGap = 18; /* Mellomrom mellom hero og menyen ETTER SCROLL */ 
const effectDistance = 150;



/* ========================================
   3. STARTVARIABLER - får verdi senere
   ======================================== */

    let desktopStartTop;
    let mobilStartTop;
    let heroBottom; /* Hvor bunnen av Hero-seksjonen ligger */
    let introHeight; /* Høyden på "Vi skal gifte oss!" */
    let rsvpStartTop;/* Startposisjon RSVP knapp */
    let bottomStartTop;/* Bunnblader startposisjon */


/* ========================================
   4. BEREGNING AV STARTPOSISJONER OG STØRRELSER
   ======================================== */

    function finnStartposisjon() {

    /* Hero-seksjonens plassering på siden */
        const heroRect = hero.getBoundingClientRect();

        const heroTop =
            heroRect.top + window.scrollY;


   /* Desktop: startposisjon for hero-teksten */
        desktopStartTop =
            heroTop + hero.offsetHeight * 0.20;


    /* Mobil: startposisjon for hero-teksten */
        mobilStartTop =
            heroTop + 40;


    /* Hvor bunnen av hero-seksjonen ligger */
        heroBottom =
            heroTop + hero.offsetHeight;


    /* Høyden på "Vi skal gifte oss" */
        introHeight =
            intro.offsetHeight + 5;


    /* Opprinnelig startposisjon for bunnbladene */
        bottomStartTop =
            botanicalBottom.getBoundingClientRect().top +
            window.scrollY;


    /* Opprinnelig startposisjon for RSVP */
        rsvpStartTop =
            heroBottom + 25;
    }


/* ========================================
   5A. KLARGJØR HERO - MOBIL
   ======================================== */

    function klargjorMobilHero() {

        finnStartposisjon();

        /* Mobil: hero-tekst */
        heroContent.style.position = "fixed";
        heroContent.style.left = "50%";
        heroContent.style.transform = "translateX(-50%)";
        heroContent.style.width = "100%";
        heroContent.style.zIndex = "100";
        heroContent.style.top = `${mobilStartTop}px`;


        /* Mobil: bunnblader */
        botanicalBottom.style.position = "fixed";
        botanicalBottom.style.left = "50%";
        botanicalBottom.style.top = `${bottomStartTop}px`;
        botanicalBottom.style.bottom = "auto";
        botanicalBottom.style.transform = "translateX(-50%)";
        botanicalBottom.style.zIndex = "99";


        /* Mobil: RSVP */
        rsvpLink.style.position = "fixed";
        rsvpLink.style.left = "50%";
        rsvpLink.style.transform = "translateX(-50%)";
        rsvpLink.style.width = "100%";
        rsvpLink.style.zIndex = "101";
        rsvpLink.style.top = `${rsvpStartTop}px`;
    }


/* ========================================
   5B. KLARGJØR HERO - DESKTOP
   ======================================== */

    function klargjorDesktopHero() {

        finnStartposisjon();

        /* Desktop: hero-tekst */
        heroContent.style.position = "fixed";
        heroContent.style.left = "50%";
        heroContent.style.transform = "translateX(-50%)";
        heroContent.style.width = "100%";
        heroContent.style.zIndex = "100";
        heroContent.style.top = `${desktopStartTop}px`;


        /* Desktop: bunnblader */
        botanicalBottom.style.position = "fixed";
        botanicalBottom.style.left = "50%";
        botanicalBottom.style.top = `${bottomStartTop}px`;
        botanicalBottom.style.bottom = "auto";
        botanicalBottom.style.transform = "translateX(-50%)";
        botanicalBottom.style.zIndex = "99";


        /* Desktop: RSVP */
        rsvpLink.style.position = "fixed";
        rsvpLink.style.left = "50%";
        rsvpLink.style.transform = "translateX(-50%)";
        rsvpLink.style.width = "100%";
        rsvpLink.style.zIndex = "101";
        rsvpLink.style.top = `${rsvpStartTop}px`;
    }

/* ========================================
   6. SCROLL- Mobil
   ======================================== */
function oppdaterMobilScroll() {

    /* Mobil HERO-POSISJON */

        const scrollPosition = window.scrollY;
        const progress = Math.min(scrollPosition / 80, 1);

        const stopTop = nav.offsetHeight + 2;
        const naturalTop = mobilStartTop - scrollPosition;
        const currentTop = Math.max(stopTop, naturalTop);

        heroContent.style.top = `${currentTop}px`;

    
    /* Mobil VI SKAL GIFTE OSS */

        const introProgress = Math.min(progress * 2, 1);

        intro.style.opacity = 1 - introProgress;
        intro.style.height =
            `${introHeight * (1 - introProgress)}px`;
        intro.style.marginBottom =
            `${15 * (1 - introProgress)}px`;
        intro.style.overflow = "hidden";


    /* Mobil VILDE & HÅVARD */
        title.style.fontSize =
            `${52 - progress * 8}px`;


    /* Mobil DATO */
        date.style.marginTop =
            `${20 - progress * 30}px`;

       

    /* Mobil TOPPBLADER */
        const leafFadeDistance = 40;
        const leafFadeProgress = Math.min(scrollPosition / leafFadeDistance, 1);

        botanicalTop.style.transform =
        `translate(-50%, ${progress * 140}px)`;

        botanicalTop.style.opacity = 1 - leafFadeProgress;

    /* Mobil BUNNBLADER */

        const dateRect =
        date.getBoundingClientRect();

        const gap = 10;

        botanicalBottom.style.top =
        `${dateRect.bottom + gap}px`;

    /* Mobil RSVP */
        const bottomRect = botanicalBottom.getBoundingClientRect();
        const rsvpGap = 2;

        rsvpLink.style.top = `${bottomRect.bottom + rsvpGap}px`;

    /* Mobil BAKGRUNN */
        const heroBakgrunn = document.querySelector(".hero-bakgrunn");
        const rsvpRect = rsvpLink.getBoundingClientRect();

        heroBakgrunn.style.height = `${rsvpRect.bottom + 15}px`;
    }


/* ========================================
   7. DESKTOP - SCROLL-EFFEKT
   ======================================== */

    function oppdaterScroll() {

    /* Hvis skjermen er mobil: bruk mobilfunksjonen i stedet */
        if (window.innerWidth <= 700) {
            oppdaterMobilScroll();
            return;
        }

    /* Desktop scroll progressjon fra 0-1, der 1 betyr at animasjonen er komplett */
        const scrollPosition = window.scrollY;

        const distance = effectDistance;

        const progress =
            Math.min(
                scrollPosition / distance,
                1
            );



   /* Desktop HERO-POSISJON OG STOPP */

        const stopTop =
            nav.offsetHeight + stopGap;

        const naturalTop =
            desktopStartTop - scrollPosition;

        const currentTop =
            Math.max(
                stopTop, 
                naturalTop
            );

        heroContent.style.top =
            `${currentTop}px`;


    /* Desktop - Vi skal gifte oss fader ut, blir mindre, justerer mellomrom under */

        const introProgress =
            Math.min(progress * 2, 1);

        intro.style.opacity =
            1 - introProgress;

        intro.style.height =
            `${introHeight * (1 - introProgress)}px`;

        intro.style.marginBottom =
            `${15 * (1 - introProgress)}px`;

        intro.style.overflow =
            "hidden";


    /* Desktop VILDE & HÅVARD - størrelse på tekst, teksten blir mindre under scroll */

        const titleStartSize =
            Math.min(
                100,
                Math.max(
                    30,
                    window.innerWidth * 0.06
                )
            );

        const titleSize =
            titleStartSize -
            progress * (titleStartSize * 0.22);

        title.style.fontSize =
            `${titleSize}px`;

    /* Desktop DATO - Skriftstørrelse, avstand over og under */

        const dateSize =
            14 - progress * 3;

        date.style.fontSize =
            `${dateSize}px`;

        const dateGap =
            25 - progress * 23;

        date.style.marginTop =
            `${dateGap}px`;


    /* Desktop TOPPBLADER - Bredde/størrelse, fade og bevegelse ut */

        const leafMovement =
            progress * 140;

        botanicalTop.style.width = `${55 - progress * 25}%`;

        botanicalTop.style.transform =
        `translate(-50%, ${leafMovement}px)`;

        botanicalTop.style.opacity =
            1 - progress;


    /* Desktop BUNNBLADER - Bredde/størrelse, fast avstand til dato: 10 px */

        const bottomWidth =
        55 - progress * 25;

        botanicalBottom.style.width =
            `${bottomWidth}%`;

        const dateRect =
            date.getBoundingClientRect();

        const gap = 10;

        botanicalBottom.style.top =
            `${dateRect.bottom + gap}px`;

    
    /* Desktop RSVP - følger sin naturlige startposisjon, men ender rett under bunnbladene.*/

        const bottomRect =
            botanicalBottom.getBoundingClientRect();

        const rsvpGap = 10;

        rsvpLink.style.top =
            `${bottomRect.bottom + rsvpGap}px`;

    /* Desktop BAKGRUNN */

        const heroBakgrunn = document.querySelector(".hero-bakgrunn");
        const rsvpRect = rsvpLink.getBoundingClientRect();

        heroBakgrunn.style.height = `${rsvpRect.bottom + 5}px`;

}

/* ========================================
   8. START SCRIPT
   ======================================== */

    if (window.innerWidth <= 700) {
        klargjorMobilHero();
    } 
    else {
        klargjorDesktopHero();
    }

    oppdaterScroll();


/* ========================================
   9. EVENT LISTNERS
   ======================================== */
    /* Kjør scroll-funksjon når brukeren scroller  */
        window.addEventListener(
            "scroll",
            oppdaterScroll
        );

    


