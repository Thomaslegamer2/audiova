/** Cache navigateur des sorties converties pour re-téléchargement (TTL session). */

export const OUTPUT_CACHE_TTL_MS = 30 * 60 * 1000;
const DB_NAME = "audiova-outputs";
const STORE = "blobs";

type CacheRecord = {
  id: string;
  name: string;
  mime: string;
  bytes: ArrayBuffer;
  expiresAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("idb_open"));
  });
}

export async function saveOutputBlob(id: string, blob: Blob, name: string): Promise<void> {
  if (typeof indexedDB === "undefined") {
    return;
  }
  try {
    const bytes = await blob.arrayBuffer();
    const record: CacheRecord = {
      id,
      name,
      mime: blob.type || "application/octet-stream",
      bytes,
      expiresAt: Date.now() + OUTPUT_CACHE_TTL_MS,
    };
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("idb_put"));
    });
    db.close();
  } catch {
    // Quota / navigation privée.
  }
}

export async function getOutputBlob(
  id: string,
): Promise<{ blob: Blob; name: string } | null> {
  if (typeof indexedDB === "undefined") {
    return null;
  }
  try {
    const db = await openDb();
    const record = await new Promise<CacheRecord | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const request = tx.objectStore(STORE).get(id);
      request.onsuccess = () => resolve(request.result as CacheRecord | undefined);
      request.onerror = () => reject(request.error ?? new Error("idb_get"));
    });
    db.close();
    if (!record) {
      return null;
    }
    if (record.expiresAt < Date.now()) {
      void deleteOutputBlob(id);
      return null;
    }
    return {
      blob: new Blob([record.bytes], { type: record.mime }),
      name: record.name,
    };
  } catch {
    return null;
  }
}

export async function deleteOutputBlob(id: string): Promise<void> {
  if (typeof indexedDB === "undefined") {
    return;
  }
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("idb_del"));
    });
    db.close();
  } catch {
    // Ignore.
  }
}

export async function clearOutputBlobs(): Promise<void> {
  if (typeof indexedDB === "undefined") {
    return;
  }
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("idb_clear"));
    });
    db.close();
  } catch {
    // Ignore.
  }
}
