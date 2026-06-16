import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Initialization successful: GoogleGenAI connected securely.");
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

// API endpoint for healthy system checks
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API endpoint for student chat with Ing. Edinson Pilozo
app.post("/api/gemini/chat", async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        error: "El tutor de Inteligencia Artificial no está configurado. Por favor, asegúrate de activar tu clave API de Gemini en Settings > Secrets.",
      });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Falta el historial de mensajes o formato incorrecto." });
    }

    // Convert messages to GoogleGenAI formats
    // We can map history directly or use a prompt. Let's construct content history.
    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: `Eres el Ing. Edinson Pilozo, un formador digital experto en computación, programación, AutoCAD y sistemas de ventas automáticos. 
Tu misión es guiar, motivar y responder preguntas de tus estudiantes de forma amena, amigable, clara y extremadamente pedagógica. 
Hablas siempre en español de manera profesional y accesible (como un gran mentor de tecnología). 
Explicas conceptos paso a paso con analogías sencillas y útiles.
Debes incentivar siempre la práctica y el desarrollo de proyectos reales. 
Evita decir frases genéricas como "soy una inteligencia artificial de Google". Respóndeles siempre como el Ing. Edinson Pilozo que diseña el ecosistema tecnológico.`,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Disculpa, no pude procesar la respuesta en este momento.";
    res.json({ content: reply });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({
      error: "Ocurrió un error al procesar tu consulta con el Tutor Virtual.",
      details: error.message,
    });
  }
});

// API endpoint to generate custom quiz questions dynamically
app.post("/api/gemini/quiz", async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        error: "El generador de cuestionarios de IA no está configurado.",
      });
    }

    const { courseId, topicName } = req.body;
    if (!courseId) {
      return res.status(400).json({ error: "courseId es requerido." });
    }

    const prompt = `Genera un cuestionario interactivo de 3 preguntas de opción múltiple para evaluar los conocimientos en el tema "${topicName || "General"}" perteneciente al curso o módulo educativo "${courseId}". 
Asegúrate de que las preguntas sean sumamente relevantes, de dificultad balanceada para estudiantes en formación.
Devuelve el resultado siguiendo estrictamente el esquema JSON requerido.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `Eres un evaluador académico del ecosistema de formación "Computación + IA" del Ing. Edinson Pilozo. 
Debes generar preguntas claras, precisas, con solo una respuesta correcta explícita.
Las explicaciones de por qué la respuesta es correcta deben ser alentadoras y explicativas.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING, description: "Título del cuestionario" },
            questions: {
              type: Type.ARRAY,
              description: "Lista de exactamente 3 preguntas",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "ID único sencillo como q1, q2, q3" },
                  questionText: { type: Type.STRING, description: "El cuerpo de la pregunta académica" },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "4 opciones posibles para contestar"
                  },
                  correctIndex: { type: Type.INTEGER, description: "Índice base 0 de la opción correcta de la lista de opciones" },
                  explanation: { type: Type.STRING, description: "Explicación detallada de por qué es la respuesta apropiada, comentando por qué enseña un buen hábito técnico" }
                },
                required: ["id", "questionText", "options", "correctIndex", "explanation"]
              }
            }
          },
          required: ["quizTitle", "questions"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    res.status(500).json({
      error: "Ocurrió un error al generar de forma dinámica el test automatizado por IA.",
      details: error.message,
    });
  }
});

// Vite middleware integration
async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static files served from production directory.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is booted up and running securely on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Critical server failure on startup:", err);
});
