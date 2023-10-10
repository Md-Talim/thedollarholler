import type { Action } from 'svelte/action';
import { spring } from 'svelte/motion';

interface SwipeParams {
  triggerReset?: boolean;
}

export const swipe: Action<HTMLElement, SwipeParams> = (node, swipeParams) => {
  let x: number, startingX: number;
  let triggerReset = swipeParams?.triggerReset;

  const elementWidth = node.clientWidth;
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

  const handleMouseMove = (event: MouseEvent) => {
    // delta X = difference between where the pointer started vs where it is currently
    const dx = event.clientX - x;
    x = event.clientX;

    coordinates.update(($coord) => {
      return {
        x: $coord.x + dx,
        y: 0
      };
    });
  };

  const updateCoordinates = (x: number) => {
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

    updateCoordinates(x);
  };

  const handleMouseUp = (event: MouseEvent) => {
    const endingX = event.clientX;
    moveCardOver(endingX);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  node.addEventListener('mousedown', handleMouseDown);

  return {
    update(newParams: SwipeParams) {
      if (newParams.triggerReset) {
        resetCard();
      }
    },

    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
    }
  };
};
