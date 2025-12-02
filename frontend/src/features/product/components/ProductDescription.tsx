import { useState } from 'react';

export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className='space-y-2'>
      <p
        className={`text-slate-600 leading-relaxed ${
          showMore ? '' : `line-clamp-3`
        }`}
      >
        {description}
      </p>
      {description.length > 150 && (
        <button
          onClick={() => setShowMore((v) => !v)}
          className='text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors'
        >
          {showMore ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
