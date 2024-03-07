import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const Home = () => {
  const { locale, locales, push } = useRouter();

  const handleClick = (l) => () => {
    push(`/`, undefined, { locale: l });

    /* push('/about', undefined, { locale: l }) */

    /* Not recommeneded */
    /* push(`/${l}/about`) */

    /* Not recommeneded */
    /* push(`/${l}`) */
    /* push(`/${l}/about`) */
  };

  const { t } = useTranslation();

  return (
    <>
      <h1>{locale}</h1>

      <div>
        <p>{t("hello world")}</p>
        <h1>trial</h1>
        <label for="cars">{t("choose-your-locale")} </label>

        {locales.map((l) => (
          <button key={l} onClick={handleClick(l)}>
            {l}
          </button>
        ))}
      </div>

      <div>
        <h1>Go to about page </h1>

        {locales.map((l) => (
          <h2 key={l}>
            <Link href={`/about`} locale={l}>
              {l}
            </Link>
          </h2>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Home;
