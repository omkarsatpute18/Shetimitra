import * as React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './Button'

export interface VoiceButtonProps {
  text: string
  label?: string
  lang?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export function VoiceButton({
  text,
  label,
  lang,
  className = '',
  size = 'sm',
  variant = 'secondary',
}: VoiceButtonProps) {
  const { i18n } = useTranslation()
  const [isSpeaking, setIsSpeaking] = React.useState(false)

  // Default language based on current i18n setting
  const effectiveLang =
    lang ?? (i18n.language === 'mr' ? 'mr-IN' : i18n.language === 'hi' ? 'hi-IN' : 'en-IN')

  React.useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('तुमच्या फोनवर/ब्राउझरवर आवाज सुविधा उपलब्ध नाही.')
      return
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = effectiveLang
    utterance.rate = 0.9 // Comfortable pace for rural farmers
    utterance.pitch = 1.0

    // Try finding an Indian accent voice if available
    const voices = window.speechSynthesis.getVoices()
    const matchingVoice = voices.find(
      (v) =>
        v.lang === effectiveLang ||
        v.lang.startsWith(effectiveLang.split('-')[0]) ||
        (effectiveLang.startsWith('mr') && v.lang.includes('hi')) // fallback Marathi to Hindi voice if needed
    )
    if (matchingVoice) {
      utterance.voice = matchingVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const defaultLabel =
    i18n.language === 'mr' ? 'ऐका' : i18n.language === 'hi' ? 'सुनिए' : 'Listen'

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={handleToggleVoice}
      className={`inline-flex items-center gap-1.5 font-bold transition-all shadow-sm ${
        isSpeaking
          ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400 animate-pulse'
          : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
      } ${className}`}
      title={isSpeaking ? 'आवाज थांबवा (Stop audio)' : 'बोलून दाखवा (Listen audio)'}
      aria-label={label ?? defaultLabel}
    >
      {isSpeaking ? (
        <VolumeX className="h-4 w-4 text-amber-700 animate-bounce" />
      ) : (
        <Volume2 className="h-4 w-4 text-emerald-600" />
      )}
      <span className="text-xs">{label ?? (isSpeaking ? 'थांबवा' : defaultLabel)}</span>
    </Button>
  )
}
