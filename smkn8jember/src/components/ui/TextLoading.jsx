import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TextLoading = ({ 
    size = 'lg',
    text = 'ESKALABER',
    variant = 'flipFlow'
}) => {
    const charsRef = useRef([]);
    const containerRef = useRef(null);
    const dotsRef = useRef([]);

    const sizeMap = {
        sm: 'text-2xl',
        md: 'text-4xl',
        lg: 'text-4xl md:text-6xl',
        xl: 'text-8xl'
    };

    useEffect(() => {
        gsap.killTweensOf(charsRef.current);

        charsRef.current.forEach((char, i) => {
            if (!char) return;

            gsap.to(char, {
                rotationY: 360,
                y: [0, -10, 0],
                duration: 1.2,
                repeat: -1,
                delay: i * 0.1,
                ease: 'back.inOut'
            });
        });

        return () => {
            gsap.killTweensOf(charsRef.current);
        };
    }, []);

    useEffect(() => {
        dotsRef.current.forEach((dot, i) => {
            gsap.to(dot, {
                opacity: [0.3, 1, 0.3],
                duration: 1.2,
                repeat: -1,
                delay: i * 0.2,
                ease: 'sine.inOut'
            });
        });

        return () => {
            gsap.killTweensOf(dotsRef.current);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className={`${sizeMap[size]} font-black tracking-widest flex flex-col items-center justify-center min-h-screen`}
            style={{ 
                perspective: '1000px',
                letterSpacing: '0.05em'
            }}
        >
            <div className="text-zinc-600">
                {text.split('').map((char, i) => (
                    <span
                        key={i}
                        ref={el => charsRef.current[i] = el}
                        style={{
                            display: 'inline-block',
                            willChange: 'transform, opacity',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '6px' }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        ref={el => dotsRef.current[i] = el}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.5)',
                            opacity: 0.5
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TextLoading;
