export const getElementColor = (element: string) => {
    const colors: { [key: string]: string } = {
      ice: 'text-blue-400',
      fire: 'text-red-400',
      wind: 'text-green-400',
      lightning: 'text-purple-400',
      physical: 'text-gray-400',
      quantum: 'text-indigo-400',
      imaginary: 'text-yellow-400'
    };

    return colors[element] || 'text-slate-400';
};
