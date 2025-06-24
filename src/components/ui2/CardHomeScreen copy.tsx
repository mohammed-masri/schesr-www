// CardsHomeScreen.tsx
import React, { useCallback, useEffect, useRef } from 'react';
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
            onClick={() => !isExpanded && handleCardClick(card.id)}
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

// ---------------------------------------------------------------------
// Parent component
// ---------------------------------------------------------------------
export const CardsHomeScreen: React.FC<{
    cards: any[];
    expandedCard: string | null;
    handleCardClick: (id: string) => void;
    handleCloseCard: (id: string) => void;
    cardPositions: Record<string, CardPos>;        // kept for API compatibility
}> = ({
    cards : _cards,
    expandedCard,
    handleCardClick,
    handleCloseCard,
}) => {
        const activeCard = _cards.find((c) => c.id === expandedCard);


        const ViewCards = useCallback ( () => {
            const [cards, setCards] = useState(_cards);
            const [draggedIndex, setDraggedIndex] = useState(null);
            const cardRefs = useRef([]);

            useEffect(() => {
                cardRefs.current = cardRefs.current.slice(0, cards.length);
            }, [cards.length]);

            const handleDragStart = (index) => {
                setDraggedIndex(index);
            };

            const handleDragEnd = () => {
                const draggedRef = cardRefs.current[draggedIndex];
                const draggedRect = draggedRef?.getBoundingClientRect();
                let swapped = false;

                cards.forEach((card, i) => {
                    if (i === draggedIndex) return;
                    const targetRect = cardRefs.current[i]?.getBoundingClientRect();

                    if (
                        draggedRect &&
                        targetRect &&
                        isOverlapping(draggedRect, targetRect)
                    ) {
                        // Swap the cards
                        const updatedCards = [...cards];
                        [updatedCards[draggedIndex], updatedCards[i]] = [updatedCards[i], updatedCards[draggedIndex]];
                        setCards(updatedCards);
                        swapped = true;
                    }
                });

                setDraggedIndex(null);
                // If not swapped, framer-motion will animate it back to its place
            };

            const isOverlapping = (r1, r2) => {
                return !(
                    r1.right < r2.left ||
                    r1.left > r2.right ||
                    r1.bottom < r2.top ||
                    r1.top > r2.bottom
                );
            };

            return (
                <div className="col-span-12 lg:col-span-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                drag
                                layout // enables auto-positioning animation
                                dragSnapToOrigin // option to help snap to original position (optional)
                                onDragStart={() => handleDragStart(index)}
                                onDragEnd={handleDragEnd}
                                ref={(el) => (cardRefs.current[index] = el)}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <DraggableCard
                                    card={card}
                                    index={index}
                                    handleCardClick={handleCardClick}

                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            );
        },[]);

        return (
            <>
                {/* grid of cards -------------------------------------------------- */}
                <ViewCards />
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
