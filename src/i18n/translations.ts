export type LocaleCode = 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ja' | 'zh' | 'ru';

export interface LanguageConfig {
  code: LocaleCode;
  label: string;
  pathPrefix: string;
  ogLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', label: 'English', pathPrefix: '/', ogLocale: 'en_US' },
  { code: 'es', label: 'Español', pathPrefix: '/es/', ogLocale: 'es_ES' },
  { code: 'pt', label: 'Português', pathPrefix: '/pt/', ogLocale: 'pt_BR' },
  { code: 'de', label: 'Deutsch', pathPrefix: '/de/', ogLocale: 'de_DE' },
  { code: 'fr', label: 'Français', pathPrefix: '/fr/', ogLocale: 'fr_FR' },
  { code: 'ja', label: '日本語', pathPrefix: '/ja/', ogLocale: 'ja_JP' },
  { code: 'zh', label: '简体中文', pathPrefix: '/zh/', ogLocale: 'zh_CN' },
  { code: 'ru', label: 'Русский', pathPrefix: '/ru/', ogLocale: 'ru_RU' },
];

export const NON_DEFAULT_LOCALES: LocaleCode[] = ['es', 'pt', 'de', 'fr', 'ja', 'zh', 'ru'];

export const SITE_URL = 'https://modelixai.github.io';

export function getLocalizedPath(locale: LocaleCode, pagePath: '' | 'how-to-use/' | 'hire-me/'): string {
  const prefix = locale === 'en' ? '/' : `/${locale}/`;
  return `${prefix}${pagePath}`;
}

export function getCanonicalUrl(locale: LocaleCode, pagePath: '' | 'how-to-use/' | 'hire-me/'): string {
  return `${SITE_URL}${getLocalizedPath(locale, pagePath)}`;
}

export interface ViewerTranslations {
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  dropzoneFormats: string;
  dropzoneAriaLabel: string;
  openModelBtn: string;
  samplePbrBtn: string;
  sampleStlBtn: string;
  samplePbrName: string;
  sampleStlName: string;
  proceduralSize: string;
  wireframe: string;
  wireframeAria: string;
  gridFloor: string;
  gridFloorAria: string;
  autoRotate: string;
  autoRotateAria: string;
  zUpUpright: string;
  zUpUprightAria: string;
  resetCamera: string;
  resetCameraAria: string;
  lightingLabel: string;
  lightingNeutral: string;
  lightingRim: string;
  lightingClay: string;
  lightingBlueprint: string;
  backdropLabel: string;
  backdropLight: string;
  backdropDark: string;
  backdropChecker: string;
  animationsLabel: string;
  clipSelectAria: string;
  playAnimationAria: string;
  pauseAnimationAria: string;
  playBtn: string;
  pauseBtn: string;
  scrubberAria: string;
  inspectorTitle: string;
  statFormat: string;
  statTriangles: string;
  statVertices: string;
  statMeshes: string;
  statMaterials: string;
  statDimensions: string;
  statFileSize: string;
  exportPngBtn: string;
  exportPngAria: string;
  orbitHint: string;
  privacyBadge: string;
  statusLoadedTemplate: string; // {name}, {format}, {triangles}
  statusExportedTemplate: string; // {filename}
  errorUnsupported: string;
  errorLoadFailed: string;
  loadingModel: string;
}

export interface TranslationBundle {
  nav: {
    brandAria: string;
    home: string;
    howToUse: string;
    hireMe: string;
    languageAria: string;
    themeToggleLightAria: string;
    themeToggleDarkAria: string;
    installPwa: string;
    installPwaAria: string;
    supportDev: string;
    supportDevAria: string;
    githubAria: string;
    breadcrumbAria: string;
    pwaGuideTitle: string;
    pwaGuideBody: string;
    pwaGuideInstalled: string;
    pwaGuideClose: string;
  };
  footer: {
    privacyNote: string;
    builtBy: string;
    allRights: string;
  };
  viewer: ViewerTranslations;
  home: {
    title: string;
    metaDescription: string;
    h1: string;
    heroSubtitle: string;
    highlightsHeading: string;
    highlights: Array<{ title: string; description: string }>;
    faqHeading: string;
    faqSubheading: string;
    faqs: Array<{ question: string; answer: string }>;
  };
  howToUse: {
    title: string;
    metaDescription: string;
    h1: string;
    intro: string;
    steps: Array<{ title: string; description: string }>;
    controlsHeading: string;
    controls: Array<{ action: string; desktop: string; touch: string }>;
    colAction: string;
    colDesktop: string;
    colTouch: string;
    ctaLabel: string;
  };
  hireMe: {
    title: string;
    metaDescription: string;
    h1Badge: string;
    heading: string;
    intro: string;
    subcopy: string;
    specialties: Array<{ title: string; description: string }>;
    ctaHeading: string;
    email: string;
    emailLabel: string;
    copyButtonLabel: string;
    copiedAnnouncement: string;
  };
}

