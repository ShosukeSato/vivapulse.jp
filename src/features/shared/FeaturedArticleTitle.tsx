import { featuredArticle } from "@/data/content";

export default function FeaturedArticleTitle() {
  const displayTitle = featuredArticle.displayTitle;

  if (!displayTitle) return featuredArticle.title;

  return (
    <>
      {displayTitle.lead}
      {displayTitle.phrases.map((phrase) => (
        <span key={phrase}>
          <wbr />
          <span className="semanticPhrase">{phrase}</span>
        </span>
      ))}
    </>
  );
}
