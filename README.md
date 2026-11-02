# AQUAVISTA

A cinematic ocean field guide built inside the existing React, Vite, and Tailwind project. The experience includes a scroll-responsive Three.js whale-shark image plane, drifting bubbles and fish, GSAP section reveals and counters, Lenis scrolling, a responsive navigation, marine-life and ecosystem features, an auto-moving gallery, testimonials, and conservation links.

The hero uses the uploaded `/images/whale-shark.jpg`, cropped to its side-profile view with the connected white background removed at runtime. It is still a 2D photograph on a Three.js image plane: scroll changes its position and subtle orientation, but it does not have independently animated fins or 360-degree model rotation. No local whale-shark GLB/GLTF is included. Supporting ocean photography and display fonts load from external image/font CDNs.

## Run locally

```sh
npm install
npm run dev
```

## Verify

```sh
npm run build
npm run lint
```

The 3D scene is lazy-loaded and omitted when WebGL is unavailable. Reduced-motion preferences disable continuous scene motion and smooth scrolling.