export const TRANSLATIONS: Record<LocaleCode, TranslationBundle> = {
  en: {
    nav: {
      brandAria: 'ModelixAI Home',
      home: 'Home',
      howToUse: 'How to Use',
      hireMe: 'Hire Me',
      languageAria: 'Select language',
      themeToggleLightAria: 'Switch to light mode',
      themeToggleDarkAria: 'Switch to dark mode',
      installPwa: 'Add to Home Screen',
      installPwaAria: 'Add ModelixAI to Home Screen for offline use',
      supportDev: 'Support',
      supportDevAria: 'Support the developer on Gumroad',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: 'Breadcrumb',
      pwaGuideTitle: 'Install ModelixAI for Offline Inspection',
      pwaGuideBody:
        'On iOS Safari, tap the Share icon in the browser toolbar and select "Add to Home Screen". On desktop Chrome or Edge, click the install icon in the address bar to launch ModelixAI offline anytime.',
      pwaGuideInstalled: 'ModelixAI is already running as an installed app with offline support active.',
      pwaGuideClose: 'Got it',
    },
    footer: {
      privacyNote: '100% client-side WebGL execution. Your 3D files stay strictly in your browser memory—zero server uploads.',
      builtBy: 'Crafted by Kishara Dilshan',
      allRights: 'MIT Licensed Open Source.',
    },
    viewer: {
      dropzoneTitle: 'Drop 3D model files here or click to open',
      dropzoneSubtitle: 'Supports multi-file drops (.gltf + .bin + textures, .obj + .mtl + textures)',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: 'Open or drop GLB, glTF, OBJ, or STL 3D model files from your device',
      openModelBtn: 'Open 3D Model',
      samplePbrBtn: 'Load Sample Model',
      sampleStlBtn: 'Sample CAD STL',
      samplePbrName: 'Orbital-Gyro-PBR.glb (Sample)',
      sampleStlName: 'Precision-Spur-Gear.stl (Sample)',
      proceduralSize: 'Built-in',
      wireframe: 'Wireframe',
      wireframeAria: 'Toggle wireframe topology overlay',
      gridFloor: 'Grid Floor',
      gridFloorAria: 'Toggle reference grid floor',
      autoRotate: 'Auto-Rotate',
      autoRotateAria: 'Toggle automatic turntable camera rotation',
      zUpUpright: 'Z-Up Upright',
      zUpUprightAria: 'Toggle Z-up to Y-up upright orientation for STL CAD files',
      resetCamera: 'Reset Camera',
      resetCameraAria: 'Reset camera orbit and zoom to fit model',
      lightingLabel: 'Studio Lighting',
      lightingNeutral: 'Studio Neutral',
      lightingRim: 'Soft Rim',
      lightingClay: 'Warm Clay',
      lightingBlueprint: 'Cool Blueprint',
      backdropLabel: 'Backdrop',
      backdropLight: 'Light',
      backdropDark: 'Dark',
      backdropChecker: 'Transparent',
      animationsLabel: 'Animations',
      clipSelectAria: 'Select animation clip',
      playAnimationAria: 'Play 3D model animation',
      pauseAnimationAria: 'Pause 3D model animation',
      playBtn: 'Play',
      pauseBtn: 'Pause',
      scrubberAria: 'Animation timeline scrubber',
      inspectorTitle: 'Model Inspector',
      statFormat: 'Format',
      statTriangles: 'Triangles',
      statVertices: 'Vertices',
      statMeshes: 'Meshes',
      statMaterials: 'Materials / Tex',
      statDimensions: 'Dimensions (X×Y×Z)',
      statFileSize: 'File Size',
      exportPngBtn: 'Export Transparent PNG',
      exportPngAria: 'Export current 3D viewport as alpha-transparent PNG snapshot',
      orbitHint: 'Left-drag: Orbit • Scroll/Pinch: Zoom • Right-drag/Two-finger: Pan',
      privacyBadge: 'Local WebGL • Zero Uploads',
      statusLoadedTemplate: 'Loaded {name} ({format}) with {triangles} triangles.',
      statusExportedTemplate: 'Exported transparent PNG snapshot: {filename}.',
      errorUnsupported: 'Unsupported file type. Please choose a .glb, .gltf, .obj, or .stl 3D model.',
      errorLoadFailed: 'Could not parse this 3D file. Check that companion .bin or .mtl files were included.',
      loadingModel: 'Parsing 3D geometry locally…',
    },
    home: {
      title: '3D Model Viewer Online - Open GLB, glTF, OBJ & STL Free',
      metaDescription:
        'Inspect GLB, glTF, OBJ, and STL 3D models right in your browser. Check polygon stats, toggle wireframe or lighting, and export PNGs—100% free.',
      h1: '3D Model Viewer — Open & Inspect GLB, glTF, OBJ & STL Online',
      heroSubtitle:
        'Drag and drop GLB, glTF, OBJ, or STL files to inspect polygon stats, toggle wireframe or studio lighting, play animations, and export transparent PNG renders—100% locally in your browser.',
      highlightsHeading: 'Built for 3D Artists, Game Developers & CAD Makers',
      highlights: [
        {
          title: 'Private Zero-Upload Inspection',
          description:
            'Every mesh, material, and texture is parsed directly inside your browser via WebGL and Three.js. Proprietary CAD parts and unreleased game assets never leave your device.',
        },
        {
          title: 'Accurate Mesh & Dimension Metrics',
          description:
            'Verify exact triangle counts, vertex totals, draw-call mesh groups, PBR materials, and true X × Y × Z bounding dimensions—plus one-click Z-Up orientation for 3D-printable STL files.',
        },
        {
          title: 'Studio Lighting & Alpha PNG Captures',
          description:
            'Switch between calibrated studio environments, scrub embedded glTF skeletal or keyframe animations, and capture clean alpha-transparent PNG renders for documentation or portfolios.',
        },
      ],
      faqHeading: 'Frequently Asked Questions',
      faqSubheading: 'Clear answers about supported 3D formats, local browser privacy, multi-file textures, and PNG exports.',
      faqs: [
        {
          question: 'Which 3D file formats can I open and inspect (GLB, glTF, OBJ, STL)?',
          answer:
            'ModelixAI supports binary GLB (.glb), standard glTF 2.0 (.gltf with Draco compression and external .bin buffers), Wavefront OBJ (.obj with optional .mtl materials), and binary or ASCII STL (.stl) files commonly used in CAD and 3D printing.',
        },
        {
          question: 'Are my 3D models uploaded to a server when I preview them?',
          answer:
            'No. ModelixAI runs 100% locally in your web browser using WebGL. Your 3D geometries, animations, and textures are read directly from local memory and are never transmitted to any external server or cloud storage.',
        },
        {
          question: 'How do I export a transparent PNG render or inspect wireframe and polygon counts?',
          answer:
            'Once your model loads, check the Model Inspector panel for live triangle, vertex, mesh, material, and bounding-box statistics. Toggle the Wireframe button to examine mesh topology, frame your camera angle, and click Export Transparent PNG to download a crisp alpha-channel image without background clutter.',
        },
        {
          question: 'How do I load textures for multi-file OBJ or glTF models?',
          answer:
            'Select all related files together—such as your .gltf, .bin, and PNG/JPG textures, or your .obj, .mtl, and texture maps—and drag them into the viewer at the same time (or drop the entire project folder). ModelixAI automatically resolves companion buffers and textures in browser memory.',
        },
      ],
    },
    howToUse: {
      title: 'How to View & Inspect GLB, STL & OBJ 3D Models Online',
      metaDescription:
        'Step-by-step guide to open GLB, glTF, OBJ, and STL files in your browser, inspect triangle counts and materials, play animations, and save PNGs.',
      h1: 'How to View and Inspect 3D Models in Your Browser',
      intro:
        'ModelixAI gives designers, game engineers, and 3D printing makers an instant studio workspace to verify 3D assets without installing heavy desktop software or uploading private files.',
      steps: [
        {
          title: 'Open a Single 3D File or Multi-File Asset Bundle',
          description:
            'Click "Open 3D Model" or drag and drop a .glb, .gltf, .obj, or .stl file directly onto the viewport. For multi-file assets—such as a .gltf paired with .bin buffers and texture images, or an .obj with an .mtl material library—select all files together or drop the folder at once so textures map automatically in memory.',
        },
        {
          title: 'Orbit, Zoom, Pan & Align Z-Up STL Print Files',
          description:
            'Every loaded asset is automatically centered and framed to fit your screen. Drag to orbit smoothly around the focal point, scroll or pinch to zoom into fine bevels, and right-drag to pan. When inspecting CAD or slicer .stl files exported in Z-up coordinates, toggle "Z-Up Upright" to stand the part flat on the studio grid floor.',
        },
        {
          title: 'Audit Polygon Counts, Materials & True Dimensions',
          description:
            'Review the Model Inspector panel to verify total triangles, vertices, separate mesh objects, unique materials and textures, and unscaled X × Y × Z bounding dimensions before importing into Unity, Unreal, Blender, or your 3D print slicer.',
        },
        {
          title: 'Test Wireframe Topology, Studio Lighting & Animations',
          description:
            'Enable the Wireframe toggle to check edge flow and decimation quality. Cycle between Studio Neutral, Soft Rim, Warm Clay, and Cool Blueprint lighting presets to reveal surface normals. If your GLB or glTF file contains animations, choose a clip from the Animations bar, pause at any keyframe, and scrub the timeline.',
        },
        {
          title: 'Export Clean Alpha-Transparent PNG Renders',
          description:
            'Compose your desired camera angle and lighting preset, then click "Export Transparent PNG". ModelixAI temporarily clears the background and reference grid for a single frame to download a sharp, transparent PNG ready for pitch decks, storefronts, or bug reports.',
        },
      ],
      controlsHeading: 'Viewport Navigation Quick Reference',
      colAction: 'Viewport Action',
      colDesktop: 'Mouse / Trackpad',
      colTouch: 'Touchscreen',
      controls: [
        { action: 'Orbit Camera', desktop: 'Left-click + drag', touch: 'One-finger drag' },
        { action: 'Zoom In / Out', desktop: 'Scroll wheel or pinch', touch: 'Two-finger pinch' },
        { action: 'Pan Target', desktop: 'Right-click + drag (or Shift + drag)', touch: 'Two-finger drag' },
        { action: 'Re-center Model', desktop: 'Click "Reset Camera"', touch: 'Tap "Reset Camera"' },
      ],
      ctaLabel: 'Launch 3D Model Viewer',
    },
    hireMe: {
      title: 'Hire Kishara Dilshan - Astro, React & 3D Web Dev | Modelix',
      metaDescription:
        'Need an ultra-fast Astro, React, or Next.js web app or client-side WebAssembly tool? Hire Kishara Dilshan for custom SEO-ready IT solutions.',
      h1Badge: 'Available for Freelance Projects',
      heading: 'Need a Custom IT Solution?',
      intro: "Hi, I'm Kishara Dilshan, the developer behind ModelixAI.",
      subcopy:
        'If you love this fast, client-side tool and need a world-class IT solution for your own business, I am available for freelance projects. I specialize in:',
      specialties: [
        {
          title: 'Ultra-fast, SEO-optimized web applications',
          description: 'Astro, React, Next.js — engineered for sub-second loads, technical SEO, and clean scalability.',
        },
        {
          title: 'Client-side processing & WebAssembly (WASM) tools',
          description: 'Zero-server media, PDF, and data utilities that run privately inside the browser.',
        },
        {
          title: 'UI/UX design & High-converting landing pages',
          description: 'Minimal, accessible interfaces crafted to convert visitors effortlessly across desktop and mobile.',
        },
      ],
      ctaHeading: "Let's build something amazing together.",
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Email me directly: kisharadilshan007@gmail.com',
      copyButtonLabel: 'Copy Email',
      copiedAnnouncement: 'Copied kisharadilshan007@gmail.com to clipboard',
    },
  },

  es: {
    nav: {
      brandAria: 'Inicio de ModelixAI',
      home: 'Inicio',
      howToUse: 'Cómo Usar',
      hireMe: 'Contrátame',
      languageAria: 'Seleccionar idioma',
      themeToggleLightAria: 'Cambiar a modo claro',
      themeToggleDarkAria: 'Cambiar a modo oscuro',
      installPwa: 'Instalar App',
      installPwaAria: 'Añadir ModelixAI a la pantalla de inicio sin conexión',
      supportDev: 'Apoyar',
      supportDevAria: 'Apoyar al desarrollador en Gumroad',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: 'Ruta de navegación',
      pwaGuideTitle: 'Instalar ModelixAI para Uso Sin Conexión',
      pwaGuideBody:
        'En Safari para iOS, pulsa Compartir y selecciona «Añadir a pantalla de inicio». En Chrome o Edge de escritorio, usa el icono de instalación en la barra de direcciones.',
      pwaGuideInstalled: 'ModelixAI ya está instalada con soporte sin conexión activo.',
      pwaGuideClose: 'Entendido',
    },
    footer: {
      privacyNote: 'Ejecución WebGL 100 % local en tu navegador. Tus archivos 3D nunca se suben a ningún servidor.',
      builtBy: 'Desarrollado por Kishara Dilshan',
      allRights: 'Código abierto con licencia MIT.',
    },
    viewer: {
      dropzoneTitle: 'Arrastra archivos 3D aquí o haz clic para abrir',
      dropzoneSubtitle: 'Soporta lotes múltiples (.gltf + .bin + texturas, .obj + .mtl + texturas)',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: 'Abrir o soltar modelos 3D GLB, glTF, OBJ o STL desde tu dispositivo',
      openModelBtn: 'Abrir Modelo 3D',
      samplePbrBtn: 'Cargar Ejemplo 3D',
      sampleStlBtn: 'Ejemplo CAD STL',
      samplePbrName: 'Orbital-Gyro-PBR.glb (Ejemplo)',
      sampleStlName: 'Precision-Spur-Gear.stl (Ejemplo)',
      proceduralSize: 'Integrado',
      wireframe: 'Malla',
      wireframeAria: 'Alternar vista de malla de alambre',
      gridFloor: 'Cuadrícula',
      gridFloorAria: 'Alternar cuadrícula de referencia en el suelo',
      autoRotate: 'Auto-Giro',
      autoRotateAria: 'Alternar rotación automática de cámara',
      zUpUpright: 'Eje Z Vertical',
      zUpUprightAria: 'Alternar orientación vertical Z-up a Y-up para archivos STL',
      resetCamera: 'Reiniciar Cámara',
      resetCameraAria: 'Reiniciar encuadre y zoom de la cámara',
      lightingLabel: 'Luz de Estudio',
      lightingNeutral: 'Estudio Neutro',
      lightingRim: 'Contraluz Suave',
      lightingClay: 'Arcilla Cálida',
      lightingBlueprint: 'Plano Frío',
      backdropLabel: 'Fondo',
      backdropLight: 'Claro',
      backdropDark: 'Oscuro',
      backdropChecker: 'Transparente',
      animationsLabel: 'Animaciones',
      clipSelectAria: 'Seleccionar clip de animación',
      playAnimationAria: 'Reproducir animación del modelo 3D',
      pauseAnimationAria: 'Pausar animación del modelo 3D',
      playBtn: 'Reproducir',
      pauseBtn: 'Pausar',
      scrubberAria: 'Línea de tiempo de animación',
      inspectorTitle: 'Inspector de Modelo',
      statFormat: 'Formato',
      statTriangles: 'Triángulos',
      statVertices: 'Vértices',
      statMeshes: 'Mallas',
      statMaterials: 'Materiales / Tex',
      statDimensions: 'Dimensiones (X×Y×Z)',
      statFileSize: 'Tamaño',
      exportPngBtn: 'Exportar PNG Transparente',
      exportPngAria: 'Exportar vista 3D actual como imagen PNG con fondo transparente',
      orbitHint: 'Clic izq.: Orbitar • Rueda/Pellizco: Zoom • Clic der./Dos dedos: Desplazar',
      privacyBadge: 'WebGL Local • Cero Subidas',
      statusLoadedTemplate: 'Modelo {name} ({format}) cargado con {triangles} triángulos.',
      statusExportedTemplate: 'Imagen PNG transparente exportada: {filename}.',
      errorUnsupported: 'Formato no compatible. Selecciona un archivo .glb, .gltf, .obj o .stl.',
      errorLoadFailed: 'No se pudo leer el archivo 3D. Verifica que se incluyeron los archivos .bin o .mtl.',
      loadingModel: 'Procesando geometría 3D localmente…',
    },
    home: {
      title: 'Visor 3D Online Gratis - Abrir GLB, glTF, OBJ y STL Web',
      metaDescription:
        'Inspecciona modelos 3D GLB, glTF, OBJ y STL en tu navegador. Revisa polígonos, activa malla o luces de estudio y exporta PNG gratis sin subir.',
      h1: 'Visor de Modelos 3D — Abre e Inspecciona GLB, glTF, OBJ y STL',
      heroSubtitle:
        'Arrastra y suelta archivos GLB, glTF, OBJ o STL para revisar estadísticas de polígonos, alternar malla o luces de estudio, reproducir animaciones y exportar PNG transparentes—100 % en tu navegador.',
      highlightsHeading: 'Diseñado para Artistas 3D, Desarrolladores e Impresión 3D',
      highlights: [
        {
          title: 'Privacidad Total Sin Subidas',
          description:
            'Cada geometría y textura se procesa localmente mediante WebGL y Three.js. Tus piezas CAD confidenciales y activos de videojuegos nunca salen de tu equipo.',
        },
        {
          title: 'Métricas Exactas de Malla y Dimensiones',
          description:
            'Comprueba el conteo exacto de triángulos, vértices, materiales PBR y dimensiones reales X × Y × Z, además de corrección de eje Z para impresión 3D en STL.',
        },
        {
          title: 'Iluminación de Estudio y Captura PNG Alfa',
          description:
            'Cambia entre entornos calibrados, recorre animaciones integradas en glTF y descarga capturas PNG con transparencia limpia para catálogos o documentación.',
        },
      ],
      faqHeading: 'Preguntas Frecuentes',
      faqSubheading: 'Respuestas claras sobre formatos 3D compatibles, privacidad local, texturas múltiples y exportación PNG.',
      faqs: [
        {
          question: '¿Qué formatos de archivo 3D puedo abrir e inspeccionar (GLB, glTF, OBJ, STL)?',
          answer:
            'ModelixAI admite archivos binarios GLB (.glb), glTF 2.0 estándar (.gltf con compresión Draco y archivos .bin), Wavefront OBJ (.obj junto con materiales .mtl) y modelos STL binarios o ASCII (.stl) habituales en diseño CAD e impresión 3D.',
        },
        {
          question: '¿Mis modelos 3D se suben a algún servidor al previsualizarlos?',
          answer:
            'No. Todo el motor gráfico funciona 100 % en tu navegador con WebGL. Tus mallas, texturas y animaciones se leen directamente desde la memoria local sin enviarse a ningún servidor externo.',
        },
        {
          question: '¿Cómo exporto un render PNG transparente o reviso el modo malla y los polígonos?',
          answer:
            'Al cargar tu archivo, consulta el panel Inspector de Modelo para ver triángulos, vértices, materiales y dimensiones. Activa el botón Malla para revisar la topología y pulsa «Exportar PNG Transparente» para guardar una imagen con canal alfa limpio.',
        },
        {
          question: '¿Cómo cargo texturas para modelos OBJ o glTF de varios archivos?',
          answer:
            'Selecciona todos los archivos relacionados a la vez —por ejemplo, tu .gltf, .bin e imágenes PNG/JPG, o tu .obj, .mtl y mapas de textura— y suéltalos juntos en el visor (o arrastra la carpeta completa). ModelixAI vincula las referencias en memoria.',
        },
      ],
    },
    howToUse: {
      title: 'Cómo Ver e Inspeccionar Modelos 3D GLB, STL y OBJ Web',
      metaDescription:
        'Guía paso a paso para abrir archivos GLB, glTF, OBJ y STL en el navegador, revisar triángulos y materiales, reproducir animaciones y crear PNG.',
      h1: 'Cómo Ver e Inspeccionar Modelos 3D en Tu Navegador',
      intro:
        'ModelixAI ofrece a diseñadores, ingenieros y creadores de impresión 3D un estudio ágil para verificar activos 3D sin instalar programas pesados ni subir archivos privados.',
      steps: [
        {
          title: 'Abre un Archivo 3D Individual o un Lote con Texturas',
          description:
            'Haz clic en «Abrir Modelo 3D» o suelta un archivo .glb, .gltf, .obj o .stl en el visor. Para modelos divididos en varios archivos (.gltf + .bin + texturas o .obj + .mtl + imágenes), arrástralos todos juntos o suelta la carpeta completa.',
        },
        {
          title: 'Orbita, Haz Zoom y Corrige la Orientación Z-Up en STL',
          description:
            'El modelo se centra y ajusta automáticamente a la cámara. Arrastra para orbitar, usa la rueda para acercar detalles y arrastra con clic derecho para desplazar. En piezas .stl de CAD, activa «Eje Z Vertical» para apoyarlas sobre la cuadrícula.',
        },
        {
          title: 'Verifica Polígonos, Materiales y Dimensiones Reales',
          description:
            'Revisa el Inspector de Modelo para confirmar el número de triángulos, vértices, submallas, materiales únicos y medidas X × Y × Z antes de llevar el modelo a tu motor gráfico o laminador 3D.',
        },
        {
          title: 'Prueba la Malla, Iluminación de Estudio y Animaciones',
          description:
            'Activa la vista de Malla para inspeccionar la topología y alterna los cuatro ajustes de luz de estudio. Si tu archivo GLB o glTF incluye animaciones, elige un clip y controla la línea de tiempo.',
        },
        {
          title: 'Exporta Capturas PNG con Fondo Transparente',
          description:
            'Elige el ángulo ideal y haz clic en «Exportar PNG Transparente». El visor oculta temporalmente el fondo y la cuadrícula para descargar un render PNG nítido con canal alfa.',
        },
      ],
      controlsHeading: 'Controles Rápidos de Navegación 3D',
      colAction: 'Acción',
      colDesktop: 'Ratón / Trackpad',
      colTouch: 'Pantalla Táctil',
      controls: [
        { action: 'Orbitar cámara', desktop: 'Clic izquierdo + arrastrar', touch: 'Arrastrar con un dedo' },
        { action: 'Acercar / Alejar', desktop: 'Rueda del ratón', touch: 'Pellizcar con dos dedos' },
        { action: 'Desplazar vista', desktop: 'Clic derecho + arrastrar', touch: 'Arrastrar con dos dedos' },
        { action: 'Centrar modelo', desktop: 'Clic en «Reiniciar Cámara»', touch: 'Tocar «Reiniciar Cámara»' },
      ],
      ctaLabel: 'Abrir Visor de Modelos 3D',
    },
    hireMe: {
      title: 'Contrata a Kishara Dilshan - Astro, React y 3D | ModelixAI',
      metaDescription:
        '¿Buscas una aplicación web ultrarrápida en Astro, React o Next.js o herramientas WebAssembly? Contrata a Kishara Dilshan para proyectos web.',
      h1Badge: 'Disponible para Proyectos Freelance',
      heading: '¿Necesitas una Solución IT a Medida?',
      intro: 'Hola, soy Kishara Dilshan, el desarrollador detrás de ModelixAI.',
      subcopy:
        'Si te gusta la rapidez de esta herramienta local y necesitas una solución tecnológica de primer nivel para tu empresa, estoy disponible para proyectos freelance. Me especializo en:',
      specialties: [
        {
          title: 'Aplicaciones web ultrarrápidas y optimizadas para SEO',
          description: 'Astro, React, Next.js — diseñadas para cargas instantáneas, SEO técnico impecable y escalabilidad.',
        },
        {
          title: 'Procesamiento en el cliente y herramientas WebAssembly (WASM)',
          description: 'Utilidades multimedia, PDF, 3D y datos sin servidor que funcionan con privacidad en el navegador.',
        },
        {
          title: 'Diseño UI/UX y páginas de aterrizaje de alta conversión',
          description: 'Interfaces minimalistas y accesibles creadas para convertir visitantes en escritorio y móvil.',
        },
      ],
      ctaHeading: 'Construyamos algo extraordinario juntos.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Escríbeme directamente: kisharadilshan007@gmail.com',
      copyButtonLabel: 'Copiar Correo',
      copiedAnnouncement: 'Correo kisharadilshan007@gmail.com copiado al portapapeles',
    },
  },

  pt: {
    nav: {
      brandAria: 'Início do ModelixAI',
      home: 'Início',
      howToUse: 'Como Usar',
      hireMe: 'Contrate-me',
      languageAria: 'Selecionar idioma',
      themeToggleLightAria: 'Mudar para modo claro',
      themeToggleDarkAria: 'Mudar para modo escuro',
      installPwa: 'Instalar App',
      installPwaAria: 'Adicionar ModelixAI à tela inicial para uso offline',
      supportDev: 'Apoiar',
      supportDevAria: 'Apoiar o desenvolvedor no Gumroad',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: 'Navegação estrutural',
      pwaGuideTitle: 'Instalar ModelixAI para Uso Offline',
      pwaGuideBody:
        'No Safari do iOS, toque em Compartilhar e escolha "Adicionar à Tela de Início". No Chrome ou Edge no computador, clique no ícone de instalação na barra de endereços.',
      pwaGuideInstalled: 'O ModelixAI já está instalado com suporte offline ativo.',
      pwaGuideClose: 'Entendi',
    },
    footer: {
      privacyNote: 'Execução WebGL 100% local no navegador. Seus arquivos 3D nunca são enviados para servidores.',
      builtBy: 'Desenvolvido por Kishara Dilshan',
      allRights: 'Código aberto sob licença MIT.',
    },
    viewer: {
      dropzoneTitle: 'Arraste arquivos 3D aqui ou clique para abrir',
      dropzoneSubtitle: 'Suporta múltiplos arquivos (.gltf + .bin + texturas, .obj + .mtl + texturas)',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: 'Abrir ou soltar modelos 3D GLB, glTF, OBJ ou STL do seu dispositivo',
      openModelBtn: 'Abrir Modelo 3D',
      samplePbrBtn: 'Carregar Exemplo',
      sampleStlBtn: 'Exemplo CAD STL',
      samplePbrName: 'Orbital-Gyro-PBR.glb (Exemplo)',
      sampleStlName: 'Precision-Spur-Gear.stl (Exemplo)',
      proceduralSize: 'Integrado',
      wireframe: 'Wireframe',
      wireframeAria: 'Alternar sobreposição de malha wireframe',
      gridFloor: 'Grade',
      gridFloorAria: 'Alternar piso de grade de referência',
      autoRotate: 'Auto-Giro',
      autoRotateAria: 'Alternar rotação automática da câmera',
      zUpUpright: 'Eixo Z Vertical',
      zUpUprightAria: 'Alternar orientação Z-up para Y-up em arquivos STL',
      resetCamera: 'Resetar Câmera',
      resetCameraAria: 'Redefinir órbita e zoom da câmera',
      lightingLabel: 'Luz de Estúdio',
      lightingNeutral: 'Estúdio Neutro',
      lightingRim: 'Luz de Borda',
      lightingClay: 'Argila Quente',
      lightingBlueprint: 'Projeto Frio',
      backdropLabel: 'Fundo',
      backdropLight: 'Claro',
      backdropDark: 'Escuro',
      backdropChecker: 'Transparente',
      animationsLabel: 'Animações',
      clipSelectAria: 'Selecionar clipe de animação',
      playAnimationAria: 'Reproduzir animação do modelo 3D',
      pauseAnimationAria: 'Pausar animação do modelo 3D',
      playBtn: 'Reproduzir',
      pauseBtn: 'Pausar',
      scrubberAria: 'Linha do tempo da animação',
      inspectorTitle: 'Inspetor de Modelo',
      statFormat: 'Formato',
      statTriangles: 'Triângulos',
      statVertices: 'Vértices',
      statMeshes: 'Malhas',
      statMaterials: 'Materiais / Tex',
      statDimensions: 'Dimensões (X×Y×Z)',
      statFileSize: 'Tamanho',
      exportPngBtn: 'Exportar PNG Transparente',
      exportPngAria: 'Exportar visualização 3D atual como PNG transparente',
      orbitHint: 'Arrastar esq.: Orbitar • Roda/Pinça: Zoom • Arrastar dir./Dois dedos: Mover',
      privacyBadge: 'WebGL Local • Zero Upload',
      statusLoadedTemplate: 'Modelo {name} ({format}) carregado com {triangles} triângulos.',
      statusExportedTemplate: 'PNG transparente exportado: {filename}.',
      errorUnsupported: 'Formato não suportado. Escolha um modelo .glb, .gltf, .obj ou .stl.',
      errorLoadFailed: 'Não foi possível ler o arquivo 3D. Verifique se os arquivos .bin ou .mtl foram incluídos.',
      loadingModel: 'Processando geometria 3D localmente…',
    },
    home: {
      title: 'Visualizador 3D Online Grátis - Abrir GLB, glTF e STL',
      metaDescription:
        'Inspecione modelos 3D GLB, glTF, OBJ e STL direto no navegador. Veja polígonos, alterne wireframe ou luzes e exporte PNG transparente grátis.',
      h1: 'Visualizador de Modelos 3D — Abra e Inspecione GLB, glTF, OBJ e STL',
      heroSubtitle:
        'Arraste e solte arquivos GLB, glTF, OBJ ou STL para conferir estatísticas de polígonos, alternar wireframe ou iluminação de estúdio, reproduzir animações e exportar PNGs transparentes—100% no navegador.',
      highlightsHeading: 'Criado para Artistas 3D, Desenvolvedores e Impressão 3D',
      highlights: [
        {
          title: 'Inspeção Privada Sem Upload',
          description:
            'Toda malha e textura é processada diretamente no navegador via WebGL e Three.js. Peças CAD confidenciais e modelos de jogos nunca saem do seu dispositivo.',
        },
        {
          title: 'Métricas Precisas de Malha e Dimensões',
          description:
            'Verifique contagem exata de triângulos, vértices, materiais PBR e dimensões reais X × Y × Z, além de ajuste Z-Up com um clique para impressão 3D em STL.',
        },
        {
          title: 'Luzes de Estúdio e Captura PNG Alfa',
          description:
            'Alterne entre ambientes de iluminação calibrados, navegue por animações glTF e baixe imagens PNG com transparência limpa para portfólios e relatórios.',
        },
      ],
      faqHeading: 'Perguntas Frequentes',
      faqSubheading: 'Respostas diretas sobre formatos 3D compatíveis, privacidade no navegador, texturas e exportação PNG.',
      faqs: [
        {
          question: 'Quais formatos de arquivo 3D posso abrir e inspecionar (GLB, glTF, OBJ, STL)?',
          answer:
            'O ModelixAI suporta arquivos GLB binários (.glb), glTF 2.0 (.gltf com compressão Draco e buffers .bin), Wavefront OBJ (.obj com materiais .mtl) e arquivos STL binários ou ASCII (.stl) amplamente usados em CAD e impressão 3D.',
        },
        {
          question: 'Meus modelos 3D são enviados para algum servidor durante a visualização?',
          answer:
            'Não. O ModelixAI roda 100% localmente no seu navegador via WebGL. Suas geometrias, animações e texturas são lidas direto da memória local, sem envio para nuvem ou servidores externos.',
        },
        {
          question: 'Como exportar um render PNG transparente ou ver wireframe e contagem de polígonos?',
          answer:
            'Após abrir o modelo, consulte o painel Inspetor de Modelo para ver triângulos, vértices, materiais e dimensões. Ative o botão Wireframe para analisar a topologia e clique em "Exportar PNG Transparente" para baixar uma imagem com fundo alfa limpo.',
        },
        {
          question: 'Como carregar texturas em modelos OBJ ou glTF com vários arquivos?',
          answer:
            'Selecione todos os arquivos relacionados juntos — como seu .gltf, .bin e texturas PNG/JPG, ou seu .obj, .mtl e mapas de imagem — e solte-os ao mesmo tempo no visualizador (ou arraste a pasta inteira). As texturas são associadas automaticamente na memória.',
        },
      ],
    },
    howToUse: {
      title: 'Como Ver e Inspecionar Modelos 3D GLB, STL e OBJ Web',
      metaDescription:
        'Guia passo a passo para abrir arquivos GLB, glTF, OBJ e STL no navegador, conferir triângulos e materiais, tocar animações e exportar PNG 3D.',
      h1: 'Como Visualizar e Inspecionar Modelos 3D no Navegador',
      intro:
        'O ModelixAI oferece a designers, desenvolvedores de jogos e entusiastas de impressão 3D uma bancada rápida para auditar arquivos 3D sem instalar softwares pesados.',
      steps: [
        {
          title: 'Abra um Arquivo Único ou Conjunto com Texturas',
          description:
            'Clique em "Abrir Modelo 3D" ou arraste um arquivo .glb, .gltf, .obj ou .stl para a tela. Em modelos com arquivos auxiliares (.gltf + .bin + texturas ou .obj + .mtl + imagens), selecione todos juntos ou solte a pasta completa.',
        },
        {
          title: 'Orbite, Aproxime e Ajuste o Eixo Z-Up para STL',
          description:
            'O modelo é centralizado automaticamente. Arraste para orbitar, role para aplicar zoom e use o botão direito para mover. Ao abrir peças .stl de CAD, ative "Eixo Z Vertical" para alinhar a base ao piso.',
        },
        {
          title: 'Analise Polígonos, Materiais e Medidas Reais',
          description:
            'Consulte o Inspetor de Modelo para validar o total de triângulos, vértices, malhas, materiais e dimensões X × Y × Z antes de importar em motores 3D ou fatiadores de impressão.',
        },
        {
          title: 'Teste Topologia Wireframe, Luzes e Animações',
          description:
            'Ative o modo Wireframe para revisar a malha poligonal e alterne entre quatro estilos de iluminação de estúdio. Em arquivos GLB/glTF animados, escolha o clipe e controle a linha do tempo.',
        },
        {
          title: 'Exporte Renders PNG com Fundo Transparente',
          description:
            'Posicione o melhor ângulo de câmera e clique em "Exportar PNG Transparente" para baixar instantaneamente uma captura nítida com canal alfa.',
        },
      ],
      controlsHeading: 'Atalhos de Navegação da Câmera',
      colAction: 'Ação',
      colDesktop: 'Mouse / Trackpad',
      colTouch: 'Tela Sensível ao Toque',
      controls: [
        { action: 'Orbitar câmera', desktop: 'Clique esquerdo + arrastar', touch: 'Arrastar com um dedo' },
        { action: 'Zoom', desktop: 'Roda do mouse', touch: 'Pinça com dois dedos' },
        { action: 'Mover alvo', desktop: 'Clique direito + arrastar', touch: 'Arrastar com dois dedos' },
        { action: 'Centralizar', desktop: 'Clique em "Resetar Câmera"', touch: 'Toque em "Resetar Câmera"' },
      ],
      ctaLabel: 'Abrir Visualizador 3D',
    },
    hireMe: {
      title: 'Contratar Kishara Dilshan - Astro, React e Web 3D | Modelix',
      metaDescription:
        'Precisa de um aplicativo web ultrarrápido em Astro, React ou Next.js ou ferramenta WebAssembly? Contrate Kishara Dilshan para soluções web.',
      h1Badge: 'Disponível para Projetos Freelance',
      heading: 'Precisa de uma Solução de TI Sob Medida?',
      intro: 'Olá, sou Kishara Dilshan, o desenvolvedor por trás do ModelixAI.',
      subcopy:
        'Se você gostou desta ferramenta rápida no navegador e precisa de uma solução digital de alto nível para o seu negócio, estou disponível para projetos freelance. Sou especialista em:',
      specialties: [
        {
          title: 'Aplicações web ultrarrápidas e otimizadas para SEO',
          description: 'Astro, React, Next.js — projetadas para carregamento instantâneo, SEO técnico e escalabilidade.',
        },
        {
          title: 'Processamento local e ferramentas WebAssembly (WASM)',
          description: 'Utilitários de mídia, PDF, 3D e dados sem servidor que rodam com privacidade no navegador.',
        },
        {
          title: 'Design UI/UX e landing pages de alta conversão',
          description: 'Interfaces minimalistas e acessíveis criadas para converter visitantes no desktop e celular.',
        },
      ],
      ctaHeading: 'Vamos construir algo incrível juntos.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Envie um e-mail direto: kisharadilshan007@gmail.com',
      copyButtonLabel: 'Copiar E-mail',
      copiedAnnouncement: 'E-mail kisharadilshan007@gmail.com copiado para a área de transferência',
    },
  },

  de: {
    nav: {
      brandAria: 'ModelixAI Startseite',
      home: 'Startseite',
      howToUse: 'Anleitung',
      hireMe: 'Projektanfrage',
      languageAria: 'Sprache auswählen',
      themeToggleLightAria: 'Zum hellen Modus wechseln',
      themeToggleDarkAria: 'Zum dunklen Modus wechseln',
      installPwa: 'App installieren',
      installPwaAria: 'ModelixAI für die Offline-Nutzung zum Startbildschirm hinzufügen',
      supportDev: 'Unterstützen',
      supportDevAria: 'Entwickler auf Gumroad unterstützen',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: 'Brotkrümelnavigation',
      pwaGuideTitle: 'ModelixAI für Offline-Inspektion installieren',
      pwaGuideBody:
        'Tippen Sie in iOS Safari auf „Teilen“ und wählen Sie „Zum Home-Bildschirm“. Klicken Sie in Chrome oder Edge am Desktop auf das Installationssymbol in der Adressleiste.',
      pwaGuideInstalled: 'ModelixAI läuft bereits als installierte Offline-App.',
      pwaGuideClose: 'Verstanden',
    },
    footer: {
      privacyNote: '100 % lokale WebGL-Ausführung im Browser. Ihre 3D-Dateien werden niemals auf Server hochgeladen.',
      builtBy: 'Entwickelt von Kishara Dilshan',
      allRights: 'Open Source unter MIT-Lizenz.',
    },
    viewer: {
      dropzoneTitle: '3D-Modelldateien hier ablegen oder zum Öffnen klicken',
      dropzoneSubtitle: 'Unterstützt Mehrfachdateien (.gltf + .bin + Texturen, .obj + .mtl + Texturen)',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: 'GLB-, glTF-, OBJ- oder STL-3D-Dateien von Ihrem Gerät öffnen oder ablegen',
      openModelBtn: '3D-Modell öffnen',
      samplePbrBtn: 'Beispiel laden',
      sampleStlBtn: 'CAD-STL-Beispiel',
      samplePbrName: 'Orbital-Gyro-PBR.glb (Beispiel)',
      sampleStlName: 'Precision-Spur-Gear.stl (Beispiel)',
      proceduralSize: 'Integriert',
      wireframe: 'Drahtgitter',
      wireframeAria: 'Drahtgitter-Überlagerung umschalten',
      gridFloor: 'Rasterboden',
      gridFloorAria: 'Referenz-Rasterboden umschalten',
      autoRotate: 'Auto-Rotation',
      autoRotateAria: 'Automatische Kameradrehung umschalten',
      zUpUpright: 'Z-Achse Oben',
      zUpUprightAria: 'Z-up-zu-Y-up-Ausrichtung für STL-CAD-Dateien umschalten',
      resetCamera: 'Kamera Reset',
      resetCameraAria: 'Kameraansicht und Zoom zurücksetzen',
      lightingLabel: 'Studiolicht',
      lightingNeutral: 'Studio Neutral',
      lightingRim: 'Weiches Kantenlicht',
      lightingClay: 'Warmer Ton',
      lightingBlueprint: 'Kühles Blueprint',
      backdropLabel: 'Hintergrund',
      backdropLight: 'Hell',
      backdropDark: 'Dunkel',
      backdropChecker: 'Transparent',
      animationsLabel: 'Animationen',
      clipSelectAria: 'Animationsclip auswählen',
      playAnimationAria: '3D-Modellanimation abspielen',
      pauseAnimationAria: '3D-Modellanimation pausieren',
      playBtn: 'Abspielen',
      pauseBtn: 'Pause',
      scrubberAria: 'Animations-Zeitleiste',
      inspectorTitle: 'Modell-Inspektor',
      statFormat: 'Format',
      statTriangles: 'Dreiecke',
      statVertices: 'Vertices',
      statMeshes: 'Meshes',
      statMaterials: 'Materialien / Tex',
      statDimensions: 'Maße (X×Y×Z)',
      statFileSize: 'Dateigröße',
      exportPngBtn: 'Transparentes PNG exportieren',
      exportPngAria: 'Aktuelle 3D-Ansicht als transparentes PNG-Bild exportieren',
      orbitHint: 'Links ziehen: Drehen • Mausrad/Pinch: Zoomen • Rechts ziehen/Zwei Finger: Schwenken',
      privacyBadge: 'Lokales WebGL • Kein Upload',
      statusLoadedTemplate: 'Modell {name} ({format}) mit {triangles} Dreiecken geladen.',
      statusExportedTemplate: 'Transparentes PNG exportiert: {filename}.',
      errorUnsupported: 'Nicht unterstütztes Format. Bitte wählen Sie eine .glb-, .gltf-, .obj- oder .stl-Datei.',
      errorLoadFailed: '3D-Datei konnte nicht gelesen werden. Prüfen Sie zugehörige .bin- oder .mtl-Dateien.',
      loadingModel: '3D-Geometrie wird lokal verarbeitet…',
    },
    home: {
      title: '3D-Modell-Viewer Online - GLB, glTF, OBJ & STL kostenlos',
      metaDescription:
        'Prüfen Sie GLB-, glTF-, OBJ- und STL-3D-Modelle direkt im Browser. Polygone messen, Wireframe oder Licht testen und transparente PNGs sichern.',
      h1: '3D-Modell-Viewer — GLB, glTF, OBJ & STL online prüfen',
      heroSubtitle:
        'Ziehen Sie GLB-, glTF-, OBJ- oder STL-Dateien in das Ansichtsfenster, um Polygonwerte zu prüfen, Drahtgitter oder Studiolicht umzuschalten, Animationen abzuspielen und transparente PNGs lokal zu speichern.',
      highlightsHeading: 'Entwickelt für 3D-Artists, Entwickler & CAD-Konstrukteure',
      highlights: [
        {
          title: 'Maximale Privatsphäre ohne Server-Upload',
          description:
            'Alle Meshes und Texturen werden direkt in Ihrem Browser per WebGL und Three.js verarbeitet. Vertrauliche CAD-Bauteile verlassen Ihr Gerät zu keinem Zeitpunkt.',
        },
        {
          title: 'Präzise Mesh- und Maßangaben',
          description:
            'Überprüfen Sie exakte Dreiecks- und Vertexzahlen, PBR-Materialien sowie reale X × Y × Z-Abmessungen inklusive Z-Achsen-Korrektur für den 3D-Druck.',
        },
        {
          title: 'Studiobeleuchtung & Alpha-PNG-Export',
          description:
            'Wechseln Sie zwischen kalibrierten Lichtprofilen, steuern Sie glTF-Animationen auf der Zeitleiste und speichern Sie freigestellte PNG-Renderings auf Knopfdruck.',
        },
      ],
      faqHeading: 'Häufig gestellte Fragen',
      faqSubheading: 'Wichtige Antworten zu unterstützten 3D-Formaten, lokalem Datenschutz, Texturen und PNG-Export.',
      faqs: [
        {
          question: 'Welche 3D-Dateiformate kann ich öffnen und prüfen (GLB, glTF, OBJ, STL)?',
          answer:
            'ModelixAI unterstützt binäre GLB-Dateien (.glb), glTF 2.0 (.gltf inklusive Draco-Komprimierung und .bin-Puffern), Wavefront OBJ (.obj mit .mtl-Materialdateien) sowie binäre und ASCII-STL-Dateien (.stl) für CAD und 3D-Druck.',
        },
        {
          question: 'Werden meine 3D-Modelle bei der Vorschau auf einen Server hochgeladen?',
          answer:
            'Nein. ModelixAI arbeitet zu 100 % lokal im Browser über WebGL. Sämtliche Geometrien, Texturen und Animationen bleiben im Arbeitsspeicher Ihres Geräts und werden an keinen externen Server übertragen.',
        },
        {
          question: 'Wie exportiere ich ein transparentes PNG oder prüfe Drahtgitter und Polygonanzahl?',
          answer:
            'Im Bereich Modell-Inspektor sehen Sie sofort Dreiecke, Vertices, Materialien und Bauteilmaße. Aktivieren Sie „Drahtgitter“ zur Topologieprüfung und klicken Sie auf „Transparentes PNG exportieren“, um ein freigestelltes Bild ohne Hintergrund herunterzuladen.',
        },
        {
          question: 'Wie lade ich Texturen für mehrteilige OBJ- oder glTF-Modelle?',
          answer:
            'Markieren Sie alle zusammengehörigen Dateien gleichzeitig — etwa .gltf, .bin und Texturbilder oder .obj, .mtl und Texturen — und ziehen Sie sie gemeinsam in den Viewer (oder legen Sie den gesamten Ordner ab). Die Verknüpfung erfolgt automatisch im Speicher.',
        },
      ],
    },
    howToUse: {
      title: 'GLB-, STL- & OBJ-3D-Modelle im Browser prüfen | Guide',
      metaDescription:
        'Schritt-für-Schritt-Anleitung zum Öffnen von GLB-, glTF-, OBJ- und STL-Dateien im Browser: Dreiecke prüfen, Animationen spielen & PNG sichern.',
      h1: 'So öffnen und prüfen Sie 3D-Modelle direkt im Browser',
      intro:
        'ModelixAI bietet Designern, Spieleentwicklern und 3D-Druck-Anwendern eine präzise Arbeitsumgebung zur Qualitätskontrolle von 3D-Daten ohne Softwareinstallation.',
      steps: [
        {
          title: 'Einzelne 3D-Datei oder Textur-Paket öffnen',
          description:
            'Klicken Sie auf „3D-Modell öffnen“ oder ziehen Sie eine .glb-, .gltf-, .obj- oder .stl-Datei in die Bühne. Bei mehrteiligen Modellen (.gltf + .bin + Texturen oder .obj + .mtl + Bilder) ziehen Sie einfach alle Dateien oder den Ordner gemeinsam hinein.',
        },
        {
          title: 'Drehen, Zoomen und Z-Up-STL-Bauteile ausrichten',
          description:
            'Das Modell wird automatisch zentriert eingepasst. Ziehen Sie mit links zum Drehen, scrollen Sie zum Zoomen und schwenken Sie per Rechtsklick. Für CAD-STL-Dateien stellt „Z-Achse Oben“ das Bauteil korrekt auf den Rasterboden.',
        },
        {
          title: 'Polygone, Materialien und Abmessungen kontrollieren',
          description:
            'Prüfen Sie im Modell-Inspektor die exakten Dreiecke, Vertices, Teil-Meshes, Materialien und X × Y × Z-Maße vor dem Export in Ihre Engine oder Slicer-Software.',
        },
        {
          title: 'Drahtgitter, Studiolicht und Animationen testen',
          description:
            'Schalten Sie das Drahtgitter zur Kantenprüfung ein und testen Sie vier Studiolicht-Profile. Enthält eine GLB- oder glTF-Datei Animationen, wählen Sie den Clip und steuern Sie die Zeitleiste.',
        },
        {
          title: 'Freigestellte PNG-Renderings exportieren',
          description:
            'Wählen Sie den gewünschten Kamerawinkel und klicken Sie auf „Transparentes PNG exportieren“, um sofort ein scharfes Bild mit transparentem Alphakanal zu speichern.',
        },
      ],
      controlsHeading: 'Schnellübersicht Kamerasteuerung',
      colAction: 'Aktion',
      colDesktop: 'Maus / Trackpad',
      colTouch: 'Touchscreen',
      controls: [
        { action: 'Kamera drehen', desktop: 'Linksklick + ziehen', touch: 'Mit einem Finger ziehen' },
        { action: 'Zoomen', desktop: 'Mausrad drehen', touch: 'Zwei-Finger-Zoom' },
        { action: 'Ansicht schwenken', desktop: 'Rechtsklick + ziehen', touch: 'Mit zwei Fingern ziehen' },
        { action: 'Neu zentrieren', desktop: 'Klick auf „Kamera Reset“', touch: 'Tippen auf „Kamera Reset“' },
      ],
      ctaLabel: '3D-Modell-Viewer starten',
    },
    hireMe: {
      title: 'Kishara Dilshan buchen - Astro, React & 3D-Web | ModelixAI',
      metaDescription:
        'Sie suchen eine ultraschnelle Astro-, React- oder Next.js-Web-App oder ein WebAssembly-Tool? Buchen Sie Kishara Dilshan für moderne IT-Apps.',
      h1Badge: 'Verfügbar für Freelance-Projekte',
      heading: 'Sie benötigen eine maßgeschneiderte IT-Lösung?',
      intro: 'Hallo, ich bin Kishara Dilshan, der Entwickler hinter ModelixAI.',
      subcopy:
        'Wenn Ihnen dieses schnelle Client-Side-Tool gefällt und Sie eine erstklassige Web-Lösung für Ihr Unternehmen suchen, stehe ich für Freelance-Projekte zur Verfügung. Meine Schwerpunkte:',
      specialties: [
        {
          title: 'Ultraschnelle, SEO-optimierte Webanwendungen',
          description: 'Astro, React, Next.js — entwickelt für minimale Ladezeiten, technisches SEO und saubere Skalierbarkeit.',
        },
        {
          title: 'Client-seitige Verarbeitung & WebAssembly (WASM) Tools',
          description: 'Serverlose Medien-, PDF-, 3D- und Datenwerkzeuge, die sicher direkt im Browser laufen.',
        },
        {
          title: 'UI/UX-Design & konversionsstarke Landingpages',
          description: 'Minimalistische, barrierefreie Oberflächen für höchste Nutzerfreundlichkeit auf Desktop und Mobilgeräten.',
        },
      ],
      ctaHeading: 'Lassen Sie uns gemeinsam etwas Großartiges entwickeln.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Direkt per E-Mail: kisharadilshan007@gmail.com',
      copyButtonLabel: 'E-Mail kopieren',
      copiedAnnouncement: 'E-Mail-Adresse kisharadilshan007@gmail.com in die Zwischenablage kopiert',
    },
  },

  fr: {
    nav: {
      brandAria: 'Accueil ModelixAI',
      home: 'Accueil',
      howToUse: 'Guide',
      hireMe: 'Me Recruter',
      languageAria: 'Choisir la langue',
      themeToggleLightAria: 'Passer au mode clair',
      themeToggleDarkAria: 'Passer au mode sombre',
      installPwa: 'Installer l’App',
      installPwaAria: 'Ajouter ModelixAI à l’écran d’accueil pour un usage hors ligne',
      supportDev: 'Soutenir',
      supportDevAria: 'Soutenir le développeur sur Gumroad',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: 'Fil d’Ariane',
      pwaGuideTitle: 'Installer ModelixAI en Mode Hors Ligne',
      pwaGuideBody:
        'Sur Safari iOS, touchez Partager puis « Sur l’écran d’accueil ». Sur Chrome ou Edge ordinateur, cliquez sur l’icône d’installation dans la barre d’adresse.',
      pwaGuideInstalled: 'ModelixAI fonctionne déjà comme application installée hors ligne.',
      pwaGuideClose: 'Fermer',
    },
    footer: {
      privacyNote: 'Exécution WebGL 100 % locale dans le navigateur. Vos fichiers 3D ne sont jamais envoyés sur un serveur.',
      builtBy: 'Conçu par Kishara Dilshan',
      allRights: 'Open Source sous licence MIT.',
    },
    viewer: {
      dropzoneTitle: 'Glissez vos fichiers 3D ici ou cliquez pour ouvrir',
      dropzoneSubtitle: 'Prend en charge les lots multi-fichiers (.gltf + .bin + textures, .obj + .mtl + textures)',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: 'Ouvrir ou déposer des modèles 3D GLB, glTF, OBJ ou STL depuis votre appareil',
      openModelBtn: 'Ouvrir un Modèle 3D',
      samplePbrBtn: 'Modèle Exemple',
      sampleStlBtn: 'Exemple CAO STL',
      samplePbrName: 'Orbital-Gyro-PBR.glb (Exemple)',
      sampleStlName: 'Precision-Spur-Gear.stl (Exemple)',
      proceduralSize: 'Intégré',
      wireframe: 'Filaire',
      wireframeAria: 'Activer ou désactiver le maillage filaire',
      gridFloor: 'Grille',
      gridFloorAria: 'Afficher ou masquer la grille au sol',
      autoRotate: 'Rotation Auto',
      autoRotateAria: 'Activer ou désactiver la rotation automatique',
      zUpUpright: 'Axe Z Vertical',
      zUpUprightAria: 'Basculer l’orientation Z-up vers Y-up pour les fichiers STL',
      resetCamera: 'Réinitialiser Caméra',
      resetCameraAria: 'Réinitialiser l’angle et le zoom de la caméra',
      lightingLabel: 'Éclairage Studio',
      lightingNeutral: 'Studio Neutre',
      lightingRim: 'Contour Doux',
      lightingClay: 'Argile Chaude',
      lightingBlueprint: 'Plan Froid',
      backdropLabel: 'Arrière-plan',
      backdropLight: 'Clair',
      backdropDark: 'Sombre',
      backdropChecker: 'Transparent',
      animationsLabel: 'Animations',
      clipSelectAria: 'Sélectionner une séquence d’animation',
      playAnimationAria: 'Lire l’animation du modèle 3D',
      pauseAnimationAria: 'Mettre en pause l’animation du modèle 3D',
      playBtn: 'Lire',
      pauseBtn: 'Pause',
      scrubberAria: 'Curseur temporel de l’animation',
      inspectorTitle: 'Inspecteur 3D',
      statFormat: 'Format',
      statTriangles: 'Triangles',
      statVertices: 'Sommets',
      statMeshes: 'Maillages',
      statMaterials: 'Matériaux / Tex',
      statDimensions: 'Dimensions (X×Y×Z)',
      statFileSize: 'Taille',
      exportPngBtn: 'Exporter PNG Transparent',
      exportPngAria: 'Exporter le rendu 3D actuel en image PNG transparente',
      orbitHint: 'Clic gauche : Orbiter • Molette/Pincement : Zoomer • Clic droit/Deux doigts : Déplacer',
      privacyBadge: 'WebGL Local • Zéro Envoi',
      statusLoadedTemplate: 'Modèle {name} ({format}) chargé avec {triangles} triangles.',
      statusExportedTemplate: 'Capture PNG transparente exportée : {filename}.',
      errorUnsupported: 'Format non pris en charge. Choisissez un fichier .glb, .gltf, .obj ou .stl.',
      errorLoadFailed: 'Impossible de lire ce fichier 3D. Vérifiez la présence des fichiers .bin ou .mtl associés.',
      loadingModel: 'Analyse locale de la géométrie 3D…',
    },
    home: {
      title: 'Visionneuse 3D en Ligne - Ouvrir GLB, glTF, OBJ et STL',
      metaDescription:
        'Inspectez vos modèles 3D GLB, glTF, OBJ et STL dans le navigateur. Vérifiez les polygones, le mode filaire, l’éclairage et exportez des PNG.',
      h1: 'Visionneuse 3D — Ouvrir et Inspecter GLB, glTF, OBJ et STL en Ligne',
      heroSubtitle:
        'Glissez-déposez vos fichiers GLB, glTF, OBJ ou STL pour analyser le nombre de polygones, activer le mode filaire ou l’éclairage studio, lire les animations et exporter des PNG transparents localement.',
      highlightsHeading: 'Pensé pour les Artistes 3D, Développeurs et Makers CAO',
      highlights: [
        {
          title: 'Confidentialité Totale Sans Transfert Serveur',
          description:
            'Chaque maillage et texture est décodé directement dans votre navigateur via WebGL et Three.js. Vos prototypes CAO et ressources de jeu restent sur votre machine.',
        },
        {
          title: 'Statistiques Précises de Maillage et Dimensions',
          description:
            'Contrôlez le nombre exact de triangles, sommets, matériaux PBR et dimensions X × Y × Z réelles, avec redressement Z-Up instantané pour les pièces STL.',
        },
        {
          title: 'Éclairage Studio et Capture PNG Alpha',
          description:
            'Alternez entre quatre ambiances lumineuses calibrées, parcourez les animations glTF et téléchargez des rendus PNG détourés en un clic.',
        },
      ],
      faqHeading: 'Questions Fréquentes',
      faqSubheading: 'Tout savoir sur les formats 3D compatibles, la confidentialité locale, les textures et l’export PNG.',
      faqs: [
        {
          question: 'Quels formats de fichiers 3D puis-je ouvrir et inspecter (GLB, glTF, OBJ, STL) ?',
          answer:
            'ModelixAI prend en charge les fichiers binaires GLB (.glb), le standard glTF 2.0 (.gltf avec compression Draco et fichiers .bin), Wavefront OBJ (.obj avec matériaux .mtl) ainsi que les fichiers STL binaires ou ASCII (.stl) dédiés à la CAO et à l’impression 3D.',
        },
        {
          question: 'Mes modèles 3D sont-ils envoyés sur un serveur lors de l’aperçu ?',
          answer:
            'Non. ModelixAI s’exécute intégralement en local dans votre navigateur grâce à WebGL. Vos géométries, animations et textures sont lues en mémoire vive sans aucun transfert externe.',
        },
        {
          question: 'Comment exporter un rendu PNG transparent ou inspecter le maillage filaire et les polygones ?',
          answer:
            'Une fois le modèle ouvert, consultez le panneau Inspecteur 3D pour voir les triangles, sommets, matériaux et dimensions. Activez le bouton Filaire pour vérifier la topologie, puis cliquez sur « Exporter PNG Transparent » pour enregistrer une image sans arrière-plan.',
        },
        {
          question: 'Comment charger les textures d’un modèle OBJ ou glTF composé de plusieurs fichiers ?',
          answer:
            'Sélectionnez simultanément tous les fichiers associés — par exemple .gltf, .bin et textures PNG/JPG, ou .obj, .mtl et cartes d’images — et déposez-les ensemble dans la visionneuse (ou glissez le dossier complet). Les textures sont reliées automatiquement en mémoire.',
        },
      ],
    },
    howToUse: {
      title: 'Comment Voir et Inspecter des Modèles 3D GLB, STL, OBJ',
      metaDescription:
        'Guide étape par étape pour ouvrir des fichiers GLB, glTF, OBJ et STL dans votre navigateur, analyser les triangles, lire l’animation et créer PNG.',
      h1: 'Comment Visualiser et Inspecter des Modèles 3D dans Votre Navigateur',
      intro:
        'ModelixAI offre aux créateurs 3D, ingénieurs temps réel et imprimeurs 3D un atelier instantané pour vérifier leurs fichiers sans logiciel lourd.',
      steps: [
        {
          title: 'Ouvrir un Fichier 3D Unique ou un Dossier Complet',
          description:
            'Cliquez sur « Ouvrir un Modèle 3D » ou déposez un fichier .glb, .gltf, .obj ou .stl. Pour les modèles multi-fichiers (.gltf + .bin + textures ou .obj + .mtl + images), glissez tous les fichiers ensemble ou le dossier entier.',
        },
        {
          title: 'Orbiter, Zoomer et Redresser l’Axe Z des Fichiers STL',
          description:
            'Le modèle est centré automatiquement. Glissez pour tourner autour de l’objet, utilisez la molette pour zoomer et le clic droit pour déplacer la vue. Activez « Axe Z Vertical » pour poser vos pièces STL à plat sur la grille.',
        },
        {
          title: 'Vérifier les Polygones, Matériaux et Dimensions Exactes',
          description:
            'Consultez l’Inspecteur 3D afin de valider le total de triangles, sommets, sous-objets, matériaux et dimensions X × Y × Z avant l’import dans votre moteur 3D ou trancheur.',
        },
        {
          title: 'Tester le Mode Filaire, l’Éclairage Studio et les Animations',
          description:
            'Activez le mode Filaire pour analyser la topologie et testez quatre préréglages d’éclairage studio. Pour les modèles GLB/glTF animés, choisissez une séquence et déplacez le curseur temporel.',
        },
        {
          title: 'Exporter des Captures PNG à Fond Transparent',
          description:
            'Cadrez votre angle de vue puis cliquez sur « Exporter PNG Transparent » pour télécharger immédiatement un rendu détouré avec canal alpha.',
        },
      ],
      controlsHeading: 'Raccourcis de Navigation Caméra',
      colAction: 'Action',
      colDesktop: 'Souris / Pavé tactile',
      colTouch: 'Écran tactile',
      controls: [
        { action: 'Orbiter la caméra', desktop: 'Clic gauche + glisser', touch: 'Glisser à un doigt' },
        { action: 'Zoom avant / arrière', desktop: 'Molette de défilement', touch: 'Pincer à deux doigts' },
        { action: 'Déplacer la cible', desktop: 'Clic droit + glisser', touch: 'Glisser à deux doigts' },
        { action: 'Recentrer la vue', desktop: 'Cliquer sur « Réinitialiser Caméra »', touch: 'Toucher « Réinitialiser Caméra »' },
      ],
      ctaLabel: 'Ouvrir la Visionneuse 3D',
    },
    hireMe: {
      title: 'Engager Kishara Dilshan - Astro, React & Web 3D | Modelix',
      metaDescription:
        'Besoin d’une application web ultra-rapide sous Astro, React ou Next.js ou d’un outil WebAssembly ? Engagez Kishara Dilshan pour vos projets.',
      h1Badge: 'Disponible pour Missions Freelance',
      heading: 'Besoin d’une Solution Web Sur Mesure ?',
      intro: 'Bonjour, je suis Kishara Dilshan, le développeur derrière ModelixAI.',
      subcopy:
        'Si vous appréciez la rapidité de cet outil local et recherchez une solution numérique performante pour votre entreprise, je suis disponible en freelance. Mes spécialités :',
      specialties: [
        {
          title: 'Applications web ultra-rapides et optimisées SEO',
          description: 'Astro, React, Next.js — conçues pour un chargement instantané, un SEO technique solide et une architecture évolutive.',
        },
        {
          title: 'Traitement côté client & outils WebAssembly (WASM)',
          description: 'Outils média, PDF, 3D et données sans serveur fonctionnant en toute confidentialité dans le navigateur.',
        },
        {
          title: 'Design UI/UX & pages d’atterrissage à forte conversion',
          description: 'Interfaces épurées et accessibles pensées pour convertir vos visiteurs sur ordinateur et mobile.',
        },
      ],
      ctaHeading: 'Construisons ensemble un projet remarquable.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Contactez-moi directement : kisharadilshan007@gmail.com',
      copyButtonLabel: 'Copier l’E-mail',
      copiedAnnouncement: 'Adresse kisharadilshan007@gmail.com copiée dans le presse-papiers',
    },
  },

  ja: {
    nav: {
      brandAria: 'ModelixAI ホーム',
      home: 'ホーム',
      howToUse: '使い方',
      hireMe: '開発依頼',
      languageAria: '言語を選択',
      themeToggleLightAria: 'ライトモードに切り替え',
      themeToggleDarkAria: 'ダークモードに切り替え',
      installPwa: 'ホーム画面に追加',
      installPwaAria: 'オフライン利用のためにModelixAIをホーム画面に追加',
      supportDev: '開発を支援',
      supportDevAria: 'Gumroadで開発者を支援する',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: 'パンくずリスト',
      pwaGuideTitle: 'オフライン利用のためにアプリを追加',
      pwaGuideBody:
        'iOSのSafariでは共有アイコンから「ホーム画面に追加」を選択してください。PC版ChromeやEdgeではアドレスバー右側のインストールアイコンから追加できます。',
      pwaGuideInstalled: 'ModelixAIはオフライン対応アプリとしてインストール済みです。',
      pwaGuideClose: '閉じる',
    },
    footer: {
      privacyNote: '100%ブラウザ内のWebGLでローカル処理されます。3Dファイルが外部サーバーへ送信されることはありません。',
      builtBy: '開発: Kishara Dilshan',
      allRights: 'MITライセンス オープンソース',
    },
    viewer: {
      dropzoneTitle: '3Dモデルファイルをここにドロップ、またはクリックして開く',
      dropzoneSubtitle: '複数ファイル同時ドロップ対応（.gltf + .bin + テクスチャ / .obj + .mtl + 画像）',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: 'デバイスからGLB、glTF、OBJ、STL形式の3Dモデルファイルを開く',
      openModelBtn: '3Dモデルを開く',
      samplePbrBtn: 'サンプルを読込',
      sampleStlBtn: 'CAD STLサンプル',
      samplePbrName: 'Orbital-Gyro-PBR.glb (サンプル)',
      sampleStlName: 'Precision-Spur-Gear.stl (サンプル)',
      proceduralSize: '内蔵サンプル',
      wireframe: 'ワイヤーフレーム',
      wireframeAria: 'ワイヤーフレーム表示の切り替え',
      gridFloor: 'グリッド床',
      gridFloorAria: '基準グリッド床の表示切り替え',
      autoRotate: '自動回転',
      autoRotateAria: 'カメラの自動ターンテーブル回転を切り替え',
      zUpUpright: 'Z-Up上向き補正',
      zUpUprightAria: 'STLファイル向けにZ-UpからY-Upへの向き補正を切り替え',
      resetCamera: 'カメラ初期化',
      resetCameraAria: 'カメラ位置とズームを初期状態に戻す',
      lightingLabel: 'スタジオ照明',
      lightingNeutral: 'スタジオ標準',
      lightingRim: 'ソフトリム光',
      lightingClay: 'ウォームクレイ',
      lightingBlueprint: 'ブループリント',
      backdropLabel: '背景モード',
      backdropLight: 'ライト',
      backdropDark: 'ダーク',
      backdropChecker: '透過チェック',
      animationsLabel: 'アニメーション',
      clipSelectAria: 'アニメーションクリップを選択',
      playAnimationAria: '3Dモデルのアニメーションを再生',
      pauseAnimationAria: '3Dモデルのアニメーションを一時停止',
      playBtn: '再生',
      pauseBtn: '一時停止',
      scrubberAria: 'アニメーション再生シークバー',
      inspectorTitle: 'モデルインスペクター',
      statFormat: '形式',
      statTriangles: '三角形ポリゴン',
      statVertices: '頂点数',
      statMeshes: 'メッシュ数',
      statMaterials: 'マテリアル / テクスチャ',
      statDimensions: '寸法 (X×Y×Z)',
      statFileSize: 'ファイル容量',
      exportPngBtn: '透過PNGを書き出し',
      exportPngAria: '現在の3Dビューを背景透過PNG画像として保存',
      orbitHint: '左ドラッグ: 回転 • ホイール/ピンチ: 拡大縮小 • 右ドラッグ/2本指: 平行移動',
      privacyBadge: 'ローカルWebGL • サーバー送信ゼロ',
      statusLoadedTemplate: '{name}（{format}形式・三角形ポリゴン {triangles}）を読み込みました。',
      statusExportedTemplate: '背景透過PNGを保存しました: {filename}',
      errorUnsupported: '未対応のファイル形式です。.glb、.gltf、.obj、.stlファイルを選択してください。',
      errorLoadFailed: '3Dファイルの解析に失敗しました。付属の.binや.mtlファイルが含まれているか確認してください。',
      loadingModel: '3Dジオメトリをローカル解析中…',
    },
    home: {
      title: '無料オンライン3Dモデルビューア - GLB・glTF・OBJ・STLをブラウザで高速表示・メッシュ検査',
      metaDescription:
        'GLB、glTF、OBJ、STL形式の3Dモデルをサーバー送信なしでブラウザ上で直接プレビュー・検査できる無料WebGLツールです。ポリゴン数やマテリアルの確認、ワイヤーフレーム切替、スタジオ照明変更、アニメーション再生、透過PNG書き出しに完全対応しています。',
      h1: '3Dモデルビューア — GLB・glTF・OBJ・STLをオンラインで表示・検査',
      heroSubtitle:
        'GLB、glTF、OBJ、STLファイルをドラッグ＆ドロップするだけで、ポリゴン統計の検査、ワイヤーフレームやスタジオ照明の切り替え、アニメーション再生、透過PNG書き出しが100%ブラウザ内で完結します。',
      highlightsHeading: '3Dアーティスト・ゲーム開発者・3Dプリント設計者のために設計',
      highlights: [
        {
          title: 'サーバー送信ゼロの完全プライベート設計',
          description:
            'すべてのメッシュ・マテリアル・テクスチャはWebGLとThree.jsによりお使いのブラウザ内でのみ処理されます。機密CAD部品や開発中アセットが外部へ送信されることはありません。',
        },
        {
          title: '正確なポリゴン統計と実寸サイズ計測',
          description:
            '三角形ポリゴン数、頂点数、メッシュ分割数、PBRマテリアル数、X×Y×Zの実寸バウンディング寸法を即座に表示。3Dプリント用STL向けのZ-Up向き補正もワンクリックです。',
        },
        {
          title: 'スタジオ照明プリセット＆透過PNG出力',
          description:
            '4種類の照明環境を自在に切り替え、glTFアニメーションのタイムラインを確認しながら、資料作成やEC掲載に最適なアルファ透過PNGを保存できます。',
        },
      ],
      faqHeading: 'よくある質問',
      faqSubheading: '対応する3Dフォーマット、ローカル処理の安全性、テクスチャ読み込み、透過PNG保存についての回答です。',
      faqs: [
        {
          question: 'どの3Dファイル形式（GLB、glTF、OBJ、STL）を開いて検査できますか？',
          answer:
            'バイナリGLB（.glb）、Draco圧縮や外部.binバッファを含む標準glTF 2.0（.gltf）、.mtlマテリアル付きのWavefront OBJ（.obj）、およびCADや3Dプリントで標準的なバイナリ／ASCII形式のSTL（.stl）に対応しています。',
        },
        {
          question: 'プレビュー時に3Dモデルがサーバーへアップロードされることはありますか？',
          answer:
            'いいえ、一切ありません。ModelixAIはブラウザのWebGL機能を使って100%ローカルメモリ上で動作するため、データがクラウドや外部サーバーへ送信されることはありません。',
        },
        {
          question: '透過PNGレンダリングの保存や、ワイヤーフレーム・ポリゴン数の確認方法は？',
          answer:
            'モデルを読み込むと「モデルインスペクター」に三角形ポリゴン数、頂点数、マテリアル数、寸法が表示されます。「ワイヤーフレーム」ボタンでトポロジーを確認し、アングルを決めて「透過PNGを書き出し」を押すと背景なしのPNG画像を保存できます。',
        },
        {
          question: '複数ファイルで構成されたOBJやglTFモデルのテクスチャを読み込むには？',
          answer:
            '.gltfと.binとテクスチャ画像、または.objと.mtlと画像ファイルなど、関連ファイルをすべて同時に選択してドロップ（またはフォルダごとドロップ）してください。ブラウザメモリ内で自動的にリンクされます。',
        },
      ],
    },
    howToUse: {
      title: '3Dモデルの表示・検査ガイド - GLB・STL・OBJファイルをブラウザで確認する方法 | ModelixAI',
      metaDescription:
        'ブラウザ上でGLB、glTF、OBJ、STLファイルをドラッグ＆ドロップして開く手順をわかりやすく詳しく解説します。三角形ポリゴン数や実寸の確認、STLのZ-Up向き補正、アニメーション再生、複数テクスチャ読込、背景透過PNG保存までステップごとに案内します。',
      h1: 'ブラウザで3Dモデルを表示・検査する手順ガイド',
      intro:
        'ModelixAIを使えば、専用ソフトのインストールやファイルのアップロードを行うことなく、3Dアセットの品質チェックと透過レンダリング書き出しをすぐに行えます。',
      steps: [
        {
          title: '単体3Dファイルまたはテクスチャ一式を読み込む',
          description:
            '「3Dモデルを開く」をクリックするか、.glb・.gltf・.obj・.stlファイルをビューポートへドロップします。外部.binや.mtl・テクスチャ画像を伴う場合は、複数ファイルをまとめて選択するかフォルダごとドロップしてください。',
        },
        {
          title: '回転・ズーム操作とSTLファイルのZ-Up向き補正',
          description:
            '読み込まれたモデルは自動的に中央配置・全体フィットされます。ドラッグで回転、ホイールで拡大、右ドラッグで移動できます。CAD出力のSTLが横向きになる場合は「Z-Up上向き補正」を押すと床面に正しく直立します。',
        },
        {
          title: 'ポリゴン数・マテリアル・実寸バウンディングを確認',
          description:
            'モデルインスペクターで三角形数、頂点数、メッシュ数、マテリアル・テクスチャ数、正規化前のX×Y×Z実寸サイズを確認し、ゲームエンジンやスライサー投入前の検証に役立てます。',
        },
        {
          title: 'ワイヤーフレーム・スタジオ照明・アニメーションを検証',
          description:
            'ワイヤーフレーム表示でポリゴン分割を確認し、4種類のスタジオ照明で法線や質感をチェックします。アニメーション付きGLB/glTFではクリップ選択とシークバー操作が可能です。',
        },
        {
          title: '背景透過PNGスナップショットをワンクリック保存',
          description:
            '好みのアングルと照明を設定したら「透過PNGを書き出し」をクリックします。背景とグリッドを一時的に非表示にし、クリーンなアルファ透過PNG画像をダウンロードします。',
        },
      ],
      controlsHeading: 'ビューポート操作クイックリファレンス',
      colAction: '操作内容',
      colDesktop: 'マウス / トラックパッド',
      colTouch: 'タッチ画面',
      controls: [
        { action: 'カメラ回転', desktop: '左クリック＋ドラッグ', touch: '1本指でドラッグ' },
        { action: 'ズーム拡大・縮小', desktop: 'スクロールホイール', touch: '2本指でピンチ操作' },
        { action: '視点の平行移動', desktop: '右クリック＋ドラッグ', touch: '2本指でドラッグ' },
        { action: '正面フィットに戻す', desktop: '「カメラ初期化」をクリック', touch: '「カメラ初期化」をタップ' },
      ],
      ctaLabel: '3Dモデルビューアを開く',
    },
    hireMe: {
      title: 'Kishara Dilshanへ開発依頼 - Astro・React・3D Web制作 | ModelixAI',
      metaDescription:
        '超高速なAstro・React・Next.jsウェブアプリ開発や、ブラウザ完結型のWebAssembly・3D WebGLツールの構築をお探しですか？SEO設計とUI/UXに強いエンジニア Kishara Dilshan がフリーランス案件やカスタム開発を承ります。',
      h1Badge: 'フリーランス開発案件 受付中',
      heading: 'カスタムITソリューションをお探しですか？',
      intro: 'こんにちは、ModelixAIを開発した Kishara Dilshan です。',
      subcopy:
        'この高速なクライアントサイド3Dツールのように、ビジネス向けのハイレベルなWebアプリケーションや専用ツールの開発をお求めでしたら、ぜひご相談ください。以下の領域を専門としています：',
      specialties: [
        {
          title: '超高速かつSEO最適化されたWebアプリケーション開発',
          description: 'Astro、React、Next.jsを活用し、1秒未満の高速表示とテクニカルSEO、高い拡張性を実現します。',
        },
        {
          title: 'クライアントサイド処理＆WebAssembly（WASM）ツール構築',
          description: 'サーバー不要でブラウザ内で安全に動作するメディア・PDF・3D・データ処理ツールを開発します。',
        },
        {
          title: 'UI/UXデザイン＆高コンバージョンなランディングページ制作',
          description: 'PC・モバイル双方で直感的に使え、成果につながるミニマルでアクセシブルな画面設計を行います。',
        },
      ],
      ctaHeading: '素晴らしいプロダクトを一緒に作り上げましょう。',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: '直接メールを送る: kisharadilshan007@gmail.com',
      copyButtonLabel: 'メールをコピー',
      copiedAnnouncement: 'メールアドレス kisharadilshan007@gmail.com をコピーしました',
    },
  },

  zh: {
    nav: {
      brandAria: 'ModelixAI 首页',
      home: '首页',
      howToUse: '使用指南',
      hireMe: '合作联系',
      languageAria: '选择语言',
      themeToggleLightAria: '切换到浅色模式',
      themeToggleDarkAria: '切换到深色模式',
      installPwa: '添加到主屏幕',
      installPwaAria: '将 ModelixAI 添加到主屏幕以支持离线使用',
      supportDev: '支持开发者',
      supportDevAria: '在 Gumroad 上支持开发者',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: '面包屑导航',
      pwaGuideTitle: '安装 ModelixAI 离线应用',
      pwaGuideBody:
        '在 iOS Safari 中，点击底部“分享”按钮并选择“添加到主屏幕”。在桌面端 Chrome 或 Edge 中，点击地址栏右侧的安装图标即可随时离线启动。',
      pwaGuideInstalled: 'ModelixAI 已作为独立应用安装并启用离线支持。',
      pwaGuideClose: '知道了',
    },
    footer: {
      privacyNote: '100% 浏览器本地 WebGL 渲染运行，您的 3D 模型文件绝不会上传至任何服务器。',
      builtBy: '由 Kishara Dilshan 独立开发',
      allRights: '基于 MIT 协议开源。',
    },
    viewer: {
      dropzoneTitle: '将 3D 模型文件拖放到此处，或点击选择文件',
      dropzoneSubtitle: '支持多文件同时拖入（.gltf + .bin + 贴图 / .obj + .mtl + 贴图）',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: '从设备打开或拖入 GLB、glTF、OBJ 或 STL 三维模型文件',
      openModelBtn: '打开 3D 模型',
      samplePbrBtn: '加载示例模型',
      sampleStlBtn: 'CAD STL 示例',
      samplePbrName: 'Orbital-Gyro-PBR.glb (示例)',
      sampleStlName: 'Precision-Spur-Gear.stl (示例)',
      proceduralSize: '内置示例',
      wireframe: '线框模式',
      wireframeAria: '切换模型网格线框叠加显示',
      gridFloor: '参考网格',
      gridFloorAria: '切换地面参考网格显示',
      autoRotate: '自动旋转',
      autoRotateAria: '切换相机自动环绕旋转',
      zUpUpright: 'Z 轴朝上校正',
      zUpUprightAria: '为 STL 打印文件切换 Z-Up 到 Y-Up 直立方向',
      resetCamera: '重置视角',
      resetCameraAria: '重置相机环绕角度与缩放比例',
      lightingLabel: '工作室灯光',
      lightingNeutral: '标准演播室',
      lightingRim: '柔和轮廓光',
      lightingClay: '暖色泥塑光',
      lightingBlueprint: '冷色蓝图光',
      backdropLabel: '视口背景',
      backdropLight: '浅色',
      backdropDark: '深色',
      backdropChecker: '透明棋盘',
      animationsLabel: '动画控制',
      clipSelectAria: '选择模型动画片段',
      playAnimationAria: '播放 3D 模型动画',
      pauseAnimationAria: '暂停 3D 模型动画',
      playBtn: '播放',
      pauseBtn: '暂停',
      scrubberAria: '动画时间轴进度条',
      inspectorTitle: '模型检查器',
      statFormat: '文件格式',
      statTriangles: '三角面数',
      statVertices: '顶点数',
      statMeshes: '网格对象',
      statMaterials: '材质 / 贴图',
      statDimensions: '边界尺寸 (X×Y×Z)',
      statFileSize: '文件大小',
      exportPngBtn: '导出透明 PNG',
      exportPngAria: '将当前 3D 视图导出为透明背景 PNG 图片',
      orbitHint: '左键拖拽：旋转视角 • 滚轮/双指捏合：缩放 • 右键拖拽/双指滑动：平移',
      privacyBadge: '本地 WebGL • 零上传隐私保护',
      statusLoadedTemplate: '已加载 {name}（{format}），共 {triangles} 个三角面。',
      statusExportedTemplate: '已成功导出透明 PNG 图像：{filename}。',
      errorUnsupported: '不支持的文件格式，请选择 .glb、.gltf、.obj 或 .stl 模型文件。',
      errorLoadFailed: '无法解析该 3D 文件，请检查是否已同时拖入配套的 .bin 或 .mtl 文件。',
      loadingModel: '正在浏览器本地解析 3D 几何数据…',
    },
    home: {
      title: '免费在线 3D 模型查看器 - 浏览器直接打开与检查 GLB、glTF、OBJ 和 STL 三维模型工具',
      metaDescription:
        '无需上传服务器，直接在浏览器本地打开并检查 GLB、glTF、OBJ 与 STL 格式的 3D 模型。支持实时查看多边形面数、顶点数、材质与尺寸统计，一键切换线框模式和工作室灯光预设，播放模型骨骼动画，并免费导出高清透明背景 PNG 渲染图像，安全高效且完全免费。',
      h1: '在线 3D 模型查看器 — 免费打开并检查 GLB、glTF、OBJ 与 STL',
      heroSubtitle:
        '拖放 GLB、glTF、OBJ 或 STL 文件，即可在浏览器本地实时检查多边形面数统计、切换线框或工作室灯光、播放模型动画并导出透明背景 PNG 渲染图。',
      highlightsHeading: '专为 3D 美术师、游戏开发者与 3D 打印创客打造',
      highlights: [
        {
          title: '零上传本地隐私安全',
          description:
            '所有三维网格、PBR 材质与贴图均通过 WebGL 与 Three.js 在浏览器内存中直接解析，机密 CAD 零件与未发布资产绝不离开您的设备。',
        },
        {
          title: '精准网格统计与真实尺寸测量',
          description:
            '即时核查精确三角面数、顶点总数、子网格数量、材质贴图以及原始 X × Y × Z 边界尺寸，并提供 STL 模型一键 Z 轴直立校正。',
        },
        {
          title: '专业灯光预设与透明 PNG 导出',
          description:
            '自由切换四种校准灯光环境，拖动进度条逐帧预览 glTF 动画，并一键下载无背景干扰的 Alpha 透明通道 PNG 图像。',
        },
      ],
      faqHeading: '常见问题解答',
      faqSubheading: '关于支持的三维文件格式、本地隐私保护、多文件贴图加载与透明 PNG 导出的详细说明。',
      faqs: [
        {
          question: '我可以打开并检查哪些 3D 文件格式（GLB、glTF、OBJ、STL）？',
          answer:
            'ModelixAI 支持二进制 GLB（.glb）、标准 glTF 2.0（.gltf，含 Draco 压缩与外部 .bin 缓冲文件）、Wavefront OBJ（.obj 及配套 .mtl 材质文件）以及工业 CAD 与 3D 打印常用的二进制或 ASCII 格式 STL（.stl）文件。',
        },
        {
          question: '预览时我的 3D 模型会上传到远程服务器吗？',
          answer:
            '完全不会。ModelixAI 基于浏览器原生 WebGL 技术 100% 在本地内存中运行，您的三维几何体、动画与贴图数据不会传输到任何云端或外部服务器。',
        },
        {
          question: '如何导出透明背景 PNG 渲染图或查看线框与多边形面数？',
          answer:
            '加载模型后，右侧“模型检查器”会实时展示三角面数、顶点数、材质与尺寸数据。点击“线框模式”即可检查网格拓扑结构，调整好相机角度后点击“导出透明 PNG”即可保存高清去背图片。',
        },
        {
          question: '如何为多文件组成的 OBJ 或 glTF 模型加载贴图？',
          answer:
            '请将所有关联文件一起选中——例如同时选择 .gltf、.bin 与 PNG/JPG 贴图，或同时选择 .obj、.mtl 与贴图文件——一次性拖入视口（也支持直接拖入整个文件夹），系统会在浏览器内存中自动完成路径映射。',
        },
      ],
    },
    howToUse: {
      title: '如何在浏览器中查看与检查 GLB、STL 和 OBJ 三维模型完整使用指南 | ModelixAI 在线工具',
      metaDescription:
        '分步详解如何在浏览器本地安全打开 GLB、glTF、OBJ 和 STL 三维模型文件：包含鼠标旋转缩放视角、检查三角面数与边界尺寸、翻转 STL 打印模型 Z 轴朝向、加载多文件 OBJ 与贴图材质、控制动画时间轴以及一键导出透明背景 PNG 图像的实用操作说明。',
      h1: '如何在浏览器中查看与检查 3D 模型',
      intro:
        'ModelixAI 为三维设计师、前端与游戏工程师以及 3D 打印爱好者提供即开即用的模型质检工作台，无需安装大型桌面软件。',
      steps: [
        {
          title: '打开单个模型文件或多文件贴图包',
          description:
            '点击“打开 3D 模型”或直接将 .glb、.gltf、.obj、.stl 拖入画布。若模型包含外部 .bin、.mtl 及多张贴图图片，请框选全部文件或将整个文件夹一次性拖入视口。',
        },
        {
          title: '自由旋转缩放并校正 STL 模型 Z 轴方向',
          description:
            '模型加载后会自动居中并适配镜头。左键拖动旋转、滚轮缩放细节、右键平移焦点。针对 CAD 导出的 Z 轴朝上 STL 零件，开启“Z 轴朝上校正”即可平稳贴合网格地面。',
        },
        {
          title: '核查多边形面数、材质与原始边界尺寸',
          description:
            '通过“模型检查器”面板查看精准的三角面总数、顶点数、子网格数、材质贴图数以及未缩放的 X × Y × Z 物理尺寸，确保符合游戏引擎或切片软件规范。',
        },
        {
          title: '切换线框拓扑、工作室灯光与动画时间轴',
          description:
            '开启“线框模式”检查布线密度，切换四种工作室灯光观察法线细节。若 GLB/glTF 带有内嵌动画，可在动画栏切换片段并拖动时间轴逐帧审阅。',
        },
        {
          title: '一键导出高清 Alpha 透明背景 PNG',
          description:
            '调整至满意构图与灯光后点击“导出透明 PNG”，渲染器会自动隐去背景与地面网格，生成干净的透明通道 PNG 图片供文档、电商或作品集使用。',
        },
      ],
      controlsHeading: '视口相机操作速查表',
      colAction: '视口操作',
      colDesktop: '鼠标 / 触控板',
      colTouch: '触屏手势',
      controls: [
        { action: '环绕旋转相机', desktop: '鼠标左键按住拖拽', touch: '单指滑动' },
        { action: '放大 / 缩小视图', desktop: '滚动鼠标滚轮', touch: '双指捏合缩放' },
        { action: '平移观察焦点', desktop: '鼠标右键按住拖拽', touch: '双指平行拖动' },
        { action: '恢复初始镜头', desktop: '点击“重置视角”按钮', touch: '轻触“重置视角”按钮' },
      ],
      ctaLabel: '立即打开 3D 模型查看器',
    },
    hireMe: {
      title: '聘请 Kishara Dilshan - Astro、React 与 3D Web 开发专家 | ModelixAI',
      metaDescription:
        '需要打造超快加载、SEO 友好的 Astro、React 或 Next.js 现代网页应用，或是纯前端运行的 WebAssembly 与 WebGL 三维工具吗？欢迎联系独立开发者 Kishara Dilshan 定制高性能、高转化率的企业级 IT 解决方案。',
      h1Badge: '承接自由职业与定制开发项目',
      heading: '需要量身定制的 IT 技术方案吗？',
      intro: '您好，我是 ModelixAI 背后的开发者 Kishara Dilshan。',
      subcopy:
        '如果您喜欢这款极速流畅的纯前端工具，并希望为您的业务打造世界级的 Web 产品或在线工具，欢迎与我联系合作。我专注于以下领域：',
      specialties: [
        {
          title: '超快加载且深度 SEO 优化的现代 Web 应用',
          description: '精通 Astro、React、Next.js —— 打造毫秒级响应、完善技术 SEO 与高可扩展性的前端架构。',
        },
        {
          title: '纯前端本地处理与 WebAssembly (WASM) 工具开发',
          description: '构建零服务器成本、隐私安全的浏览器端音视频、PDF、3D WebGL 与数据处理工具。',
        },
        {
          title: '精致 UI/UX 设计与高转化率落地页开发',
          description: '设计极简、无障碍且完美适配桌面与移动端的交互界面，助力提升业务转化。',
        },
      ],
      ctaHeading: '让我们携手打造出色的数字产品。',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: '直接发送邮件：kisharadilshan007@gmail.com',
      copyButtonLabel: '复制邮箱地址',
      copiedAnnouncement: '已将邮箱 kisharadilshan007@gmail.com 复制到剪贴板',
    },
  },

  ru: {
    nav: {
      brandAria: 'Главная ModelixAI',
      home: 'Главная',
      howToUse: 'Инструкция',
      hireMe: 'Заказать разработку',
      languageAria: 'Выбрать язык',
      themeToggleLightAria: 'Переключить на светлую тему',
      themeToggleDarkAria: 'Переключить на тёмную тему',
      installPwa: 'Установить приложение',
      installPwaAria: 'Добавить ModelixAI на главный экран для работы офлайн',
      supportDev: 'Поддержать',
      supportDevAria: 'Поддержать разработчика на Gumroad',
      githubAria: 'View source code on GitHub',
      breadcrumbAria: 'Навигационная цепочка',
      pwaGuideTitle: 'Установите ModelixAI для работы без интернета',
      pwaGuideBody:
        'В Safari на iOS нажмите «Поделиться» и выберите «На экран „Домой“». В Chrome или Edge на компьютере нажмите значок установки в адресной строке.',
      pwaGuideInstalled: 'ModelixAI уже установлено и готово к работе офлайн.',
      pwaGuideClose: 'Понятно',
    },
    footer: {
      privacyNote: '100% локальная обработка WebGL в браузере. Ваши 3D-файлы никогда не загружаются на сервер.',
      builtBy: 'Разработчик: Kishara Dilshan',
      allRights: 'Открытый исходный код (лицензия MIT).',
    },
    viewer: {
      dropzoneTitle: 'Перетащите 3D-файлы сюда или нажмите, чтобы открыть',
      dropzoneSubtitle: 'Поддержка нескольких файлов (.gltf + .bin + текстуры, .obj + .mtl + текстуры)',
      dropzoneFormats: 'GLB • glTF • OBJ • STL',
      dropzoneAriaLabel: 'Открыть или перетащить 3D-модели GLB, glTF, OBJ или STL с вашего устройства',
      openModelBtn: 'Открыть 3D-модель',
      samplePbrBtn: 'Загрузить пример',
      sampleStlBtn: 'Пример CAD STL',
      samplePbrName: 'Orbital-Gyro-PBR.glb (Пример)',
      sampleStlName: 'Precision-Spur-Gear.stl (Пример)',
      proceduralSize: 'Встроенный',
      wireframe: 'Сетка',
      wireframeAria: 'Переключить отображение каркасной сетки',
      gridFloor: 'Сетка пола',
      gridFloorAria: 'Показать или скрыть координатную сетку пола',
      autoRotate: 'Автоповорот',
      autoRotateAria: 'Переключить автоматическое вращение камеры',
      zUpUpright: 'Ось Z вверх',
      zUpUprightAria: 'Повернуть ориентацию Z-up в Y-up для STL-файлов',
      resetCamera: 'Сброс камеры',
      resetCameraAria: 'Сбросить ракурс и масштаб камеры',
      lightingLabel: 'Студийный свет',
      lightingNeutral: 'Нейтральный',
      lightingRim: 'Контровой свет',
      lightingClay: 'Тёплая глина',
      lightingBlueprint: 'Холодный чертёж',
      backdropLabel: 'Фон сцены',
      backdropLight: 'Светлый',
      backdropDark: 'Тёмный',
      backdropChecker: 'Прозрачный',
      animationsLabel: 'Анимации',
      clipSelectAria: 'Выбрать анимационный клип',
      playAnimationAria: 'Воспроизвести анимацию 3D-модели',
      pauseAnimationAria: 'Приостановить анимацию 3D-модели',
      playBtn: 'Пуск',
      pauseBtn: 'Пауза',
      scrubberAria: 'Шкала времени анимации',
      inspectorTitle: 'Инспектор модели',
      statFormat: 'Формат',
      statTriangles: 'Треугольники',
      statVertices: 'Вершины',
      statMeshes: 'Меши',
      statMaterials: 'Материалы / Текс',
      statDimensions: 'Габариты (X×Y×Z)',
      statFileSize: 'Размер файла',
      exportPngBtn: 'Экспорт прозрачного PNG',
      exportPngAria: 'Сохранить текущий 3D-ракурс как PNG с прозрачным фоном',
      orbitHint: 'ЛКМ: Вращение • Колесо/Щипок: Масштаб • ПКМ/Два пальца: Панорама',
      privacyBadge: 'Локальный WebGL • Без загрузок',
      statusLoadedTemplate: 'Модель {name} ({format}) загружена: {triangles} треугольников.',
      statusExportedTemplate: 'Сохранён прозрачный PNG-снимок: {filename}.',
      errorUnsupported: 'Формат не поддерживается. Выберите файл .glb, .gltf, .obj или .stl.',
      errorLoadFailed: 'Не удалось прочитать 3D-файл. Проверьте наличие связанных файлов .bin или .mtl.',
      loadingModel: 'Локальный разбор 3D-геометрии…',
    },
    home: {
      title: '3D-просмотрщик онлайн — открыть GLB, glTF, OBJ и STL',
      metaDescription:
        'Просматривайте 3D-модели GLB, glTF, OBJ и STL прямо в браузере. Проверяйте полигоны, сетку, студийный свет, анимации и сохраняйте PNG бесплатно.',
      h1: 'Онлайн 3D-просмотрщик — открытие и проверка GLB, glTF, OBJ и STL',
      heroSubtitle:
        'Перетащите файлы GLB, glTF, OBJ или STL, чтобы проверить статистику полигонов, включить сетку или студийное освещение, воспроизвести анимацию и сохранить прозрачный PNG локально в браузере.',
      highlightsHeading: 'Создано для 3D-художников, разработчиков и 3D-печати',
      highlights: [
        {
          title: 'Полная приватность без отправки на сервер',
          description:
            'Вся геометрия и текстуры обрабатываются непосредственно в вашем браузере через WebGL и Three.js. Закрытые CAD-детали и игровые модели остаются только на вашем устройстве.',
        },
        {
          title: 'Точная статистика сетки и реальные габариты',
          description:
            'Проверяйте точное число треугольников, вершин, PBR-материалов и физические размеры X × Y × Z, а также выравнивайте ось Z для STL-деталей в один клик.',
        },
        {
          title: 'Студийное освещение и рендер в прозрачный PNG',
          description:
            'Переключайтесь между четырьмя схемами света, управляйте таймлайном анимаций glTF и скачивайте чистые PNG-изображения с альфа-каналом.',
        },
      ],
      faqHeading: 'Часто задаваемые вопросы',
      faqSubheading: 'Ответы о поддерживаемых 3D-форматах, локальной конфиденциальности, текстурах и экспорте PNG.',
      faqs: [
        {
          question: 'Какие форматы 3D-файлов можно открыть и проверить (GLB, glTF, OBJ, STL)?',
          answer:
            'ModelixAI поддерживает бинарные файлы GLB (.glb), стандарт glTF 2.0 (.gltf со сжатием Draco и буферами .bin), Wavefront OBJ (.obj вместе с библиотеками материалов .mtl), а также бинарные и текстовые файлы STL (.stl) для CAD и 3D-печати.',
        },
        {
          question: 'Загружаются ли мои 3D-модели на сервер во время просмотра?',
          answer:
            'Нет. ModelixAI работает на 100% локально в вашем браузере с помощью WebGL. Геометрия, анимации и текстуры читаются напрямую из оперативной памяти и никуда не передаются.',
        },
        {
          question: 'Как экспортировать прозрачный PNG или проверить каркасную сетку и число полигонов?',
          answer:
            'После открытия файла панель «Инспектор модели» покажет количество треугольников, вершин, материалов и габариты. Включите кнопку «Сетка» для анализа топологии, выберите ракурс и нажмите «Экспорт прозрачного PNG» для сохранения снимка без фона.',
        },
        {
          question: 'Как загрузить текстуры для многофайловых моделей OBJ или glTF?',
          answer:
            'Выделите все связанные файлы одновременно — например .gltf, .bin и текстуры PNG/JPG либо .obj, .mtl и карты текстур — и перетащите их в окно просмотра вместе (или перетащите всю папку). Ссылки сопоставятся в памяти автоматически.',
        },
      ],
    },
    howToUse: {
      title: 'Как открыть и проверить 3D-модели GLB, STL и OBJ в сети',
      metaDescription:
        'Пошаговое руководство: как открыть файлы GLB, glTF, OBJ и STL в браузере, проверить треугольники и материалы, включить анимацию и сохранить PNG.',
      h1: 'Как просматривать и проверять 3D-модели в браузере',
      intro:
        'ModelixAI предоставляет дизайнерам, разработчикам игр и инженерам 3D-печати быстрый инструмент контроля качества 3D-ассетов без установки тяжёлых программ.',
      steps: [
        {
          title: 'Откройте одиночный 3D-файл или набор с текстурами',
          description:
            'Нажмите «Открыть 3D-модель» или перетащите файл .glb, .gltf, .obj или .stl на сцену. Для составных моделей (.gltf + .bin + текстуры или .obj + .mtl + картинки) перетащите все файлы сразу или целую папку.',
        },
        {
          title: 'Вращайте камеру и выравнивайте ось Z для STL',
          description:
            'Модель автоматически центрируется по размеру экрана. Вращайте вид левой кнопкой мыши, масштабируйте колесом и перемещайте правой кнопкой. Для CAD-файлов .stl включите «Ось Z вверх», чтобы поставить деталь ровно на сетку.',
        },
        {
          title: 'Проверьте полигоны, материалы и точные размеры',
          description:
            'В панели «Инспектор модели» отображаются треугольники, вершины, отдельные меши, материалы и исходные габариты X × Y × Z перед импортом в игровой движок или слайсер.',
        },
        {
          title: 'Протестируйте сетку, студийный свет и анимации',
          description:
            'Включите каркасную сетку для проверки топологии и сравните четыре пресета освещения. Если модель GLB/glTF содержит анимацию, выберите клип и перемещайте ползунок времени.',
        },
        {
          title: 'Сохраните чистый рендер в прозрачный PNG',
          description:
            'Настройте нужный ракурс и нажмите «Экспорт прозрачного PNG» — сцена мгновенно сохранит чёткий снимок с прозрачным альфа-каналом без фона и сетки.',
        },
      ],
      controlsHeading: 'Управление камерой на сцене',
      colAction: 'Действие',
      colDesktop: 'Мышь / Трекпад',
      colTouch: 'Сенсорный экран',
      controls: [
        { action: 'Вращение камеры', desktop: 'ЛКМ + перемещение', touch: 'Движение одним пальцем' },
        { action: 'Масштабирование', desktop: 'Колесо прокрутки', touch: 'Щипок двумя пальцами' },
        { action: 'Панорамирование', desktop: 'ПКМ + перемещение', touch: 'Движение двумя пальцами' },
        { action: 'Сброс вида', desktop: 'Кнопка «Сброс камеры»', touch: 'Нажатие «Сброс камеры»' },
      ],
      ctaLabel: 'Открыть 3D-просмотрщик',
    },
    hireMe: {
      title: 'Нанять Kishara Dilshan — Astro, React и 3D Web | ModelixAI',
      metaDescription:
        'Нужно сверхбыстрое веб-приложение на Astro, React или Next.js либо локальный инструмент на WebAssembly? Наймите Kishara Dilshan для разработки.',
      h1Badge: 'Открыт для фриланс-проектов',
      heading: 'Нужно индивидуальное IT-решение?',
      intro: 'Привет! Я Kishara Dilshan, разработчик проекта ModelixAI.',
      subcopy:
        'Если вам нравится скорость этого локального веб-инструмента и вам требуется надёжное технологическое решение для бизнеса, я открыт к сотрудничеству. Моя специализация:',
      specialties: [
        {
          title: 'Сверхбыстрые SEO-оптимизированные веб-приложения',
          description: 'Astro, React, Next.js — мгновенная загрузка, безупречное техническое SEO и чистая масштабируемость.',
        },
        {
          title: 'Клиентская обработка данных и инструменты WebAssembly (WASM)',
          description: 'Бессерверные утилиты для медиа, PDF, 3D и данных, приватно работающие прямо в браузере.',
        },
        {
          title: 'UI/UX-дизайн и посадочные страницы с высокой конверсией',
          description: 'Минималистичные и доступные интерфейсы, созданные для удобной работы на компьютерах и смартфонах.',
        },
      ],
      ctaHeading: 'Давайте создадим отличный продукт вместе.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Напишите мне напрямую: kisharadilshan007@gmail.com',
      copyButtonLabel: 'Скопировать Email',
      copiedAnnouncement: 'Адрес kisharadilshan007@gmail.com скопирован в буфер обмена',
    },
  },
};
