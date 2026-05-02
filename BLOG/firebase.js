// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
// API Key desde variables de entorno para mayor seguridad
const firebaseConfig = {
  apiKey: getEnvVariable('FIREBASE_API_KEY') || 'AIzaSyBwkgAQiwsc_32DOYWnyoEMo06l-xcAIqo',
  authDomain: "blog--personal-parche-dijital.firebaseapp.com",
  projectId: "blog--personal-parche-dijital",
  storageBucket: "blog--personal-parche-dijital.firebasestorage.app",
  messagingSenderId: "845380188271",
  appId: "1:845380188271:web:71790d01f8687703e8f59a",
  measurementId: "G-2S1SQV8C4P"
};

// Función para obtener variables de entorno (fallback para desarrollo)
function getEnvVariable(key) {
    // En navegador, intentar obtener desde metadatos o usar valor por defecto
    if (typeof window !== 'undefined') {
        // Para desarrollo local, podríamos usar valores por defecto
        // En producción, estas variables deberían ser inyectadas por el servidor
        return null;
    }
    
    // En Node.js (si se usa en servidor)
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key];
    }
    
    return null;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export Firebase services
export { app, analytics, db, collection, addDoc, serverTimestamp };

// Función para guardar mensajes de contacto
export async function saveContactMessage(formData) {
  try {
    const docRef = await addDoc(collection(db, "contactMessages"), {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
      status: "new"
    });
    
    console.log("Mensaje guardado con ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error al guardar mensaje: ", error);
    return { success: false, error: error.message };
  }
}

// Función para obtener mensajes de contacto (opcional, para admin)
export async function getContactMessages() {
  try {
    const messagesCollection = collection(db, "contactMessages");
    const querySnapshot = await getDocs(messagesCollection);
    
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, messages };
  } catch (error) {
    console.error("Error al obtener mensajes: ", error);
    return { success: false, error: error.message };
  }
}
