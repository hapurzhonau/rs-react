import { getAllCharacters } from '../../../api/Api';
import { Details } from '../../../components/details/Details';
import { Character } from '../../../interfaces/apiInterface';

export async function generateStaticParams() {
  let page = 1;
  const allIds: { id: string }[] = [];

  while (true) {
    const data = await getAllCharacters(page);
    data.results.forEach((c: Character) => allIds.push({ id: String(c.id) }));
    if (page >= data.info.pages) break;
    page++;
  }
  return allIds;
}

export default function DetailsPage() {
  return (
    <aside className="w-1/3 border-l pl-4">
      <Details />
    </aside>
  );
}
