export default async function TripChecklistPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  console.log(tripId);

  return <div>체크리스트</div>;
}
