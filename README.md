# prueba-next.js

# QuickBet Movies

QuickBet Movies es una aplicación web moderna y responsiva para explorar y ver películas en streaming. Construida con Next.js y React, ofrece una interfaz elegante para navegar, buscar y disfrutar de películas.

# Características

🎬 Explora películas populares, mejor valoradas y próximas a estrenarse.
🔍 Funcionalidad de búsqueda para encontrar películas específicas.
🎭 Filtra películas por género.
👤 Autenticación de usuarios (registro, inicio y cierre de sesión).
📱 Diseño responsivo para dispositivos móviles y escritorio.
🌙 Interfaz en modo oscuro.
🎥 Página de detalles de películas con trailers y recomendaciones.

# Tecnologías Utilizadas

Next.js 13 (App Router).
React 18.
TypeScript.
Tailwind CSS.
Supabase para autenticación.
TMDB API para datos de películas.
Lucide React para íconos.
Componentes Shadcn UI.

# Cómo Empezar

# Prerrequisitos

Node.js 14.6.0 o superior.
npm o yarn instalado.

# Instalación
Clona este repositorio desde GitHub:
git clone https://github.com/sergioamaru0/quickbet-movies.git

# Navega al directorio del proyecto:
cd quickbet-movies
Instala las dependencias:

Con npm: npm install
con yarn: yarn

Configura las variables de entorno. Crea un archivo .env.local en la raíz del proyecto y añade las claves necesarias (como la clave de API de TMDB y las configuraciones de Supabase). Puedes usar el archivo .env.local como referencia.

# Inicia el servidor de desarrollo:

Con npm: npm run dev
con yarn:yarn dev

Abre tu navegador y accede a http://localhost:3000 para ver la aplicación

![image](https://github.com/user-attachments/assets/0cedf262-6867-46ba-a275-f5d040b193c6)

En el desarrollo para QuickBet Movies, se tomaron varias decisiones clave para garantizar la escalabilidad, seguridad y eficiencia del sistema. Aunque podemos destacar algunas decisiones basadas en las tecnologías mencionadas y las mejores prácticas en el desarrollo de aplicaciones de streaming:

1. Arquitectura Serverless con Next.js y Supabase:

    1. Escalabilidad: Al utilizar Next.js con su capacidad de renderizado del lado del servidor (SSR) y generación estática (SSG), junto con Supabase           como backend serverless, se logra una arquitectura altamente escalable. Esta combinación permite manejar cargas variables de tráfico sin                 necesidad de gestionar servidores manualmente.
    2. Eficiencia: La arquitectura serverless reduce los costos operativos y de mantenimiento, ya que los recursos se escalan automáticamente según la          demanda.



2. Autenticación y Autorización con Supabase:

    1. Seguridad: Supabase proporciona un sistema de autenticación robusto y seguro, que incluye funciones como inicio de sesión con correo                     electrónico/contraseña, autenticación de terceros y gestión de tokens JWT.
    2. Eficiencia: Al delegar la autenticación a Supabase, se reduce la complejidad del código y se aprovecha una solución probada y optimizada.



3. API de TMDB para datos de películas:

    1. Escalabilidad: Al utilizar una API externa para los datos de películas, se reduce la carga en nuestros propios servidores y se aprovecha la             infraestructura de TMDB para manejar grandes volúmenes de datos.
    2. Eficiencia: Esto elimina la necesidad de mantener y actualizar una base de datos de películas propia, ahorrando recursos y asegurando datos              actualizados.



4. Caching y Optimización de Rendimiento:

    1. Eficiencia: Aunque no se menciona explícitamente, es probable que se hayan implementado estrategias de caching tanto en el cliente como en el            servidor para reducir la carga en la API y mejorar los tiempos de respuesta.
    2. Escalabilidad: El uso de técnicas como ISR (Incremental Static Regeneration) de Next.js puede ayudar a servir contenido estático para páginas            populares, reduciendo la carga en el servidor.



5. Seguridad de Datos:

    1. Las variables de entorno se utilizan para almacenar claves de API y otras credenciales sensibles, lo que ayuda a mantener la seguridad de la             información crítica.
    2. La integración con Supabase proporciona una capa adicional de seguridad para el manejo de datos de usuario y sesiones.



6. Arquitectura Modular:

    1. El uso de TypeScript y la estructura de componentes de React promueven un código más mantenible y escalable.
    2. La separación de preocupaciones entre la interfaz de usuario (componentes React) y la lógica de negocio (servicios de API) facilita la                   escalabilidad y el mantenimiento del código.



7. Optimización de Recursos:

    1. El uso de Tailwind CSS para estilos ayuda a reducir el tamaño del CSS final, mejorando los tiempos de carga.
    2. La carga bajo demanda de componentes y datos (por ejemplo, en la navegación de películas) ayuda a optimizar el uso de recursos tanto en el               cliente como en el servidor.

![image](https://github.com/user-attachments/assets/73848250-111e-4f57-89cf-35336b138d76)

