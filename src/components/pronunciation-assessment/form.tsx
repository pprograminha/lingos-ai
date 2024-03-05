'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { scoreColor, scoreStyle } from '@/lib/score-color'
import { Info } from 'lucide-react'
import { useState } from 'react'
import { Microphone } from './microphone'
import { toast } from '../ui/use-toast'
import { useRecordConversation } from '@/hooks/use-record-conversation'

type PronunciationAssessment = {
  AccuracyScore: number
  ErrorType?: string
  Feedback?: {
    Prosody?: {
      Break?: {
        ErrorTypes: string[]
        BreakLength: number
      }
      Intonation?: {
        ErrorTypes: string[]
        Monotone: {
          SyllablePitchDeltaConfidence: number
        }
      }
    }
  }
}

type Syllable = {
  Syllable: string
  PronunciationAssessment: PronunciationAssessment
  Offset: number
  Duration: number
}

type Phoneme = {
  Phoneme: string
  PronunciationAssessment: PronunciationAssessment
  Offset: number
  Duration: number
}

type Word = {
  Word: string
  Offset: number
  Duration: number
  PronunciationAssessment: PronunciationAssessment
  Syllables: Syllable[]
  Phonemes: Phoneme[]
}

type NBestPronunciationAssessment = {
  AccuracyScore: number
  FluencyScore: number
  ProsodyScore: number
  CompletenessScore: number
  PronScore: number
}

type NBest = {
  Confidence: number
  Lexical: string
  ITN: string
  MaskedITN: string
  Display: string
  PronunciationAssessment: NBestPronunciationAssessment
  ContentAssessment: {
    GrammarScore: number
    VocabularyScore: number
    TopicScore: number
  }
  Words: Word[]
}

type PrimaryLanguage = {
  Language: string
  Confidence: string
}

export type RecognitionResult = {
  Id: string
  RecognitionStatus: string
  Offset: number
  Duration: number
  PrimaryLanguage: PrimaryLanguage
  Channel: number
  DisplayText: string
  SNR: number
  NBest: NBest[]
}

type CreatePronunciationAssessmentHandlerData = {
  referenceText?: string
  conversationId?: string
  speechRecognitionResult: RecognitionResult
}

export function PronunciationAssessmentForm() {
  const [recognition, setRecognition] = useState<RecognitionResult | null>(null)

  const { toggleRecord } = useRecordConversation()

  async function createPronunciationAssessmentHandler({
    speechRecognitionResult,
    conversationId,
    referenceText,
  }: CreatePronunciationAssessmentHandlerData) {
    const formData = new FormData()

    if (referenceText) {
      formData.append('referenceText', referenceText)
    }
    if (conversationId) {
      formData.append('conversationId', conversationId)
    }

    formData.append(
      'speechRecognitionResult',
      JSON.stringify(speechRecognitionResult),
    )

    try {
      const response = await fetch('/api/ai/pronunciation/ackaud', {
        body: formData,
        method: 'POST',
      })

      await response.json()

      if (speechRecognitionResult.RecognitionStatus === 'Success') {
        setRecognition(speechRecognitionResult)
        toast({
          title: 'Audio successfully loaded correctly',
        })
        toggleRecord()
      }
    } catch {
      toast({
        title: 'Failed when trying to create pronunciation assessment.',
        variant: 'destructive',
      })
    }
  }

  const recognitionData = recognition?.NBest[0]

  const cellStyle =
    'data-[score-color=green]:text-green-600 dark:data-[score-color=green]:text-green-700 data-[score-color=red]:text-red-500 data-[score-color=yellow]:text-yellow-500 dark:data-[score-color=yellow]:text-yellow-400'

  const omittedWords =
    recognitionData?.Words.filter((w) =>
      w.PronunciationAssessment.ErrorType?.includes('Omission'),
    ).length || 0

  return (
    <>
      <Microphone
        onReset={() => {
          setRecognition(null)
        }}
        onRecognition={(data) => {
          createPronunciationAssessmentHandler(data)
        }}
      />

      {recognitionData && (
        <>
          <Table className="rounded-lg overflow-hidden my-6">
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.AccuracyScore,
                  )}
                  className={`${scoreStyle}`}
                >
                  Accuracy Score
                </TableHead>
                <TableHead
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.CompletenessScore,
                  )}
                  className={`${scoreStyle}`}
                >
                  Completeness Score
                </TableHead>
                <TableHead
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.PronScore,
                  )}
                  className={`text-center ${scoreStyle}`}
                >
                  Pronunciation Score
                </TableHead>
                <TableHead
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.FluencyScore,
                  )}
                  className={`text-right ${scoreStyle}`}
                >
                  Fluency Score
                </TableHead>
                {omittedWords > 0 && (
                  <TableHead className="text-right">Words Omitted</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.AccuracyScore,
                  )}
                  className={`${cellStyle}`}
                >
                  {recognitionData.PronunciationAssessment.AccuracyScore}
                </TableCell>
                <TableCell
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.CompletenessScore,
                  )}
                  className={`${cellStyle}`}
                >
                  {recognitionData.PronunciationAssessment.CompletenessScore}
                </TableCell>
                <TableCell
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.PronScore,
                  )}
                  className={`text-center ${cellStyle}`}
                >
                  {recognitionData.PronunciationAssessment.PronScore}
                </TableCell>
                <TableCell
                  data-score-color={scoreColor(
                    recognitionData.PronunciationAssessment.FluencyScore,
                  )}
                  className={`text-right ${cellStyle}`}
                >
                  {recognitionData.PronunciationAssessment.FluencyScore}
                </TableCell>
                {omittedWords > 0 && (
                  <TableCell className="text-right">{omittedWords}</TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
          <Table className="rounded-lg overflow-hidden my-6">
            <TableHeader>
              <TableRow className="text-xs">
                {recognitionData.Words.map((word, index) => (
                  <TableHead
                    key={index}
                    data-score-color={scoreColor(
                      word.PronunciationAssessment.AccuracyScore,
                    )}
                    className={`${scoreStyle} relative`}
                  >
                    {word.Word}{' '}
                    <span
                      data-score-color={scoreColor(
                        word.PronunciationAssessment.AccuracyScore,
                      )}
                      className="absolute top-1 rounded-full px-1"
                    >
                      {word.PronunciationAssessment.AccuracyScore}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="mt-1">
              <TableRow>
                {recognitionData.Words.map((word, index) => (
                  <TableCell key={index} className="dark:border-zinc-800 ">
                    {word.Phonemes.length === 0 && (
                      <Info className="text-red-500" />
                    )}
                    {word.Phonemes.map((p) => (
                      <TableCell
                        key={index}
                        data-score-color={scoreColor(
                          p.PronunciationAssessment.AccuracyScore,
                        )}
                        className={`${cellStyle} pr-[20px] pl-0 relative`}
                      >
                        {p.Phoneme}
                        <span
                          data-score-color={scoreColor(
                            p.PronunciationAssessment.AccuracyScore,
                          )}
                          className="absolute top-1 text-[0.6em] rounded-full"
                        >
                          {p.PronunciationAssessment.AccuracyScore}
                        </span>
                      </TableCell>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  )
}
