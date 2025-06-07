import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaLaptopCode, FaServer, FaShieldAlt,FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/use-translation';

// ---------- Animación fade-in ----------
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ---------- Estilos comunes ----------
const elementStyles = {
  contentStyle: {
    background: '#000',
    color: '#0f0',
    border: '1px solid #0f0',
    fontFamily: 'monospace',
  },
  contentArrowStyle: { borderRight: '7px solid  #0f0' },
  iconStyle: { background: '#000', color: '#0f0', border: '1px solid #0f0' },
};

export default function TerminalTimeline() {
  const { t } = useTranslation();

  // ⬇️ NO se modifica: sólo lo traemos del hook para mantener la traducción
  const timelineItems = [
    {
      year: 'Ene 2024\nNov 2024',
      title: t('timeline.qatitle'),
      description: t('timeline.qadescription'),
      summary: t('timeline.qasummary'),
    },
    {
      year: 'Nov 202\nEne 2024',
      title: t('timeline.logistics.title'),
      description: t('timeline.logistics.description'),
      summary: t('timeline.logistics.summary'),
    },
    {
      year: '2024\nActualidad',
      title: t('timeline.utn.title'),
      description: t('timeline.utn.description'),
      summary: t('timeline.utn.summary'),
    },
    {
      year: t('timeline.soon.year'),
      title: t('timeline.soon.title'),
      description: t('timeline.soon.description'),
      summary: t('timeline.soon.summary'),
    },
  ];

  // Iconos por posición (podés cambiarlos si querés otro orden):
  const icons = [<FaLaptopCode />, <FaServer />, <FaShieldAlt />, <FaCode />];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInVariants}
      className="py-10 px-4 bg-terminal-black text-terminal-green"
    >
      <VerticalTimeline>
        {timelineItems.map(
          ({ year, title, description, summary }, idx) => (
            <VerticalTimelineElement
              key={idx}
              className="vertical-timeline-element--work"
              date={year}
              icon={icons[idx] ?? <FaLaptopCode />}
              {...elementStyles}
            >
              <h3 className="vertical-timeline-element-title font-bold text-terminal-cyan">
                {title}
              </h3>

              {/* Descripción principal */}
              {description && <p className="mb-1">{description}</p>}

              {/* Resumen adicional */}
              {summary && (
                <p className="italic text-terminal">{summary}</p>
              )}
            </VerticalTimelineElement>
          ),
        )}
      </VerticalTimeline>
    </motion.section>
  );
}
