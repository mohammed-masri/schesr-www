// CardsHomeScreen.tsx
import React, { useEffect, useRef } from 'react';
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

import { Reorder } from "framer-motion";
import { useState } from "react";
import cards from '@/data/dummyCards';


type CardPos = { top: number; left: number; width: number; height: number };

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
            layoutId={`card-${card.id}`}                  /* ⭐ shared layout key */
            // drag                                        /* still draggable   */
            // dragControls={controls}
            // dragListener={!isExpanded}                  /* disable drag while enlarged */
            // dragElastic={0.2}
            className="cursor-pointer "
            style={{ animationDelay: `${index * 0.1}s` }}
            onDoubleClick={() => !isExpanded && handleCardClick(card.id)}
        >
            <Card className="hover:shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                        {card.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>{card.content}</CardContent>
            </Card>
        </motion.div>
    );
};

                                    //   component import
type ViewCardsProps = {
  cards: any[];                                   // original list comes in as a prop
  expandedCard: string | null;
  handleCardClick: (id: string) => void;
};

const ViewCards: React.FC<ViewCardsProps> = ({
  expandedCard,
  handleCardClick,
}) => {
  /* ------------------------------------------------------------------ */
  /* 1. local copy of the list lives in state -- call it items          */
  /* ------------------------------------------------------------------ */
  const [items, setItems] = useState(cards);

  /* ------------------------------------------------------------------ */
  /* 2. drag bookkeeping                                                */
  /* ------------------------------------------------------------------ */
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  /* keep ref array length in sync with current item count */
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);
  }, [items.length]);

  const handleDragStart = (index: number) => setDraggedIndex(index);
// ------------------------------------------------------------
// 1. Helper: pure array swap (keeps state immutable)
// ------------------------------------------------------------
const swap = <T,>(arr: T[], i: number, j: number): T[] => {
  const copy = [...arr];
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
};

// ------------------------------------------------------------
// 2. Replace handleDragEnd with this version
// ------------------------------------------------------------
const handleDragEnd = () => {
  if (draggedIndex === null) return;

  const draggedRef = cardRefs.current[draggedIndex];
  const draggedRect = draggedRef?.getBoundingClientRect();

  let hoverIndex: number | null = null;

  items.forEach((_, i) => {
    if (i === draggedIndex) return;
    const targetRect = cardRefs.current[i]?.getBoundingClientRect();
    if (draggedRect && targetRect && isOverlapping(draggedRect, targetRect)) {
      hoverIndex = i; // store the first (or last) overlap you find
    }
  });

  if (hoverIndex !== null) {
    // 2a. swap list items
    setItems(prev => swap(prev, draggedIndex, hoverIndex));

    // 2b. keep the ref array in the same order
    [cardRefs.current[draggedIndex], cardRefs.current[hoverIndex]] = [
      cardRefs.current[hoverIndex],
      cardRefs.current[draggedIndex],
    ];
  }

  setDraggedIndex(null);
};
  const isOverlapping = (r1: DOMRect, r2: DOMRect) =>
    !(
      r1.right < r2.left ||
      r1.left > r2.right ||
      r1.bottom < r2.top ||
      r1.top > r2.bottom
    );

  /* ------------------------------------------------------------------ */
  /* UI                                                                  */
  /* ------------------------------------------------------------------ */
  return (
    <div className="col-span-12 lg:col-span-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((card, index) => (
          <motion.div
            key={card.id}
            drag
            dragSnapToOrigin
            onDragStart={() => handleDragStart(index)}
            onDragEnd={handleDragEnd}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <DraggableCard
              card={card}
              index={index}
              expandedCard={expandedCard}
              handleCardClick={handleCardClick}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ViewCards;


// ---------------------------------------------------------------------
// Parent component
// ---------------------------------------------------------------------
export const CardsHomeScreen: React.FC<{
    expandedCard: string | null;
    handleCardClick: (id: string) => void;
    handleCloseCard: (id: string) => void;
    cardPositions: Record<string, CardPos>;        // kept for API compatibility
}> = ({
    expandedCard,
    handleCardClick,
    handleCloseCard,
}) => {
        const activeCard = cards.find((c) => c.id === expandedCard);




        return (
            <>
                {/* grid of cards -------------------------------------------------- */}
                <ViewCards
                    expandedCard={expandedCard}
                    handleCardClick={handleCardClick}

                />
                {/* <div className="col-span-12 lg:col-span-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div> */}

                {/* overlay / enlarged card --------------------------------------- */}
                <AnimatePresence>
                    {activeCard && (
                        <>
                            {/* enlarged card */}
                            <motion.div
                                drag
                                dragElastic={0.5}
                                dragConstraints={{ top: -225, right: 325, bottom: 225, left: -325 }}

                                whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                                initial={{ scale: 1, opacity: 0 }}
                                animate={{ scale: 1.05, opacity: 1 }}
                                exit={{ scale: 1, opacity: 0 }}
                                key="placement"
                                style={{
                                    position: 'fixed',
                                    inset: 0,                    // top:0; right:0; bottom:0; left:0
                                    display: 'flex',
                                    alignItems: 'center',        // vertical centring
                                    justifyContent: 'center',    // horizontal centring
                                    zIndex: 50,
                                }}
                            >
                                {/* the actual card that scales */}
                                <motion.div
                                    layoutId={`card-${activeCard.id}`}
                                    style={{
                                        width: '90vw',
                                        maxWidth: '32rem',

                                    }}

                                >
                                    <Card className="relative">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                                                {activeCard.title}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="transition-all duration-300 hover:scale-110 hover:bg-red-100"
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
