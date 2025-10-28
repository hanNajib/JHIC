import { useCallback, useRef, useState, useEffect } from "react";
import { gsap } from 'gsap';

const TextLoading = ({
  size = 'xl',
  text = 'LOADING',
  isVisible = true,
  onAnimationComplete,
  className = "",
  fullscreen = true
}) => {
  const charsRef = useRef([]);
  const dotsRef = useRef([]);
  const containerRef = useRef(null);
  const bgCircleRef = useRef(null);
  const timelineRef = useRef(null);
  const loopTweens = useRef([]);
  const hasPlayedExit = useRef(false);
  const isAnimatingRef = useRef(false);
  const isMountedRef = useRef(true);

  const sizeMap = {
    sm: 'text-lg md:text-xl',
    base: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-5xl'
  };

  const stopLoops = useCallback(() => {
    loopTweens.current.forEach(tween => {
      if (tween && tween.kill) tween.kill();
    });
    loopTweens.current = [];
  }, []);

  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    stopLoops();
    
    const allElements = [
      ...charsRef.current.filter(Boolean),
      ...dotsRef.current.filter(Boolean),
      containerRef.current,
      bgCircleRef.current
    ].filter(Boolean);
    
    if (allElements.length > 0) {
      gsap.killTweensOf(allElements);
    }
  }, [stopLoops]);

  const startAnimation = useCallback(() => {
    if (!isMountedRef.current) return;
    
    // Force cleanup before starting
    cleanup();
    
    isAnimatingRef.current = true;
    hasPlayedExit.current = false;

    const chars = charsRef.current.filter(Boolean);
    const dots = dotsRef.current.filter(Boolean);

    if (chars.length === 0 || !containerRef.current) {
      console.warn('Elements not ready for animation');
      return;
    }

    // Reset all elements
    gsap.set(containerRef.current, { 
      display: "flex", 
      opacity: 1, 
      visibility: "visible",
      scale: 1
    });
    
    gsap.set([chars, dots], { 
      clearProps: "all" 
    });
    
    if (bgCircleRef.current) {
      gsap.set(bgCircleRef.current, { 
        clearProps: "all" 
      });
    }

    const tl = gsap.timeline({ 
      onComplete: () => {
        if (isMountedRef.current) {
          timelineRef.current = tl;
        }
      }
    });

    // Background circle entrance
    if (bgCircleRef.current) {
      tl.fromTo(bgCircleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.1, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Characters entrance
    tl.fromTo(chars,
      { opacity: 0, y: 20, rotationY: 0 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' },
      "-=0.3"
    );

    // Dots entrance
    tl.fromTo(dots,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.4, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.7)' },
      "-=0.1"
    );

    // Add looping animations
    tl.add(() => {
      if (!isMountedRef.current) return;

      // Character loop animations
      chars.forEach((char, i) => {
        if (!char) return;
        const loopTween = gsap.to(char, {
          rotationY: 360,
          y: [0, -6, 0],
          duration: 0.8,
          repeat: -1,
          delay: i * 0.06,
          ease: 'power2.inOut',
          paused: false
        });
        loopTweens.current.push(loopTween);
      });

      // Dot loop animations
      dots.forEach((dot, i) => {
        if (!dot) return;
        const loopTween = gsap.to(dot, {
          opacity: [0.4, 0.9, 0.4],
          scale: [1, 1.2, 1],
          duration: 0.8,
          repeat: -1,
          delay: i * 0.1,
          ease: 'power2.inOut',
          paused: false
        });
        loopTweens.current.push(loopTween);
      });

      // Background rotation
      if (bgCircleRef.current) {
        const bgTween = gsap.to(bgCircleRef.current, { 
          rotation: 360, 
          duration: 3, 
          repeat: -1, 
          ease: 'none',
          paused: false
        });
        loopTweens.current.push(bgTween);
      }
    });

    timelineRef.current = tl;
  }, [cleanup]);

  const exitAnimation = useCallback(() => {
    if (hasPlayedExit.current || !isMountedRef.current) return;
    
    hasPlayedExit.current = true;
    isAnimatingRef.current = false;

    stopLoops();
    
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    const chars = charsRef.current.filter(Boolean);
    const dots = dotsRef.current.filter(Boolean);

    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (isMountedRef.current && containerRef.current) {
          gsap.set(containerRef.current, { display: 'none' });
        }
        onAnimationComplete?.();
      }
    });

    if (bgCircleRef.current) {
      tl.to(bgCircleRef.current, {
        scale: 1.3,
        opacity: 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    tl.to(chars, {
      y: -50,
      opacity: 0,
      scale: 0.8,
      rotationY: 180,
      duration: 0.7,
      stagger: { amount: 0.2, from: "center" },
      ease: 'back.in(1.7)'
    }, '-=0.2');

    tl.to(dots, {
      y: [0, -40, -60],
      x: (i) => (i - 1) * 40,
      opacity: [0.9, 0.5, 0],
      scale: [1.2, 1.5, 0],
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.in'
    }, '-=0.6');

    if (bgCircleRef.current) {
      tl.to(bgCircleRef.current, {
        scale: 5,
        opacity: 0,
        rotation: 180,
        duration: 0.8,
        ease: 'power3.in'
      }, '-=0.5');
    }

    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: 'power2.inOut'
    }, '-=0.3');

    timelineRef.current = tl;
  }, [onAnimationComplete, stopLoops]);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          startAnimation();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else if (!isVisible && isAnimatingRef.current) {
      exitAnimation();
    }
  }, [isVisible, startAnimation, exitAnimation]);

  return (
    <div
      ref={containerRef}
      className={`${sizeMap[size]} font-bold tracking-wide flex-col items-center justify-center text-gray-700 select-none relative ${fullscreen ? "min-h-screen" : ""} ${className}`}
      style={{ perspective: '1000px', opacity: 0, visibility: 'hidden', display: 'none' }}
    >
      <div 
        ref={bgCircleRef} 
        className="absolute w-64 h-64 rounded-full border-4 border-gray-300 pointer-events-none" 
      />
      <div className="relative z-10">
        {text.split('').map((char, i) => (
          <span 
            key={`${char}-${i}`}
            ref={el => (charsRef.current[i] = el)} 
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <div className="flex gap-1 mt-4 relative z-10">
        {[...Array(3)].map((_, i) => (
          <div 
            key={`dot-${i}`}
            ref={el => (dotsRef.current[i] = el)} 
            className="w-1.5 h-1.5 rounded-full bg-gray-500" 
          />
        ))}
      </div>
    </div>
  );
};

export const LoadingTransition = ({
  loading,
  children,
  text = "LOADING",
  size = "xl",
  fullscreen = true
}) => {
  const [showContent, setShowContent] = useState(!loading);
  const isInitialRef = useRef(true);

  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false;
      if (!loading) {
        setShowContent(true);
      }
      return;
    }

    if (loading) {
      setShowContent(false);
    }
  }, [loading]);

  const handleDone = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <>
      <TextLoading
        text={text}
        size={size}
        isVisible={loading}
        onAnimationComplete={handleDone}
        fullscreen={fullscreen}
      />
      {showContent && <div className="min-h-screen">{children}</div>}
    </>
  );
};

export default TextLoading;