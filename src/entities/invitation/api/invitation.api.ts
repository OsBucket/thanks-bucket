import { client } from '@/shared/api/client';
import { Invitation } from '@/entities/invitation/api/invitation.type';
import { useQuery } from '@tanstack/react-query';

export type CreateInvitationValue = {
  invitationType: number;
  invitationWho: string;
  invitationWhen: string;
  invitationWhere: string;
  invitationWhat: string;
};

export async function getInvitationById(id: number): Promise<Invitation> {
  const res = await client.api.get<Invitation>(`/invitations/${id}`);
  return res.data;
}

export async function createInvitation(invitation: CreateInvitationValue): Promise<number> {
  const res = await client.api.post<number>('/invitations', invitation);
  return res.data;
}

export const getInvitationByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ['invitations', id],
    queryFn: () => getInvitationById(id)
  });
};
