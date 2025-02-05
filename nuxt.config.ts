import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/"),
  },

  app: {
    head: {
      meta: [
        {
          name: "Dafeena Consultancy",
          content:
            "Career coaching, virtual assistance, professional development, resume writing, job search support, business support, administrative services, career advice, branding solutions.",
        },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content:
            "career coaching, virtual assistance, resume writing, job search, business support, administrative services, career advice, professional development, career guidance, job interviews, career transition, job coaching, LinkedIn optimization, career coaching services, career growth, interview preparation, business process outsourcing, productivity solutions, remote assistance, executive support, branding solutions, personal branding, content management.",
        },
        {
          name: "description",
          content:
            "Dafeena Consultancy provides expert career coaching, resume writing, and interview preparation, alongside virtual assistance services for businesses, entrepreneurs, and professionals looking for reliable support.",
        },
        { name: "robots", content: "index, follow" },
        { name: "x-robots", content: "index, follow" },
        {
          property: "og:title",
          content:
            "Dafeena Consultancy - Career Coaching & Virtual Assistance Services",
        },
        {
          property: "og:description",
          content:
            "Advance your career with expert coaching or streamline your business with our virtual assistance solutions. Dafeena Consultancy offers career coaching, resume writing, and business support services to help professionals and entrepreneurs succeed.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://www.dafeenaconsultancy.com" },
        {
          property: "og:image",
          content: "https://www.dafeenaconsultancy.com/dafeenaconsultancy.jpg",
        },
        { property: "og:site_name", content: "Dafeena Consultancy" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "Dafeena Consultancy - Career Coaching & Virtual Assistance Services",
        },
        {
          name: "twitter:description",
          content:
            "Dafeena Consultancy helps professionals advance their careers with expert coaching while providing businesses with virtual assistance solutions to enhance productivity.",
        },
        {
          name: "twitter:image",
          content: "https://www.dafeenaconsultancy.com/twitter-image.jpg",
        },
      ],
      title:
        "Dafeena Consultancy - Career Coaching & Virtual Assistance Services",
      script: [],
    },
  },

  site: {
    name: "Dafeena Consultancy",
    description:
      "We provide career coaching and virtual assistance services to help professionals and businesses thrive.",
    url: "https://dafeenaconsultancy.com",
    language: "en",
  },

  css: [
    "~/assets/css/vendors/bootstrap.min.css",
    "~/assets/css/vendors/flaticon.css",
    "~/assets/css/vendors/menu.css",
    "~/assets/css/vendors/fade-down.css",
    "~/assets/css/vendors/magnific-popup.css",
    "~/assets/css/vendors/animate.css",
    "~/assets/css/main.scss",
    "~/assets/css/override.scss",
    "~/assets/css/responsive.scss",
    "~/assets/css/color-scheme/blue.scss",
    "~/assets/css/color-scheme/crocus.scss",
    "~/assets/css/color-scheme/green.scss",
    "~/assets/css/color-scheme/magenta.scss",
    "~/assets/css/color-scheme/pink.scss",
    "~/assets/css/color-scheme/skyblue.scss",
    "~/assets/css/color-scheme/violet.scss",
  ],

  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Rubik: {
            wght: [300, 400, 500, 600, 700],
          },
          "Plus+Jakarta+Sans": {
            wght: [400, 500, 600, 700],
          },
          Inter: {
            wght: [400, 500, 600, 700, 800],
          },
          download: true,
          inject: true,
        },
      },
    ],
    "nuxt-swiper",
    "@nuxtjs/seo",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/ui",
  ],

  colorMode: {
    classSuffix: "",
    preference: "light",
  },

  compatibilityDate: "2024-12-04",
});
