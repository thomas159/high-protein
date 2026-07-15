const fs = require('fs');

const en = JSON.parse(fs.readFileSync('i18n/locales/en.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('i18n/locales/es.json', 'utf8'));

// Privacy Policy
en.privacyPolicy = {
    title: "Privacy Policy",
    lastUpdated: "Last Updated:",
    intro1: "At {siteName}, accessible from your-domain.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {siteName} and how we use it.",
    s1: {
      title: "1. Log Files",
      p: "{siteName} follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks."
    },
    s2: {
      title: "2. Google DoubleClick DART Cookie",
      p: "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:"
    },
    s3: {
      title: "3. Our Advertising Partners",
      p: "Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:"
    },
    s4: {
      title: "4. Privacy Policies",
      p: "Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on {siteName}, which are sent directly to users' browser. They automatically receive your IP address when this occurs."
    },
    s5: {
      title: "5. Third Party Privacy Policies",
      p: "{siteName}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information."
    },
    s6: {
      title: "6. Consent",
      p: "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions."
    },
    questions: {
      title: "Questions?",
      p: "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our contact page."
    }
};

es.privacyPolicy = {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización:",
    intro1: "En {siteName}, accesible desde your-domain.com, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad describe los tipos de información que es recopilada y registrada por {siteName} y cómo la utilizamos.",
    s1: {
      title: "1. Archivos de registro",
      p: "{siteName} sigue un procedimiento estándar para el uso de archivos de registro. Estos archivos registran a los visitantes cuando entran a sitios web. La información que recopilan incluye direcciones de protocolo de Internet (IP), tipo de navegador, Proveedor de Servicios de Internet (ISP), marca de fecha y hora, páginas de referencia/salida y, posiblemente, el número de clics."
    },
    s2: {
      title: "2. Cookie DART de Google DoubleClick",
      p: "Google es uno de los proveedores externos en nuestro sitio. También utiliza cookies, conocidas como cookies DART, para publicar anuncios a nuestros visitantes según sus visitas a nuestro sitio y otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de cookies DART visitando la Política de Privacidad de la red de anuncios y contenido de Google en la siguiente URL:"
    },
    s3: {
      title: "3. Nuestros socios publicitarios",
      p: "Algunos de los anunciantes en nuestro sitio pueden utilizar cookies y balizas web. Nuestros socios publicitarios incluyen:"
    },
    s4: {
      title: "4. Políticas de privacidad",
      p: "Los servidores de anuncios y redes publicitarias de terceros utilizan tecnologías como cookies, JavaScript o balizas web (Web Beacons) en sus respectivos anuncios y enlaces que aparecen en {siteName}, y los envían directamente al navegador del usuario. Reciben automáticamente tu dirección IP cuando esto ocurre."
    },
    s5: {
      title: "5. Políticas de privacidad de terceros",
      p: "La Política de Privacidad de {siteName} no se aplica a otros anunciantes ni sitios web. Por lo tanto, te recomendamos consultar las respectivas Políticas de Privacidad de estos servidores de anuncios de terceros para obtener información más detallada."
    },
    s6: {
      title: "6. Consentimiento",
      p: "Al utilizar nuestro sitio web, consientes nuestra Política de Privacidad y aceptas sus Términos y Condiciones."
    },
    questions: {
      title: "¿Preguntas?",
      p: "Si tienes preguntas adicionales o requieres más información sobre nuestra Política de Privacidad, no dudes en contactarnos a través de nuestra página de contacto."
    }
};

// Terms of Service
en.termsOfService = {
    title: "Terms of Service",
    welcome: "Welcome to {siteName}.",
    p1: "By accessing this website, we assume you accept these terms and conditions. Do not continue to use {siteName} if you do not agree to take all of the terms and conditions stated on this page.",
    s1: {
      title: "1. Recipe & Health Disclaimer",
      notice: "Important Safety Notice:",
      p: "All content on {siteName} is provided for informational purposes only. We are not nutritionists or medical professionals. You are responsible for your own safety in the kitchen. We are not liable for any adverse reactions to food (allergies), injuries sustained during cooking, or errors in recipe outcomes. Use your best judgment when handling raw ingredients and kitchen equipment."
    },
    s2: {
      title: "2. Intellectual Property Rights",
      p: "Unless otherwise stated, {siteName} and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from {siteName} for your own personal use subjected to restrictions set in these terms and conditions.",
      mustNot: "You must not:",
      li1: "Republish our recipes or photos without direct written credit and a backlink.",
      li2: "Sell, rent, or sub-license material from {siteName}.",
      li3: "Reproduce, duplicate, or copy material for commercial purposes."
    },
    s3: {
      title: "3. Cookies",
      p: "We employ the use of cookies. By accessing {siteName}, you agreed to use cookies in agreement with our Privacy Policy. As noted in our policy, our advertising partners (such as Google AdSense) may also use cookies to track user behavior."
    },
    s4: {
      title: "4. User Comments",
      p: "Users may be allowed to post comments on recipes. {siteName} does not filter or edit comments prior to their presence on the website. Comments reflect the views of the person who posts them. We reserve the right to monitor and remove any comments that are deemed inappropriate or offensive."
    },
    s5: {
      title: "5. Governing Law",
      p: "These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
    },
    contact: {
      p: "If you have any questions regarding these Terms, please contact us via our ",
      link: "Contact Page"
    }
};

es.termsOfService = {
    title: "Términos de Servicio",
    welcome: "Bienvenido a {siteName}.",
    p1: "Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando {siteName} si no estás de acuerdo en aceptar todos los términos y condiciones indicados en esta página.",
    s1: {
      title: "1. Descargo de Responsabilidad de Recetas y Salud",
      notice: "Aviso de Seguridad Importante:",
      p: "Todo el contenido en {siteName} se proporciona únicamente con fines informativos. No somos nutricionistas ni profesionales médicos. Eres responsable de tu propia seguridad en la cocina. No somos responsables de reacciones adversas a los alimentos (alergias), lesiones sufridas al cocinar o errores en los resultados de las recetas. Usa tu propio juicio al manipular ingredientes crudos y equipos de cocina."
    },
    s2: {
      title: "2. Derechos de Propiedad Intelectual",
      p: "Salvo que se indique lo contrario, {siteName} y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en este sitio web. Todos los derechos de propiedad intelectual están reservados. Puedes acceder a esto desde {siteName} para tu propio uso personal, sujeto a las restricciones establecidas en estos términos y condiciones.",
      mustNot: "No debes:",
      li1: "Volver a publicar nuestras recetas o fotos sin crédito por escrito y un enlace.",
      li2: "Vender, alquilar o sublicenciar material de {siteName}.",
      li3: "Reproducir, duplicar o copiar material con fines comerciales."
    },
    s3: {
      title: "3. Cookies",
      p: "Hacemos uso de cookies. Al acceder a {siteName}, aceptaste usar cookies de acuerdo con nuestra Política de Privacidad. Como se señala en nuestra política, nuestros socios publicitarios (como Google AdSense) también pueden usar cookies para rastrear el comportamiento del usuario."
    },
    s4: {
      title: "4. Comentarios de Usuarios",
      p: "A los usuarios se les puede permitir publicar comentarios en las recetas. {siteName} no filtra ni edita los comentarios antes de que aparezcan en el sitio web. Los comentarios reflejan los puntos de vista de la persona que los publica. Nos reservamos el derecho de monitorear y eliminar cualquier comentario que se considere inapropiado u ofensivo."
    },
    s5: {
      title: "5. Ley Aplicable",
      p: "Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de tu jurisdicción, y te sometes irrevocablemente a la jurisdicción exclusiva de los tribunales en ese Estado o ubicación."
    },
    contact: {
      p: "Si tienes alguna pregunta respecto a estos Términos, por favor contáctanos a través de nuestra ",
      link: "Página de Contacto"
    }
};

// Contact
en.contact = {
    title: "Get in Touch",
    description: "Have a question about a recipe? Interested in a partnership? We'd love to hear from you.",
    success: {
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you as soon as possible.",
      button: "Send another message"
    },
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      message: "Message",
      messagePlaceholder: "How can we help?",
      sending: "Sending...",
      send: "Send Message",
      error: "Something went wrong. Please try again."
    }
};

es.contact = {
    title: "Ponte en contacto",
    description: "¿Tienes alguna pregunta sobre una receta? ¿Te interesa una asociación? Nos encantaría saber de ti.",
    success: {
      title: "¡Mensaje enviado!",
      description: "Gracias por comunicarte con nosotros. Nos pondremos en contacto contigo lo antes posible.",
      button: "Enviar otro mensaje"
    },
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tu@email.com",
      message: "Mensaje",
      messagePlaceholder: "¿En qué te podemos ayudar?",
      sending: "Enviando...",
      send: "Enviar mensaje",
      error: "Algo salió mal. Por favor, inténtalo de nuevo."
    }
};

// SEO Updates
en.seo.contact = {
  title: "Contact Us - {siteName}",
  description: "Have a question or a recipe suggestion? Reach out to the {siteName} team."
};
en.seo.privacy = {
  title: "Privacy Policy - {siteName}",
  description: "Privacy Policy for {siteName}"
};
en.seo.terms = {
  title: "Terms of Service - {siteName}",
  description: "Terms of Service for {siteName}"
};

es.seo.contact = {
  title: "Contáctanos - {siteName}",
  description: "¿Tienes alguna pregunta o sugerencia de receta? Comunícate con el equipo de {siteName}."
};
es.seo.privacy = {
  title: "Política de Privacidad - {siteName}",
  description: "Política de Privacidad de {siteName}"
};
es.seo.terms = {
  title: "Términos de Servicio - {siteName}",
  description: "Términos de Servicio de {siteName}"
};

fs.writeFileSync('i18n/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('i18n/locales/es.json', JSON.stringify(es, null, 2));
