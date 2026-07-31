import { useEffect, useCallback } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { questions } from '../data/questions';

const WHATSAPP_NUMBER = '573003945644';

function Summary({ survey, onReset }) {
  const { answers, submitAnswers, resetSurvey } = survey;

  useEffect(() => {
    submitAnswers(answers);
  }, [submitAnswers, answers]);

  const getAnswerDisplay = (question) => {
    const answer = answers[question.id];
    if (!answer) return 'Sin respuesta';

    if (question.type === 'text') {
      return answer;
    }

    if (question.type === 'single') {
      // Handle object answers (option with text input)
      if (typeof answer === 'object' && answer.id) {
        const option = question.options.find((o) => o.id === answer.id);
        const label = option ? `${option.emoji} ${option.label}` : answer.id;
        return answer.text ? `${label}: ${answer.text}` : label;
      }
      const option = question.options.find((o) => o.id === answer);
      return option ? `${option.emoji} ${option.label}` : answer;
    }

    if (question.type === 'multiple') {
      return answer
        .map((id) => {
          const option = question.options.find((o) => o.id === id);
          return option ? `${option.emoji} ${option.label}` : id;
        })
        .join(', ');
    }

    return String(answer);
  };

  const buildWhatsAppMessage = useCallback(() => {
    let message = '💍✨ *Respuestas Despedida de Soltera* ✨💍\n\n';

    questions.filter((q) => q.type !== 'info').forEach((question) => {
      const display = getAnswerDisplay(question);
      message += `*${question.text}*\n${display}\n\n`;
    });

    message += '---\nEnviado desde la app de Despedida 🎉';
    return message;
  }, [answers]);

  const handleWhatsApp = useCallback(() => {
    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  }, [buildWhatsAppMessage]);

  return (
    <Layout>
      {/* Emotional closing message */}
      <motion.div
        className="flex flex-col items-center text-center mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="text-8xl mb-6">💌</span>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-[#4A3035] mb-4 leading-tight">
          Ahora lo sabemos todo... ✨
        </h1>

        <p className="text-[#8C6B73] text-lg leading-relaxed max-w-md mb-2">
          ¡Pronto recibirás más información!
        </p>
        <p className="text-[#8C6B73] text-base leading-relaxed max-w-md">
          Prepárate porque se viene algo increíble 🎉💃
        </p>
      </motion.div>

      {/* WhatsApp button */}
      <motion.div
        className="flex justify-center mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Button
          onClick={handleWhatsApp}
          className="!bg-[#25D366] !from-[#25D366] !to-[#128C7E] !shadow-[#25D366]/30 flex items-center gap-2"
        >
          <MessageCircle size={20} />
          Enviar mis respuestas por WhatsApp
        </Button>
      </motion.div>

      {/* Answers summary (collapsible feel - subtle) */}
      <motion.details
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <summary className="cursor-pointer text-center text-[#8C6B73] hover:text-[#D4849A] transition-colors text-sm font-medium mb-4">
          Ver mis respuestas
        </summary>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {questions.filter((q) => q.type !== 'info').map((question) => (
            <div key={question.id} className="p-4 rounded-2xl bg-[#FFFBFC] border border-[#F2D4DC]">
              <p className="text-sm text-[#8C6B73] mb-1">{question.text}</p>
              <p className="text-[#4A3035] font-medium">{getAnswerDisplay(question)}</p>
            </div>
          ))}
        </div>
      </motion.details>

      <div className="flex flex-col items-center gap-3">
        <Button variant="ghost" onClick={onReset}>
          Volver al inicio
        </Button>
      </div>
    </Layout>
  );
}

export default Summary;
