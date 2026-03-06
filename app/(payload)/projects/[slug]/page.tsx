import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const h = await headers()
    const host = h.get('host') || 'localhost:3000'
    const protocol = host.startsWith('localhost') ? 'http' : 'https'
    const baseURL = `${protocol}://${host}`

    const res = await fetch(
        `${baseURL}/api/projects?where[slug][equals]=${encodeURIComponent(params.slug)}&limit=1&depth=2`,
        { cache: 'no-store' },
    )
    const data = await res.json()
    const project = data?.docs?.[0]

    if (!project) return <div style={{ padding: 24 }}>Projet introuvable</div>

    return (
        <main style={{ padding: 24 }}>
            <h1>{project.title}</h1>

            <h2>Galerie</h2>
            <div style={{ display: 'grid', gap: 16 }}>
                {(project.gallery ?? []).map((g: any, idx: number) => {
                    const url = g?.image?.url ? `${baseURL}${g.image.url}` : ''
                    const alt = g?.image?.alt ?? 'Photo'
                    return (
                        <figure key={idx}>
                            <img src={url} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />
                            {g.caption ? <figcaption>{g.caption}</figcaption> : null}
                        </figure>
                    )
                })}
            </div>
        </main>
    )
}