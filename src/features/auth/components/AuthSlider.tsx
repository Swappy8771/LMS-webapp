// src/components/AuthSlider.tsx
import { useEffect, useState } from 'react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
    text: 'A place to connect your team.\nCommunicate faster and easier.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581090700227-1e8c1a4cfb66?auto=format&fit=crop&w=1000&q=80',
    text: 'Collaborate seamlessly across departments.',
  },
  {
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1000&q=80',
    text: 'Empower your learning with intelligent tools.',
  },
];

const AuthSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full relative">
      <img
        src={slides[current].image}
        alt="Slide"
        className="object-cover w-full h-full transition duration-500"
      />
      <div className="absolute bottom-10 left-10 bg-black bg-opacity-50 text-white p-4 rounded-lg max-w-sm">
        <p className="text-lg whitespace-pre-line">{slides[current].text}</p>
      </div>
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${i === current ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthSlider;
