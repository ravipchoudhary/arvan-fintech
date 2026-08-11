import fs from "fs/promises";
import path from "path";

const FILE = path.join(process.cwd(), "data", "followups.json");

async function ensureFile() {
  try {
    await fs.access(FILE);
  } catch {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify([]));
  }
}

export async function readFollowups() {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeFollowups(list: any[]) {
  await ensureFile();
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}

export async function createFollowup(entry: any) {
  const list = await readFollowups();
  const id = `fu_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const item = { id, ...entry, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  list.unshift(item);
  await writeFollowups(list);
  return item;
}

export async function updateFollowup(id: string, patch: any) {
  const list = await readFollowups();
  const idx = list.findIndex((f: any) => f.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
  await writeFollowups(list);
  return list[idx];
}

export async function deleteFollowup(id: string) {
  const list = await readFollowups();
  const next = list.filter((f: any) => f.id !== id);
  await writeFollowups(next);
  return true;
}
