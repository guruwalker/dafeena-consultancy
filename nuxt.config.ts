import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/"),
  },

  target: "static",

  app: {
    head: {
      meta: [
        {
          name: "Dafeena Consultancy",
          content:
            "Career coaching, professional development, resume writing, job search support, career advice",
        },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content:
            "career coaching, resume writing, job search, career advice, professional development, career guidance, job interviews, career transition, job coaching, LinkedIn optimization, career coaching services, resume tips, career growth, interview preparation, career mentorship, job application tips, career path advice, job market trends",
        },
        {
          name: "description",
          content:
            "Dafeena Consultancy offers expert career coaching, resume writing, interview preparation, and job search support to help you achieve your professional goals.",
        },
        { name: "robots", content: "index, follow" },
        { name: "x-robots", content: "index, follow" },
        {
          property: "og:title",
          content:
            "Dafeena Consultancy - Career Coaching & Professional Development",
        },
        {
          property: "og:description",
          content:
            "Expert career coaching and resume writing services to help you advance your career. Get personalized job search support, interview coaching, and career advice.",
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
            "Dafeena Consultancy - Career Coaching & Professional Development",
        },
        {
          name: "twitter:description",
          content:
            "Dafeena Consultancy offers career coaching, resume writing, and interview preparation to help professionals thrive in their careers.",
        },
        {
          name: "twitter:image",
          content: "https://www.dafeenaconsultancy.com/twitter-image.jpg",
        },
      ],
      title: "Dafeena Consultancy - Career Coaching & Resume Writing Services",
      script: [],
    },
  },

  site: {
    name: "Dafeena Consultancy",
    description: "We are career consultants",
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
  ],

  compatibilityDate: "2024-12-04",
});
