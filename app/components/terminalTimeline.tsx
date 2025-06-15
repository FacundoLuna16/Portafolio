import React, { use, useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaLaptopCode, FaServer, FaShieldAlt, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useTranslation } from '../hooks/use-translation';

// ---------- Animación fade-in ----------
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

// ---------- Estilos comunes ----------
const accentColor = '#39ff14';

function getElementStyles(isDark: boolean) {
  return {
    contentStyle: {
      background: isDark ? '#0d0d0d' : '#ffffff',
      color: isDark ? accentColor : '#000000',
      border: `1px solid ${accentColor}`,
      fontFamily: 'monospace',
    },
    contentArrowStyle: { borderRight: `7px solid ${accentColor}` },
    iconStyle: {
      background: isDark ? '#0d0d0d' : '#ffffff',
      color: accentColor,
      border: `1px solid ${accentColor}`,
    },
  };
}

export default function TerminalTimeline() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Asegurarse de que el componente se haya montado antes de acceder al tema
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

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

  const icons = [FaLaptopCode, FaServer, FaShieldAlt, FaCode];
  if (!mounted) return null; // Evitar renderizado antes de que el tema esté disponible

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInVariants}
      className="py-10 px-4 bg-background text-foreground dark:text-terminal-green"
    >
      <VerticalTimeline lineColor={accentColor}>
        {timelineItems.map(
          ({ year, title, description, summary }, idx) => (
            <VerticalTimelineElement
              key={idx}
              className="vertical-timeline-element--work"
              date={year}
              icon={React.createElement(icons[idx] ?? FaLaptopCode)}
              {...getElementStyles(isDark)}
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
