const HISTORY_KEY = 'packsense_history';

export const saveHistory = (record) => {
  try {
    const existing = getHistory();
    const updated = [record, ...existing];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Error saving history', e);
    return false;
  }
};

export const getHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading history', e);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
