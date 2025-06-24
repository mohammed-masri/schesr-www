// CardsHomeScreen.tsx
import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AnimatePresence,
  motion,
  useDragControls,
} from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Helper types                                                        */
/* ------------------------------------------------------------------ */
type CardPos = { top: number; left: number; width: number; height: number };

/* ------------------------------------------------------------------ */
/* Grid-item component (draggable)                                     */
/* ------------------------------------------------------------------ */
type DraggableCardProps = {
  card: any;
  index: number;
  expandedCard: string | null;
  handleCardClick: (id: string) => void;
};

const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  index,
  expandedCard,
  handleCardClick,
}) => {
  const controls = useDragControls();
  const isExpanded = expandedCard === card.id;

  return (
    <motion.div
      layoutId={`card-${card.id}`}          /* shared layout key */
      drag
      dragControls={controls}
      dragListener={!isExpanded}            /* disable when enlarged */
      dragElastic={0.2}
      style={{
        animationDelay: `${index * 0.1}s`,
        cursor: 'pointer',
      }}
      onClick={() => !isExpanded && handleCardClick(card.id)}
    >
      <Card style={{ transition: 'box-shadow .2s' }}>
        <CardHeader style={{ paddingBottom: '0.5rem' }}>
          <CardTitle
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            {card.title}
          </CardTitle>
        </CardHeader>
        <CardContent>{card.content}</CardContent>
      </Card>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Parent component                                                    */
/* ------------------------------------------------------------------ */
export const CardsHomeScreen: React.FC<{
  cards: any[];
  expandedCard: string | null;
  handleCardClick: (id: string) => void;
  handleCloseCard: (id: string) => void;
  cardPositions: Record<string, CardPos>;  // kept for API compatibility
}> = ({
  cards,
  expandedCard,
  handleCardClick,
  handleCloseCard,
}) => {
  const activeCard = cards.find((c) => c.id === expandedCard);
  const placementRef = useRef<HTMLDivElement>(null); // bounds for drag

  return (
    <>
      {/* -------------------- cards grid ------------------------ */}
      <div style={{ gridColumn: 'span 12 / span 12' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {cards.map((card, index) => (
            <DraggableCard
              key={card.id}
              card={card}
              index={index}
              expandedCard={expandedCard}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* ---------------- modal / overlay ----------------------- */}
      <AnimatePresence>
        {activeCard && (
          <>
            {/* dimmed backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'black',
                zIndex: 40,
              }}
              onClick={() => handleCloseCard(activeCard.id)}
            />

            {/* placement layer (full viewport) */}
            <motion.div
              key="placement"
              ref={placementRef}
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
              }}
            >
              {/* enlarged, draggable card */}
              <motion.div
                layoutId={`card-${activeCard.id}`}
                drag
                dragConstraints={placementRef}
                dragElastic={0.3}
                whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                style={{
                  width: '90vw',
                  maxWidth: '32rem', // ≈512 px
                  cursor: 'grab',
                }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.15 }}
                exit={{ scale: 1 }}
              >
                <Card style={{ position: 'relative' }}>
                  <CardHeader style={{ paddingBottom: '0.5rem' }}>
                    <CardTitle
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#374151',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {activeCard.title}
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ transition: 'transform .3s' }}
                        onClick={() => handleCloseCard(activeCard.id)}
                      >
                        ✕
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{activeCard.content}</CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
