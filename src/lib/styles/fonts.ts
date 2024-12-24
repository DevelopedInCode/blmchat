import { Bebas_Neue, Comfortaa, Geist, Geist_Mono, Source_Code_Pro } from "next/font/google";

const bebasNeue = Bebas_Neue({
    variable: "--font-bebas-neue",
    subsets: ['latin'],
    weight: ["400"]
});

const comfortaa = Comfortaa({
    variable: "--font-comfortaa",
    subsets: ['latin']
});

const sourceCodePro = Source_Code_Pro({
    variable: "--font-source-code-pro",
    subsets: ['latin']
})

// Next.JS Default, to remove
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ['latin']
})
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
})

type DocumentFontNames = keyof typeof DocumentFonts;
// Fonts to load in for use with tailwind variables
const DocumentFonts = {
    // Title
    bebasNeue,

    // Body
    comfortaa,

    // Descriptions
    sourceCodePro,

    // Next.JS Default, to remove
    geistSans,
    geistMono
}

export function GetDocumentFontVariables() {
    const vars: string[] = [];
    for (let fontName of Object.keys(DocumentFonts)) {
        const font = DocumentFonts[fontName as DocumentFontNames];
        if(font.variable) {
            vars.push(font.variable);
        }
    }
    return vars.join(" ");
}

