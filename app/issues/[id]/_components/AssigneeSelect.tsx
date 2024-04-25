import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import prisma from "@/lib/prisma";

export default async function AssigneeSelect() {
  const users = await prisma.user.findMany();

  if (!users) {
    return null;
  }

  function assignToUser(userId: string) {}

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Unassigned">Unassigned</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}&lt;{user.email}&gt;
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
