import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const Page = () => (
  <>
    <Head>
      <title>Minha conta</title>
    </Head>
  </>
);

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
