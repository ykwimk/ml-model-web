export const MODELS = [
  // --- NLP (자연어 처리) ---
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: '입력한 텍스트를 간단히 요약해주는 모델',
  },
  {
    id: 'translator',
    name: 'Translator',
    description: '영어, 한국어 등 다국어 간 번역을 제공하는 모델',
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: '문장의 감정(긍정/부정/중립)을 분석하는 모델',
  },
  {
    id: 'question-answering',
    name: 'Question Answering',
    description: '주어진 문서를 바탕으로 질문에 답하는 모델',
  },

  // --- Vision (컴퓨터 비전) ---
  {
    id: 'image-classifier',
    name: 'Image Classifier',
    description: '이미지를 특정 카테고리로 분류하는 모델',
  },
  {
    id: 'object-detection',
    name: 'Object Detection',
    description: '이미지 속 객체 위치와 종류를 탐지하는 모델',
  },
  {
    id: 'ocr',
    name: 'OCR',
    description: '이미지 내 텍스트를 추출하는 문자 인식 모델',
  },

  // --- Speech/Audio (음성/오디오) ---
  {
    id: 'speech-to-text',
    name: 'Speech-to-Text',
    description: '음성 입력을 받아 텍스트로 변환하는 모델',
  },
  {
    id: 'text-to-speech',
    name: 'Text-to-Speech',
    description: '입력한 텍스트를 자연스러운 음성으로 변환하는 모델',
  },

  // --- Multimodal (먿티모달) ---
  {
    id: 'image-captioning',
    name: 'Image Captioning',
    description: '이미지를 분석해 간략한 텍스트 설명을 생성하는 모델',
  },
];
