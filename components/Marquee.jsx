'use client';

export default function Marquee({ reverse = false, textList = [] }) {
  const defaultItems = [
    'CRICKET', 'FOOTBALL', 'HOCKEY', 'BASKETBALL', 'TENNIS', 'VOLLEYBALL', 'GOLF', 'BADMINTON'
  ];

  const items = textList.length > 0 ? textList : defaultItems;

  return (
    <div className="relative w-[102%] -ml-[1%] my-12 overflow-hidden bg-[#1d2924] text-[#f7f6f0] py-4 border-y border-[#1d2924] transform -rotate-1 shadow-md select-none">
      <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee-track'}>
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 px-6 whitespace-nowrap">
            <span className="font-display text-xl sm:text-2xl font-black tracking-wider uppercase">
              {item}
            </span>
            <span className="text-[#e3ff76] text-2xl font-mono leading-none">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
