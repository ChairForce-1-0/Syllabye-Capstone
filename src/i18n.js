import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // HEADER
            "header": {
                "logoAlt": "Syllabye Logo",
                "mainSlogan": "STREAMLINE. SIMPLIFY.",
                "secondarySlogan": "SUCCEED.",
                "scrollDownAlt": "Scroll Down"
            },

            // TECH STACK
            "techStack": {
                "title": "Tech Stack",
                "githubRepo": "GitHub Repo",
                "subtitle": "Take a look at the languages, frameworks, and development tools we used.",
                "altText": {
                    "vs": "Visual Studio",
                    "vscode": "Visual Studio Code",
                    "css": "CSS3",
                    "html": "HTML5",
                    "js": "JavaScript",
                    "bootstrap": "Bootstrap",
                    "nodejs": "Node.js",
                    "react": "React",
                    "github": "GitHub",
                    "git": "Git",
                    "firebase": "Firebase"
                }
            },

            // SERVICES
            "services": {
                "title": "About our software",
                "subtitle": "A little about what we do",
                "bootstrapReactTitle": "Bootstrap in React",
                "bootstrapReactDesc": "We use the React front-end framework alongside Bootstrap to build a responsive and dynamic user interface.",
                "firebaseTitle": "Google Firebase",
                "firebaseDesc": "Firebase provides authentication, cloud storage, and a real-time database, ensuring that each user has a personalized and secure experience with their own SyllaBye.",
                "nodejsTitle": "Node.js",
                "nodejsDesc": "We use Node.js for its fast, scalable server-side capabilities, allowing us to handle real-time data processing and ensure smooth, efficient performance for our application."
            },

            // WHY USE
            "whyUse": {
                "title": "Why Use Our Software?",
                "learnMore": "Learn More",
                "reasons": {
                    "uploadSyllabi": {
                        "title": "Upload Syllabi",
                        "desc": "Upload syllabi you may have already created so students can review their course."
                    },
                    "createNewSyllabi": {
                        "title": "Create New Syllabi",
                        "desc": "Professors can make their own syllabi so that students can learn and succeed in their classes."
                    },
                    "viewDownloadSyllabi": {
                        "title": "View & Download Syllabi",
                        "desc": "Students can not only see their syllabi, but they can also download them for later use."
                    }
                }
            },

            // PARALLAX
            "parallax": {
                "heading": "Dynamic Syllabus Customization. Student-Friendly Features. Collaboration Tools. Accessibility and Inclusivity. Advanced Export Options. Employer Friendly Features. Future Scalability.",
                "buttonText": "Start Creating Your Syllabus"
            },

            // TEAM
            "team": {
                "title": "Meet The Team",
                "subtitle": "ChairForceOne",
                "members": {
                    

                    "ethan": {
                        "name": "Ethan Cala",
                        "description": "Ethan is a senior pursuing a major in Computer Science, who is passionate about creating innovative solutions and constantly learning new technologies. Specializing in web development, IT engineering, and software engineering."
                    },
                    "yash": {
                        "name": "Yeswanth Sai Edhala",
                        "description": "Yash is a senior pursing a major in computer science, who is passionate about creating innovative solutions and constantly learning new technologies. Specializing in web development, IT engineering, and software engineering."
                    },
                    "joshua": {
                        "name": "Joshua Vachachira",
                        "description": "Joshua is Junior pursing a major in Computer Science with a minor in Business Adminstration, who is passionate on web development and will like to learn Cybersecurity. Eventually wants to start a businnes manging websites and protecting them."
                    },
                    
                    // Current Team Members
                    "irving": {
                        "name": "Irving Sanchez",
                        "description": "Irving is a Computer Science Major with a minor in Mathematics. Pursuing Master's in Computer Engineering"
                    },
                    "nick": {
                        "name": "Nick Krzysiak",
                        "description": "Nick is a Senior pursuing a major in computer science. Some of his hobbies include cars, camping, and going to the gym."
                    },
                    "jaiden": {
                        "name": "Jaiden Leonard",
                        "description": "Jaiden is a senior majoring in computer science with a focus on software engineering and development."
                    },
                    "bryan": {
                        "name": "Bryan Avalos",
                        "description": "Bryan is a senior pursuing a double major in computer science and forensic criminal investigation."
                    },

                    // Previous Team Members
                    "josh": {
                        "name": "Josh Brown",
                        "description": "Joshua is a sophomore pursuing a major in computer science. In his free time, he enjoys playing guitar, reading, and playing video games."
                    },
                    "kevin": {
                        "name": "Kevin Danowski",
                        "description": "Kevin is a sophomore pursuing a major in computer science. Outside of computer science, he participates in Lewis University's track and field team and enjoys playing video games."
                    },
                    "logan": {
                        "name": "Logan Prasczewicz",
                        "description": "Logan is a junior pursuing a major in computer science and a concentration in artificial intelligence. In his free time, he enjoys going on roadtrips, playing video games, and watching sports."
                    },
                    "olivia": {
                        "name": "Olivia Adamic",
                        "description": "Olivia Adamic is a junior pursuing a major in computer science, minors in mathematics and data science, and a concentration in mobile computing. Beyond her studies, she enjoys taking voice lessons, knitting and crocheting, gardening, and reading."
                    },
                    "emilio": {
                        "name": "Emilio Vichis",
                        "description": "Emilio is a junior pursuing a major in computer science. He enjoys spending time with family and friends in addition to going bowling and playing video games."
                    },
                    "vy": {
                        "name": "Vy Le",
                        "description": "Vy Le is a senior pursuing a major in computer science. Outside of her studies, she enjoys listening to music, watching animes, besides her biggest hobby which is traveling."
                    },
                    "kevinZ": {
                        "name": "Kevin Zamudio",
                        "description": "Kevin is a junior pursuing a major in computer science. Outside of his studies, he enjoys reading, gaming, and also practicing MMA."
                    }
                }
            },

            // ABOUT
            "about": {
                "title": "About Us",
                "description": "Welcome to SyllaBye! Our platform is dedicated to making creating, uploading, storing, and viewing academic syllabi easier for everyone. This includes both professors and students! Read below to learn how to use SyllaBye and meet our team!",
                "howToUse": "Wondering How to Use SyllaBye?",
                "professors": "Professors:",
                "professorsDesc1": "Professors can upload and create syllabi for students to use before and during the semester. Navigate to the browse tab to upload a PDF version of your course syllabus.",
                "professorsDesc2": "Coming soon: Create new syllabi with the formatted Lewis University template that helps you and students stay more organized!",
                "students": "Students:",
                "studentsDesc": "Students can view and download course syllabi all in one place to make learning easier! Navigate to the browse tab to view previously uploaded syllabi by professors.",
                "meetOurTeam": "Meet the Squads",
                "chairForceOne": "ChairForceOne",
                "theKrabbyPatties": "TheKrabbyPatties",
                "theDevDen": "TheDevDen"
            }
        }
    },

    es: {
        translation: {
            // HEADER
            "header": {
                "logoAlt": "Logotipo de Syllabye",
                "mainSlogan": "OPTIMIZA. SIMPLIFICA.",
                "secondarySlogan": "TRIUNFA.",
                "scrollDownAlt": "Desplázate hacia abajo"
            },

            // TECH STACK
            "techStack": {
                "title": "Stack Tecnológico",
                "githubRepo": "Repositorio de GitHub",
                "subtitle": "Observa los lenguajes, frameworks y herramientas de desarrollo que utilizamos.",
                "altText": {
                    "vs": "Visual Studio",
                    "vscode": "Visual Studio Code",
                    "css": "CSS3",
                    "html": "HTML5",
                    "js": "JavaScript",
                    "bootstrap": "Bootstrap",
                    "nodejs": "Node.js",
                    "react": "React",
                    "github": "GitHub",
                    "git": "Git",
                    "firebase": "Firebase"
                }
            },

            // SERVICES
            "services": {
                "title": "Acerca de nuestro software",
                "subtitle": "Un poco sobre lo que hacemos",
                "bootstrapReactTitle": "Bootstrap en React",
                "bootstrapReactDesc": "Utilizamos el framework front-end React junto con Bootstrap para construir una interfaz de usuario receptiva y dinámica.",
                "firebaseTitle": "Google Firebase",
                "firebaseDesc": "Firebase proporciona autenticación, almacenamiento en la nube y una base de datos en tiempo real, lo que garantiza que cada usuario tenga una experiencia personalizada y segura con su propio SyllaBye.",
                "nodejsTitle": "Node.js",
                "nodejsDesc": "Usamos Node.js por sus capacidades rápidas y escalables del lado del servidor, permitiéndonos manejar el procesamiento de datos en tiempo real y asegurar un rendimiento fluido y eficiente para nuestra aplicación."
            },

            // WHY USE
            "whyUse": {
                "title": "¿Por qué usar nuestro software?",
                "learnMore": "Aprende Más",
                "reasons": {
                    "uploadSyllabi": {
                        "title": "Subir Syllabus",
                        "desc": "Sube los syllabus que ya hayas creado para que los estudiantes puedan revisar su curso."
                    },
                    "createNewSyllabi": {
                        "title": "Crear nuevos Syllabus",
                        "desc": "Los profesores pueden crear sus propios syllabus para que los estudiantes aprendan y tengan éxito en sus clases."
                    },
                    "viewDownloadSyllabi": {
                        "title": "Ver y descargar Syllabus",
                        "desc": "Los estudiantes no solo pueden ver sus syllabus, sino que también pueden descargarlos para usarlos más tarde."
                    }
                }
            },

            // PARALLAX
            "parallax": {
                "heading": "Personalización dinámica de sílabos. Funciones fáciles para el estudiante. Herramientas de colaboración. Accesibilidad e inclusividad. Opciones avanzadas de exportación. Funciones atractivas para empleadores. Escalabilidad futura.",
                "buttonText": "Comienza a crear tu sílabo"
            },

            // TEAM
            "team": {
                "title": "Conoce al Equipo",
                "subtitle": "ChairForceOne & TheKrabbyPatties",
                "members": {
                    // Current Team Members
                    "irving": {
                        "name": "Irving Sanchez",
                        "description": "Irving es un estudiante de último año que cursa la carrera de informática con una segunda especialización en matemáticas y posteriormente seguirá su maestría en ingeniería informática. En su tiempo libre, disfruta jugar con sus perros Groot y Peter, leer cómics e invita a cualquiera a una partida de ajedrez o Magic: The Gathering."
                    },
                    "nick": {
                        "name": "Nick Krzysiak",
                        "description": "Nick es un estudiante de último año que cursa la carrera de informática. Sus pasatiempos incluyen los autos, acampar e ir al gimnasio."
                    },
                    "jaiden": {
                        "name": "Jaiden Leonard",
                        "description": "Jaiden es un estudiante de último año que se especializa en informática con enfoque en ingeniería y desarrollo de software. Le gusta jugar videojuegos y trabajar en autos."
                    },
                    "bryan": {
                        "name": "Bryan Avalos",
                        "description": "Bryan es un estudiante de último año que cursa una doble carrera en informática e investigación criminal forense. En su tiempo libre, disfruta ver béisbol, trabajar en autos, jugar videojuegos y aprender sobre tecnología."
                    },

                    // Previous Team Members
                    "josh": {
                        "name": "Josh Brown",
                        "description": "Joshua es un estudiante de segundo año que cursa la carrera de informática. En su tiempo libre, disfruta tocar la guitarra, leer y jugar videojuegos."
                    },
                    "kevin": {
                        "name": "Kevin Danowski",
                        "description": "Kevin es un estudiante de segundo año que cursa la carrera de informática. Fuera de la informática, participa en el equipo de atletismo de la Universidad Lewis y disfruta jugar videojuegos."
                    },
                    "logan": {
                        "name": "Logan Prasczewicz",
                        "description": "Logan es un estudiante de tercer año que cursa la carrera de informática con una concentración en inteligencia artificial. En su tiempo libre, disfruta hacer viajes por carretera, jugar videojuegos y ver deportes."
                    },
                    "olivia": {
                        "name": "Olivia Adamic",
                        "description": "Olivia Adamic es una estudiante de tercer año que cursa la carrera de informática, con especializaciones en matemáticas y ciencia de datos, y una concentración en computación móvil. Más allá de sus estudios, disfruta tomar lecciones de canto, tejer y hacer ganchillo, jardinería y leer."
                    },
                    "emilio": {
                        "name": "Emilio Vichis",
                        "description": "Emilio es un estudiante de tercer año que cursa la carrera de informática. Disfruta pasar tiempo con su familia y amigos, además de ir a jugar bolos y jugar videojuegos."
                    },
                    "vy": {
                        "name": "Vy Le",
                        "description": "Vy Le es una estudiante de último año que cursa la carrera de informática. Fuera de sus estudios, disfruta escuchar música, ver animes y su mayor pasatiempo es viajar."
                    },
                    "kevinZ": {
                        "name": "Kevin Zamudio",
                        "description": "Kevin es un estudiante de tercer año que cursa la carrera de informática. Fuera de sus estudios, disfruta leer, jugar videojuegos y practicar MMA."
                    },

                    // The Dev Den
                    "ethan": {
                        "name": "Ethan Cala",
                        "description": "Ethan es un estudiante de último año cursando la licenciatura en Ciencias de la Computación, apasionado por crear soluciones innovadoras y aprender constantemente nuevas tecnologías. Se especializa en desarrollo web, ingeniería en TI e ingeniería de software."
                    },
                    "yash": {
                        "name": "Yeswanth Sai Edhala",
                        "description": "Yash es un estudiante de último año cursando la licenciatura en Ciencias de la Computación, apasionado por crear soluciones innovadoras y aprender constantemente nuevas tecnologías. Se especializa en desarrollo web, ingeniería en TI e ingeniería de software."
                    },
                    "joshua": {
                        "name": "Joshua Vachachira",
                        "description": "Joshua es un estudiante de tercer año cursando la licenciatura en Ciencias de la Computación con una especialización en Administración de Empresas. Apasionado por el desarrollo web y con interés en aprender Ciberseguridad. Su meta es emprender un negocio de gestión y protección de sitios web."
                    },

                }
            },

            // ABOUT
            "about": {
                "title": "Sobre Nosotros",
                "description": "¡Bienvenido a SyllaBye! Nuestra plataforma está dedicada a hacer que la creación, carga, almacenamiento y visualización de programas académicos sea más fácil para todos. ¡Esto incluye tanto a profesores como a estudiantes! Lea a continuación para aprender cómo usar SyllaBye y conocer a nuestro equipo.",
                "howToUse": "¿Cómo usar SyllaBye?",
                "professors": "Profesores:",
                "professorsDesc1": "Los profesores pueden cargar y crear programas para que los estudiantes los usen antes y durante el semestre. Navegue a la pestaña de exploración para cargar una versión en PDF del programa de su curso.",
                "professorsDesc2": "Próximamente: ¡Cree nuevos programas con la plantilla formateada de la Universidad Lewis que lo ayuda a usted y a los estudiantes a mantenerse más organizados!",
                "students": "Estudiantes:",
                "studentsDesc": "¡Los estudiantes pueden ver y descargar los programas de los cursos en un solo lugar para facilitar el aprendizaje! Navegue a la pestaña de exploración para ver los programas cargados previamente por los profesores.",
                "meetOurTeam": "Conoce a Nuestro Equipo",
                "chairForceOne": "ChairForceOne",
                "theKrabbyPatties": "TheKrabbyPatties",
                "theDevDen": "TheDevDen"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;