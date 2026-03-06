export const dynamic = 'force-dynamic'

type MediaDoc = { url?: string; alt?: string }
type Project = {
    id: string
    title: string
    slug: string
    summary?: string
    gallery?: { image?: MediaDoc }[]
}

export default async function ProjectsPage() {
    const res = await fetch('http://localhost:3000/api/projects?limit=50&depth=2', {
        cache: 'no-store',
    })
    const data = await res.json()
    const projects: Project[] = data?.docs ?? []

    return (
        <main style={{ padding: 24 }}>
            <h1>Projets</h1>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
                {projects.map((p) => {
                    const first = p.gallery?.[0]?.image
                    const imgUrl = first?.url ?? ''
                    const alt = first?.alt ?? p.title

                    return (
                        <li
                            key={p.id}
                            style={{
                                border: '1px solid #333',
                                borderRadius: 12,
                                padding: 16,
                            }}
                        >
                            <a href={`/projects/${p.slug}`} style={{ textDecoration: 'none' }}>
                                <h2 style={{ marginTop: 0 }}>{p.title}</h2>

                                {imgUrl ? (
                                    <img
                                        src={imgUrl}
                                        alt={alt}
                                        style={{ width: 320, maxWidth: '100%', height: 'auto', display: 'block', marginBottom: 12 }}
                                    />
                                ) : (
                                    <p style={{ opacity: 0.8 }}>Aucune image</p>
                                )}

                                {p.summary ? <p style={{ marginBottom: 0 }}>{p.summary}</p> : null}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}