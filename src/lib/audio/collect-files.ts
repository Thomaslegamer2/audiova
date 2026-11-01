/** Collecte fichiers + dossiers (webkitGetAsEntry) jusqu'à maxFiles. */

type FsEntry = {
  isFile: boolean;
  isDirectory: boolean;
  name: string;
  file?: (ok: (file: File) => void, err?: (error: DOMException) => void) => void;
  createReader?: () => {
    readEntries: (ok: (entries: FsEntry[]) => void, err?: (error: DOMException) => void) => void;
  };
};

function readAllEntries(reader: {
  readEntries: (ok: (entries: FsEntry[]) => void, err?: (error: DOMException) => void) => void;
}): Promise<FsEntry[]> {
  const collected: FsEntry[] = [];
  return new Promise((resolve, reject) => {
    const pump = () => {
      reader.readEntries(
        (batch) => {
          if (batch.length === 0) {
            resolve(collected);
            return;
          }
          collected.push(...batch);
          pump();
        },
        (error) => reject(error),
      );
    };
    pump();
  });
}

async function walkEntry(entry: FsEntry, out: File[], maxFiles: number): Promise<void> {
  if (out.length >= maxFiles) {
    return;
  }
  if (entry.isFile && entry.file) {
    const file = await new Promise<File>((resolve, reject) => {
      entry.file!(resolve, reject);
    });
    out.push(file);
    return;
  }
  if (entry.isDirectory && entry.createReader) {
    const children = await readAllEntries(entry.createReader());
    for (const child of children) {
      if (out.length >= maxFiles) {
        break;
      }
      if (child.name.startsWith(".")) {
        continue;
      }
      await walkEntry(child, out, maxFiles);
    }
  }
}

export async function collectDroppedFiles(
  dataTransfer: DataTransfer,
  maxFiles: number,
): Promise<File[]> {
  const out: File[] = [];
  const items = dataTransfer.items;
  const entries: FsEntry[] = [];

  if (items && items.length > 0) {
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      if (!item || item.kind !== "file") {
        continue;
      }
      const entry = (
        item as DataTransferItem & { webkitGetAsEntry?: () => FsEntry | null }
      ).webkitGetAsEntry?.();
      if (entry) {
        entries.push(entry);
      }
    }
  }

  if (entries.length > 0) {
    for (const entry of entries) {
      if (out.length >= maxFiles) {
        break;
      }
      try {
        await walkEntry(entry, out, maxFiles);
      } catch {
        // Entrée illisible.
      }
    }
    if (out.length > 0) {
      return out.slice(0, maxFiles);
    }
  }

  return Array.from(dataTransfer.files).slice(0, maxFiles);
}
