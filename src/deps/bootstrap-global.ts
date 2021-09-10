declare global {
  namespace bootstrap {
    class Modal {
      constructor(element: HTMLElement);

      show(): void;

      hide(): void;
    }
  }
}

export {};
