import { Fragment } from "react";

export default function SemanticText({ phrases }: { phrases: readonly string[] }) {
  return phrases.map((phrase, index) => (
    <Fragment key={`${index}-${phrase}`}>
      {index > 0 ? <wbr /> : null}
      <span className="semanticPhrase semanticUnit">{phrase}</span>
    </Fragment>
  ));
}
