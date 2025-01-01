import { IModel } from './types';

export const MODELS: IModel[] = [
  // --- NLP (자연어 처리) ---
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    caption: '입력한 텍스트를 간단히 요약해주는 모델',
    baseModel: 'facebook/bart-large-cnn',
    inputType: 'text',
    description:
      'BART 기반 요약 모델. CNN/Daily Mail 데이터셋으로 학습되어 다양한 영어 문서에 대한 요약에 강점을 가집니다.',
  },
  {
    id: 'translator',
    name: 'Translator',
    caption: '영어, 한국어 등 다국어 간 번역을 제공하는 모델',
    baseModel: 'Helsinki-NLP/opus-mt-en-de', // 언어 방향(en->de 등)에 따라 모델 선택 가능: https://huggingface.co/Helsinki-NLP
    inputType: 'text',
    description:
      'Helsinki-NLP 시리즈 모델. 다양한 언어 쌍 번역을 지원하며, 여기서는 영어→독일어 번역 예제로 설정.',
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    caption: '문장의 감정(긍정/부정/중립)을 분석하는 모델',
    baseModel: 'ProsusAI/finbert',
    inputType: 'text',
    description:
      '다국어 감정분석 모델. 입력 텍스트의 감정을 긍정~부정 스펙트럼으로 분석.',
  },
  {
    id: 'question-answering',
    name: 'Question Answering',
    caption: '주어진 문서를 바탕으로 질문에 답하는 모델',
    baseModel: 'deepset/roberta-base-squad2',
    inputType: 'text',
    description:
      'SQuAD v2 데이터로 학습된 RoBERTa 기반 QA 모델. 문서와 질문을 입력받아 해당하는 정답 구절을 추출.',
  },

  // --- Vision (컴퓨터 비전) ---
  {
    id: 'image-classifier',
    name: 'Image Classifier',
    caption: '이미지를 특정 카테고리로 분류하는 모델',
    baseModel: 'google/vit-base-patch16-224',
    inputType: 'image',
    description:
      'Vision Transformer(ViT) 기반 이미지 분류 모델. 일반적인 이미지 인식에 성능이 우수.',
  },
  {
    id: 'object-detection',
    name: 'Object Detection',
    caption: '이미지 속 객체 위치와 종류를 탐지하는 모델',
    baseModel: 'facebook/detr-resnet-50',
    inputType: 'image',
    description:
      'DETR(Detection Transformer) 기반 객체 탐지 모델. 이미지 내 객체들의 bounding box와 클래스 식별.',
  },
  {
    id: 'ocr',
    name: 'OCR',
    caption: '이미지 내 텍스트를 추출하는 문자 인식 모델',
    baseModel: 'microsoft/trocr-base-printed',
    inputType: 'image',
    description:
      'TrOCR는 Transformer 기반 OCR 모델로 인쇄된 텍스트 인식에 강점. 이미지 속 텍스트를 문자열로 반환.',
  },

  // --- Speech/Audio (음성/오디오) ---
  {
    id: 'speech-to-text',
    name: 'Speech-to-Text',
    caption: '음성 입력을 받아 텍스트로 변환하는 모델',
    baseModel: 'openai/whisper-small',
    inputType: 'audio',
    description:
      'Whisper는 다양한 언어와 상황에 잘 대응하는 음성 인식 모델. 음성 데이터를 텍스트로 정확히 변환.',
  },
  {
    id: 'text-to-speech',
    name: 'Text-to-Speech',
    caption: '입력한 텍스트를 자연스러운 음성으로 변환하는 모델',
    baseModel: 'facebook/mms-tts-yor',
    inputType: 'text',
    description:
      '페이스북의 Massively Multilingual Speech(MMS) 프로젝트의 일부로, 요루바(yor) 언어 TTS 모델 체크포인트를 제공.',
  },
  // https://huggingface.co/MIT/ast-finetuned-audioset-10-10-0.4593 추가

  // --- Multimodal (멀티모달) ---
  {
    id: 'image-captioning',
    name: 'Image Captioning',
    caption: '이미지를 분석해 간략한 텍스트 설명을 생성하는 모델',
    baseModel: 'nlpconnect/vit-gpt2-image-captioning',
    inputType: 'image',
    description:
      'ViT + GPT-2를 결합한 이미지 캡션 생성 모델. 이미지 입력 시 상황에 맞는 문장 설명을 생성.',
  },
];

export const modelResultKey: { [key: string]: string } = {
  'text-summarizer': 'summary_text',
  translator: 'translation_text',
  'sentiment-analysis': 'sentiment-analysis',
  'image-classifier': 'image-classifier',
  'object-detection': 'object-detection',
  ocr: 'generated_text',
  'speech-to-text': 'text',
  'image-captioning': 'generated_text',
};
