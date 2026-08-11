import { Prisma } from "@prisma/client";

export function employeeClientWhere(managerId: string): Prisma.UserWhereInput {
  return {
    managerId,
    role: "CLIENT",
  };
}

export function employeeClientCountWhere(managerId: string, activeOnly = true): Prisma.UserWhereInput {
  return {
    managerId,
    role: "CLIENT",
    ...(activeOnly ? { status: "ACTIVE" } : {}),
  };
}

export function employeeClientCreatedAtWhere(managerId: string, start: Date, end: Date): Prisma.UserWhereInput {
  return {
    managerId,
    role: "CLIENT",
    createdAt: {
      gte: start,
      lt: end,
    },
  };
}

export function employeeRecordWhere(employeeId: string) {
  return { employeeId };
}

// Follow-up helpers are managed by the file-based followup store in lib/followups.ts.
