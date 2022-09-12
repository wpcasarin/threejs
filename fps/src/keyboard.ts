export const handleKeyPress = (keys: Set<string>) => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    keys.add(e.key.toLowerCase());
  });
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    keys.delete(e.key.toLowerCase());
  });
};
