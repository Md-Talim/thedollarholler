import type { Action } from 'svelte/action';
import { spring } from 'svelte/motion';

interface SwipeParams {
  triggerReset?: boolean;
}

export const swipe: Action<HTMLElement, SwipeParams> = (node, swipeParams) => {
  let x: number, startingX: number;
  let triggerReset = swipeParams?.triggerReset || false;

  let elementWidth = node.clientWidth;
  const coordinates = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.2,
      damping: 0.4
    }
  );

  coordinates.subscribe(($coord) => {
    node.style.transform = `translate3d(${$coord.x}px, 0, 0)`;
  });

  const resetCard = () => {
    coordinates.update(() => {
      return {
        x: 0,
        y: 0
      };
    });

    triggerReset = false;
  };

  const outOfView = () => {
    node.dispatchEvent(new CustomEvent('outOfView'));
  };

  const handleMouseDown = (event: MouseEvent) => {
    x = event.clientX;
    startingX = event.clientX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (event: TouchEvent) => {
    x = event.touches[0].clientX;
    startingX = event.touches[0].clientX;
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseMove = (event: MouseEvent) => {
    // delta X = difference between where the pointer started vs where it is currently
    const dx = event.clientX - x;
    x = event.clientX;

    setXCoordinates(dx);
  };

  const handleTouchMove = (event: TouchEvent) => {
    // delta X = difference between where the pointer started vs where it is currently
    const dx = event.touches[0].clientX - x;
    x = event.touches[0].clientX;

    setXCoordinates(dx);
  };

  const setXCoordinates = (dx: number) => {
    coordinates.update(($coord) => {
      return {
        x: $coord.x + dx,
        y: 0
      };
    });
  };

  const updateXCoordinate = (x: number) => {
    coordinates.update(() => {
      return {
        x,
        y: 0
      };
    });
  };

  const moveCardOver = (endingX: number) => {
    const leftSnapX = elementWidth * -0.95;
    const rightSnapX = 0;
    const movement = startingX - endingX;

    if (movement > 20) {
      x = leftSnapX;
      outOfView();
    } else {
      x = rightSnapX;
    }

    updateXCoordinate(x);
  };

  const handleMouseUp = (event: MouseEvent) => {
    const endingX = event.clientX;
    moveCardOver(endingX);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const endingX = event.changedTouches[0].clientX;
    moveCardOver(endingX);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  const isMobileBreakPoint = () => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    if (mediaQuery.matches) {
      return true;
    }

    return false;
  };

  const setUpEventListeners = () => {
    if (isMobileBreakPoint()) {
      node.addEventListener('mousedown', handleMouseDown);
      node.addEventListener('touchstart', handleTouchStart);
    } else {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('touchstart', handleTouchStart);
    }

    elementWidth = node.clientWidth;
  };

  setUpEventListeners();

  window.addEventListener('resize', () => {
    setUpEventListeners();
  });

  return {
    update(newParams: SwipeParams) {
      if (newParams.triggerReset) {
        resetCard();
      }
    },

    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('touchstart', handleTouchStart);
    }
  };
};
