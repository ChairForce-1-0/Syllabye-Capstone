import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // HEADER
      header: {
        logoAlt: "Syllabye Logo",
        mainSlogan: "STREAMLINE. SIMPLIFY.",
        secondarySlogan: "SUCCEED.",
        scrollDownAlt: "Scroll Down",
      },

      // DRAWERNAV
      drawer: {
        navigate: "Navigate",
        hello: "Hello",
        home: "Home",
        dashboard: "Dashboard",
        create: "Create",
        browse: "Browse",
        about: "About",
        contact: "Contact",
        login: "Login",
        logout: "Logout",
        social: "Stay Connected"
      },

      // TECH STACK
      techStack: {
        title: "Tech Stack",
        githubRepo: "GitHub Repo",
        subtitle:
          "Take a look at the languages, frameworks, and development tools we used.",
        altText: {
          vs: "Visual Studio",
          vscode: "Visual Studio Code",
          css: "CSS3",
          html: "HTML5",
          js: "JavaScript",
          bootstrap: "Bootstrap",
          nodejs: "Node.js",
          react: "React",
          github: "GitHub",
          git: "Git",
          firebase: "Firebase",
        },
      },

      // BROWSEPDF
      browsePdfs: {
        title: "Browse our public syllabi below",
        noPdfs: "No PDFs found.",
      },

      // CONTACT
      contact: {
        getInTouch: "Get in Touch",
        description: "Have questions or feedback? Feel free to reach out to us using the forms on the right based on your use case. We're happy to assist you!",
        emailTitle: "Need Help? Email Us!",
        emailText: "Contact us at:",
        professorFeedback: "Professor Feedback",
        studentFeedback: "Student Feedback"
      },

      // CREATEINSTRUCTIONS
      createInstructions: {
        title: "Getting Started",
        step1: "Click <1>Create Syllabus</1> to create your syllabus.",
        step2: "Fill out each form section with your course details.",
        step3: "Click <1>Next</1> to move through the steps of creating your syllabus.",
        step4: "Use <1>Generate Syllabus</1> to preview it.",
        step5: "Then <1>Upload</1> to the site (publicly available) for students to use or <1>Download</1> to PDF."
      },

      // PDFUPLOADER
      pdfUploader: {
        uploadButton: "Upload PDF",
        modalTitle: "Upload and Preview PDF",
        instruction: "Please upload your syllabus as a PDF only",
        shareLabel: "Share this Syllabus Publicly on our Browse page:",
        previewLabel: "Preview:",
        closeButton: "Close",
        confirmUploadButton: "Upload",
        alertInvalidFile: "Please select a valid PDF file.",
        alertNoFile: "No file selected!",
        uploadSuccess:
          "Your Syllabus has been uploaded and can be viewed here:",
      },

      // MYUPLOADS
      myUploads: {
        title: "Your uploads:",
        noFiles: "No files found, use the upload button above to get started.",
      },

      // REQPROF
      reqProf: {
        loading: "Loading...",
        accessDenied: "Access Denied",
        errorMessage: "You must be a professor to create new syllabi. If you believe this is an error, please contact support.",
        contactButton: "Contact Page"
      },

      // SERVICES
      services: {
        title: "About our software",
        subtitle: "A little about what we do",
        bootstrapReactTitle: "Bootstrap",
        bootstrapReactDesc:
          "We use the React front-end framework alongside Bootstrap to build a responsive and dynamic user interface.",
        firebaseTitle: "Google Firebase",
        firebaseDesc:
          "Firebase provides authentication, cloud storage, and a real-time database, ensuring that each user has a personalized and secure experience with their own SyllaBye.",
        nodejsTitle: "Node.js",
        nodejsDesc:
          "We use Node.js for its fast, scalable server-side capabilities, allowing us to handle real-time data processing and ensure smooth, efficient performance for our application.",
      },

      // SYLLABUSFORM
      syllabusForm: {
        createNew: "Create New Syllabus",
        continueUnfinished: "Continue Unfinished Syllabus",
        modalCreate: "Create Syllabus",
        modalContinue: "Continue Editing Syllabus",
        close: "Close",
        save: "Save Progress",
        previous: "Previous",
        next: "Next",
        generate: "Generate Syllabus",
        previewTitle: "Syllabus Preview",
        download: "Download Syllabus",
        upload: "Upload Syllabus",
        createAnother: "Create Another Syllabus",
        unfinishedTitle: "Unfinished Syllabi",
        noSaved: "No saved syllabi.",
        untitled: "Untitled",
        savedOn: "Saved on:",
        continueEditing: "Continue Editing",
        delete: "Delete",
        confirmDelete: "Click again to confirm",
        preparingPdf: "Preparing PDF..."
      },

      // WHY USE
      whyUse: {
        title: "Why Use Our Software?",
        learnMore: "Learn More",
        reasons: {
          uploadSyllabi: {
            title: "Upload Syllabi",
            desc: "Upload syllabi you may have already created so students can review their course.",
          },
          createNewSyllabi: {
            title: "Create New Syllabi",
            desc: "Professors can make their own syllabi so that students can learn and succeed in their classes.",
          },
          viewDownloadSyllabi: {
            title: "View & Download Syllabi",
            desc: "Students can not only see their syllabi, but they can also download them for later use.",
          },
        },
      },

      // PARALLAX
      parallax: {
        heading:
          "Dynamic Syllabus Customization. Student-Friendly Features. Collaboration Tools. Accessibility and Inclusivity. Advanced Export Options. Employer Friendly Features. Future Scalability.",
        buttonText: "Start Creating Your Syllabus",
      },

      // TEAM
      team: {
        title: "Meet The Team",
        subtitle: "ChairForceOne",
        members: {
          // The DevDen
          devden: {
            name: "The DevDen",
            description:
              "In The DevDen, we debug with precision, deploy with momentum, and keep our den just wild enough to stay creative.",
          },
          ethan: {
            name: "Ethan Cala",
            description:
              "Ethan is a senior pursuing a major in Computer Science, who is passionate about creating innovative solutions and constantly learning new technologies. Specializing in web development, IT engineering, and software engineering.",
          },
          yash: {
            name: "Yeswanth Sai Edhala",
            description:
              "Yash is a senior pursing a major in computer science, who is passionate about creating innovative solutions and constantly learning new technologies. Specializing in web development, IT engineering, and software engineering.",
          },
          joshua: {
            name: "Joshua Vachachira",
            description:
              "Joshua is Junior pursing a major in Computer Science with a minor in Business Adminstration, who is passionate on web development and will like to learn Cybersecurity. Eventually wants to start a businnes manging websites and protecting them.",
          },

          // ChairForceOne
          chair: {
            name: "ChairForceOne",
            description:
              "At ChairForceOne, we push to production with the confidence of a rookie pilot on their first solo flight — no backup, full send.",
          },
          irving: {
            name: "Irving Sanchez",
            description:
              "Irving is a Computer Science Major with a minor in Mathematics. Pursuing Master's in Computer Engineering",
          },
          nick: {
            name: "Nick Krzysiak",
            description:
              "Nick is a Senior pursuing a major in computer science. Some of his hobbies include cars, camping, and going to the gym.",
          },
          jaiden: {
            name: "Jaiden Leonard",
            description:
              "Jaiden is a senior majoring in computer science with a focus on software engineering and development.",
          },
          bryan: {
            name: "Bryan Avalos",
            description:
              "Bryan is a senior pursuing a double major in computer science and forensic criminal investigation.",
          },

          // The KrabbyPatties
          krabby: {
            name: "The KrabbyPatties",
            description:
              "At The KrabbyPatties, we don’t just ship features — we serve them up with extra cheese, no bugs, and a side of chaos.",
          },
          josh: {
            name: "Josh Brown",
            description:
              "Joshua is a sophomore pursuing a major in computer science. In his free time, he enjoys playing guitar, reading, and playing video games.",
          },
          kevin: {
            name: "Kevin Danowski",
            description:
              "Kevin is a sophomore pursuing a major in computer science. Outside of computer science, he participates in Lewis University's track and field team and enjoys playing video games.",
          },
          logan: {
            name: "Logan Prasczewicz",
            description:
              "Logan is a junior pursuing a major in computer science and a concentration in artificial intelligence. In his free time, he enjoys going on roadtrips, playing video games, and watching sports.",
          },
          olivia: {
            name: "Olivia Adamic",
            description:
              "Olivia Adamic is a junior pursuing a major in computer science, minors in mathematics and data science, and a concentration in mobile computing. Beyond her studies, she enjoys taking voice lessons, knitting and crocheting, gardening, and reading.",
          },
          emilio: {
            name: "Emilio Vichis",
            description:
              "Emilio is a junior pursuing a major in computer science. He enjoys spending time with family and friends in addition to going bowling and playing video games.",
          },
          vy: {
            name: "Vy Le",
            description:
              "Vy Le is a senior pursuing a major in computer science. Outside of her studies, she enjoys listening to music, watching animes, besides her biggest hobby which is traveling.",
          },
          kevinZ: {
            name: "Kevin Zamudio",
            description:
              "Kevin is a junior pursuing a major in computer science. Outside of his studies, he enjoys reading, gaming, and also practicing MMA.",
          },
        },
      },

      // ABOUT
      about: {
        title: "About Us",
        description:
          "Welcome to SyllaBye! Our platform is dedicated to making creating, uploading, storing, and viewing academic syllabi easier for everyone. This includes both professors and students! Read below to learn how to use SyllaBye and meet our team!",
        howToUse: "Wondering How to Use SyllaBye?",
        professors: "Professors:",
        professorsDesc1:
          "Professors can upload and create syllabi for students to use before and during the semester. Navigate to the browse tab to upload a PDF version of your course syllabus.",
        professorsDesc2:
          "Coming soon: Create new syllabi with the formatted Lewis University template that helps you and students stay more organized!",
        students: "Students:",
        studentsDesc:
          "Students can view and download course syllabi all in one place to make learning easier! Navigate to the browse tab to view previously uploaded syllabi by professors.",
        meetOurTeam: "Meet the Squads",
        chairForceOne: "ChairForceOne",
        theKrabbyPatties: "TheKrabbyPatties",
        theDevDen: "TheDevDen",
      },
    },
  },

  es: {
    translation: {
      // HEADER
      header: {
        logoAlt: "Logotipo de Syllabye",
        mainSlogan: "OPTIMIZA. SIMPLIFICA.",
        secondarySlogan: "TRIUNFA.",
        scrollDownAlt: "Desplázate hacia abajo",
      },

      // DRAWERNAV
      drawer: {
        navigate: "Navegar",
        hello: "Hola",
        home: "Inicio",
        dashboard: "Panel",
        create: "Crear",
        browse: "Explorar",
        about: "Acerca de",
        contact: "Contacto",
        login: "Iniciar Sesión",
        logout: "Cerrar Sesión",
        social: "Conéctate con nosotros"
      },

      // TECH STACK
      techStack: {
        title: "Stack Tecnológico",
        githubRepo: "Repositorio de GitHub",
        subtitle:
          "Observa los lenguajes, frameworks y herramientas de desarrollo que utilizamos.",
        altText: {
          vs: "Visual Studio",
          vscode: "Visual Studio Code",
          css: "CSS3",
          html: "HTML5",
          js: "JavaScript",
          bootstrap: "Bootstrap",
          nodejs: "Node.js",
          react: "React",
          github: "GitHub",
          git: "Git",
          firebase: "Firebase",
        },
      },

      // BROWSEPDF
      browsePdfs: {
        title: "Explora nuestros syllabus públicos a continuación",
        noPdfs: "No se encontraron archivos PDF.",
      },

      // CONTACT
      contact: {
        getInTouch: "Contáctanos",
        description: "¿Tienes preguntas o comentarios? No dudes en comunicarte con nosotros usando los formularios a la derecha según tu caso. ¡Estamos felices de ayudarte!",
        emailTitle: "¿Necesitas ayuda? ¡Envíanos un correo!",
        emailText: "Contáctanos en:",
        professorFeedback: "Comentarios de Profesores",
        studentFeedback: "Comentarios de Estudiantes"
      },

      // CREATEINSTRUCTIONS
      createInstructions: {
        title: "Comenzando",
        step1: "Haz clic en <1>Crear Syllabus</1> para crear tu syllabus.",
        step2: "Completa cada sección del formulario con los detalles de tu curso.",
        step3:
          "Haz clic en <1>Siguiente</1> para avanzar a través de los pasos de creación de tu syllabus.",
        step4: "Usa <1>Generar Syllabus</1> para previsualizarlo.",
        step5:
          "Luego <1>Sube</1> al sitio (disponible públicamente) para que los estudiantes lo usen o <1>Descárgalo</1> como PDF.",
      },

      // PDFUPLOADER
      pdfUploader: {
        uploadButton: "Subir PDF",
        modalTitle: "Subir y previsualizar PDF",
        instruction: "Por favor sube tu syllabus únicamente en formato PDF",
        shareLabel:
          "Compartir este syllabus públicamente en la página de exploración:",
        previewLabel: "Previsualización:",
        closeButton: "Cerrar",
        confirmUploadButton: "Subir",
        alertInvalidFile: "Por favor selecciona un archivo PDF válido.",
        alertNoFile: "¡No se ha seleccionado ningún archivo!",
        uploadSuccess: "Tu syllabus ha sido subido y puede verse aquí:",
      },

      // MYUPLOADS
      myUploads: {
        title: "Tus archivos subidos:",
        noFiles:
          "No se encontraron archivos. Usa el botón de subir arriba para comenzar.",
      },

      // REQPROF
      reqProf: {
        loading: "Cargando...",
        accessDenied: "Acceso denegado",
        errorMessage: "Debes ser profesor para crear nuevos syllabi. Si crees que esto es un error, por favor contacta al soporte.",
        contactButton: "Página de Contacto"
      },

      // SERVICES
      services: {
        title: "Acerca de nuestro software",
        subtitle: "Un poco sobre lo que hacemos",
        bootstrapReactTitle: "Bootstrap",
        bootstrapReactDesc:
          "Utilizamos el framework front-end Bootstrap junto con React para construir una interfaz de usuario receptiva y dinámica.",
        firebaseTitle: "Google Firebase",
        firebaseDesc:
          "Firebase proporciona autenticación, almacenamiento en la nube y una base de datos en tiempo real, lo que garantiza que cada usuario tenga una experiencia personalizada y segura con su propio SyllaBye.",
        nodejsTitle: "Node.js",
        nodejsDesc:
          "Usamos Node.js por sus capacidades rápidas y escalables del lado del servidor, permitiéndonos manejar el procesamiento de datos en tiempo real y asegurar un rendimiento fluido y eficiente para nuestra aplicación.",
      },

      // SYLLABUSFORM
      syllabusForm: {
        createNew: "Crear nuevo syllabus",
        continueUnfinished: "Continuar syllabus sin terminar",
        modalCreate: "Crear syllabus",
        modalContinue: "Continuar editando syllabus",
        close: "Cerrar",
        save: "Guardar progreso",
        previous: "Anterior",
        next: "Siguiente",
        generate: "Generar syllabus",
        previewTitle: "Vista previa del syllabus",
        download: "Descargar syllabus",
        upload: "Subir syllabus",
        createAnother: "Crear otro syllabus",
        unfinishedTitle: "Syllabus sin terminar",
        noSaved: "No hay syllabi guardados.",
        untitled: "Sin título",
        savedOn: "Guardado el:",
        continueEditing: "Continuar editando",
        delete: "Eliminar",
        confirmDelete: "Haz clic otra vez para confirmar",
        preparingPdf: "Preparando PDF..."
      },

      // WHY USE
      whyUse: {
        title: "¿Por qué usar nuestro software?",
        learnMore: "Aprende Más",
        reasons: {
          uploadSyllabi: {
            title: "Subir Syllabus",
            desc: "Sube los syllabus que ya hayas creado para que los estudiantes puedan revisar su curso.",
          },
          createNewSyllabi: {
            title: "Crear nuevos Syllabus",
            desc: "Los profesores pueden crear sus propios syllabus para que los estudiantes aprendan y tengan éxito en sus clases.",
          },
          viewDownloadSyllabi: {
            title: "Ver y descargar Syllabus",
            desc: "Los estudiantes no solo pueden ver sus syllabus, sino que también pueden descargarlos para usarlos más tarde.",
          },
        },
      },

      // PARALLAX
      parallax: {
        heading:
          "Personalización dinámica de sílabos. Funciones fáciles para el estudiante. Herramientas de colaboración. Accesibilidad e inclusividad. Opciones avanzadas de exportación. Funciones atractivas para empleadores. Escalabilidad futura.",
        buttonText: "Comienza a crear tu sílabo",
      },

      // TEAM
      team: {
        title: "Conoce al Equipo",
        subtitle: "ChairForceOne & TheKrabbyPatties",
        members: {
          // The DevDen
          devden: {
            name: "The DevDen",
            description:
              "En The DevDen, depuramos con precisión, desplegamos con impulso y mantenemos nuestro espacio lo suficientemente salvaje para seguir siendo creativos.",
          },
          ethan: {
            name: "Ethan Cala",
            description:
              "Ethan es un estudiante de último año en Ciencias de la Computación, apasionado por crear soluciones innovadoras y aprender constantemente nuevas tecnologías. Se especializa en desarrollo web, ingeniería de TI e ingeniería de software.",
          },
          yash: {
            name: "Yeswanth Sai Edhala",
            description:
              "Yash es un estudiante de último año en Ciencias de la Computación, apasionado por crear soluciones innovadoras y aprender constantemente nuevas tecnologías. Se especializa en desarrollo web, ingeniería de TI e ingeniería de software.",
          },
          joshua: {
            name: "Joshua Vachachira",
            description:
              "Joshua es un estudiante de tercer año en Ciencias de la Computación con una especialización menor en Administración de Empresas. Le apasiona el desarrollo web y quiere aprender sobre ciberseguridad. Su meta es iniciar un negocio para administrar y proteger sitios web.",
          },

          // ChairForceOne
          chair: {
            name: "ChairForceOne",
            description:
              "En ChairForceOne, hacemos despliegues a producción con la confianza de un piloto novato en su primer vuelo en solitario — sin respaldo, todo al máximo.",
          },
          irving: {
            name: "Irving Sanchez",
            description:
              "Irving estudia Ciencias de la Computación con una especialización menor en Matemáticas. Actualmente está cursando su Maestría en Ingeniería en Computación.",
          },
          nick: {
            name: "Nick Krzysiak",
            description:
              "Nick es un estudiante de último año en Ciencias de la Computación. Algunos de sus pasatiempos incluyen los autos, acampar y hacer ejercicio en el gimnasio.",
          },
          jaiden: {
            name: "Jaiden Leonard",
            description:
              "Jaiden es un estudiante de último año en Ciencias de la Computación con enfoque en ingeniería y desarrollo de software.",
          },
          bryan: {
            name: "Bryan Avalos",
            description:
              "Bryan es un estudiante de último año que cursa una doble titulación en Ciencias de la Computación e Investigación Criminal Forense.",
          },

          // The KrabbyPatties
          krabby: {
            name: "The KrabbyPatties",
            description:
              "En The KrabbyPatties, no solo entregamos funciones — las servimos con extra de queso, sin errores, y con una pizca de caos.",
          },
          josh: {
            name: "Josh Brown",
            description:
              "Joshua es un estudiante de segundo año en Ciencias de la Computación. En su tiempo libre le gusta tocar la guitarra, leer y jugar videojuegos.",
          },
          kevin: {
            name: "Kevin Danowski",
            description:
              "Kevin es un estudiante de segundo año en Ciencias de la Computación. Además, participa en el equipo de atletismo de la Universidad de Lewis y le gusta jugar videojuegos.",
          },
          logan: {
            name: "Logan Prasczewicz",
            description:
              "Logan es un estudiante de tercer año en Ciencias de la Computación con concentración en Inteligencia Artificial. En su tiempo libre disfruta hacer viajes por carretera, jugar videojuegos y ver deportes.",
          },
          olivia: {
            name: "Olivia Adamic",
            description:
              "Olivia es una estudiante de tercer año en Ciencias de la Computación, con especializaciones menores en Matemáticas y Ciencia de Datos, y concentración en Computación Móvil. Además de sus estudios, disfruta tomar clases de canto, tejer, hacer jardinería y leer.",
          },
          emilio: {
            name: "Emilio Vichis",
            description:
              "Emilio es un estudiante de tercer año en Ciencias de la Computación. Le gusta pasar tiempo con su familia y amigos, además de ir a jugar boliche y videojuegos.",
          },
          vy: {
            name: "Vy Le",
            description:
              "Vy es una estudiante de último año en Ciencias de la Computación. Fuera de sus estudios, le gusta escuchar música, ver anime, y su pasatiempo más grande es viajar.",
          },
          kevinZ: {
            name: "Kevin Zamudio",
            description:
              "Kevin es un estudiante de tercer año en Ciencias de la Computación. Fuera de sus estudios, le gusta leer, jugar videojuegos y practicar artes marciales mixtas (MMA).",
          },
        },
      },

      // ABOUT
      about: {
        title: "Sobre Nosotros",
        description:
          "¡Bienvenido a SyllaBye! Nuestra plataforma está dedicada a hacer que la creación, carga, almacenamiento y visualización de programas académicos sea más fácil para todos. ¡Esto incluye tanto a profesores como a estudiantes! Lea a continuación para aprender cómo usar SyllaBye y conocer a nuestro equipo.",
        howToUse: "¿Cómo usar SyllaBye?",
        professors: "Profesores:",
        professorsDesc1:
          "Los profesores pueden cargar y crear programas para que los estudiantes los usen antes y durante el semestre. Navegue a la pestaña de exploración para cargar una versión en PDF del programa de su curso.",
        professorsDesc2:
          "Próximamente: ¡Cree nuevos programas con la plantilla formateada de la Universidad Lewis que lo ayuda a usted y a los estudiantes a mantenerse más organizados!",
        students: "Estudiantes:",
        studentsDesc:
          "¡Los estudiantes pueden ver y descargar los programas de los cursos en un solo lugar para facilitar el aprendizaje! Navegue a la pestaña de exploración para ver los programas cargados previamente por los profesores.",
        meetOurTeam: "Conoce a Nuestro Equipo",
        chairForceOne: "ChairForceOne",
        theKrabbyPatties: "TheKrabbyPatties",
        theDevDen: "TheDevDen",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
