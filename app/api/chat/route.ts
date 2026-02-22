import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai"

export const maxDuration = 30

const RESUME_CONTEXT = `
# JAGRITI YADAV — Resume & Profile

## Summary
AI/ML undergraduate with hands-on experience building and evaluating end-to-end machine learning and LLM-based systems. Strong exposure to Retrieval-Augmented Generation (RAG), Computer Vision, and applied ML pipelines. Passionate about building reliable AI systems for healthcare and real-world problem solving.

## Education
- B.Tech CSE (Artificial Intelligence), University of Lucknow (2023 – 2027)
- BS in Programming & Data Science, IIT Madras

## Technical Skills
- Programming: Python, SQL
- Machine Learning: Feature Engineering, Supervised Learning, Model Training, Model Evaluation
- Deep Learning & GenAI: CNNs, Transformers, RAG, Prompt Engineering
- Tools: TensorFlow, Scikit-learn, LangChain, FAISS, Git, GitHub, Google Cloud Platform

## Projects
1. Healthcare Knowledge Assistant (RAG System)
   - End-to-end RAG pipeline architecture for healthcare decision support
   - Semantic chunking + embedding retrieval for medical documents
   - LangChain retriever-LLM workflow integration
   - Grounding checks to reduce hallucinations
   - Technologies: LangChain, FAISS, Python, RAG, Healthcare AI

2. Face & Emotion Detection System
   - Real-time face and emotion detection using YOLOv12 and Vision Transformers
   - Built preprocessing, augmentation, training, and inference pipeline
   - Evaluated using precision, recall, IoU metrics
   - Inference optimization for production deployment
   - Technologies: YOLOv12, Vision Transformers, Computer Vision, Deep Learning

3. Cancer Prediction Model
   - Supervised ML model for cancer prediction
   - Feature engineering and selection pipeline
   - Model evaluation and hyperparameter optimization
   - Technologies: Scikit-learn, Python, ML, Healthcare

## Professional Experience
1. LLM Post-Training Intern — Ethara AI
   - Prompt writing & AI output evaluation
   - Comparative review of generated images/videos
   - Quality assessment & alignment analysis

2. AI/ML Intern — ANNAM.AI
   - Fine-tuned computer vision models
   - Built preprocessing & validation pipelines
   - Improved inference performance

3. Cyber Security Intern — NIELIT
   - Network security fundamentals
   - Threat analysis & cyber defense practices
   - System vulnerability protection exposure

4. SWE Fellow — Headstarter AI
   - Software engineering trainee
   - Built applied technical projects

5. Program Manager — Samsung Innovation Campus
   - Coordinated coding & programming batch
   - Managed curriculum delivery
   - Supported students in programming foundations

6. Campus Ambassador — Yonder Wonder
   - Organized event with 200+ participants
   - Drove 500+ signups

7. Arcade Participant — Google Cloud Skills Boost
   - Completed GCP hands-on labs
   - Cloud deployment & resource management

## Certifications
- McKinsey Forward Program
- Google Foundations of Project Management
- SQL (Advanced)
- Data Analytics Certifications
- Python Certification
- Cyber Security Simulation
- Introduction to Psychology — Yale
- International Conference on Computational Intelligence & Cyber Security

## Coding Achievements
- 3-Star in Python (HackerRank)
- 3-Star in SQL (HackerRank)
- 1500+ LeetCode Rating

## Core Interests
- Generative AI
- Retrieval-Augmented Generation (RAG)
- Computer Vision
- Face & Emotion Detection
- Healthcare AI
- Responsible AI
`

const SYSTEM_PROMPT = `You are an AI assistant embedded on Jagriti Yadav's personal portfolio website. Your ONLY purpose is to answer questions about Jagriti Yadav based on the resume and profile information provided below.

STRICT RULES:
1. ONLY answer questions related to Jagriti Yadav's professional profile, resume, projects, skills, experience, education, certifications, and achievements.
2. If a question is NOT related to Jagriti Yadav's professional profile, respond EXACTLY with: "I can only answer questions related to Jagriti Yadav's professional profile."
3. Do NOT answer general knowledge questions, coding help, politics, personal opinions, or anything outside Jagriti's profile.
4. Be concise, professional, and friendly in your responses.
5. If asked about contact information, direct them to the Contact page on the website.
6. You may rephrase and elaborate on the provided information, but do NOT fabricate any details not present in the resume.

RESUME AND PROFILE INFORMATION:
${RESUME_CONTEXT}

Remember: You are ONLY a portfolio assistant for Jagriti Yadav. Stay strictly within scope.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    temperature: 0.3,
    maxOutputTokens: 500,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
