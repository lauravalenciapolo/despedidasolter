import negroImg from '../assets/negro.jpeg';
import rosaImg from '../assets/Rosa.jpeg';
import coloridoImg from '../assets/colorido.jpeg';
import blancoImg from '../assets/blanco.jpeg';
import tranquilaImg from '../assets/tranquila.jpeg';
import algunosJuegosImg from '../assets/algunosJuegos.jpeg';
import bastantesJuegosImg from '../assets/bastantesJuegos.jpeg';
import inolvidableImg from '../assets/inolvidable.jpeg';
import exitoImg from '../assets/exito.jpeg';
import eleganteSofisticadoImg from '../assets/eleganteSofisticado.jpeg';
import fiestaSinPararImg from '../assets/fiestaSinParar.jpeg';
import relaxNaturalezaImg from '../assets/RelaxNaturaleza.jpeg';
import divertidaImg from '../assets/divertida.jpeg';
import eleganteFiestaImg from '../assets/eleganteFiesta.jpeg';
import vaqueraImg from '../assets/vaquera.jpeg';
import floralImg from '../assets/floral.jpeg';
import allWhiteImg from '../assets/allWhite.jpeg';
import tropicalImg from '../assets/tropical.jpeg';
import barbieImg from '../assets/barbie.jpeg';
import oldMoneyImg from '../assets/oldMoney.jpeg';
import glamImg from '../assets/glam.jpeg';
import casinoImg from '../assets/casino.jpeg';
import ibizaImg from '../assets/ibiza.jpeg';


