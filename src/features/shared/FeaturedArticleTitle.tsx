import { Fragment } from "react";
import { featuredArticle } from "@/data/content";

export default function FeaturedArticleTitle() {
  const displayTitle = featuredArticle.displayTitle;

  if (!displayTitle) return featuredArticle.title;

  return (
    <>
      <span className="semanticPhrase">{displayTitle.lead}</span>
      {displayTitle.phrases.map((phrase) => (
        <Fragment key={phrase}>
          <wbr />
          <span className="semanticPhrase">{phrase}</span>
        </Fragment>
      ))}
    </>
  );
}
