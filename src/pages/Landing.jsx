import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import paluImg from '../assets/Palu.png';

function Landing({ onStart }) {
  const handleStart = useCallback(() => {
    // Fire sparkle/confetti burst
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#D4849A', '#F2D4DC', '#FFD700', '#FFF5F7', '#C06B83', '#FFB6C1'],
    };

    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 1.2,
      shapes: ['star'],
    });

    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 0.75,
      shapes: ['circle'],
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1,
        shapes: ['star'],
        startVelocity: 20,
      });
    }, 150);

    // Navigate after a short delay so user sees the sparkle
    setTimeout(() => {
      onStart();
    }, 600);
  }, [onStart]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with subtle opacity */}
      <img
        src={paluImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="relative z-10">
        <Layout>
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#4A3035] mb-3 leading-tight">
              Descubre tu despedida
              <br />
              <span className="text-[#D4849A]">de soltera ideal</span> ✨
            </h1>

            <p className="text-[#8C6B73] mb-10 leading-relaxed text-lg max-w-md">
              No significa que vaya a pasar... pero imaginemos por un momento la despedida de tus sueños. 😏 Responde sin pensarlo mucho.
            </p>

            <Button
              onClick={handleStart}
              className="!px-10 !py-4 !text-lg"
            >
              ✨ Empecemos ✨
            </Button>
          </motion.div>
        </Layout>
      </div>
    </div>
  );
}

export default Landing;
