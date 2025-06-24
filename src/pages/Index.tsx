
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, Brain, Activity, Zap, Target, User, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BacgroundLay from '@/components/ui2/Overlay';
import { CardsHomeScreen } from '@/components/ui2/CardHomeScreen';

const Index = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [cardPositions, setCardPositions] = useState<{ [key: string]: DOMRect }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


  useEffect(() => {
    // Store original positions of cards
    const positions: { [key: string]: DOMRect } = {};
    Object.keys(cardRefs.current).forEach(cardId => {
      const element = cardRefs.current[cardId];
      if (element) {
        positions[cardId] = element.getBoundingClientRect();
      }
    });
    setCardPositions(positions);
  }, []);

  const handleCardClick = (cardId: string) => {
    if (expandedCard === cardId) {
      // setExpandedCard(null);
    } else {
      // Store current position before expanding
      // const element = cardRefs.current[cardId];
      // if (element) {
      //   const rect = element.getBoundingClientRect();
      //   setCardPositions(prev => ({ ...prev, [cardId]: rect }));
      // }
      setExpandedCard(cardId);
    }
  };
  const hanldeCloseCard = (cardId: string) => {
    console.log('hanldeCloseCard', cardId);
    setExpandedCard(null);
  };

  console.log('cardPositions', cardPositions);

  // const getCardStyle = (cardId: string) => {
  //   const originalPosition = cardPositions[cardId];

  //   if (expandedCard === cardId) {
  //     // Calculate the transform needed to center the card
  //     const viewportCenterX = window.innerWidth / 2;
  //     const viewportCenterY = window.innerHeight / 2;

  //     if (originalPosition) {
  //       const originalCenterX = originalPosition.left + originalPosition.width / 2;
  //       const originalCenterY = originalPosition.top + originalPosition.height / 2;

  //       const translateX = viewportCenterX - originalCenterX;
  //       const translateY = viewportCenterY - originalCenterY;

  //       return {
  //         position: 'fixed' as const,
  //         top: originalPosition.top,
  //         left: originalPosition.left,
  //         width: originalPosition.width,
  //         height: originalPosition.height,
  //         transform: `translate(${translateX}px, ${translateY}px) scale(1.5)`,
  //         zIndex: 1000,
  //         transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  //         transformOrigin: 'center center',
  //       };
  //     }

  //     return {
  //       position: 'fixed' as const,
  //       top: '50%',
  //       left: '50%',
  //       transform: 'translate(-50%, -50%) scale(1.5)',
  //       width: '400px',
  //       height: 'auto',
  //       maxHeight: '80vh',
  //       zIndex: 1000,
  //       transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  //       transformOrigin: 'center center',
  //     };
  //   }

  //   return {
  //     transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  //     transform: 'scale(1)',
  //     zIndex: expandedCard && expandedCard !== cardId ? 1 : 'auto',
  //     opacity: expandedCard && expandedCard !== cardId ? 0.3 : 1,
  //   };
  // };



  const doctors = [
    {
      name: 'Dr. Theresa Webb',
      specialty: 'NEURORADIOLOGIST',
      status: 'Available',
      avatar: '/lovable-uploads/6483faab-1b95-484f-bf45-30a8ff4b1434.png'
    },
    {
      name: 'Dr. Devon Lane',
      specialty: 'RADIOLOGIST',
      status: 'On operation',
      avatar: '/lovable-uploads/6483faab-1b95-484f-bf45-30a8ff4b1434.png'
    },
    {
      name: 'Dr. Kathryn Murphy',
      specialty: 'NEUROLOGY',
      status: 'Available',
      avatar: '/lovable-uploads/6483faab-1b95-484f-bf45-30a8ff4b1434.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center transition-transform duration-300 hover:rotate-12">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">HOSPITY</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 transition-all duration-300 hover:border-blue-800">BODY SYSTEMS</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">LABS</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">MEDICAL HISTORY</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">RECOMMENDATIONS</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8 transition-transform duration-300 hover:scale-110">
                <AvatarImage src="/lovable-uploads/6483faab-1b95-484f-bf45-30a8ff4b1434.png" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Robert Smith</p>
                <p className="text-xs text-gray-500">THERAPIST</p>
              </div>
            </div>
            <Bell className="w-5 h-5 text-gray-600 transition-all duration-300 hover:text-blue-600 hover:scale-110 cursor-pointer" />
            <Menu className="w-5 h-5 text-gray-600 transition-all duration-300 hover:text-blue-600 hover:scale-110 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">NERVOUS SYSTEM ANALYSIS</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300" />
              <Input
                placeholder="Search"
                className="pl-10 w-64 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Brain Visualization */}
          <div className="col-span-12 lg:col-span-5 animate-scale-in">
            <Card className="h-96 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6 h-full flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:scale-105">
                    <Brain className="w-32 h-32 text-blue-600 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-semibold animate-fade-in">
                    100% SCANNED
                  </div>
                </div>
                {/* Side Icons */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 animate-fade-in">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-600 group animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <Zap className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-600 group animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <Target className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 mt-4 animate-slide-up">
              <div className="w-20 h-20 bg-blue-100 rounded-lg border-2 border-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-blue-200">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-green-200">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <Button variant="ghost" className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 transition-all duration-300 hover:border-blue-600 hover:scale-105">
                <span className="text-sm">Add more</span>
              </Button>
            </div>
          </div>

          {/* Analysis Cards */}
          <CardsHomeScreen
          // initialCards={cards}
            cardPositions={cardPositions}
            // cardRefs={cardRefs}
            // cards={cards}
            expandedCard={expandedCard}
            handleCardClick={handleCardClick}
            // handleCardClick={()=> {}}
            handleCloseCard={hanldeCloseCard}
          />
          {/* <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  ref={(el) => (cardRefs.current[card.id] = el)}
                  className="cursor-pointer hover:shadow-lg animate-scale-in"
                  style={{
                    ...getCardStyle(card.id),
                    animationDelay: `${index * 0.1}s`
                  }}
                  onClick={() => handleCardClick(card.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                      {card.title}
                      {expandedCard === card.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="transition-all duration-300 hover:scale-110 hover:bg-red-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(card.id);
                          }}
                        >
                          ✕
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {card.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}

          {/* Recommended Doctors */}
          <div className="col-span-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">RECOMMENDED DOCTORS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctors.map((doctor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                      <div className="flex items-center space-x-4">
                        <Avatar className="transition-transform duration-300 hover:scale-110">
                          <AvatarImage src={doctor.avatar} />
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold transition-colors duration-300 hover:text-blue-600">{doctor.name}</p>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full animate-pulse ${doctor.status === 'Available' ? 'bg-green-500' : 'bg-blue-500'
                            }`}></div>
                          <span className="text-sm text-gray-600">{doctor.status}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 transition-all duration-300 hover:text-blue-600 hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save File Button */}
        <div className="fixed bottom-6 left-6 animate-slide-up" style={{ animationDelay: '1s' }}>
          <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <span className="mr-2">💾</span>
            Save File
          </Button>
        </div>
      </main>

      {/* Overlay for expanded cards */}
      {/* {expandedCard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 transition-opacity duration-600"
          onClick={() => handleCardClick(expandedCard)}
        />
      )} */}

      <BacgroundLay expandedCard={expandedCard} handleCardClick={handleCardClick} />
    </div>
  );
};

export default Index;
