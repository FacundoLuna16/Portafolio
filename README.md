# 🖥️ facu@portfolio:~$ — Portafolio Terminal Retro

![screenshot](./public/placeholder.jpg)

Portfolio web personal con estética de terminal retro, construido en **Next.js 14 (App Router)**, **TypeScript**, **TailwindCSS** y componentes personalizados con shadcn/ui.  
Incluye soporte para dark/light mode, animaciones tipo CLI, cambio de idioma (ES/EN), timeline de experiencia y filtro de proyectos por rol.

---

## 🚀 Demo

> [Ver online en GitHub Pages (o Vercel)](https://tuusuario.github.io/portfolio-terminal)

---

## 📦 Features

- **Estilo terminal retro** (neón, tipografía monoespaciada, comandos fake).
- **Animaciones**: typing, fade, hover, etc.
- **Secciones**: Hero, About, Projects, Contact.
- **Mini-timeline** de experiencia laboral/educativa.
- **Rotador de snippets de código** en el hero.
- **Filtro de proyectos** por tipo (Backend, DevOps, Security).
- **Multi-idioma**: Español / Inglés.
- **Dark / Light mode**.
- **Accesibilidad** y SEO básico.

---

## 🛠️ Tecnologías principales

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [react-i18next](https://react.i18next.com/)
- [framer-motion](https://www.framer.com/motion/) (animaciones)
- [pnpm](https://pnpm.io/) (gestor de paquetes, opcional)

---

## ⚡ Instalación y uso local

1. **Clona el repo**
    ```bash
    git clone https://github.com/tuusuario/portfolio-terminal.git
    cd portafolio
    ```

2. **Instalá dependencias**
    - Usando **pnpm** (recomendado):
      ```bash
      pnpm install
      ```
    - O con **npm**:
      ```bash
      npm install
      ```

3. **Levantá el servidor local**
    ```bash
    pnpm dev
    # o
    npm run dev
    ```

4. **Abrí en tu navegador:**  
   [http://localhost:3000](http://localhost:3000)

---

## 🌍 Cambiar idioma

Podés cambiar entre español e inglés usando el toggle en la esquina superior derecha.

---

## 🏗️ Estructura de carpetas principal

````

├── app/
│   ├── components/           # Componentes principales de la app (UI, hooks)
│   ├── hooks/
│   ├── globals.css
│   └── ...
├── components/               # UI genéricos y providers
├── hooks/
├── lib/
├── public/
├── styles/
└── ...

````

---

## 🗃️ Build & Deploy

1. **Generar build estático**:
    ```bash
    pnpm build
    # o
    npm run build
    ```

2. **Exportar (para GitHub Pages)**:
    ```bash
    pnpm export
    # o
    npm run export
    ```
   El contenido estará en `/out` (puede requerir configuración especial en `next.config.mjs` para GitHub Pages).

3. **Subí el contenido de `/out` a tu branch `gh-pages`** o deploy directo a Vercel/Netlify.

---

## 🤝 Créditos & Inspiración

- Basado en terminales retro, proyectos de la comunidad Dev, y el stack moderno Next+Tailwind+shadcn.
- Inspiración en [terminalcss.xyz](https://terminalcss.xyz/) y [awesome-portfolio-websites](https://github.com/smaranjitghose/awesome-portfolio-websites).

---

## 📝 LicenciaMIT License

Copyright (c) 2024 Facundo Luna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


MIT License

Copyright (c) 2024 Facundo Luna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



---
