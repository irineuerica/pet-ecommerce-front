import { Layout as AuthLayout } from 'src/layouts/auth/layout';

import LoginSection from 'src/sections/auth/login';

const Page = () => {
  return <LoginSection />;
};

Page.getLayout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>;

export default Page;
