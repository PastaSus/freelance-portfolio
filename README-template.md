# Frontend Mentor - Space tourism website solution

This is a solution to the [Space tourism website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)

  - [The challenge](#the-challenge)
  - [Links](#links)

- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each of the website's pages depending on their device's screen size
- See hover states for all interactive elements on the page
- View each page and be able to toggle between the tabs to see new information

### Links

- Solution URL: [Add solution URL here](https://github.com/PastaSus/space-tourism-website-main)
- Live Site URL: [Add live site URL here](https://space-tourism-website-main-ac.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- ARIA/Accessibility
- CSS custom properties
- Flexbox
- CSS Grid
- vanilla JS
- Tailwind CSS
- Vite
- Resposively
- Mobile-first workflow
- NVDA screen reader(Manual Accessibility testing)
- Axe DevTools by deque(Automated Accessibility testing)
- WebPageTest(Performance)

### What I learned

-This was a nice project to get used to tailwinds utility classes and apply the accessibility features i've learned recently(trapping focus on modals, sidebar).

-RequestAnimationFrame allowed me to still animate my side nav bar which has the hidden attr.

-Adding a nice slide-in and slide-out transition to my mobile side navbar

-Creating a multi-static page:
Referencing other `.html` files to connect each other through the `<a></a>` tag

-Build Process and Optimization:
This project gave you hands-on experience with a modern build tool like Vite. You've seen how it automatically minifies your code, purges unused CSS from Tailwind, and optimizes assets for production. This is a crucial concept, as it ensures your final website is small, fast, and ready for deployment.

-Performance optimization
Preloaded Google Fonts stylesheet with onload to download fonts early without blocking rendering. Performance for fonts is now excellent compared to the old setup.

Added <noscript> fallback to ensure fonts load even if JavaScript is disabled.

Result: Fonts are now non-render-blocking, improving First Contentful Paint (FCP) and overall page speed.

The only remaining render-blocking resource is the main CSS, which is necessary for correct layout.

To see how you can add code snippets, see below:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Bellefair&display=swap"
  rel="preload"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Bellefair&display=swap"
  />
</noscript>
<!-- code above  -->

<!-- Mobile Navigation Menu -->
<nav
  class="nav nav--index nav--mobile fixed top-0 right-0 z-1 h-dvh w-[68.5dvw] translate-x-full items-baseline opacity-0 backdrop-blur-2xl transition-transform duration-700 ease-in-out md:relative md:ml-auto md:h-auto md:w-auto md:translate-0 md:opacity-100 xl:pl-34"
  id="mobileNav"
  hidden
>
  <div class="mt-8 flex px-5 md:hidden">
    <button
      class="nav__close ml-auto cursor-pointer md:hidden"
      aria-label="Close navigation menu"
      aria-controls="mobileNav"
      type="button"
    >
      <img src="/assets/shared/icon-close.svg" alt="" />
    </button>
  </div>
  <ul
    class="nav__list flex flex-col gap-7 pr-0 font-[barlow_condensed,_sans-serif] tracking-widest md:flex-row md:gap-12 md:py-0 md:pl-0"
  >
    <li class="nav__item">
      <a
        href="index.html"
        class="nav__link active relative flex gap-3 uppercase md:py-8.5 md:after:top-auto md:after:bottom-0 md:after:h-[3px] md:after:w-full"
        aria-current="page"
      >
        <span
          class="nav__index font-semibold md:hidden xl:block"
          aria-hidden="true"
        >
          00</span
        >
        <span class="font-light"> Home</span></a
      >
    </li>
    <li class="nav__item">
      <a
        href="/pages/destination-moon.html"
        class="nav__link relative flex gap-3 uppercase md:py-8.5 md:after:top-auto md:after:bottom-0 md:after:h-[3px] md:after:w-full"
      >
        <span class="nav__index font-semibold" aria-hidden="true"> 01 </span>
        <span class="font-light"> Destination</span></a
      >
    </li>
    <li class="nav__item">
      <a
        href="/pages/crew-commander.html"
        class="nav__link relative flex gap-3 uppercase md:py-8.5 md:after:top-auto md:after:bottom-0 md:after:h-[3px] md:after:w-full"
        ><span class="nav__index font-semibold" aria-hidden="true"> 02</span>
        <span class="font-light"> Crew</span></a
      >
    </li>
    <li class="nav__item">
      <a
        href="/pages/technology-vehicle.html"
        class="nav__link relative flex gap-3 uppercase md:py-8.5 md:after:top-auto md:after:bottom-0 md:after:h-[3px] md:after:w-full"
        ><span class="nav__index font-semibold" aria-hidden="true"> 03</span>
        <span class="font-light">Technology</span></a
      >
    </li>
  </ul>
</nav>
```

```js
function trapFocus(container) {
  const navFocusables = container.querySelectorAll(".nav__close, .nav__link");

  const firstEl = navFocusables[0];
  const lastEl = navFocusables[navFocusables.length - 1];

  function handleNavTrap(e) {
    const isMobile = window.innerWidth < 768;

    if (e.key !== "Tab") return;

    // check width at the moment of keydown
    if (!isMobile) return;

    // e.shiftKey - shift + tab condition
    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  container.addEventListener("keydown", handleNavTrap);

  return () => container.removeEventListener("keydown", handleNavTrap);
}

// trapping focus for accessibility purposes
```

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/PastaSus)

## Acknowledgments

Kevin powells videos are always helpful in these challenges and also the articles shared by FEM in general!