export const questions = [
  {
    id: 'duration',
    text: '⏳ ¿Cuánto debería durar la despedida?',
    description: "Solo puedes seleccionar una... Lo se, esta dificil",
    type: 'single',
    options: [
      { id: 'full-day', emoji: '🌞', label: 'Un día completo (desde la mañana hasta la noche)' },
      { id: 'afternoon-night', emoji: '🌙', label: 'Una tarde y una noche' },
      { id: 'two-days', emoji: '🌅', label: 'Dos días con amanecida' },
    ],
  },
  {
    id: 'alcohol-importance',
    text: '🍸 ¿Qué tan importante es que haya licor?',
    description: "Solo puedes seleccionar una... Lo se, esta dificil",
    type: 'single',
    options: [
      { id: 'essential', emoji: '🍹', label: 'Imprescindible' },
      { id: 'chill', emoji: '🥂', label: 'Sí, pero algo tranquilo' },
      { id: 'some', emoji: '🍾', label: 'Solo unos traguitos' },
      { id: 'not-main', emoji: '🧃', label: 'Prefiero que no sea el protagonista' },
    ],
  },
  {
    id: 'drinks',
    text: '🍸 Si hubiera barra libre... ¿qué pedirías?',
    description: "Aqui si selecciona las que quieras... Pero no te dejes llevar",
    type: 'multiple',
    options: [
      { id: 'margarita', emoji: '🍹', label: 'Margarita' },
      { id: 'mojito', emoji: '🍹', label: 'Mojito' },
      { id: 'aperol', emoji: '🍊', label: 'Aperol Spritz' },
      { id: 'gin-tonic', emoji: '🍸', label: 'Gin Tonic' },
      { id: 'pina-colada', emoji: '🍍', label: 'Piña Colada' },
      { id: 'moscow-mule', emoji: '🥒', label: 'Moscow Mule' },
      { id: 'whisky', emoji: '🥃', label: 'Whisky' },
      { id: 'ron', emoji: '🥃', label: 'Ron' },
      { id: 'vodka', emoji: '🍸', label: 'Vodka' },
      { id: 'cerveza', emoji: '🍺', label: 'Cerveza' },
      { id: 'vino', emoji: '🍷', label: 'Vino' },
      { id: 'sin-alcohol', emoji: '✨', label: 'Cocteles sin alcohol' },
    ],
  },
  {
    id: 'atmosphere',
    text: '✨ ¿Cuál de estos ambientes te emociona más?',
    type: 'single',
    description: "Solo puedes seleccionar una... Lo se, esta dificil",
    hasImage: true,
    options: [
      { id: 'elegant', emoji: '🤍', label: 'Elegante y sofisticado', description: 'Vestidos lindos, decoración blanca, velas, flores, buena comida', image: eleganteSofisticadoImg },
      { id: 'party', emoji: '🎉', label: 'Fiesta sin parar', description: 'Bailar hasta el amanecer, DJ, shots y mucha energía', image: fiestaSinPararImg },
      { id: 'relax', emoji: '🌿', label: 'Relax y naturaleza', description: 'Piscina, spa, glamping, conversación y vino', image: relaxNaturalezaImg },
      { id: 'fun', emoji: '😂', label: 'Súper divertida', description: 'Juegos, retos, disfraces y muchas risas', image: divertidaImg },
      { id: 'mix', emoji: '💃', label: 'Una mezcla de elegante + fiesta', image: eleganteFiestaImg },
    ],
  },
  {
    id: 'theme',
    text: '🎭 ¿Qué temática escogerías?',
    type: 'multiple',
    description: "Aqui selecciona máximo dos",
    maxSelections: 2,
    hasImage: true,
    options: [
      { id: 'vaquera', emoji: '🤠', label: 'Vaquera', image: vaqueraImg },
      { id: 'floral', emoji: '🌸', label: 'Floral', image: floralImg },
      { id: 'all-white', emoji: '🤍', label: 'All White', image: allWhiteImg },
      { id: 'tropical', emoji: '🌴', label: 'Tropical', image: tropicalImg },
      { id: 'barbie', emoji: '💖', label: 'Barbie', image: barbieImg },
      { id: 'old-money', emoji: '✨', label: 'Old Money / Chic', image: oldMoneyImg },
      { id: 'glam', emoji: '💎', label: 'Glam', image: glamImg },
      { id: 'casino', emoji: '🍸', label: 'Casino Night', image: casinoImg },
      { id: 'ibiza', emoji: '🌺', label: 'Ibiza', image: ibizaImg },
    ],
  },
  {
    id: 'music',
    text: '🎤 ¿Qué canciones definitivamente tienen que sonar?',
    type: 'info',
    description: 'Agrégalas a esta playlist cuando te acuerdes o escuches una que sí o sí debe estar 🎶',
    link: 'https://open.spotify.com/playlist/6B4wJfFUmXPT0eM05ZRi9L?si=pg7eu0PmRWW7ZwBMGa-MUQ&utm_source=whatsapp&pi=soiIoKUdS4eEx',
    linkLabel: 'Abrir playlist en Spotify',
  },
  {
    id: 'protagonist-color',
    text: '👗 Tú como protagonista... ¿Como te gustaría vestirte?',
    type: 'single',
    description: "Solo puedes seleccionar una... Lo se, esta dificil",
    options: [
      { id: 'blanco', emoji: '🤍', label: 'Blanco' },
      { id: 'plateado', emoji: '✨', label: 'Plateado' },
      { id: 'rosado', emoji: '💖', label: 'Rosado' },
      { id: 'rojo', emoji: '❤️', label: 'Rojo' },
      { id: 'negro', emoji: '🖤', label: 'Negro' },
      { id: 'beige', emoji: '🤎', label: 'Beige' },
    ],
  },
  {
    id: 'group-color',
    text: '👯 ¿Y cómo te gustaría que fueran vestidas las demás?',
    type: 'single',
    description: "Solo puedes seleccionar una... Lo se, esta dificil",
    hasImage: true,
    options: [
      { id: 'negro', emoji: '🖤', label: 'Todas de negro', image: negroImg },
      { id: 'rosado', emoji: '💖', label: 'Todas de rosado', image: rosaImg },
      { id: 'blanco', emoji: '🤍', label: 'Todas de blanco', image: blancoImg},
      { id: 'diferentes', emoji: '🎨', label: 'Todas de colores diferentes', image: coloridoImg },
      { id: 'libre', emoji: '🌈', label: 'Otro', hasTextInput: true, textPlaceholder: '¿De qué color te gustaría vernos?' },
    ],
  },
  {
    id: 'plans',
    text: '📍 ¿Qué plan te emociona más? (Puedes elegir varios)',
    type: 'multiple',
    description: "Aqui si selecciona las que quieras... Pero no te dejes llevar",
    options: [
      { id: 'casa-campestre', emoji: '🏡', label: 'Casa campestre' },
      { id: 'piscina', emoji: '🏊', label: 'Piscina' },
      { id: 'glamping', emoji: '⛺', label: 'Glamping' },
      { id: 'hotel', emoji: '🏨', label: 'Hotel' },
      { id: 'rooftop', emoji: '🌇', label: 'Rooftop' },
      { id: 'bar', emoji: '🍸', label: 'Bar elegante' },
      { id: 'discoteca', emoji: '🪩', label: 'Discoteca' },
      { id: 'karaoke', emoji: '🎤', label: 'Karaoke' },
      { id: 'yate', emoji: '🛥️', label: 'Paseo en yate' },
      { id: 'spa', emoji: '💆‍♀️', label: 'Spa' },
      { id: 'picnic', emoji: '🧺', label: 'Picnic' },
      { id: 'cena', emoji: '🍽️', label: 'Cena elegante' },
      { id: 'fogata', emoji: '🔥', label: 'Fogata' },
      { id: 'fiesta-privada', emoji: '🎊', label: 'Fiesta privada' },
    ],
  },
  {
    id: 'craziness',
    text: '😂 ¿Qué tan loca te gustaría la despedida?',
    type: 'single',
    description: "Solo puedes seleccionar una... Lo se, esta dificil",
    hasImage: true,
    options: [
      { id: 'tranquila', emoji: '😇', label: 'Muy tranquila', image: tranquilaImg },
      { id: 'algunos-juegos', emoji: '😊', label: 'Con algunos juegos', image: algunosJuegosImg },
      { id: 'bastantes-juegos', emoji: '🤣', label: 'Bastantes juegos y retos', image: bastantesJuegosImg },
      { id: 'inolvidable', emoji: '🔥', label: 'Que sea inolvidable', image: inolvidableImg },
      { id: 'sin-miedo', emoji: '💀', label: 'Sin miedo al éxito jajaja', image: exitoImg },
    ],
  },
  {
    id: 'no-quiero',
    text: '🤭 ¿Hay algo que definitivamente NO quisieras?',
    type: 'text',
    placeholder: 'Escribe lo que definitivamente no te gustaría que pasara...',
  },
  {
    id: 'frase-perfecta',
    text: '💌 Si pudieras describir tu despedida perfecta en una frase, ¿cómo sería?',
    type: 'text',
    placeholder: 'Describe tu despedida soñada en una frase...',
  },
];
