import Head from 'next/head';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import CadastroSection from 'src/sections/auth/cadastro';

const Page = () => {
  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <CadastroSection />
    </>
  );
};

Page.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

export default Page;
