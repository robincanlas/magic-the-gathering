type ManaSymbolMap = Record<string, string>;

const baseManaSymbols: ManaSymbolMap = {
  W: 'sw',
  U: 'su',
  B: 'sb',
  R: 'sr',
  G: 'sg',
  C: 'sc',
  T: 'st',
  Q: 'sq',
  X: 'sx',
};

// Extend with numbers 1-20
for (let i = 0; i <= 20; i++) {
  baseManaSymbols[i.toString()] = `s${i}`;
}

// Hybrid and phyrexian fallback generator
const getCustomManaIcon = (symbol: string): string | null => {
  const safeSymbol = symbol.toLowerCase().replace(/\//g, '');
  return `s${safeSymbol}`;
};

export type SymbolSize = 'small' | 'medium' | 'large';

const useReplaceManaSymbols = () => {
  const replaceManaSymbols = (text: string, size: SymbolSize = 'small'): JSX.Element => {
    const parts = text.split(/(\{[^}]+\})/g); // Match anything between { }

    return (
      <>
        {parts.map((part, index) => {
          const match = part.match(/^\{(.+)\}$/);
          if (match) {
            const symbol = match[1];

            const lowerSymbol = symbol.toUpperCase();

            const knownIcon = baseManaSymbols[lowerSymbol];
            const iconSrc = knownIcon || getCustomManaIcon(symbol);

            if (iconSrc) {
              return (
                <span 
                  key={index}
                  className={`mana ${size} ${iconSrc}`}
                />
              );
            }
          }

          // Not a symbol, just return text
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  }

  return replaceManaSymbols
}

export default useReplaceManaSymbols;