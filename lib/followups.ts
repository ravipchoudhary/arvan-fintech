import fs from "fs/promises";
import path from "path";

type FollowupEntry = {
  id: string;
  employeeId?: string;
  clientId?: string;
  scheduledAt?: string;
  [key: string]: unknown;
};

const FILE = path.join(process.cwd(), "data", "followups.json");

async function ensureFile() {
  try {
    await fs.access(FILE);
  } catch {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify([]));
  }
}

export async function readFollowups(): Promise<FollowupEntry[]> {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf-8");
  try {
    return JSON.parse(raw) as FollowupEntry[];
  } catch {
    return [];
  }
}

export async function writeFollowups(list: FollowupEntry[]) {
  await ensureFile();
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}

export async function createFollowup(entry: Omit<FollowupEntry, "id"> & { id?: string }) {
  const list = await readFollowups();
  const id = `fu_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const item: FollowupEntry = { ...entry, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  list.unshift(item);
  await writeFollowups(list);
  return item;
}

export async function updateFollowup(id: string, patch: Partial<FollowupEntry>) {
  const list = await readFollowups();
  const idx = list.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
  await writeFollowups(list);
  return list[idx];
}

export async function deleteFollowup(id: string) {
  const list = await readFollowups();
  const next = list.filter((f) => f.id !== id);
  await writeFollowups(next);
  return true;
}
