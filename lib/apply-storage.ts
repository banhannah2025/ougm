type StoredData = Record<string, unknown>;

const STORAGE_KEY = "camp-mercy-application";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function loadAllSteps(): Record<string, StoredData> {
  const storage = getStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, StoredData>;
  } catch {
    return {};
  }
}

export function loadStepData(stepId: string): StoredData {
  const all = loadAllSteps();
  return (all?.[stepId] as StoredData) || {};
}

export function saveStepData(stepId: string, data: StoredData) {
  const storage = getStorage();
  if (!storage) return;
  const all = loadAllSteps();
  storage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...all,
      [stepId]: data,
    }),
  );
}

export function clearApplicationData() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEY);
}

export function formDataToObject(formData: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    if (result[key]) {
      const existing = result[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        result[key] = [existing as string, value];
      }
    } else {
      result[key] = value;
    }
  });
  return result;
}
