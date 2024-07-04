import { MemberRole } from '@/libs/core/base';
import { getProfile } from '@/services/user';
import { notFound, redirect } from 'next/navigation';

interface Props {
  searchParams: {
    access_token: string;
  };
}

async function AuthSuccessPage({ searchParams: { access_token } }: Props) {
  const { memberRoles, nickname } = await getProfile({
    headers: { Authorization: access_token }
  });

  if (memberRoles.includes(MemberRole.ROLE_GUEST)) {
    return redirect(`/auth/signup?access_token=${access_token}`);
  } else if (memberRoles.includes(MemberRole.ROLE_USER)) {
    return redirect(`/${nickname}`);
  } else {
    return notFound();
  }
}

export default AuthSuccessPage;
