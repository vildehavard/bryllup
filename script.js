/* ========================================
   ELEMENTER
   ======================================== */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-innhold");
const intro = document.querySelector(".intro");
const title = heroContent.querySelector("h1");
const date = document.querySelector(".dato");
const nav = document.querySelector("nav");
const rsvpLink = document.querySelector(".hero-rsvp");

    

/* ========================================
   INNSTILLINGER
   ======================================== */

/* Avstand mellom navigasjonen og overskriften */

const stopGap = 18;


/* Hvor langt man scroller mens
   teksten trekker seg sammen */

const effectDistance = 300;


/* ========================================
   STARTVERDIER
   ======================================== */

let startTop;
let heroBottom;
let introHeight;
let rsvpStartTop;


/* ========================================
   FINN STARTPOSISJONER
   ======================================== */

function finnStartposisjon() {

    const heroRect = hero.getBoundingClientRect();

    const heroTop =
        heroRect.top + window.scrollY;

    startTop =
        heroTop +
        (hero.offsetHeight - heroContent.offsetHeight) / 2;

    heroBottom =
        heroTop + hero.offsetHeight;
    
    /* ========================================
   RSVP STARTER UNDER BOTANICAL-RAMMEN
   ======================================== */

    rsvpStartTop =
        heroBottom + 25;

    introHeight =
        intro.offsetHeight;
}


/* ========================================
   KLARGJØR HERO-TEKSTEN
   ======================================== */

function klargjorHeroTekst() {

    finnStartposisjon();

    heroContent.style.position = "fixed";
    heroContent.style.left = "50%";
    heroContent.style.transform = "translateX(-50%)";
    heroContent.style.width = "100%";
    heroContent.style.zIndex = "100";

    /* ========================================
   KLARGJØR RSVP-LENKEN
   ======================================== */

    rsvpLink.style.position = "fixed";
    rsvpLink.style.left = "50%";
    rsvpLink.style.transform = "translateX(-50%)";
    rsvpLink.style.width = "100%";
    rsvpLink.style.zIndex = "101";
}


/* ========================================
   SCROLL-EFFEKT
   ======================================== */

function oppdaterScroll() {

    const scrollPosition =
        window.scrollY;


    const progress =
        Math.min(
            scrollPosition / effectDistance,
            1
        );
    

    /* ========================================
       POSISJON UNDER NAVIGASJONEN
       ======================================== */

    const stopTop =
        nav.offsetHeight + stopGap;


    /* ========================================
       NATURLIG POSISJON NÅR SIDEN SCROLLER
       ======================================== */

    const naturalTop =
        startTop - scrollPosition;


    /* ========================================
   OVERSKRIFTEN STOPPER UNDER MENYEN
   OG BLIR VÆRENDE DER
   ======================================== */

const currentTop =
    Math.max(stopTop, naturalTop);


    heroContent.style.top =
        `${currentTop}px`;


    /* ========================================
       FINN UT OM OVERSKRIFTEN ER FESTET
       ======================================== */

   const isFestet =
    naturalTop <= stopTop;


    if (isFestet) {

        heroContent.classList.add("festet");

    } else {

        heroContent.classList.remove("festet");

    }


    /* ========================================
       BOTANISK RAMME FADER UT
       ======================================== */

    hero.style.setProperty(
        "--background-opacity",
        1 - progress
    );

/* ========================================
   RSVP-LENKEN STARTER UNDER BLADENE
   OG TREKKES GRADVIS OPP MOT DATOEN
   ======================================== */

/* Der RSVP naturlig ville vært mens siden scroller */
const rsvpNaturalTop =
    rsvpStartTop - scrollPosition;


/* Der RSVP skal ende:
   rett under den faste hero-teksten */
const rsvpTargetTop =
    currentTop +
    heroContent.offsetHeight +
    6;


/* Flytt gradvis fra startposisjonen
   til plassen rett under datoen */
const rsvpTop =
    rsvpNaturalTop +
    (rsvpTargetTop - rsvpNaturalTop) * progress;

rsvpLink.style.top =
    `${rsvpTop}px`;

    /* ========================================
       "VI SKAL GIFTE OSS" FADER UT
       ======================================== */

    const introProgress =
        Math.min(progress * 2, 1);


    intro.style.opacity =
        1 - introProgress;


    /* ========================================
       "VI SKAL GIFTE OSS" KOLLAPSER
       ======================================== */

    intro.style.height =
        `${introHeight * (1 - introProgress)}px`;

    intro.style.marginBottom =
        `${15 * (1 - introProgress)}px`;

    intro.style.overflow =
        "hidden";


    /* ========================================
       VILDE & HÅVARD BLIR LITT MINDRE
       ======================================== */

    const titleSize =
        72 - progress * 16;

    title.style.fontSize =
        `${titleSize}px`;


    /* ========================================
       DATOEN BLIR LITT MINDRE
       ======================================== */

    const dateSize =
        14 - progress * 3;

    date.style.fontSize =
        `${dateSize}px`;


    /* ========================================
       DATOEN TREKKES NÆRMERE NAVNET
       ======================================== */

    const dateGap =
        25 - progress * 23;

    date.style.marginTop =
        `${dateGap}px`;
}


/* ========================================
   START
   ======================================== */

klargjorHeroTekst();
oppdaterScroll();


/* ========================================
   SCROLL
   ======================================== */

window.addEventListener(
    "scroll",
    oppdaterScroll
);