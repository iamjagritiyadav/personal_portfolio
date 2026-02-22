export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  date: string
  readingTime: string
  tags: string[]
  relatedSlugs: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-retrieval-augmented-generation",
    title: "Understanding Retrieval-Augmented Generation",
    description:
      "A deep dive into RAG architecture — how retrieval mechanisms augment large language models to produce grounded, factual responses with reduced hallucination.",
    content: `## What is RAG?

Retrieval-Augmented Generation (RAG) is a technique that enhances the capabilities of Large Language Models (LLMs) by grounding their responses in external knowledge sources. Instead of relying solely on the model's parametric knowledge, RAG systems retrieve relevant documents at inference time and use them as context for generation.

## The Architecture

A typical RAG pipeline consists of three core components:

1. **Document Ingestion & Chunking** — Raw documents are split into semantically meaningful chunks using strategies like recursive character splitting or semantic chunking.

2. **Embedding & Retrieval** — Each chunk is embedded into a vector space using models like OpenAI's \`text-embedding-ada-002\` or open-source alternatives. These vectors are stored in a vector database (FAISS, Pinecone, Weaviate) for efficient similarity search.

3. **Generation with Context** — The retrieved chunks are injected into the LLM's prompt as context, allowing the model to generate responses grounded in actual data.

\`\`\`python
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

# Build retriever
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.load_local("index", embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# Build QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff"
)
\`\`\`

## Why RAG Matters

Traditional LLMs suffer from **knowledge cutoff** and **hallucination**. RAG addresses both by:

- Providing up-to-date information from external sources
- Grounding responses in verifiable documents
- Enabling domain-specific knowledge without fine-tuning

## Evaluation Metrics

Evaluating RAG systems requires measuring both retrieval quality and generation quality:

- **Context Relevance** — Are the retrieved documents actually relevant?
- **Faithfulness** — Does the generated answer stay true to the retrieved context?
- **Answer Relevance** — Does the response actually address the user's query?

## Looking Forward

The RAG paradigm is evolving rapidly. Techniques like **self-RAG**, **corrective RAG**, and **adaptive retrieval** are pushing the boundaries of what's possible with retrieval-augmented systems.`,
    date: "2025-12-15",
    readingTime: "8 min read",
    tags: ["RAG", "GenAI", "Research"],
    relatedSlugs: [
      "reducing-hallucination-in-llm-systems",
      "yolo-vs-vision-transformers",
    ],
  },
  {
    slug: "reducing-hallucination-in-llm-systems",
    title: "How I Reduced Hallucination in LLM Systems",
    description:
      "Practical techniques for grounding LLM outputs — from retrieval augmentation to structured evaluation pipelines that catch and mitigate confabulation.",
    content: `## The Hallucination Problem

Hallucination in LLMs refers to the generation of plausible-sounding but factually incorrect or fabricated information. In high-stakes domains like healthcare, this can be dangerous.

## Techniques I Applied

### 1. Retrieval-Augmented Generation

The most effective approach was implementing RAG with careful attention to retrieval quality. By ensuring the retriever surfaces highly relevant documents, we constrain the LLM's generation space.

### 2. Grounding Checks

I implemented a post-generation verification step that cross-references key claims in the LLM's output against the retrieved source documents:

\`\`\`python
def grounding_check(response, source_docs):
    claims = extract_claims(response)
    grounded = []
    for claim in claims:
        score = max(
            semantic_similarity(claim, doc)
            for doc in source_docs
        )
        grounded.append({
            "claim": claim,
            "score": score,
            "is_grounded": score > 0.75
        })
    return grounded
\`\`\`

### 3. Structured Output Constraints

By forcing the model to output in structured formats (JSON with specific fields), we reduce the opportunity for free-form hallucination.

### 4. Temperature and Sampling Control

Lower temperature settings (0.1-0.3) with nucleus sampling significantly reduced creative but unfaithful outputs.

## Results

After implementing these techniques in the Healthcare Knowledge Assistant:

- Hallucination rate dropped from ~35% to under 8%
- User trust scores improved by 40%
- Response latency remained under acceptable thresholds

## Key Takeaways

Reducing hallucination is not a single-technique problem. It requires a **layered approach** combining retrieval quality, generation constraints, and post-processing verification.`,
    date: "2025-11-28",
    readingTime: "6 min read",
    tags: ["AI", "ML", "GenAI", "Research"],
    relatedSlugs: [
      "understanding-retrieval-augmented-generation",
      "lessons-from-ai-internships",
    ],
  },
  {
    slug: "building-face-emotion-detection-system",
    title: "Building a Real-Time Face & Emotion Detection System",
    description:
      "From data preprocessing to production inference — a technical walkthrough of building a face and emotion detection pipeline using YOLOv12 and Vision Transformers.",
    content: `## System Overview

This project implements a real-time face detection and emotion classification system using a two-stage pipeline: **YOLOv12** for face detection and **Vision Transformers (ViT)** for emotion classification.

## Architecture

\`\`\`
Input Frame → YOLOv12 (Face Detection) → Crop & Resize → ViT (Emotion Classification) → Output
\`\`\`

### Stage 1: Face Detection with YOLOv12

YOLOv12 was chosen for its excellent speed-accuracy trade-off. The model was trained on a custom dataset with careful attention to:

- **Data Augmentation**: Random rotation, horizontal flip, color jitter, and mosaic augmentation
- **Anchor-free detection**: Leveraging YOLOv12's anchor-free head for better generalization
- **Multi-scale training**: Training at multiple resolutions (416, 640, 832)

### Stage 2: Emotion Classification

A Vision Transformer (ViT-Base) was fine-tuned on FER-2013 and AffectNet datasets for 7-class emotion recognition: angry, disgust, fear, happy, neutral, sad, surprise.

\`\`\`python
import torch
from transformers import ViTForImageClassification

model = ViTForImageClassification.from_pretrained(
    "google/vit-base-patch16-224",
    num_labels=7,
    ignore_mismatched_sizes=True
)

# Fine-tuning with mixed precision
scaler = torch.cuda.amp.GradScaler()
for batch in dataloader:
    with torch.cuda.amp.autocast():
        outputs = model(**batch)
        loss = outputs.loss
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
\`\`\`

## Evaluation

| Metric | Value |
|--------|-------|
| Face Detection mAP@0.5 | 94.2% |
| Emotion Accuracy | 71.8% |
| Inference FPS (GPU) | 28 FPS |
| Inference FPS (CPU) | 8 FPS |

## Optimization Techniques

- **TensorRT optimization** for GPU inference
- **ONNX export** for cross-platform deployment
- **Batch processing** for video streams
- **Model quantization** (INT8) for edge deployment`,
    date: "2025-10-20",
    readingTime: "10 min read",
    tags: ["Computer Vision", "Deep Learning", "Research"],
    relatedSlugs: [
      "yolo-vs-vision-transformers",
      "lessons-from-ai-internships",
    ],
  },
  {
    slug: "lessons-from-ai-internships",
    title: "Lessons from AI Internships",
    description:
      "Key takeaways from working at Ethara AI and ANNAM.AI — from prompt engineering evaluation to building production computer vision pipelines.",
    content: `## The Value of Real-World AI Work

Academic projects teach you the theory. Internships teach you why the theory sometimes breaks down in production.

## At Ethara AI: LLM Post-Training

My role involved evaluating and improving LLM outputs through post-training techniques:

### Prompt Engineering at Scale

Writing effective prompts for AI systems is both an art and a science. Key lessons:

- **Specificity matters** — Vague prompts produce vague outputs
- **Few-shot examples** dramatically improve consistency
- **System prompts** set the behavioral foundation
- **Evaluation rubrics** must be clearly defined before assessment begins

### Quality Assessment Frameworks

I developed structured evaluation criteria for AI-generated content:

1. **Factual Accuracy** — Is the information correct?
2. **Relevance** — Does it address the intended purpose?
3. **Coherence** — Is the output logically structured?
4. **Safety** — Does it avoid harmful or biased content?

## At ANNAM.AI: Computer Vision in Production

### Building Robust Pipelines

The biggest challenge wasn't model accuracy — it was building reliable pipelines that handle edge cases:

- Input validation and sanitization
- Graceful degradation when model confidence is low
- Logging and monitoring for drift detection
- A/B testing framework for model versions

### Performance Optimization

Production constraints forced creative optimization:

- Model distillation reduced inference time by 60%
- Batch processing improved throughput 4x
- Caching frequently requested predictions
- Async processing for non-real-time requests

## Universal Takeaways

1. **Production AI is 20% modeling, 80% engineering**
2. **Data quality trumps model complexity every time**
3. **Monitoring is not optional** — models degrade silently
4. **Documentation saves future-you hours of debugging**
5. **Communicate results in business terms**, not just metrics`,
    date: "2025-09-15",
    readingTime: "7 min read",
    tags: ["AI", "ML", "Career"],
    relatedSlugs: [
      "reducing-hallucination-in-llm-systems",
      "building-face-emotion-detection-system",
    ],
  },
  {
    slug: "yolo-vs-vision-transformers",
    title: "YOLO vs Vision Transformers",
    description:
      "A comparative analysis of CNN-based detection (YOLO family) versus Vision Transformer architectures for real-time computer vision tasks.",
    content: `## The Landscape

Computer vision has been dominated by two paradigms: **Convolutional Neural Networks** (CNNs) and more recently, **Vision Transformers** (ViTs). Understanding when to use each is crucial for building effective systems.

## YOLO: Speed-First Detection

The YOLO (You Only Look Once) family represents the pinnacle of real-time object detection:

### Strengths
- **Single-pass inference** — Processes the entire image in one forward pass
- **Real-time capable** — 30+ FPS on modern GPUs
- **Strong multi-scale detection** with Feature Pyramid Networks
- **Anchor-free variants** (YOLOv8+) simplify training

### Architecture Evolution

\`\`\`
YOLOv1 (2015) → v2 → v3 → v4 → v5 → v7 → v8 → v12 (2025)
\`\`\`

Each version improved upon detection accuracy, inference speed, and training stability.

## Vision Transformers: Attention-First Processing

ViTs apply the self-attention mechanism from NLP to image patches:

### Strengths
- **Global context** from the first layer (unlike CNNs which build local→global)
- **Excellent scalability** with data and compute
- **Transfer learning** performance often surpasses CNNs
- **Flexible architecture** adaptable to various vision tasks

### Architecture

\`\`\`python
# Simplified ViT forward pass
patches = split_into_patches(image, patch_size=16)
embeddings = linear_projection(patches) + positional_encoding
for layer in transformer_layers:
    embeddings = layer(embeddings)  # Multi-head self-attention + FFN
output = classification_head(embeddings[:, 0])  # CLS token
\`\`\`

## Head-to-Head Comparison

| Aspect | YOLO | Vision Transformers |
|--------|------|-------------------|
| Speed | Very Fast | Moderate |
| Accuracy | High | Very High |
| Data Efficiency | Good | Needs more data |
| GPU Memory | Lower | Higher |
| Small Objects | Good (with FPN) | Excellent |
| Training Time | Shorter | Longer |

## When to Use What

**Choose YOLO when:**
- Real-time inference is critical
- Edge/mobile deployment is needed
- Training data is limited
- Detection is the primary task

**Choose ViTs when:**
- Maximum accuracy is the priority
- Large training datasets are available
- Classification or fine-grained recognition is needed
- Compute resources are abundant

## The Hybrid Approach

Modern systems increasingly combine both: YOLO for fast detection, ViTs for classification of detected regions. This is exactly the approach I used in the Face & Emotion Detection System.`,
    date: "2025-08-30",
    readingTime: "9 min read",
    tags: ["Computer Vision", "Deep Learning", "Research"],
    relatedSlugs: [
      "building-face-emotion-detection-system",
      "understanding-retrieval-augmented-generation",
    ],
  },
]

export const allTags = Array.from(
  new Set(blogPosts.flatMap((post) => post.tags))
).sort()

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return blogPosts.filter((post) => slugs.includes(post.slug))
}
