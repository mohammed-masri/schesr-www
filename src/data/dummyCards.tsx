const cards = [
    {
      id: 'ms-progression',
      title: 'MS PROGRESSION RATE',
      content: (
        <div className="space-y-4">
          <div className="relative h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg transition-all duration-300"></div>
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-fade-in">
              45% 0.1s
            </div>
            <div className="absolute bottom-4 right-4 text-sm text-gray-600 animate-fade-in">85% HMI</div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 hover:scale-110">
                0.6
              </div>
            </div>
          </div>
        
        </div>
      )
    },
    {
      id: 'intracranial-pressure',
      title: 'INTRACRANIAL PRESSURE',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold animate-fade-in">20 Hg</span>
            <span className="text-lg text-gray-600 animate-fade-in">5 Hg</span>
          </div>
          <div className="h-16 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg relative overflow-hidden">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-[slide-in-right_2s_ease-in-out_infinite]"></div>
          </div>
         
        </div>
      )
    },
    {
      id: 'neurotrophins',
      title: 'NEUROTROPHINS LEVELS',
      content: (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600 mb-2">NT-3</div>
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-200">
              <div className="w-12 h-8 bg-blue-300 rounded transition-all duration-500 hover:bg-blue-400"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className="transition-colors hover:text-blue-600">BDNF</span>
              <span className="transition-colors hover:text-blue-600">GDNF</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="transition-colors hover:text-blue-600">NGF</span>
              <span className="transition-colors hover:text-blue-600">ARTN</span>
            </div>
            <div className="text-center text-xs text-gray-500 mt-1 transition-colors hover:text-blue-600">CNTF</div>
          </div>
         
        </div>
      )
    },
    {
      id: 'ai-analyzer',
      title: 'AI ANALYZER',
      content: (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600 mb-2">NT-3</div>
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-200">
              <div className="w-12 h-8 bg-blue-300 rounded transition-all duration-500 hover:bg-blue-400"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className="transition-colors hover:text-blue-600">BDNF</span>
              <span className="transition-colors hover:text-blue-600">GDNF</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="transition-colors hover:text-blue-600">NGF</span>
              <span className="transition-colors hover:text-blue-600">ARTN</span>
            </div>
            <div className="text-center text-xs text-gray-500 mt-1 transition-colors hover:text-blue-600">CNTF</div>
          </div>
         
        </div>
      )
    },
    // {
    //   id: 'ai-analyzer',
    //   title: 'AI ANALYZER',
    //   content: (
    //     <div className="space-y-4 text-center">
    //         <div className="w-20 h-20 mx-auto  flex items-center justify-center text-black text-2xl font-bold ">
    //           93%
    //         </div>
    //         <p className="text-sm text-gray-600 mt-2 ">Analysis Complete</p>
         
    //     </div>
    //   )
    // }
  ];

  export default cards;