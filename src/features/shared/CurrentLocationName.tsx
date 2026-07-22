export default function CurrentLocationName({ place }: { place: string }) {
  const [region, ...localityParts] = place.split("、");
  if (localityParts.length === 0) return <span className="semanticPhrase">{place}</span>;

  return (
    <>
      <span className="semanticPhrase">{region}、</span>
      <wbr />
      <span className="semanticPhrase">{localityParts.join("、")}</span>
    </>
  );
}
