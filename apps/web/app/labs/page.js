export const dynamic = "force-dynamic";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getLabs() {
  if (!API) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return [];
  }

  try {
    const res = await fetch(`${API}/labs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Labs API failed:", res.status, res.statusText);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch labs:", error);
    return [];
  }
}

export default async function LabsPage() {
  const labs = await getLabs();

  return (
    <main>
      <h1>Labs</h1>

      {labs.length === 0 ? (
        <p>No labs available.</p>
      ) : (
        <ul>
          {labs.map((lab, index) => (
            <li key={lab.id ?? index}>
              <strong>{lab.title ?? "Untitled Lab"}</strong>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}