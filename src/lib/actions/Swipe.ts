import type { Action } from 'svelte/action';
import { spring } from 'svelte/motion';

export const swipe: Action<HTMLElement, any> = (node, _swipeParams?) => {
  let x: number, startingX: number;
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
      updateCoordinates(x);
    }

    if (movement < 20) {
      x = rightSnapX;
      updateCoordinates(x);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    const endingX = event.clientX;
    moveCardOver(endingX);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  node.addEventListener('mousedown', handleMouseDown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
    }
  };
};
