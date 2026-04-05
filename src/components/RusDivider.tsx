const RusDivider = () => {
  return (
    <div className="flex items-center w-full my-4" style={{ gap: 0 }}>
      <div className="flex-1 flex flex-col gap-[3px]">
        <div className="w-full h-[1px]" style={{ background: "linear-gradient(to right, transparent, #c9956c)" }} />
        <div className="w-full h-[1px]" style={{ background: "linear-gradient(to right, transparent, #c9956c)" }} />
      </div>

      <div className="flex-shrink-0 mx-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 100 120" fill="none">
          {/* Герб РФ — двуглавый орёл */}
          <g fill="#c9956c">
            {/* Щит */}
            <ellipse cx="50" cy="62" rx="18" ry="22" fill="#8b1a1a" stroke="#c9956c" strokeWidth="2"/>
            {/* Всадник (упрощённо) */}
            <ellipse cx="50" cy="58" rx="6" ry="8" fill="#c9956c" opacity="0.9"/>

            {/* Тело орла */}
            <ellipse cx="50" cy="68" rx="20" ry="24" fill="#c9956c"/>

            {/* Левое крыло */}
            <path d="M30 60 C10 40, 5 25, 15 15 C20 25, 25 40, 30 55 Z" fill="#c9956c"/>
            <path d="M30 60 C12 50, 8 35, 18 22 C22 32, 27 47, 30 55 Z" fill="#b8844f"/>

            {/* Правое крыло */}
            <path d="M70 60 C90 40, 95 25, 85 15 C80 25, 75 40, 70 55 Z" fill="#c9956c"/>
            <path d="M70 60 C88 50, 92 35, 82 22 C78 32, 73 47, 70 55 Z" fill="#b8844f"/>

            {/* Левая голова */}
            <circle cx="37" cy="28" r="10" fill="#c9956c"/>
            <path d="M27 22 L20 16 L28 18 Z" fill="#c9956c"/>
            <path d="M27 24 L19 20 L27 20 Z" fill="#c9956c"/>
            <circle cx="34" cy="25" r="2" fill="#1a1a1a"/>

            {/* Правая голова */}
            <circle cx="63" cy="28" r="10" fill="#c9956c"/>
            <path d="M73 22 L80 16 L72 18 Z" fill="#c9956c"/>
            <path d="M73 24 L81 20 L73 20 Z" fill="#c9956c"/>
            <circle cx="66" cy="25" r="2" fill="#1a1a1a"/>

            {/* Короны */}
            <path d="M30 19 L33 12 L37 17 L41 10 L44 17 L47 12 L44 20 Z" fill="#c9956c"/>
            <path d="M53 19 L56 12 L60 17 L64 10 L67 17 L70 12 L70 20 Z" fill="#c9956c"/>

            {/* Лапы */}
            <path d="M36 88 L30 96 M36 88 L34 97 M36 88 L38 97" stroke="#c9956c" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M64 88 L58 96 M64 88 L62 97 M64 88 L70 97" stroke="#c9956c" strokeWidth="2.5" strokeLinecap="round"/>

            {/* Скипетр и держава */}
            <line x1="42" y1="48" x2="42" y2="72" stroke="#c9956c" strokeWidth="2"/>
            <circle cx="42" cy="46" r="3" fill="#c9956c"/>
            <circle cx="58" cy="50" r="6" fill="none" stroke="#c9956c" strokeWidth="1.5"/>
            <line x1="55" y1="47" x2="61" y2="53" stroke="#c9956c" strokeWidth="1.5"/>
          </g>
        </svg>
      </div>

      <div className="flex-1 flex flex-col gap-[3px]">
        <div className="w-full h-[1px]" style={{ background: "linear-gradient(to left, transparent, #c9956c)" }} />
        <div className="w-full h-[1px]" style={{ background: "linear-gradient(to left, transparent, #c9956c)" }} />
      </div>
    </div>
  );
};

export default RusDivider;
