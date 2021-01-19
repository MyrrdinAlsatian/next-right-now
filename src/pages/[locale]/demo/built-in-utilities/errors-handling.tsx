import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';
import BuiltInUtilitiesSidebar from '@/modules/demo/components/BuiltInUtilitiesSidebar';
import ExamplesPage from '@/modules/demo/components/ExamplesPage';
import I18nLink from '@/modules/i18n/components/I18nLink';
import DefaultLayout from '@/modules/demo/components/ExamplesLayout';
import Btn from '@/common/components/dataDisplay/Btn';
import Code from '@/common/components/dataDisplay/Code';
import { CommonServerSideParams } from '@/modules/bootstrapping/types/CommonServerSideParams';
import { OnlyBrowserPageProps } from '@/modules/app/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/modules/app/types/SSGPageProps';
import { getDemoStaticPaths, getDemoStaticProps } from '@/modules/demo/demoSSG';

const fileLabel = 'pages/[locale]/demo/built-in-utilities/errors-handling';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getDemoStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getDemoStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ErrorsHandlingPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'errors-handling'}
      headProps={{
        seoTitle: 'Errors handling examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <ExamplesPage>
        <h1 className={'pcolor'}>Errors handling examples</h1>

        <Alert color={'info'}>
          It's interesting to know how your app will behave when unexpected things happen.<br />
          That's the point of the below examples, they're meant to showcase how the apps behaves in such situations.<br />
          <br />
          Note that it's also interesting to experiment those behaviours in different environments, because they will differ.
        </Alert>

        <hr />

        <h2>404 - Using CSR</h2>

        <Alert color={'info'}>
          This page doesn't exist and should display a 404 page.
        </Alert>

        <p>
          <Btn mode={'primary-outline'}>
            <I18nLink href={'/404-csr'}>This is a client-side navigation (CSR)</I18nLink>
          </Btn>
        </p>

        <Code
          text={`
            <Btn mode={'primary-outline'}>
              <I18nLink href={'/404-csr'}>This is a client-side navigation (CSR)</I18nLink>
            </Btn>
      `}
        />
        <br />

        <h2>404 - Using full page reload</h2>

        <Alert color={'info'}>
          This page doesn't exist and should display a 404 page.
        </Alert>

        <p>
          <i>This is not CSR, it's not necessarily SSR either, it can be either static rendering or SSR.</i><br />
          <Btn mode={'primary-outline'}>
            <a href={'/404-static'}>This is a normal navigation</a>
          </Btn>
        </p>

        <Code
          text={`
            <Btn mode={'primary-outline'}>
              <a href={'/404-static'}>This is a normal navigation</a>
            </Btn>
          `}
        />
        <br />

        <hr />

        <h2>500 - Top-level error</h2>

        <Alert color={'info'}>
          This page throws an error right from the Page component and should display a 500 page error without anything else (no footer/header).
        </Alert>

        <Code
          text={`
            const TopLevel500ErrorPage: NextPage<Props> = (props): JSX.Element => {
              if (isBrowser()) {
                // Only throw on browser, otherwise it fails when building the app on Vercel and deployment fails altogether
                throw new Error('Top level 500 error example');
              }

              return (
                <DefaultLayout
                  {...props}
                  pageName={'page-500-error'}
                  headProps={{
                    seoTitle: 'Top-level 500 error example - Next Right Now',
                  }}
                  Sidebar={BuiltInUtilitiesSidebar}
                >
                  Top-level 500 error example
                </DefaultLayout>
              );
            };
          `}
        />
        <br />

        <p>
          <Btn mode={'primary-outline'}>
            <I18nLink href={'/examples/built-in-utilities/top-level-500-error'}>This is a client-side navigation (CSR)</I18nLink><br />
          </Btn>
          <Btn mode={'primary-outline'}>
            <a href={'/examples/built-in-utilities/top-level-500-error'}>This is a normal navigation</a>
          </Btn>
        </p>
        <br />

        <hr />

        <h2>Interactive error (simulating User interaction)</h2>

        <Btn mode={'primary-outline'}>
          <I18nLink href={'/examples/built-in-utilities/interactive-error'}>Go to interactive error page</I18nLink><br />
        </Btn>

        <br />

      </ExamplesPage>
    </DefaultLayout>
  );
};

export default (ErrorsHandlingPage);