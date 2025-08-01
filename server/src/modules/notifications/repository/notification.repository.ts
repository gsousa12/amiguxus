import { Prisma } from "@prisma/client";
import { prisma } from "database/clients/prisma";

export const create = async (data: Prisma.NotificationCreateInput) => {
  return prisma.notification.create({ data });
};

// export const lastNotifications = async (
//   userId: string
// ): Promise<Notification[] | null> => {
//   const limit = 5;
//   return prisma.notification.findMany({
//     where: {
//       recipient_user_id: userId,
//       is_read: false,
//     },
//     orderBy: {
//       created_at: "desc",
//     },
//     take: limit,
//   });
// };

// const findAll = async (pagination: PaginationQuery, filters: any) => {
//   const { page, pageSize } = pagination;
//   const { search, urgency, is_read } = filters;

//   const skip = ((page ?? defaultPage) - 1) * (pageSize ?? defaultPageSize);
//   const take = pageSize;

//   const where: Prisma.NotificationWhereInput = {};
//   where.recipient_user_id = filters.userId;

//   if (search) {
//     where.OR = [
//       { message: { contains: search, mode: "insensitive" } },
//       { title: { contains: search, mode: "insensitive" } },
//     ];
//   }

//   if (urgency) {
//     where.urgency = urgency;
//   }

//   if (is_read !== undefined) {
//     where.is_read = is_read;
//   }

//   const [total, notifications] = await prisma.$transaction([
//     prisma.notification.count({ where }),
//     prisma.notification.findMany({
//       where,
//       skip,
//       take,
//       orderBy: {
//         created_at: "desc",
//       },
//     }),
//   ]);
//   return {
//     data: notifications,
//     total,
//   };
// };

export const notificationRepository = {
  create,
};
