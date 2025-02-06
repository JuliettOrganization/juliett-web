import { fetchFilteredUsers } from "@/app/lib/data";
import UsersTableClient from "./1_table_user";

export async function UsersTableServer({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredUsers(query, currentPage);

  return <UsersTableClient users={users} />;
}
