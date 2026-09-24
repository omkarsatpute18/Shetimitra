import * as React from 'react'
import {
  Bot,
  Send,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { askFarmerQuestion } from '@/services/aiService'
import { VoiceButton } from '@/components/ui/VoiceButton'

interface Message {
  id: string
  sender: 'user' | 'assistant'
  text?: string
  response?: Awaited<ReturnType<typeof askFarmerQuestion>>
  timestamp: string
}

const suggestedPrompts = [
  'माझा कांदा कुठे विकू?',
  'कोणत्या जवळच्या बाजारात सर्वात जास्त भाव आहे?',
  'आजचा शासकीय हमीभाव (MSP) काय आहे?',
  'विश्वसनीय थेट खरेदीदार दाखवा',
  'गाडीचा वाहतूक खर्च कसा कमी करू?',
  'शेजाऱ्यांसोबत एकत्र विक्री कशी करावी?',
  'माल आत्ता विकू की शीतगृहात साठवून ठेवू?',
]

export default function AiAssistantPage() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'राम राम शेतकरी दादा! मी तुमचा शेतीमित्र डिजिटल सल्लागार आहे. शेतमाल कुठे विकायचा, चालू बाजारभाव काय आहेत, वाहतूक खर्च कसा वाचवायचा, किंवा इतर शेतकरी मित्रांसोबत माल एकत्र कसा विकायचा, याबाबत मला काहीही विचारा.',
      timestamp: 'आत्ताच',
    },
  ])
  const [inputText, setInputText] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const chatBottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async (queryText?: string) => {
    const q = queryText ?? inputText
    if (!q.trim()) return

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!queryText) setInputText('')
    setIsLoading(true)

    try {
      const response = await askFarmerQuestion(q, { quantityKg: 2000 })
      const aiMsg: Message = {
        id: `a_${Date.now()}`,
        sender: 'assistant',
        response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 shadow-xs">
            <Bot className="h-7 w-7" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
                शेतीमित्र डिजिटल सल्लागार (AI Advisor)
              </h1>
              <Badge variant="success" size="sm">डिजिटल शेती सोबती</Badge>
              <VoiceButton
                text="शेतीमित्र डिजिटल शेती सल्लागार. तुम्हाला बाजारभाव, कमी खर्चाची वाहतूक आणि हमीभावाबाबत काय विचारायचे आहे? खालील प्रश्नांवर टॅप करा किंवा विचारण्यासाठी बोला."
                label="माहिती ऐका 🔊"
                size="sm"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 font-medium">
              थेट बाजारभाव, वाजवी वाहतूक आणि नफ्याचा हिशोब देणारा तुमचा विश्वासू डिजिटल कृषी सल्लागार.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          वारंवार विचारले जाणारे सोपे प्रश्न (एका क्लिकवर विचारा):
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => void handleSend(prompt)}
              className="text-xs bg-white border border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-800 py-1.5 px-3.5 rounded-full transition shadow-xs text-left font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Window */}
      <Card className="shadow-sm border-gray-200 flex flex-col min-h-[500px]">
        <CardContent className="p-4 sm:p-6 flex-1 space-y-5 overflow-y-auto max-h-[550px]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs">
                  AI
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm ${
                  m.sender === 'user'
                    ? 'bg-primary-600 text-white rounded-tr-none'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 rounded-tl-none space-y-3'
                }`}
              >
                {m.sender === 'assistant' && (
                  <div className="flex items-center justify-between gap-2 border-b border-gray-200/80 pb-2 mb-1">
                    <span className="text-[11px] font-bold text-purple-700">सल्ला ऐका (Audio Readout):</span>
                    <VoiceButton
                      text={m.text || (m.response ? `${m.response.summary}. मुख्य शिफारस: ${m.response.options[0]?.name || ''}, भाव: ₹${m.response.options[0]?.price || ''}` : '')}
                      size="sm"
                      label="उत्तर ऐका 🔊"
                    />
                  </div>
                )}

                {m.text && <p className="leading-relaxed font-medium">{m.text}</p>}

                {m.response && (
                  <div className="space-y-3">
                    <p className="font-semibold text-gray-900 leading-relaxed">{m.response.summary}</p>

                    {/* Ranked Recommendation Option Cards */}
                    <div className="space-y-2 pt-1">
                      {m.response.options.map((opt) => (
                        <div
                          key={opt.rank}
                          className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs space-y-1.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="h-5 w-5 rounded-full bg-primary-100 text-primary-800 text-[11px] font-black flex items-center justify-center">
                                #{opt.rank}
                              </span>
                              <span className="font-bold text-gray-900 text-sm">{opt.name}</span>
                            </div>
                            <span className="font-black text-primary-700 text-sm">
                              ₹{opt.price.toLocaleString('en-IN')}/{opt.unit}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-[11px] p-2 bg-gray-50 rounded-lg">
                            <div>
                              <span className="text-gray-500 font-medium">शेतापासून अंतर:</span>
                              <div className="font-bold text-gray-800">{opt.distanceKm} कि.मी.</div>
                            </div>
                            <div>
                              <span className="text-gray-500 font-medium">गाडी भाडे:</span>
                              <div className="font-bold text-red-600">
                                {opt.transportCost > 0 ? `-₹${opt.transportCost.toLocaleString('en-IN')}` : 'समाविष्ट'}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500 font-medium">हातात उरणारा नफा:</span>
                              <div className="font-black text-emerald-700">
                                {opt.net !== 0 ? `₹${opt.net.toLocaleString('en-IN')}` : 'सर्वोत्तम निवड'}
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-gray-700 font-medium">
                            💡 {opt.reason}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center justify-between">
                      <span>✓ हमीभाव व सुरक्षित पेमेंट नियम लागू</span>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-right text-gray-400 font-medium">{m.timestamp}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold animate-pulse">
                AI
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-600 font-medium flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                शेतीमित्र तुमच्यासाठी सर्वोत्तम बाजारभाव आणि नफ्याचे गणित मोजत आहे...
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </CardContent>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="तुमचा प्रश्न येथे विचारा... (उदा. कांद्याला चांगला भाव कुठे मिळेल?)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleSend()
            }}
            disabled={isLoading}
            className="flex-1 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
          />
          <Button
            variant="primary"
            size="md"
            disabled={isLoading || !inputText.trim()}
            onClick={() => void handleSend()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
